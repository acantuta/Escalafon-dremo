import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReconocimientoService } from '../../../../services/reconocimiento.service';
import { VReconocimientoService } from '../../../../services/v-reconocimiento.service';
import { Reconocimiento } from '../../../../interfaces/reconocimiento';
import { VReconocimiento } from '../../../../interfaces/v-reconocimiento';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { VLegajo } from '../../../../interfaces/v-legajo';
import { TipoDocumentoService } from '../../../../services/tipo-documento.service';
import { ReconocimientoTipoMeritoService } from '../../../../services/reconocimiento-tipo-merito.service';
import { ReconocimientoMeritoService } from '../../../../services/reconocimiento-merito.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { TipoDocumento } from '../../../../interfaces/tipo-documento';
import { ReconocimientoTipoMerito } from '../../../../interfaces/reconocimiento-tipo-merito';
import { ReconocimientoMerito } from '../../../../interfaces/reconocimiento-merito';
import { Archivo } from '../../../../interfaces/archivo';

@Component({
  selector: 'app-reconocimientos',
  templateUrl: './reconocimientos.component.html'
})
export class ReconocimientosComponent implements OnInit {
  reconocimientoForm: FormGroup;
  legajo?: VLegajo;
  tipoMeritoSeleccionado: boolean = false;
  meritoSeleccionado: number | null = null;
  archivoId: number | null = null;
  
  // Propiedades para la tabla y modos
  dataSource: VReconocimiento[] = [];
  modoVisualizacion = false;
  modoEdicion = false;
  registroSeleccionado?: VReconocimiento;

  // Agregamos las propiedades para los selectores
  tiposDocumento: TipoDocumento[] = [];
  tiposMerito: ReconocimientoTipoMerito[] = [];
  meritos: ReconocimientoMerito[] = [];

  constructor(
    private fb: FormBuilder,
    private reconocimientoService: ReconocimientoService,
    private vReconocimientoService: VReconocimientoService,
    private legajoState: LegajoStateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private tipoDocumentoService: TipoDocumentoService,
    private reconocimientoTipoMeritoService: ReconocimientoTipoMeritoService,
    private reconocimientoMeritoService: ReconocimientoMeritoService
  ) {
    this.reconocimientoForm = this.fb.group({
      iLegId: ['', Validators.required],
      iTipoDocId: ['', Validators.required],
      cRecoNumeroDocumento: ['', Validators.required],
      dtRecoFechaDocumento: ['', Validators.required],
      iArchId: [null, Validators.required],
      iRecoTipMerId: ['', Validators.required],
      iRecoMerId: ['', Validators.required],
      cRecoEntidadEmisora: ['', Validators.required],
      cRecoAnotaciones: [''],
      dtRecoFechaInicio: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
      if (this.legajo?.iLegId) {
        this.reconocimientoForm.patchValue({ iLegId: this.legajo.iLegId });
        this.cargarReconocimientos();
      }
    });

    this.cargarTiposDocumento();
    this.cargarTiposMerito();
  }

