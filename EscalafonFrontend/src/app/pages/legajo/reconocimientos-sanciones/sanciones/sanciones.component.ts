import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { TipoSancion } from 'src/app/interfaces/tipo-sancion';
import { TipoSancionService } from 'src/app/services/tipo-sancion.service';
import { SancionService } from 'src/app/services/sancion.service';
import { Sancion } from 'src/app/interfaces/sancion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Archivo } from 'src/app/interfaces/archivo';
import { VSancionService } from 'src/app/services/v-sancion.service';
import { VSancion } from 'src/app/interfaces/v-sancion';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { VLegajo } from '../../../../interfaces/v-legajo';

@Component({
  selector: 'app-sanciones',
  templateUrl: './sanciones.component.html',
  styleUrls: ['./sanciones.component.css']
})
export class SancionesComponent implements OnInit {
  tiposDocumento: TipoDocumento[] = [];
  tiposSancion: TipoSancion[] = [];
  tipoSancionSeleccionado: number | null = null;
  sancionForm: FormGroup;
  sanciones: VSancion[] = [];
  totalRegistros = 0;
  tamanioPagina = 10;
  paginaActual = 0;
  sancionesFiltradas: VSancion[] = [];
  modoVisualizacion = false;
  modoEdicion = false;
  registroSeleccionado?: VSancion;
  legajo?: VLegajo;

  constructor(
    private fb: FormBuilder,
    private tipoDocumentoService: TipoDocumentoService,
    private tipoSancionService: TipoSancionService,
    private sancionService: SancionService,
    private snackBar: MatSnackBar,
    private vSancionService: VSancionService,
    private dialog: MatDialog,
    private legajoState: LegajoStateService
  ) {
    this.sancionForm = this.fb.group({
      iTipoDocId: [''],
      cSancNumeroDocumento: [''],
      dtSancFechaDocumento: [''],
      cSancInstitucionEmiteDocumento: [''],
      iArchId: [null],
      iTipSancId: [''],
      cSancCausaMotivo: [''],
      dtSancFechaNotificacion: [''],
      dtSancFechaInicio: [''],
      dtSancFechaFin: [''],
      cSancAnotaciones: ['']
    });
  }

  ngOnInit(): void {
    this.legajoState.legajo$.subscribe(legajo => {
      if (legajo) {
        this.legajo = legajo;
        const currentValues = this.sancionForm.getRawValue();
        this.sancionForm.patchValue({
          ...currentValues,
          iLegId: legajo.iLegId
        });
        this.cargarSanciones();
      }
    });

    this.cargarTiposDocumento();
    this.cargarTiposSancion();
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe(tipos => {
      this.tiposDocumento = tipos;
    });
  }

  private cargarTiposSancion(): void {
    this.tipoSancionService.getAll().subscribe(tipos => {
      this.tiposSancion = tipos;
    });
  }

