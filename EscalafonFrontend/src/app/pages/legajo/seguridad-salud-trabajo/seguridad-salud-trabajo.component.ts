import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { TipoDocumento } from '../../../interfaces/tipo-documento';
import { VSeguridadSaludBienestar } from '../../../interfaces/v-seguridad-salud-bienestar';
import { VSeguridadSaludBienestarService } from '../../../services/v-seguridad-salud-bienestar.service';
import { SeguridadSaludBienestarService } from '../../../services/seguridad-salud-bienestar.service';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-seguridad-salud-trabajo',
  templateUrl: './seguridad-salud-trabajo.component.html'
})
export class SeguridadSaludTrabajoComponent implements OnInit {
  legajo?: VLegajo;
  tiposDocumento: TipoDocumento[] = [];
  seguridadForm: FormGroup;
  dataSource = new MatTableDataSource<VSeguridadSaludBienestar>([]);
  modoVisualizacion = false;
  modoEdicion = false;
  registroSeleccionado?: VSeguridadSaludBienestar;
  displayedColumns = ['numero', 'tipoDocumento', 'fechaEmision', 'acciones'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  totalRegistros = 0;
  tamanioPagina = 10;
  paginaActual = 0;

  constructor(
    private fb: FormBuilder,
    private legajoState: LegajoStateService,
    private tipoDocumentoService: TipoDocumentoService,
    private seguridadService: SeguridadSaludBienestarService,
    private vSeguridadService: VSeguridadSaludBienestarService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.seguridadForm = this.fb.group({
      iTipoDocId: ['', Validators.required],
      dtSegSalBieFechaEmision: ['', Validators.required],
      iArchId: [null, Validators.required],
      cSegSalBieAnotaciones: [''],
      iLegId: [null]
    });
  }

  ngOnInit(): void {
    this.cargarTiposDocumento();
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
      if (legajo?.iLegId) {
        this.seguridadForm.patchValue({ iLegId: legajo.iLegId });
        this.cargarDatos();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  cargarDatos(): void {
    if (this.legajo?.iLegId) {
      this.vSeguridadService.getAll({
        campo: 'iLegId',
        valor: this.legajo.iLegId.toString()
      }).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.totalRegistros = data.length;
        },
        error: (error) => {
          console.error('Error al cargar registros:', error);
          this.snackBar.open('Error al cargar los registros', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  onArchivoIdChange(archivoId: number | undefined): void {
    this.seguridadForm.patchValue({ iArchId: archivoId || null });
  }

  verRegistro(row: VSeguridadSaludBienestar): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = row;
    this.seguridadForm.patchValue({
      iTipoDocId: row.iTipoDocId,
      dtSegSalBieFechaEmision: row.dtSegSalBieFechaEmision,
      iArchId: row.iArchId,
      cSegSalBieAnotaciones: row.cSegSalBieAnotaciones
    });
    this.seguridadForm.disable();
  }

  editarRegistro(row: VSeguridadSaludBienestar): void {
    if (this.modoVisualizacion) {
      this.seguridadForm.enable();
    }

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
        this.registroSeleccionado = row;
        this.seguridadForm.enable();
        this.seguridadForm.patchValue({
          iTipoDocId: row.iTipoDocId,
          dtSegSalBieFechaEmision: row.dtSegSalBieFechaEmision,
          iArchId: row.iArchId,
          cSegSalBieAnotaciones: row.cSegSalBieAnotaciones
        });
      }
    });
  }

  guardar(): void {
    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.seguridadForm.controls).forEach(key => {
      const control = this.seguridadForm.get(key);
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });

    if (this.seguridadForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: this.modoEdicion ? 'Confirmar Actualización' : 'Confirmar Guardar',
          message: this.modoEdicion ? 
            '¿Está seguro de actualizar este registro?' : 
            '¿Está seguro de guardar este registro?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const seguridad = this.seguridadForm.value;
          
          if (this.modoEdicion && this.registroSeleccionado?.iSegSalBieId) {
            this.seguridadService.update(this.registroSeleccionado.iSegSalBieId, seguridad).subscribe({
              next: () => {
                this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', { duration: 3000 });
                this.limpiar();
                this.cargarDatos();
              },
              error: () => {
                this.snackBar.open('Error al actualizar el registro', 'Cerrar', { duration: 3000 });
              }
            });
          } else {
            this.seguridadService.create(seguridad).subscribe({
              next: () => {
                this.snackBar.open('Registro guardado exitosamente', 'Cerrar', { duration: 3000 });
                this.limpiar();
                this.cargarDatos();
              },
              error: () => {
                this.snackBar.open('Error al guardar el registro', 'Cerrar', { duration: 3000 });
              }
            });
          }
        }
      });
    } else {
      // Obtener los nombres amigables de los campos inválidos
      const camposInvalidos = Object.keys(this.seguridadForm.controls)
        .filter(key => {
          const control = this.seguridadForm.get(key);
          return control && !control.disabled && control.invalid;
        })
        .map(key => {
          // Mapear los nombres técnicos a nombres amigables
          const nombresCampos: { [key: string]: string } = {
            iTipoDocId: 'Tipo de documento',
            dtSegSalBieFechaEmision: 'Fecha de emisión',
            iArchId: 'Archivo',
            cSegSalBieAnotaciones: 'Anotaciones'
          };
          return nombresCampos[key] || key;
        });

      // Mostrar mensaje con los campos que faltan completar
      this.snackBar.open(
        `Por favor complete los siguientes campos requeridos: ${camposInvalidos.join(', ')}`, 
        'Cerrar',
        {
          duration: 5000,
          panelClass: ['error-snackbar']
        }
      );

      // Hacer scroll al primer campo inválido
      const primerCampoInvalido = document.querySelector('.ng-invalid');
      if (primerCampoInvalido) {
        primerCampoInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  eliminarRegistro(row: VSeguridadSaludBienestar): void {
    if (!row.iSegSalBieId) {
      this.snackBar.open('Error: ID de registro inválido', 'Cerrar', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.seguridadService.delete(row.iSegSalBieId!).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', { duration: 3000 });
            this.cargarDatos();
          },
          error: () => {
            this.snackBar.open('Error al eliminar el registro', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  limpiar(): void {
    this.seguridadForm.reset();
    this.seguridadForm.enable();
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;
    if (this.legajo?.iLegId) {
      this.seguridadForm.patchValue({ iLegId: this.legajo.iLegId });
    }
  }

  validarCampo(campo: string): boolean {
    const control = this.seguridadForm.get(campo);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  getTipoDocumentoNombre(iTipoDocId: number | undefined): string {
    if (!iTipoDocId) return '';
    const tipoDoc = this.tiposDocumento.find(t => t.iTipoDocId === iTipoDocId);
    return tipoDoc?.cTipoDocNombre || '';
  }
}
