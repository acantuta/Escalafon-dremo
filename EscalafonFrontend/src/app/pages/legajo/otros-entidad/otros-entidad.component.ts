import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { TipoDocumento } from '../../../interfaces/tipo-documento';
import { OtroService } from '../../../services/otro.service';
import { VOtroService } from '../../../services/v-otro.service';
import { VOtro } from '../../../interfaces/v-otro';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { Archivo } from '../../../interfaces/archivo';

@Component({
  selector: 'app-otros-entidad',
  templateUrl: './otros-entidad.component.html'
})
export class OtrosEntidadComponent implements OnInit {
  legajo?: VLegajo;
  tiposDocumento: TipoDocumento[] = [];
  otrosForm: FormGroup;
  dataSource: VOtro[] = [];
  modoVisualizacion = false;
  modoEdicion = false;
  registroSeleccionado?: VOtro;

  constructor(
    private fb: FormBuilder,
    private legajoState: LegajoStateService,
    private tipoDocumentoService: TipoDocumentoService,
    private otroService: OtroService,
    private vOtroService: VOtroService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // Inicializamos el formulario con los campos de la interfaz VOtro
    this.otrosForm = this.fb.group({
      iTipoDocId: ['', Validators.required],
      dtOtrosFechaEmision: ['', Validators.required],
      iArchId: [null, Validators.required],
      cOtrosAnotaciones: [''],
      iLegId: [null]
    });
  }

  ngOnInit(): void {
    // Obtenemos el legajo actual y actualizamos el formulario
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
      if (legajo) {
        this.otrosForm.patchValue({
          iLegId: legajo.iLegId
        });
        this.cargarDatos();
      }
    });

    // Cargamos los tipos de documento
    this.tipoDocumentoService.getAll().subscribe(tipos => {
      this.tiposDocumento = tipos;
    });
  }

  cargarDatos(): void {
    if (this.legajo?.iLegId) {
      this.vOtroService.getAll({
        campo: 'iLegId',
        valor: this.legajo.iLegId.toString()
      }).subscribe(data => {
        this.dataSource = data;
      });
    }
  }

  editarRegistro(row: VOtro): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Edición',
        message: '¿Desea editar este registro?',
        confirmText: 'Aceptar',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el usuario confirma, procedemos con la edición
        this.modoEdicion = true;
        this.modoVisualizacion = false; // Aseguramos que no esté en modo visualización
        this.registroSeleccionado = row;
        
        // Habilitamos el formulario antes de establecer los valores
        this.otrosForm.enable();
        
        this.otrosForm.patchValue({
          iTipoDocId: row.iTipoDocId,
          dtOtrosFechaEmision: row.dtOtrosFechaEmision,
          iArchId: row.iArchId,
          cOtrosAnotaciones: row.cOtrosAnotaciones,
          iLegId: row.iLegId
        });
      }
    });
  }

  guardar(): void {
    if (!this.otrosForm.valid) {
      // Marcar todos los campos como tocados para mostrar los errores
      Object.keys(this.otrosForm.controls).forEach(key => {
        const control = this.otrosForm.get(key);
        control?.markAsTouched();
      });

      // Mostrar mensaje específico si falta el archivo
      if (this.otrosForm.get('iArchId')?.errors?.['required']) {
        this.snackBar.open('Debe seleccionar un archivo', 'Cerrar', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
          duration: 3000
        });
      }
      return;
    }

    // Verificar específicamente si hay archivo antes de mostrar el diálogo
    if (!this.otrosForm.get('iArchId')?.value) {
      this.snackBar.open('Debe seleccionar un archivo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

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
        const otros: VOtro = this.otrosForm.value;
        
        if (this.modoEdicion && this.registroSeleccionado) {
          // Actualizar
          this.otroService.update(this.registroSeleccionado.iOtrosId!, otros).subscribe({
            next: (response) => {
              this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.limpiar();
              this.cargarDatos();
            },
            error: (error) => {
              this.snackBar.open('Error al actualizar el registro', 'Cerrar', {
                duration: 3000
              });
            }
          });
        } else {
          // Crear nuevo
          this.otroService.create(otros).subscribe({
            next: (response) => {
              this.snackBar.open('Registro guardado exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.limpiar();
              this.cargarDatos();
            },
            error: (error) => {
              this.snackBar.open('Error al guardar el registro', 'Cerrar', {
                duration: 3000
              });
            }
          });
        }
      }
    });
  }

  eliminarRegistro(row: VOtro): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && row.iOtrosId) {
        this.otroService.delete(row.iOtrosId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarDatos();
          },
          error: (error) => {
            this.snackBar.open('Error al eliminar el registro', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  limpiar(): void {
    this.otrosForm.reset();
    
    // Resetear el formulario sin errores
    Object.keys(this.otrosForm.controls).forEach(key => {
      const control = this.otrosForm.get(key);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
    
    this.otrosForm.enable();
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;
    
    if (this.legajo) {
      this.otrosForm.patchValue({
        iLegId: this.legajo.iLegId
      });
    }
  }

  onArchivoIdChange(archivoId: number | undefined): void {
    this.otrosForm.patchValue({
      iArchId: archivoId || null
    });
  }

  verRegistro(row: VOtro): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = row;
    
    // Primero establecer el ID del archivo
    this.otrosForm.patchValue({
      iArchId: row.iArchId
    });
    
    // Luego establecer el resto de los valores
    setTimeout(() => {
      this.otrosForm.patchValue({
        iTipoDocId: row.iTipoDocId,
        dtOtrosFechaEmision: row.dtOtrosFechaEmision,
        cOtrosAnotaciones: row.cOtrosAnotaciones,
        iLegId: row.iLegId
      });
    }, 100);
    
    this.otrosForm.disable();
  }

  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo?.iArchId) {
      this.otrosForm.patchValue({
        iArchId: archivo.iArchId
      });
      this.otrosForm.get('iArchId')?.markAsTouched();
    } else {
      this.otrosForm.patchValue({
        iArchId: null
      });
    }
  }

  validarCampo(campo: string): boolean {
    const control = this.otrosForm.get(campo);
    return control ? (control.invalid && control.touched) : false;
  }
}
