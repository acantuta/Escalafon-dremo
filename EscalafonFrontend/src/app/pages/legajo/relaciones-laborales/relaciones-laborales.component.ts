import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TipoDocumento } from '../../../interfaces/tipo-documento';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { RelacionIndividualColectivaService } from '../../../services/relacion-individual-colectiva.service';
import { RelacionIndividualColectiva } from '../../../interfaces/relacion-individual-colectiva';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-relaciones-laborales',
  templateUrl: './relaciones-laborales.component.html',
  providers: [DatePipe]
})
export class RelacionesLaboralesComponent implements OnInit {
  legajo?: VLegajo;
  tiposDocumento: TipoDocumento[] = [];
  registros: any[] = [];
  relacionForm: FormGroup;
  archivoId: number | null = null;
  modoEdicion = false;
  modoVisualizacion = false;
  registroSeleccionado?: RelacionIndividualColectiva;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private tipoDocumentoService: TipoDocumentoService,
    private relacionService: RelacionIndividualColectivaService,
    private legajoState: LegajoStateService,
    private datePipe: DatePipe
  ) {
    this.relacionForm = this.fb.group({
      iTipoDocId: [null, [Validators.required]],
      dtRelaIndColecFechaEmision: [null, [Validators.required]],
      iArchId: [null],
      cRelaIndColecAnotaciones: ['']
    });
  }

  ngOnInit(): void {
    this.cargarTiposDocumento();
    this.cargarLegajo();
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposDocumento = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de documento:', error);
        this.snackBar.open('Error al cargar tipos de documento', 'Cerrar', { duration: 3000 });
      }
    });
  }

  private cargarLegajo(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
      if (legajo?.iLegId) {
        this.cargarRegistros(legajo.iLegId);
      }
    });
  }

  cargarRegistros(legajoId: number): void {
    this.relacionService.getAll({
      campo: 'iLegId',
      valor: legajoId.toString()
    }).subscribe({
      next: (data) => {
        this.registros = data.map((item, index) => {
          const fechaEmision = item.dtRelaIndColecFechaEmision ? 
            this.datePipe.transform(new Date(item.dtRelaIndColecFechaEmision + 'T00:00:00'), 'dd/MM/yyyy') : '';

          return {
            numero: index + 1,
            tipoDocumento: this.getTipoDocumentoNombre(item.iTipoDocId || 0),
            fechaEmision: fechaEmision,
            ...item
          };
        });
      },
      error: (error) => {
        console.error('Error al cargar registros:', error);
        this.snackBar.open('Error al cargar los registros', 'Cerrar', { duration: 3000 });
      }
    });
  }

  editarRegistro(registro: RelacionIndividualColectiva): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Edición',
        message: '¿Está seguro de editar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modoEdicion = true;
        this.modoVisualizacion = false;
        this.registroSeleccionado = registro;
        this.archivoId = registro.iArchId || null;
        
        let fecha = null;
        if (registro.dtRelaIndColecFechaEmision) {
          fecha = new Date(registro.dtRelaIndColecFechaEmision + 'T00:00:00');
          fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        }

        this.relacionForm.enable();
        this.relacionForm.patchValue({
          iTipoDocId: registro.iTipoDocId,
          dtRelaIndColecFechaEmision: fecha,
          iArchId: registro.iArchId,
          cRelaIndColecAnotaciones: registro.cRelaIndColecAnotaciones
        });
      }
    });
  }

  verRegistro(registro: RelacionIndividualColectiva): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = registro;
    this.archivoId = registro.iArchId || null;
    
    let fecha = null;
    if (registro.dtRelaIndColecFechaEmision) {
      fecha = new Date(registro.dtRelaIndColecFechaEmision + 'T00:00:00');
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    }

    this.relacionForm.patchValue({
      iTipoDocId: registro.iTipoDocId,
      dtRelaIndColecFechaEmision: fecha,
      iArchId: registro.iArchId,
      cRelaIndColecAnotaciones: registro.cRelaIndColecAnotaciones
    });
    this.relacionForm.disable();
  }

  eliminarRegistro(registro: RelacionIndividualColectiva): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && registro.iRelaIndColecId) {
        this.relacionService.delete(registro.iRelaIndColecId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', { duration: 3000 });
            this.cargarRegistros(this.legajo!.iLegId!);
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            this.snackBar.open('Error al eliminar el registro', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  guardar(): void {
    this.formSubmitted = true;
    
    this.relacionForm.markAllAsTouched();

    if (!this.relacionForm.valid || !this.archivoId) {
      if (!this.archivoId) {
        this.snackBar.open('Debe seleccionar un archivo', 'Cerrar', { duration: 3000 });
        return;
      }
      
      this.snackBar.open('Por favor complete los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    if (!this.legajo?.iLegId) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.modoEdicion ? 'Confirmar Actualización' : 'Confirmar Registro',
        message: this.modoEdicion ? 
          '¿Está seguro de actualizar este registro?' : 
          '¿Está seguro de guardar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const relacion: RelacionIndividualColectiva = {
          ...this.relacionForm.value,
          iLegId: this.legajo!.iLegId
        };

        if (this.modoEdicion && this.registroSeleccionado?.iRelaIndColecId) {
          this.relacionService.update(this.registroSeleccionado.iRelaIndColecId, relacion).subscribe({
            next: () => {
              this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', { duration: 3000 });
              this.limpiarFormulario();
              this.cargarRegistros(this.legajo!.iLegId!);
            },
            error: (error) => {
              console.error('Error al actualizar:', error);
              this.snackBar.open('Error al actualizar el registro', 'Cerrar', { duration: 3000 });
            }
          });
        } else {
          this.relacionService.create(relacion).subscribe({
            next: () => {
              this.snackBar.open('Registro guardado exitosamente', 'Cerrar', { duration: 3000 });
              this.limpiarFormulario();
              this.cargarRegistros(this.legajo!.iLegId!);
            },
            error: (error) => {
              console.error('Error al guardar:', error);
              this.snackBar.open('Error al guardar el registro', 'Cerrar', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  limpiarFormulario(): void {
    this.formSubmitted = false;
    this.relacionForm.reset();
    this.relacionForm.enable();
    this.archivoId = null;
    this.modoEdicion = false;
    this.modoVisualizacion = false;
    this.registroSeleccionado = undefined;
  }

  getTipoDocumentoNombre(id: number): string {
    return this.tiposDocumento.find(t => t.iTipoDocId === id)?.cTipoDocNombre || '';
  }

  onArchivoSeleccionado(archivo: any): void {
    if (archivo?.iArchId) {
      this.archivoId = archivo.iArchId;
      this.relacionForm.patchValue({
        iArchId: archivo.iArchId
      });
    }
  }

  cerrarVisualizacion(): void {
    this.formSubmitted = false;
    this.relacionForm.reset();
    this.relacionForm.enable();
    this.archivoId = null;
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;
  }
}
