import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { RegimenLaboralService } from 'src/app/services/regimen-laboral.service';
import { CeseAccionService } from 'src/app/services/cese-accion.service';
import { CeseMotivoAccionService } from 'src/app/services/cese-motivo-accion.service';
import { CeseService } from 'src/app/services/cese.service';
import { VCeseService } from 'src/app/services/v-cese.service';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { VCese } from '../../../../interfaces/v-cese';
import { Archivo } from '../../../../interfaces/archivo';
import { GetAllFilterParams } from '../../../../core/interfaces/get-all-filter-params';

@Component({
  selector: 'app-ceses',
  templateUrl: './ceses.component.html',
  styleUrls: ['./ceses.component.css']
})
export class CesesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['numero', 'accion', 'motivo', 'regimen', 'nroDocumento', 'fechaCese', 'acciones'];
  dataSource = new MatTableDataSource<VCese>([]);
  
  tiposDocumento: any[] = [];
  regimenesLaborales: any[] = [];
  cesacionesAcciones: any[] = [];
  motivosAccion: any[] = [];
  
  ceseForm!: FormGroup;
  iLegId?: number;
  
  modoEdicion:boolean = false;
  modoVisualizacion:boolean = false;
  registroSeleccionado?: VCese;
  camposHabilitados = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  totalRegistros = 0;
  tamanioPagina = 10;
  paginaActual = 0;

  constructor(
    private fb: FormBuilder,
    private legajoStateService: LegajoStateService,
    private tipoDocumentoService: TipoDocumentoService,
    private regimenLaboralService: RegimenLaboralService,
    private ceseAccionService: CeseAccionService,
    private ceseMotivoAccionService: CeseMotivoAccionService,
    private ceseService: CeseService,
    private vCeseService: VCeseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.ceseForm = this.fb.group({
      iTipoDocId: [null, Validators.required],
      cCesesNumeroDocumento: ['', Validators.required],
      dtCesesFechaDocumento: [null, Validators.required],
      iArchId: [null, Validators.required],
      iRegLabId: [null, Validators.required],
      iCesAccId: [null, Validators.required],
      iCesMotAccId: [null, Validators.required],
      dtCesesFechaCese: [null, Validators.required],
      iCesesServicioAnios: [0, [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+$/) // Solo números enteros positivos
      ]],
      iCesesServicioMeses: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(11),
        Validators.pattern(/^\d+$/) // Solo números enteros positivos
      ]],
      iCesesServicioDias: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
        Validators.pattern(/^\d+$/) // Solo números enteros positivos
      ]],
      cCesesAnotaciones: ['']
    });
  }

  ngOnInit(): void {
    this.legajoStateService.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        this.iLegId = legajo.iLegId;
        this.ceseForm.patchValue({
          iLegId: legajo.iLegId
        });
        this.cargarDatos();
      }
    });
    this.cargarDatosIniciales();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarDatosIniciales(): void {
    this.cargarTiposDocumento();
    this.cargarRegimenesLaborales();
    
    // Limpiar las listas
    this.cesacionesAcciones = [];
    this.motivosAccion = [];
    
    // Si hay un legajo activo, establecer su ID
    if (this.iLegId) {
      this.ceseForm.patchValue({
        iLegId: this.iLegId
      }, { emitEvent: false });
    }
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposDocumento = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de documento:', error);
        this.mostrarError('Error al cargar tipos de documento');
      }
    });
  }

  private cargarRegimenesLaborales(): void {
    this.regimenLaboralService.getAll().subscribe({
      next: (regimenes) => {
        this.regimenesLaborales = regimenes;
      },
      error: (error) => {
        console.error('Error al cargar regímenes laborales:', error);
        this.mostrarError('Error al cargar regímenes laborales');
      }
    });
  }

  cargarDatos(): void {
    if (this.iLegId) {
      this.vCeseService.getAll({
        campo: 'iLegId',
        valor: this.iLegId.toString()
      }).subscribe(data => {
        this.dataSource.data = data;
      });
    }
  }

  onRegimenChange(regimenId: number): void {
    this.ceseForm.patchValue({ 
      iCesAccId: null, 
      iCesMotAccId: null 
    }, { emitEvent: false });
    
    this.cesacionesAcciones = [];
    this.motivosAccion = [];
    
    if (regimenId) {
      this.ceseAccionService.getAll({ 
        campo: 'iRegLabId',
        valor: regimenId.toString()
      }).subscribe({
        next: (acciones) => {
          this.cesacionesAcciones = acciones;
        },
        error: (error) => {
          console.error('Error al cargar acciones:', error);
          this.mostrarError('Error al cargar acciones para el régimen seleccionado');
        }
      });
    }
  }

  onAccionChange(accionId: number): void {
    this.ceseForm.patchValue({ 
      iCesMotAccId: null 
    }, { emitEvent: false });
    
    this.motivosAccion = [];
    
    if (accionId) {
      this.ceseMotivoAccionService.getAll({
        campo: 'iCesAccId',
        valor: accionId.toString()
      }).subscribe({
        next: (motivos) => {
          this.motivosAccion = motivos;
        },
        error: (error) => {
          console.error('Error al cargar motivos:', error);
          this.mostrarError('Error al cargar motivos para la acción seleccionada');
        }
      });
    }
  }

  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo) {
      const control = this.ceseForm.get('iArchId');
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    }
  }

  onArchivoIdSelected(archivoId: number | undefined): void {
    if (archivoId) {
      this.ceseForm.patchValue({
        iArchId: archivoId
      }, { emitEvent: false });
      
      const control = this.ceseForm.get('iArchId');
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    }
  }

  validarCampo(campo: string): boolean {
    const control = this.ceseForm.get(campo);
    if (!control) return false;

    // Para campos de tiempo de servicio
    if (['iCesesServicioAnios', 'iCesesServicioMeses', 'iCesesServicioDias'].includes(campo)) {
      return control.invalid && control.touched;
    }

    // Para el archivo
    if (campo === 'iArchId') {
      return control.invalid && control.touched;
    }

    // Para el resto de campos
    return control.invalid && (control.dirty || control.touched);
  }

  private mostrarError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  private mostrarExito(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000
    });
  }

  limpiar(): void {
    // Resetear el formulario a sus valores iniciales
    this.ceseForm.reset({
      iCesesServicioAnios: 0,
      iCesesServicioMeses: 0,
      iCesesServicioDias: 0,
      iTipoDocId: null,
      cCesesNumeroDocumento: '',
      dtCesesFechaDocumento: null,
      iArchId: null,
      iRegLabId: null,
      iCesAccId: null,
      iCesMotAccId: null,
      dtCesesFechaCese: null,
      cCesesAnotaciones: ''
    });

    // Habilitar el formulario
    this.ceseForm.enable();
    
    // Desmarcar todos los campos como touched
    Object.keys(this.ceseForm.controls).forEach(key => {
      const control = this.ceseForm.get(key);
      if (control) {
        control.markAsUntouched();
        control.markAsPristine();
        control.setErrors(null);
      }
    });

    // Limpiar las listas
    this.cesacionesAcciones = [];
    this.motivosAccion = [];

    // Resetear estados
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;
    this.camposHabilitados = true;

    // Recargar datos iniciales
    this.cargarDatosIniciales();
  }

  verRegistro(cese: VCese): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = cese;
    this.camposHabilitados = false;
    
    // Primero deshabilitar todos los controles del formulario
    Object.keys(this.ceseForm.controls).forEach(key => {
      const control = this.ceseForm.get(key);
      if (control) {
        control.disable();
      }
    });
    
    // Primero establecer el ID del archivo
    this.ceseForm.patchValue({
      iArchId: cese.iArchId
    });
    
    // Luego cargar el resto de los datos
    setTimeout(() => {
      // Cargar las acciones basadas en el régimen
      if (cese.iRegLabId) {
        this.ceseAccionService.getAll({ 
          campo: 'iRegLabId',
          valor: cese.iRegLabId.toString()
        }).subscribe({
          next: (acciones) => {
            this.cesacionesAcciones = acciones;
            
            if (cese.iCesAccId) {
              this.ceseMotivoAccionService.getAll({
                campo: 'iCesAccId',
                valor: cese.iCesAccId.toString()
              }).subscribe({
                next: (motivos) => {
                  this.motivosAccion = motivos;
                  
                  // Cargar datos en el formulario
                  this.ceseForm.patchValue({
                    iTipoDocId: cese.iTipoDocId,
                    cCesesNumeroDocumento: cese.cCesesNumeroDocumento,
                    dtCesesFechaDocumento: cese.dtCesesFechaDocumento ? new Date(cese.dtCesesFechaDocumento) : null,
                    iRegLabId: cese.iRegLabId,
                    iCesAccId: cese.iCesAccId,
                    iCesMotAccId: cese.iCesMotAccId,
                    dtCesesFechaCese: cese.dtCesesFechaCese ? new Date(cese.dtCesesFechaCese) : null,
                    iCesesServicioAnios: cese.iCesesServicioAnios,
                    iCesesServicioMeses: cese.iCesesServicioMeses,
                    iCesesServicioDias: cese.iCesesServicioDias,
                    cCesesAnotaciones: cese.cCesesAnotaciones
                  });
                }
              });
            }
          }
        });
      }
    }, 100);

    // Asegurarse que todos los controles estén deshabilitados
    this.ceseForm.disable();
  }

  editarRegistro(cese: VCese): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Edición',
        message: '¿Desea editar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registroSeleccionado = cese;
        this.modoEdicion = true;
        this.modoVisualizacion = false;
        this.camposHabilitados = true;
        
        // Habilitar el formulario antes de cargar los datos
        this.ceseForm.enable();
        
        // Primero establecer el ID del archivo
        this.ceseForm.patchValue({
          iArchId: cese.iArchId
        });
        
        // Luego, después de un breve retraso, establecer el resto de los valores
        setTimeout(() => {
          if (cese.iRegLabId) {
            this.ceseAccionService.getAll({ 
              campo: 'iRegLabId',
              valor: cese.iRegLabId.toString()
            }).subscribe({
              next: (acciones) => {
                this.cesacionesAcciones = acciones;
                
                if (cese.iCesAccId) {
                  this.ceseMotivoAccionService.getAll({
                    campo: 'iCesAccId',
                    valor: cese.iCesAccId.toString()
                  }).subscribe({
                    next: (motivos) => {
                      this.motivosAccion = motivos;
                      
                      // Una vez que tenemos todos los datos, establecemos los valores
                      this.ceseForm.patchValue({
                        iTipoDocId: cese.iTipoDocId,
                        cCesesNumeroDocumento: cese.cCesesNumeroDocumento,
                        dtCesesFechaDocumento: cese.dtCesesFechaDocumento,
                        iRegLabId: cese.iRegLabId,
                        iCesAccId: cese.iCesAccId,
                        iCesMotAccId: cese.iCesMotAccId,
                        dtCesesFechaCese: cese.dtCesesFechaCese,
                        iCesesServicioAnios: cese.iCesesServicioAnios,
                        iCesesServicioMeses: cese.iCesesServicioMeses,
                        iCesesServicioDias: cese.iCesesServicioDias,
                        cCesesAnotaciones: cese.cCesesAnotaciones
                      });
                    }
                  });
                }
              }
            });
          }
        }, 100);
      }
    });
  }

  onGuardar(): void {
    if (!this.iLegId) {
      this.snackBar.open('Error: No se ha seleccionado un legajo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.ceseForm.controls).forEach(key => {
      const control = this.ceseForm.get(key);
      if (control && !control.disabled) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });

    if (this.ceseForm.valid) {
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
          const formData = {
            ...this.ceseForm.getRawValue(),
            iLegId: this.iLegId
          };

          if (this.modoEdicion && this.registroSeleccionado?.iCesesId) {
            this.ceseService.update(this.registroSeleccionado.iCesesId, formData).subscribe({
              next: () => {
                this.snackBar.open('Registro actualizado correctamente', 'Cerrar', {
                  duration: 3000
                });
                this.limpiar();
                this.cargarDatos();
              },
              error: (error) => {
                console.error('Error al actualizar:', error);
                let errorMessage = 'Error al actualizar el registro';
                if (error.error?.message) {
                  errorMessage += `: ${error.error.message}`;
                }
                this.snackBar.open(errorMessage, 'Cerrar', {
                  duration: 5000
                });
              }
            });
          } else {
            this.ceseService.create(formData).subscribe({
              next: () => {
                this.snackBar.open('Registro creado correctamente', 'Cerrar', {
                  duration: 3000
                });
                this.limpiar();
                this.cargarDatos();
              },
              error: (error) => {
                console.error('Error al crear:', error);
                let errorMessage = 'Error al crear el registro';
                if (error.error?.message) {
                  errorMessage += `: ${error.error.message}`;
                }
                this.snackBar.open(errorMessage, 'Cerrar', {
                  duration: 5000
                });
              }
            });
          }
        }
      });
    } else {
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
    }
  }

  eliminarRegistro(cese: VCese): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && cese.iCesesId) {
        this.ceseService.delete(cese.iCesesId).subscribe({
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

  isControlDisabled(controlName: string): boolean {
    return this.ceseForm.get(controlName)?.disabled ?? false;
  }

  private validarTiempoServicio(): boolean {
    const anios = this.ceseForm.get('iCesesServicioAnios')?.value || 0;
    const meses = this.ceseForm.get('iCesesServicioMeses')?.value || 0;
    const dias = this.ceseForm.get('iCesesServicioDias')?.value || 0;

    // Al menos uno de los campos debe ser mayor a 0
    return anios > 0 || meses > 0 || dias > 0;
  }
} 