  cargarSanciones(): void {
    if (!this.legajo?.iLegId) return;

    this.vSancionService.getAll({
      campo: 'iLegId',
      valor: this.legajo.iLegId.toString()
    }).subscribe({
      next: (sanciones) => {
        this.sanciones = sanciones;
        this.totalRegistros = sanciones.length;
        this.actualizarDatosPaginados();
      },
      error: (error) => {
        console.error('Error al cargar sanciones:', error);
        this.snackBar.open('Error al cargar las sanciones', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  actualizarDatosPaginados(): void {
    const inicio = this.paginaActual * this.tamanioPagina;
    const fin = inicio + this.tamanioPagina;
    this.sancionesFiltradas = this.sanciones.slice(inicio, fin);
  }

  cambiarPagina(evento: PageEvent): void {
    this.paginaActual = evento.pageIndex;
    this.tamanioPagina = evento.pageSize;
    this.actualizarDatosPaginados();
  }

  onArchivoSeleccionado(archivo: Archivo): void {
    if (archivo) {
      this.sancionForm.patchValue({
        iArchId: archivo.iArchId
      });
      this.sancionForm.get('iArchId')?.markAsTouched();
    } else {
      this.sancionForm.patchValue({
        iArchId: null
      });
    }
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toISOString();
  }

  editarRegistro(row: VSancion): void {
    const registroAEditar = this.modoVisualizacion ? this.registroSeleccionado : row;
    
    if (!registroAEditar) return;

    this.modoEdicion = true;
    this.modoVisualizacion = false;
    this.registroSeleccionado = registroAEditar;
    
    this.sancionForm.enable();
    
    if (!this.modoVisualizacion) {
      this.agregarValidadores();
      
      this.sancionForm.patchValue({
        iTipoDocId: registroAEditar.iTipoDocId,
        cSancNumeroDocumento: registroAEditar.cSancNumeroDocumento,
        dtSancFechaDocumento: registroAEditar.dtSancFechaDocumento,
        cSancInstitucionEmiteDocumento: registroAEditar.cSancInstitucionEmiteDocumento,
        iArchId: registroAEditar.iArchId,
        iTipSancId: registroAEditar.iTipSancId,
        cSancCausaMotivo: registroAEditar.cSancCausaMotivo,
        dtSancFechaNotificacion: registroAEditar.dtSancFechaNotificacion,
        dtSancFechaInicio: registroAEditar.dtSancFechaInicio,
        dtSancFechaFin: registroAEditar.dtSancFechaFin,
        cSancAnotaciones: registroAEditar.cSancAnotaciones
      });
    }
  }

  verRegistro(row: VSancion): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = row;
    
    this.sancionForm.patchValue({
      iTipoDocId: row.iTipoDocId,
      cSancNumeroDocumento: row.cSancNumeroDocumento,
      dtSancFechaDocumento: row.dtSancFechaDocumento,
      cSancInstitucionEmiteDocumento: row.cSancInstitucionEmiteDocumento,
      iArchId: row.iArchId,
      iTipSancId: row.iTipSancId,
      cSancCausaMotivo: row.cSancCausaMotivo,
      dtSancFechaNotificacion: row.dtSancFechaNotificacion,
      dtSancFechaInicio: row.dtSancFechaInicio,
      dtSancFechaFin: row.dtSancFechaFin,
      cSancAnotaciones: row.cSancAnotaciones
    });
    
    this.sancionForm.disable();
  }

  eliminarRegistro(row: VSancion): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && row.iSancId) {
        this.sancionService.delete(row.iSancId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarSanciones();
          },
          error: () => {
            this.snackBar.open('Error al eliminar el registro', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  guardarSancion(): void {
    if (!this.legajo?.iLegId) {
      this.snackBar.open('Error: No se ha seleccionado un legajo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.agregarValidadores();

    if (this.sancionForm.invalid) {
      // Marcar todos los campos como tocados para mostrar los errores
      Object.keys(this.sancionForm.controls).forEach(key => {
        const control = this.sancionForm.get(key);
        if (control?.errors) {
          control.markAsTouched();
        }
      });

      // Mostrar mensaje específico si falta el archivo
      if (this.sancionForm.get('iArchId')?.errors?.['required']) {
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
        const sancionData: Sancion = {
          ...this.sancionForm.getRawValue(),
          iLegId: this.legajo!.iLegId,
          dtSancFechaDocumento: this.formatDate(this.sancionForm.get('dtSancFechaDocumento')?.value),
          dtSancFechaNotificacion: this.formatDate(this.sancionForm.get('dtSancFechaNotificacion')?.value),
          dtSancFechaInicio: this.formatDate(this.sancionForm.get('dtSancFechaInicio')?.value),
          dtSancFechaFin: this.formatDate(this.sancionForm.get('dtSancFechaFin')?.value)
        };

        if (this.modoEdicion && this.registroSeleccionado?.iSancId) {
          this.sancionService.update(this.registroSeleccionado.iSancId, sancionData).subscribe({
            next: () => {
              this.snackBar.open('Sanción actualizada exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.limpiarCompleto();
            },
            error: (error) => {
              console.error('Error al actualizar la sanción:', error);
              this.snackBar.open('Error al actualizar la sanción', 'Cerrar', {
                duration: 3000
              });
            }
          });
        } else {
          this.sancionService.create(sancionData).subscribe({
            next: () => {
              this.snackBar.open('Sanción guardada exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.limpiarCompleto();
            },
            error: (error) => {
              console.error('Error al guardar la sanción:', error);
              this.snackBar.open('Error al guardar la sanción', 'Cerrar', {
                duration: 3000
              });
            }
          });
        }
      }
    });
  }

  limpiarCompleto(): void {
    const legajoId = this.legajo?.iLegId;
    this.quitarValidadores();
    
    this.sancionForm.reset({
      iLegId: this.legajo?.iLegId || '',
      iTipoDocId: '',
      cSancNumeroDocumento: '',
      dtSancFechaDocumento: '',
      cSancInstitucionEmiteDocumento: '',
      iArchId: null,
      iTipSancId: '',
      cSancCausaMotivo: '',
      dtSancFechaNotificacion: '',
      dtSancFechaInicio: '',
      dtSancFechaFin: '',
      cSancAnotaciones: ''
    });
    
    Object.keys(this.sancionForm.controls).forEach(key => {
      const control = this.sancionForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.updateValueAndValidity();
    });
    
    this.sancionForm.enable();
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;
    
    this.cargarSanciones();
  }

  limpiar(): void {
    const legajoId = this.legajo?.iLegId;
    this.quitarValidadores();
    
    this.sancionForm.reset({
      iLegId: this.legajo?.iLegId || '',
      iTipoDocId: '',
      cSancNumeroDocumento: '',
      dtSancFechaDocumento: '',
      cSancInstitucionEmiteDocumento: '',
      iArchId: null,
      iTipSancId: '',
      cSancCausaMotivo: '',
      dtSancFechaNotificacion: '',
      dtSancFechaInicio: '',
      dtSancFechaFin: '',
      cSancAnotaciones: ''
    });
    
    Object.keys(this.sancionForm.controls).forEach(key => {
      const control = this.sancionForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.updateValueAndValidity();
    });
    
    this.sancionForm.enable();
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;
  }

  private agregarValidadores(): void {
    Object.keys(this.sancionForm.controls).forEach(key => {
      const control = this.sancionForm.get(key);
      if (key !== 'cSancAnotaciones') {
        control?.setValidators(Validators.required);
        control?.updateValueAndValidity();
      }
    });
  }

  private quitarValidadores(): void {
    Object.keys(this.sancionForm.controls).forEach(key => {
      const control = this.sancionForm.get(key);
      control?.clearValidators();
      control?.updateValueAndValidity();
    });
  }
} 