  cargarReconocimientos(): void {
    if (!this.legajo?.iLegId) return;
    
    this.vReconocimientoService.getAll({
      campo: 'iLegId',
      valor: this.legajo.iLegId.toString()
    }).subscribe({
      next: (reconocimientos) => {
        this.dataSource = reconocimientos;
      },
      error: (error) => {
        this.snackBar.open('Error al cargar reconocimientos', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  editarRegistro(row: VReconocimiento): void {
    const registroAEditar = this.modoVisualizacion ? this.registroSeleccionado : row;
    
    if (!registroAEditar) return;

    this.modoEdicion = true;
    this.modoVisualizacion = false;
    this.registroSeleccionado = registroAEditar;
    
    this.reconocimientoForm.enable();
    
    if (!this.modoVisualizacion) {
      this.archivoId = registroAEditar.iArchId || null;
      
      this.reconocimientoForm.patchValue({
        iTipoDocId: registroAEditar.iTipoDocId,
        cRecoNumeroDocumento: registroAEditar.cRecoNumeroDocumento,
        dtRecoFechaDocumento: registroAEditar.dtRecoFechaDocumento,
        iArchId: registroAEditar.iArchId,
        iRecoTipMerId: registroAEditar.iRecoTipMerId,
        iRecoMerId: registroAEditar.iRecoMerId,
        cRecoEntidadEmisora: registroAEditar.cRecoEntidadEmisora,
        cRecoAnotaciones: registroAEditar.cRecoAnotaciones,
        dtRecoFechaInicio: registroAEditar.dtRecoFechaInicio
      });
      
      if (registroAEditar.iRecoTipMerId) {
        this.tipoMeritoSeleccionado = true;
        this.cargarMeritos(registroAEditar.iRecoTipMerId);
      }
    }
  }

  verRegistro(row: VReconocimiento): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = row;
    
    this.archivoId = row.iArchId || null;
    
    this.reconocimientoForm.patchValue({
      iTipoDocId: row.iTipoDocId,
      cRecoNumeroDocumento: row.cRecoNumeroDocumento,
      dtRecoFechaDocumento: row.dtRecoFechaDocumento,
      iArchId: row.iArchId,
      iRecoTipMerId: row.iRecoTipMerId,
      iRecoMerId: row.iRecoMerId,
      cRecoEntidadEmisora: row.cRecoEntidadEmisora,
      cRecoAnotaciones: row.cRecoAnotaciones,
      dtRecoFechaInicio: row.dtRecoFechaInicio
    });
    
    this.reconocimientoForm.disable();
  }

  eliminarRegistro(row: VReconocimiento): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && row.iRecoId) {
        this.reconocimientoService.delete(row.iRecoId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarReconocimientos();
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

  guardar(): void {
    if (this.reconocimientoForm.invalid) {
      Object.keys(this.reconocimientoForm.controls).forEach(key => {
        const control = this.reconocimientoForm.get(key);
        if (control?.errors) {
          control.markAsTouched();
        }
      });

      if (this.reconocimientoForm.get('iArchId')?.errors?.['required']) {
        this.snackBar.open('Debe seleccionar un archivo', 'Cerrar', {
          duration: 3000
        });
      }
      return;
    }

    if (!this.legajo?.iLegId) {
      this.snackBar.open('Error: No se ha seleccionado un legajo', 'Cerrar', {
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
        const reconocimiento: Reconocimiento = {
          ...this.reconocimientoForm.value,
          iLegId: this.legajo!.iLegId
        };

        if (this.modoEdicion && this.registroSeleccionado?.iRecoId) {
          this.reconocimientoService.update(this.registroSeleccionado.iRecoId, reconocimiento).subscribe({
            next: () => {
              this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.limpiarFormulario();
              this.cargarReconocimientos();
            },
            error: (error) => {
              this.snackBar.open('Error al actualizar el registro', 'Cerrar', {
                duration: 3000
              });
            }
          });
        } else {
          this.reconocimientoService.create(reconocimiento).subscribe({
            next: () => {
              this.snackBar.open('Registro guardado exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.limpiarFormulario();
              this.cargarReconocimientos();
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

  limpiarFormulario(): void {
    this.reconocimientoForm.reset();
    
    Object.keys(this.reconocimientoForm.controls).forEach(key => {
      const control = this.reconocimientoForm.get(key);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
    
    this.reconocimientoForm.enable();
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;
    this.tipoMeritoSeleccionado = false;
    this.meritoSeleccionado = null;
    this.archivoId = null;
    
    if (this.legajo?.iLegId) {
      this.reconocimientoForm.patchValue({
        iLegId: this.legajo.iLegId,
        dtRecoFechaInicio: new Date()
      });
    }
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposDocumento = tipos;
      },
      error: (error) => {
        this.snackBar.open('Error al cargar tipos de documento', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  private cargarTiposMerito(): void {
    this.reconocimientoTipoMeritoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposMerito = tipos;
      },
      error: (error) => {
        this.snackBar.open('Error al cargar tipos de mérito', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  private cargarMeritos(tipoMeritoId: number): void {
    this.reconocimientoMeritoService.getAll({
      campo: 'iRecoTipMerId',
      valor: tipoMeritoId.toString()
    }).subscribe({
      next: (meritos) => {
        this.meritos = meritos;
      },
      error: (error) => {
        this.snackBar.open('Error al cargar méritos', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  onArchivoSeleccionado(archivo: Archivo): void {
    if (archivo && archivo.iArchId) {
      this.reconocimientoForm.patchValue({
        iArchId: archivo.iArchId
      });
      this.archivoId = archivo.iArchId;
    } else {
      this.reconocimientoForm.patchValue({
        iArchId: null
      });
      this.archivoId = null;
    }

  }

  onTipoMeritoChange(value: any): void {
    this.tipoMeritoSeleccionado = !!value;
    if (!value) {
      this.reconocimientoForm.get('iRecoMerId')?.setValue(null);
      this.meritos = [];
    } else {
      this.cargarMeritos(value);
    }
  }
} 