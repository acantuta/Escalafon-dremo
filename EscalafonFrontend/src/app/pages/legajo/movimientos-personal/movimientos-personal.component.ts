import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { TipoDocumento } from '../../../interfaces/tipo-documento';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { RegimenLaboral } from '../../../interfaces/regimen-laboral';
import { RegimenLaboralService } from '../../../services/regimen-laboral.service';
import { MovimientoAccion } from '../../../interfaces/movimiento-accion';
import { MovimientoAccionService } from '../../../services/movimiento-accion.service';
import { VMovimientoAccionMotivoRegimen } from '../../../interfaces/v-movimiento-accion-motivo-regimen';
import { VMovimientoAccionMotivoRegimenService } from '../../../services/v-movimiento-accion-motivo-regimen.service';
import { VacacionLicenciaService } from '../../../services/vacacion-licencia.service';
import { Archivo } from '../../../interfaces/archivo';
import { VVacacionLicencia } from '../../../interfaces/v-vacacion-licencia';
import { VVacacionLicenciaService } from '../../../services/v-vacacion-licencia.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VMovimientoPersonal } from '../../../interfaces/v-movimiento-personal';
import { GetAllFilterParams } from '../../../core/interfaces/get-all-filter-params';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { VMovimientoPersonalService } from '../../../services/v-movimiento-personal.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-movimientos-personal',
  templateUrl: './movimientos-personal.component.html'
})
export class MovimientosPersonalComponent implements OnInit, AfterViewInit {
  legajo?: VLegajo;
  tiposDocumento: TipoDocumento[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  movimientosAccion: MovimientoAccion[] = [];
  motivosAccion: VMovimientoAccionMotivoRegimen[] = [];
  selectedRegimenId?: number;
  selectedAccionId?: number;
  vacacionForm: FormGroup = this.initForm();
  displayedColumns: string[] = ['numero', 'accion', 'motivo', 'REGIMEN', 'fInicio', 'fFin', 'documento', 'acciones'];
  pageSize: number = 10;
  currentPage: number = 0;
  totalRecords: number = 0;
  dataSource = new MatTableDataSource<VMovimientoPersonal>();
  modoEdicion = false;
  modoVisualizacion = false;
  registroSeleccionado?: VMovimientoPersonal;
  camposHabilitados = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  totalRegistros = 0;
  tamanioPagina = 10;
  paginaActual = 0;

  accionesFiltradas: MovimientoAccion[] = [];
  motivosFiltrados: VMovimientoAccionMotivoRegimen[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private legajoState: LegajoStateService,
    private tipoDocumentoService: TipoDocumentoService,
    private regimenLaboralService: RegimenLaboralService,
    private movimientoAccionService: MovimientoAccionService,
    private vMovimientoAccionMotivoRegimenService: VMovimientoAccionMotivoRegimenService,
    private vacacionLicenciaService: VacacionLicenciaService,
    private fb: FormBuilder,
    private vVacacionLicenciaService: VVacacionLicenciaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private vMovimientoPersonalService: VMovimientoPersonalService
  ) {}

  private initForm(): FormGroup {
    return this.fb.group({
      iTipoDocId: [null, [Validators.required]],
      cVacLicNumeroDocumento: ['', [Validators.required]],
      dtVacLicFechaDocumento: [null, [Validators.required]],
      iArchId: [null, [Validators.required]],
      iRegLabId: [null, [Validators.required]],
      iMovAccId: [{ value: null, disabled: true }, [Validators.required]],
      iMovMotId: [{ value: null, disabled: true }, [Validators.required]],
      dtVacLicFechaInicio: [null, [Validators.required]],
      dtVacLicFechaFin: [null, [Validators.required]],
      cantidadDias: [{ value: null, disabled: true }],
      cVacLicAnotaciones: ['']
    });
  }

  private cargarDatosIniciales(): void {
    // Cargar tipos de documento
    this.tipoDocumentoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposDocumento = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de documento:', error);
        this.snackBar.open('Error al cargar tipos de documento', 'Cerrar', {
          duration: 3000
        });
      }
    });

    // Cargar regímenes laborales
    this.regimenLaboralService.getAll().subscribe({
      next: (regimenes) => {
        this.regimenesLaborales = regimenes;
      },
      error: (error) => {
        console.error('Error al cargar regímenes laborales:', error);
        this.snackBar.open('Error al cargar regímenes laborales', 'Cerrar', {
          duration: 3000
        });
      }
    });

    // Cargar acciones de movimiento
    this.movimientoAccionService.getAll().subscribe({
      next: (acciones) => {
        this.movimientosAccion = acciones;
      },
      error: (error) => {
        console.error('Error al cargar acciones:', error);
        this.snackBar.open('Error al cargar acciones', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
      if (this.legajo) {
        this.cargarDatos();
      }
    });
    this.cargarDatosIniciales();
    this.setupFormSubscriptions();
  }

  onPageChange(event: any): void {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.cargarDatos();
  }

  onRegimenChange(regimenId: any): void {
    // Asegurarnos de que regimenId sea un número
    const regLabId = typeof regimenId === 'object' ? regimenId.value : regimenId;
    
    this.selectedRegimenId = regLabId;
    
    // Guardar los valores actuales
    const currentAccionId = this.vacacionForm.get('iMovAccId')?.value;
    const currentMotivoId = this.vacacionForm.get('iMovMotId')?.value;
    
    const accionControl = this.vacacionForm.get('iMovAccId');
    const motivoControl = this.vacacionForm.get('iMovMotId');
    
    // Solo limpiar si no estamos en modo edición o es un cambio de régimen
    if (!this.modoEdicion || this.selectedRegimenId !== regLabId) {
        accionControl?.disable();
        motivoControl?.disable();
        this.vacacionForm.patchValue({
            iMovAccId: null,
            iMovMotId: null
        });
    }

    // Limpiar las listas
    this.movimientosAccion = [];
    this.motivosAccion = [];
    
    if (regLabId) {
        this.movimientoAccionService.getAll({ 
            campo: 'iRegLabId',
            valor: regLabId.toString()
        }).subscribe({
            next: (acciones) => {
                this.movimientosAccion = acciones;
                accionControl?.enable();
                
                // Restaurar valores si estamos en modo edición
                if (currentAccionId) {
                    this.vacacionForm.patchValue({
                        iMovAccId: currentAccionId
                    });
                    
                    // Cargar y restaurar motivos
                    this.vMovimientoAccionMotivoRegimenService.getAll({ 
                        campo: 'iMovAccId',
                        valor: currentAccionId.toString()
                    }).subscribe({
                        next: (motivos) => {
                            this.motivosAccion = motivos;
                            motivoControl?.enable();
                            if (currentMotivoId) {
                                this.vacacionForm.patchValue({
                                    iMovMotId: currentMotivoId
                                });
                            }
                        }
                    });
                }
            },
            error: (error) => {
                console.error('Error al cargar acciones:', error);
                this.snackBar.open('Error al cargar acciones', 'Cerrar', {
                    duration: 3000
                });
            }
        });
    }
  }

  onAccionChange(accionId: any): void {
    this.selectedAccionId = accionId;
    
    // Guardar el motivo actual
    const currentMotivoId = this.vacacionForm.get('iMovMotId')?.value;
    
    const motivoControl = this.vacacionForm.get('iMovMotId');
    motivoControl?.disable();
    
    // Solo limpiar si no estamos en modo edición o es un cambio de acción
    if (!this.modoEdicion || this.selectedAccionId !== accionId) {
        this.vacacionForm.patchValue({
            iMovMotId: null
        });
    }
    
    if (accionId) {
        motivoControl?.enable();
        this.vMovimientoAccionMotivoRegimenService.getAll({ 
            campo: 'iMovAccId',
            valor: accionId.toString()
        }).subscribe({
            next: (motivos) => {
                this.motivosAccion = motivos;
                // Restaurar motivo si existe
                if (currentMotivoId) {
                    this.vacacionForm.patchValue({
                        iMovMotId: currentMotivoId
                    });
                }
            },
            error: (error) => {
                console.error('Error al cargar motivos:', error);
                this.snackBar.open('Error al cargar motivos', 'Cerrar', {
                    duration: 3000
                });
            }
        });
    }
  }

  onSubmit(): void {
    if (!this.legajo?.iLegId) {
      this.snackBar.open('Error: No se ha seleccionado un legajo', 'Cerrar', {
        duration: 3000
      });
      return;
    }


    // Validar campos requeridos
    const camposFaltantes: string[] = [];

    // Validar archivo
    const archivoId = this.vacacionForm.get('iArchId')?.value;
    if (!archivoId) {
      camposFaltantes.push('Archivo');
      this.vacacionForm.get('iArchId')?.setErrors({ 'required': true });
    }

    // Validar documento
    const tipoDocId = this.vacacionForm.get('iTipoDocId')?.value;
    const numeroDocumento = this.vacacionForm.get('cVacLicNumeroDocumento')?.value;
    if (!tipoDocId) {
      camposFaltantes.push('Tipo de documento');
      this.vacacionForm.get('iTipoDocId')?.setErrors({ 'required': true });
    }
    if (!numeroDocumento) {
      camposFaltantes.push('Número de documento');
      this.vacacionForm.get('cVacLicNumeroDocumento')?.setErrors({ 'required': true });
    }

    // Validar fechas
    const fechaDoc = this.vacacionForm.get('dtVacLicFechaDocumento')?.value;
    const fechaInicio = this.vacacionForm.get('dtVacLicFechaInicio')?.value;
    const fechaFin = this.vacacionForm.get('dtVacLicFechaFin')?.value;

    if (!fechaDoc) {
      camposFaltantes.push('Fecha de documento');
      this.vacacionForm.get('dtVacLicFechaDocumento')?.setErrors({ 'required': true });
    }
    if (!fechaInicio) {
      camposFaltantes.push('Fecha de inicio');
      this.vacacionForm.get('dtVacLicFechaInicio')?.setErrors({ 'required': true });
    }
    if (!fechaFin) {
      camposFaltantes.push('Fecha fin');
      this.vacacionForm.get('dtVacLicFechaFin')?.setErrors({ 'required': true });
    }

    // Validar acción y motivo
    const accionId = this.vacacionForm.get('iMovAccId')?.value;
    const motivoId = this.vacacionForm.get('iMovMotId')?.value;
    if (!accionId) {
      camposFaltantes.push('Acción');
      this.vacacionForm.get('iMovAccId')?.setErrors({ 'required': true });
    }
    if (!motivoId) {
      camposFaltantes.push('Motivo');
      this.vacacionForm.get('iMovMotId')?.setErrors({ 'required': true });
    }

    // Validar régimen laboral
    const regimenId = this.vacacionForm.get('iRegLabId')?.value;
    if (!regimenId) {
      camposFaltantes.push('Régimen laboral');
      this.vacacionForm.get('iRegLabId')?.setErrors({ 'required': true });
    }

    // Si hay campos faltantes, mostrar mensaje y detener el proceso
    if (camposFaltantes.length > 0) {
      this.snackBar.open(
        `Los siguientes campos son requeridos: ${camposFaltantes.join(', ')}`,
        'Cerrar',
        { duration: 5000 }
      );
      return;
    }

    // Validar que fecha inicio no sea mayor a fecha fin
    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
      this.snackBar.open('La fecha de inicio no puede ser posterior a la fecha fin', 'Cerrar', {
        duration: 3000
      });
      this.vacacionForm.get('dtVacLicFechaInicio')?.setErrors({ 'invalidDate': true });
      this.vacacionForm.get('dtVacLicFechaFin')?.setErrors({ 'invalidDate': true });
      return;
    }

    // Habilitar temporalmente los controles para obtener sus valores
    const accionControl = this.vacacionForm.get('iMovAccId');
    const motivoControl = this.vacacionForm.get('iMovMotId');

    const formData = {
      iLegId: this.legajo.iLegId,
      iTipoDocId: Number(tipoDocId),
      cVacLicNumeroDocumento: numeroDocumento,
      dtVacLicFechaDocumento: new Date(this.vacacionForm.get('dtVacLicFechaDocumento')?.value),
      iArchId: Number(archivoId),
      iRegLabId: Number(this.vacacionForm.get('iRegLabId')?.value),
      iMovAccId: Number(accionId),
      iMovMotId: Number(motivoId),
      dtVacLicFechaInicio: new Date(this.vacacionForm.get('dtVacLicFechaInicio')?.value),
      dtVacLicFechaFin: new Date(this.vacacionForm.get('dtVacLicFechaFin')?.value),
      cVacLicAnotaciones: this.vacacionForm.get('cVacLicAnotaciones')?.value || ''
    };

    // Validar fechas
    if (!formData.dtVacLicFechaDocumento || !formData.dtVacLicFechaInicio || !formData.dtVacLicFechaFin) {
      this.snackBar.open('Todas las fechas son requeridas', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    if (formData.dtVacLicFechaInicio > formData.dtVacLicFechaFin) {
      this.snackBar.open('La fecha de inicio no puede ser posterior a la fecha fin', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    console.log('Datos a enviar:', formData); // Para depuración

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
        if (this.modoEdicion && this.registroSeleccionado?.iVacLicId) {
          this.vacacionLicenciaService.update(this.registroSeleccionado.iVacLicId, formData)
            .subscribe({
              next: () => {
                this.snackBar.open('Registro actualizado correctamente', 'Cerrar', {
                  duration: 3000
                });
                this.cargarDatos();
              },
              error: (error) => {
                console.error('Error al actualizar:', error);
                let errorMessage = 'Error al actualizar el registro';
                if (error.error?.errores) {
                  const errores = Object.values(error.error.errores).flat();
                  errorMessage = errores.join('\n');
                } else if (error.error?.message) {
                  errorMessage = error.error.message;
                }
                this.snackBar.open(errorMessage, 'Cerrar', {
                  duration: 5000
                });
              }
            });
        } else {
          this.vacacionLicenciaService.create(formData)
            .subscribe({
              next: () => {
                this.snackBar.open('Registro creado correctamente', 'Cerrar', {
                  duration: 3000
                });
                this.cargarDatos();
              },
              error: (error) => {
                console.error('Error al crear:', error);
                let errorMessage = 'Error al crear el registro';
                if (error.error?.errores) {
                  const errores = Object.values(error.error.errores).flat();
                  errorMessage = errores.join('\n');
                } else if (error.error?.message) {
                  errorMessage = error.error.message;
                }
                this.snackBar.open(errorMessage, 'Cerrar', {
                  duration: 5000
                });
              }
            });
        }
      }
    });
  }

  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo) {
      this.vacacionForm.patchValue({
        iArchId: archivo.iArchId
      });
      const control = this.vacacionForm.get('iArchId');
      if (control) {
        control.markAsTouched();
        control.setErrors(null);
      }
    } else {
      this.vacacionForm.patchValue({
        iArchId: null
      });
      const control = this.vacacionForm.get('iArchId');
      if (control) {
        control.markAsTouched();
        control.setErrors({ 'required': true });
      }
    }
  }

  onArchivoIdSelected(archivoId: number | undefined): void {
    this.vacacionForm.patchValue({
      iArchId: archivoId || null
    });
    const control = this.vacacionForm.get('iArchId');
    if (control) {
      control.markAsTouched();
      if (!archivoId) {
        control.setErrors({ 'required': true });
      } else {
        control.setErrors(null);
      }
    }
  }

  onEdit(item: VVacacionLicencia): void {
    if (item.iRegLabId) {
      this.selectedRegimenId = item.iRegLabId;
      this.movimientoAccionService.getAll({ 
        campo: 'iRegLabId',
        valor: item.iRegLabId.toString()
      }).subscribe(acciones => {
        this.movimientosAccion = acciones;
        
        if (item.iMovAccId) {
          this.selectedAccionId = item.iMovAccId;
          this.vMovimientoAccionMotivoRegimenService.getAll({ 
            campo: 'iMovAccId',
            valor: item.iMovAccId.toString()
          }).subscribe(motivos => {
            this.motivosAccion = motivos;
            
            this.vacacionForm.patchValue({
              iTipoDocId: item.iTipoDocId,
              cVacLicNumeroDocumento: item.cVacLicNumeroDocumento,
              dtVacLicFechaDocumento: new Date(item.dtVacLicFechaDocumento!),
              iArchId: item.iArchId,
              iRegLabId: item.iRegLabId,
              iMovAccId: item.iMovAccId,
              iMovMotId: item.iMovMotId,
              dtVacLicFechaInicio: new Date(item.dtVacLicFechaInicio!),
              dtVacLicFechaFin: new Date(item.dtVacLicFechaFin!),
              cVacLicAnotaciones: item.cVacLicAnotaciones
            });
          });
        }
      });
    }
  }

  onDelete(item: VVacacionLicencia): void {
    if (!item.iVacLicId) {
      alert('No se puede eliminar un registro sin ID');
      return;
    }

    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.vacacionLicenciaService.delete(item.iVacLicId).subscribe({
        next: () => {
          this.cargarDatos();
          alert('Registro eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar el registro', error);
          alert('Error al eliminar el registro');
        }
      });
    }
  }

  verRegistro(row: VMovimientoPersonal): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = row;
    this.camposHabilitados = false;
    
    // Primero cargar el régimen laboral y sus dependencias
    if (row.iRegLabId) {
        this.selectedRegimenId = row.iRegLabId;
        this.movimientoAccionService.getAll({ 
            campo: 'iRegLabId',
            valor: row.iRegLabId.toString()
        }).subscribe(acciones => {
            this.movimientosAccion = acciones;
            
            // Luego cargar la acción y sus motivos
            if (row.iMovAccId) {
                this.selectedAccionId = row.iMovAccId;
                this.vMovimientoAccionMotivoRegimenService.getAll({ 
                    campo: 'iMovAccId',
                    valor: row.iMovAccId.toString()
                }).subscribe(motivos => {
                    this.motivosAccion = motivos;
                    
                    // Finalmente cargar todos los datos del formulario
                    this.vacacionForm.patchValue({
                        iTipoDocId: row.iTipoDocId,
                        cVacLicNumeroDocumento: row.cVacLicNumeroDocumento,
                        dtVacLicFechaDocumento: row.dtVacLicFechaDocumento,
                        iArchId: row.iArchId,
                        iRegLabId: row.iRegLabId,
                        iMovAccId: row.iMovAccId,
                        iMovMotId: row.iMovMotId,
                        dtVacLicFechaInicio: row.dtVacLicFechaInicio,
                        dtVacLicFechaFin: row.dtVacLicFechaFin,
                        cVacLicAnotaciones: row.cVacLicAnotaciones
                    });

                    // Deshabilitar todos los controles del formulario
                    Object.keys(this.vacacionForm.controls).forEach(key => {
                        const control = this.vacacionForm.get(key);
                        if (control) {
                            control.disable();
                        }
                    });

                    // Asegurarnos que acción y motivo estén deshabilitados
                    const accionControl = this.vacacionForm.get('iMovAccId');
                    const motivoControl = this.vacacionForm.get('iMovMotId');
                    if (accionControl) accionControl.disable();
                    if (motivoControl) motivoControl.disable();
                });
            }
        });
    }
    this.calcularDias();
  }

  editarRegistro(movimiento: VMovimientoPersonal) {
    this.registroSeleccionado = movimiento;
    this.modoEdicion = true;
    this.modoVisualizacion = false;
    this.camposHabilitados = true;
    
    // Habilitar el formulario
    this.vacacionForm.enable();
    
    // Establecer el régimen laboral primero
    if (movimiento.iRegLabId) {
      this.selectedRegimenId = movimiento.iRegLabId;
      this.movimientoAccionService.getAll({ 
        campo: 'iRegLabId',
        valor: movimiento.iRegLabId.toString()
      }).subscribe(acciones => {
        this.movimientosAccion = acciones;
        
        // Luego establecer la acción
        if (movimiento.iMovAccId) {
          this.selectedAccionId = movimiento.iMovAccId;
          this.vMovimientoAccionMotivoRegimenService.getAll({ 
            campo: 'iMovAccId',
            valor: movimiento.iMovAccId.toString()
          }).subscribe(motivos => {
            this.motivosAccion = motivos;
            
            // Finalmente cargar todos los datos del formulario
            this.vacacionForm.patchValue({
              iTipoDocId: movimiento.iTipoDocId,
              cVacLicNumeroDocumento: movimiento.cVacLicNumeroDocumento,
              dtVacLicFechaDocumento: movimiento.dtVacLicFechaDocumento,
              iArchId: movimiento.iArchId,
              iRegLabId: movimiento.iRegLabId,
              iMovAccId: movimiento.iMovAccId,
              iMovMotId: movimiento.iMovMotId,
              dtVacLicFechaInicio: movimiento.dtVacLicFechaInicio,
              dtVacLicFechaFin: movimiento.dtVacLicFechaFin,
              cVacLicAnotaciones: movimiento.cVacLicAnotaciones
            });
          });
        }
      });
    }
    this.calcularDias();
  }

  eliminarRegistro(row: VMovimientoPersonal): void {
    const vacLicId = row.iVacLicId;
    if (!vacLicId) {
      this.snackBar.open('No se puede eliminar un registro sin ID', 'Cerrar', {
        duration: 3000
      });
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
        this.vacacionLicenciaService.delete(vacLicId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', {
              duration: 3000
            });
            
            if (this.registroSeleccionado?.iVacLicId === vacLicId) {
              this.limpiar();
            }
            
            this.cargarDatos();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            let errorMessage = 'Error al eliminar el registro';
            if (error.error?.message) {
              errorMessage += `: ${error.error.message}`;
            }
            this.snackBar.open(errorMessage, 'Cerrar', {
              duration: 5000
            });
          }
        });
      }
    });
  }

  limpiar(): void {
    this.camposHabilitados = true;
    this.modoEdicion = false;
    this.modoVisualizacion = false;
    this.registroSeleccionado = undefined;
    this.selectedRegimenId = undefined;
    this.selectedAccionId = undefined;
    
    // Limpiar las listas filtradas
    this.movimientosAccion = [];
    this.motivosAccion = [];

    // Habilitar y limpiar el formulario
    this.vacacionForm.enable();
    this.vacacionForm.reset();

    // Recargar datos iniciales
    this.cargarDatosIniciales();

    // Desmarcar todos los campos como touched
    Object.keys(this.vacacionForm.controls).forEach(key => {
      const control = this.vacacionForm.get(key);
      if (control) {
        control.markAsUntouched();
        control.markAsPristine();
        control.setErrors(null);
      }
    });
  }

  cargarDatos(): void {
    if (this.legajo?.iLegId) {
      const params: GetAllFilterParams = {
        campo: 'iLegId',
        valor: this.legajo.iLegId.toString()
      };

      this.vVacacionLicenciaService.getAll(params).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.totalRegistros = data.length;
        },
        error: (error) => {
          console.error('Error al cargar movimientos:', error);
          this.snackBar.open('Error al cargar los registros', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  validarCampo(campo: string): boolean {
    const control = this.vacacionForm.get(campo);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  private setupFormSubscriptions(): void {
    // Suscripción a cambios en régimen laboral
    this.vacacionForm.get('iRegLabId')?.valueChanges.subscribe(regimenId => {
      if (regimenId) {
        this.onRegimenChange(regimenId);
      }
    });

    // Suscripción a cambios en acción
    this.vacacionForm.get('iMovAccId')?.valueChanges.subscribe(accionId => {
      if (accionId) {
        this.onAccionChange(accionId);
      }
    });

    // Suscripción para calcular días
    merge(
      this.vacacionForm.get('dtVacLicFechaInicio')!.valueChanges,
      this.vacacionForm.get('dtVacLicFechaFin')!.valueChanges
    ).subscribe(() => {
      this.calcularDias();
    });
  }

  guardarRegistro(): void {
    if (!this.legajo?.iLegId) {
      this.snackBar.open('Error: No se ha seleccionado un legajo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    // Marcar todos los campos como touched para mostrar errores visuales
    Object.keys(this.vacacionForm.controls).forEach(key => {
      const control = this.vacacionForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });

    // Validar archivo primero
    const archivoId = this.vacacionForm.get('iArchId')?.value;
    if (!archivoId) {
      this.snackBar.open('Debe seleccionar un archivo', 'Cerrar', {
        duration: 3000
      });
      this.vacacionForm.get('iArchId')?.markAsTouched();
      this.vacacionForm.get('iArchId')?.setErrors({ 'required': true });
      return;
    }

    // Resto de validaciones
    const camposFaltantes: string[] = [];

    // Validar documento
    const tipoDocId = this.vacacionForm.get('iTipoDocId')?.value;
    const numeroDocumento = this.vacacionForm.get('cVacLicNumeroDocumento')?.value;
    if (!tipoDocId) {
      camposFaltantes.push('Tipo de documento');
      this.vacacionForm.get('iTipoDocId')?.markAsTouched();
      this.vacacionForm.get('iTipoDocId')?.setErrors({ 'required': true });
    }
    if (!numeroDocumento) {
      camposFaltantes.push('Número de documento');
      this.vacacionForm.get('cVacLicNumeroDocumento')?.markAsTouched();
      this.vacacionForm.get('cVacLicNumeroDocumento')?.setErrors({ 'required': true });
    }

    // Validar fechas
    const fechaDoc = this.vacacionForm.get('dtVacLicFechaDocumento')?.value;
    const fechaInicio = this.vacacionForm.get('dtVacLicFechaInicio')?.value;
    const fechaFin = this.vacacionForm.get('dtVacLicFechaFin')?.value;

    if (!fechaDoc) {
      camposFaltantes.push('Fecha de documento');
      this.vacacionForm.get('dtVacLicFechaDocumento')?.markAsTouched();
      this.vacacionForm.get('dtVacLicFechaDocumento')?.setErrors({ 'required': true });
    }
    if (!fechaInicio) {
      camposFaltantes.push('Fecha de inicio');
      this.vacacionForm.get('dtVacLicFechaInicio')?.markAsTouched();
      this.vacacionForm.get('dtVacLicFechaInicio')?.setErrors({ 'required': true });
    }
    if (!fechaFin) {
      camposFaltantes.push('Fecha fin');
      this.vacacionForm.get('dtVacLicFechaFin')?.markAsTouched();
      this.vacacionForm.get('dtVacLicFechaFin')?.setErrors({ 'required': true });
    }

    // Validar acción y motivo
    const accionId = this.vacacionForm.get('iMovAccId')?.value;
    const motivoId = this.vacacionForm.get('iMovMotId')?.value;
    if (!accionId) {
      camposFaltantes.push('Acción');
      this.vacacionForm.get('iMovAccId')?.markAsTouched();
      this.vacacionForm.get('iMovAccId')?.setErrors({ 'required': true });
    }
    if (!motivoId) {
      camposFaltantes.push('Motivo');
      this.vacacionForm.get('iMovMotId')?.markAsTouched();
      this.vacacionForm.get('iMovMotId')?.setErrors({ 'required': true });
    }

    // Validar régimen laboral
    const regimenId = this.vacacionForm.get('iRegLabId')?.value;
    if (!regimenId) {
      camposFaltantes.push('Régimen laboral');
      this.vacacionForm.get('iRegLabId')?.markAsTouched();
      this.vacacionForm.get('iRegLabId')?.setErrors({ 'required': true });
    }

    // Si hay campos faltantes, mostrar mensaje y detener el proceso
    if (camposFaltantes.length > 0) {
      this.snackBar.open(
        `Los siguientes campos son requeridos: ${camposFaltantes.join(', ')}`,
        'Cerrar',
        { duration: 5000 }
      );
      return;
    }

    // Validar que fecha inicio no sea mayor a fecha fin
    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
      this.snackBar.open('La fecha de inicio no puede ser posterior a la fecha fin', 'Cerrar', {
        duration: 3000
      });
      this.vacacionForm.get('dtVacLicFechaInicio')?.markAsTouched();
      this.vacacionForm.get('dtVacLicFechaFin')?.markAsTouched();
      this.vacacionForm.get('dtVacLicFechaInicio')?.setErrors({ 'invalidDate': true });
      this.vacacionForm.get('dtVacLicFechaFin')?.setErrors({ 'invalidDate': true });
      return;
    }

    // Modificar el formData para asegurar que el archivoId esté presente
    const formData = {
      iLegId: this.legajo.iLegId,
      iArchId: Number(archivoId), // Asegurar que el archivo esté presente
      iTipoDocId: Number(tipoDocId),
      cVacLicNumeroDocumento: numeroDocumento,
      dtVacLicFechaDocumento: new Date(this.vacacionForm.get('dtVacLicFechaDocumento')?.value),
      iRegLabId: Number(this.vacacionForm.get('iRegLabId')?.value),
      iMovAccId: Number(accionId),
      iMovMotId: Number(motivoId),
      dtVacLicFechaInicio: new Date(this.vacacionForm.get('dtVacLicFechaInicio')?.value),
      dtVacLicFechaFin: new Date(this.vacacionForm.get('dtVacLicFechaFin')?.value),
      cVacLicAnotaciones: this.vacacionForm.get('cVacLicAnotaciones')?.value || ''
    };

    // Validación final del archivo antes de enviar
    if (!formData.iArchId) {
      this.snackBar.open('Error: No se puede guardar sin un archivo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    // Validación final del formulario
    if (!formData.iTipoDocId || !formData.cVacLicNumeroDocumento || !formData.dtVacLicFechaDocumento || !formData.iRegLabId || !formData.iMovAccId || !formData.iMovMotId || !formData.dtVacLicFechaInicio || !formData.dtVacLicFechaFin) {
      this.snackBar.open('Todos los campos son requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    if (formData.dtVacLicFechaInicio > formData.dtVacLicFechaFin) {
      this.snackBar.open('La fecha de inicio no puede ser posterior a la fecha fin', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    console.log('Datos a enviar:', formData); // Para depuración

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
        if (this.modoEdicion && this.registroSeleccionado?.iVacLicId) {
          this.vacacionLicenciaService.update(this.registroSeleccionado.iVacLicId, formData)
            .subscribe({
              next: () => {
                this.snackBar.open('Registro actualizado correctamente', 'Cerrar', {
                  duration: 3000
                });
                this.cargarDatos();
              },
              error: (error) => {
                console.error('Error al actualizar:', error);
                let errorMessage = 'Error al actualizar el registro';
                if (error.error?.errores) {
                  const errores = Object.values(error.error.errores).flat();
                  errorMessage = errores.join('\n');
                } else if (error.error?.message) {
                  errorMessage = error.error.message;
                }
                this.snackBar.open(errorMessage, 'Cerrar', {
                  duration: 5000
                });
              }
            });
        } else {
          this.vacacionLicenciaService.create(formData)
            .subscribe({
              next: () => {
                this.snackBar.open('Registro creado correctamente', 'Cerrar', {
                  duration: 3000
                });
                this.cargarDatos();
              },
              error: (error) => {
                console.error('Error al crear:', error);
                let errorMessage = 'Error al crear el registro';
                if (error.error?.errores) {
                  const errores = Object.values(error.error.errores).flat();
                  errorMessage = errores.join('\n');
                } else if (error.error?.message) {
                  errorMessage = error.error.message;
                }
                this.snackBar.open(errorMessage, 'Cerrar', {
                  duration: 5000
                });
              }
            });
        }
      }
    });
  }

  private calcularDias(): void {
    const fechaInicio = this.vacacionForm.get('dtVacLicFechaInicio')?.value;
    const fechaFin = this.vacacionForm.get('dtVacLicFechaFin')?.value;

    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      
      // Calcular la diferencia en días (incluyendo el día inicial y final)
      const diferencia = Math.floor((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      this.vacacionForm.patchValue({
        cantidadDias: diferencia > 0 ? diferencia : 0
      }, { emitEvent: false });
    } else {
      this.vacacionForm.patchValue({
        cantidadDias: null
      }, { emitEvent: false });
    }
  }
}
