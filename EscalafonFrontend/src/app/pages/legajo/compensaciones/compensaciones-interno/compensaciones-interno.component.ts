import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TipoDocumentoService } from '../../../../services/tipo-documento.service';
import { TipoDocumento } from '../../../../interfaces/tipo-documento';
import { RegimenLaboralService } from '../../../../services/regimen-laboral.service';
import { RegimenLaboral } from '../../../../interfaces/regimen-laboral';
import { CompensacionAccionService } from '../../../../services/compensacion-accion.service';
import { CompensacionAccion } from '../../../../interfaces/compensacion-accion';
import { CompensacionMotivoAccionService } from '../../../../services/compensacion-motivo-accion.service';
import { CompensacionMotivoAccion } from '../../../../interfaces/compensacion-motivo-accion';
import { CompensacionTipoPagoService } from '../../../../services/compensacion-tipo-pago.service';
import { CompensacionTipoPago } from '../../../../interfaces/compensacion-tipo-pago';
import { CompensacionTipoMonedaService } from '../../../../services/compensacion-tipo-moneda.service';
import { CompensacionTipoMoneda } from '../../../../interfaces/compensacion-tipo-moneda';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AsignacionIncentivoService } from '../../../../services/asignacion-incentivo.service';
import { AsignacionIncentivo } from '../../../../interfaces/asignacion-incentivo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Archivo } from '../../../../interfaces/archivo';
import { VCompensacion } from '../../../../interfaces/v-compensacion';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { CompensacionTipoFallecidoService } from '../../../../services/compensacion-tipo-fallecido.service';
import { CompensacionTipoFallecido } from '../../../../interfaces/compensacion-tipo-fallecido';
import { VCompensacionService } from '../../../../services/v-compensacion.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { GetAllFilterParams } from '../../../../core/interfaces/get-all-filter-params';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-compensaciones-interno',
  templateUrl: './compensaciones-interno.component.html'
})
export class CompensacionesInternoComponent implements OnInit, AfterViewInit {
  tiposDocumento: TipoDocumento[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  compensacionesAcciones: CompensacionAccion[] = [];
  motivosAccion: CompensacionMotivoAccion[] = [];
  tiposPago: CompensacionTipoPago[] = [];
  tiposMoneda: CompensacionTipoMoneda[] = [];
  tiposFallecido: CompensacionTipoFallecido[] = [];

  // Arrays filtrados para los selects
  accionesFiltradas: CompensacionAccion[] = [];
  motivosFiltrados: CompensacionMotivoAccion[] = [];

  displayedColumns = ['numero', 'accion', 'motivo', 'regimen', 'nroDocumento', 'fecha', 'importe', 'acciones'];

  // Agregar FormGroup
  compensacionForm!: FormGroup;

  // Agregar propiedad para la tabla
  dataSource = new MatTableDataSource<VCompensacion>([]);
  iLegId?: number;
  modoEdicion = false;
  registroSeleccionado?: VCompensacion;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // Propiedades para paginación
  totalRegistros = 0;
  tamanioPagina = 10;
  paginaActual = 0;

  // Agregar propiedad para controlar el modo visualización
  modoVisualizacion = false;

  camposHabilitados = true;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private regimenLaboralService: RegimenLaboralService,
    private compensacionAccionService: CompensacionAccionService,
    private compensacionMotivoAccionService: CompensacionMotivoAccionService,
    private compensacionTipoPagoService: CompensacionTipoPagoService,
    private compensacionTipoMonedaService: CompensacionTipoMonedaService,
    private fb: FormBuilder,
    private asignacionIncentivoService: AsignacionIncentivoService,
    private snackBar: MatSnackBar,
    private legajoStateService: LegajoStateService,
    private compensacionTipoFallecidoService: CompensacionTipoFallecidoService,
    private vCompensacionService: VCompensacionService,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.legajoStateService.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        this.iLegId = legajo.iLegId;
        this.cargarDatos();
      }
    });
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales(): void {
    this.cargarCompensacionesAcciones();
    this.cargarRegimenesLaborales();
    this.cargarTiposDocumento();
    this.cargarMotivosAccion();
    this.cargarTiposPago();
    this.cargarTiposMoneda();
    this.cargarTiposFallecido();
  }

  private cargarCompensacionesAcciones(): void {
    this.compensacionAccionService.getAll().subscribe({
      next: (acciones) => {
        this.compensacionesAcciones = acciones;
      },
      error: (error) => {
        console.error('Error al cargar acciones de compensación:', error);
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
      }
    });
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposDocumento = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de documento:', error);
      }
    });
  }

  private cargarMotivosAccion(): void {
    this.compensacionMotivoAccionService.getAll().subscribe({
      next: (motivos) => {
        this.motivosAccion = motivos;
      },
      error: (error) => {
        console.error('Error al cargar motivos de acción:', error);
      }
    });
  }

  private cargarTiposPago(): void {
    this.compensacionTipoPagoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposPago = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de pago:', error);
      }
    });
  }

  private cargarTiposMoneda(): void {
    this.compensacionTipoMonedaService.getAll().subscribe({
      next: (tipos) => {
        this.tiposMoneda = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de moneda:', error);
      }
    });
  }

  private cargarTiposFallecido(): void {
    this.compensacionTipoFallecidoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposFallecido = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de fallecido:', error);
      }
    });
  }

  // Método que se llama cuando cambia el régimen laboral
  onRegimenChange(regimenId: number): void {
    // Filtrar acciones por régimen laboral
    this.accionesFiltradas = this.compensacionesAcciones.filter(
      accion => accion.iRegLabId === regimenId
    );
    // Limpiar los selects dependientes
    this.motivosFiltrados = [];
  }

  // Método que se llama cuando cambia la acción
  onAccionChange(accionId: number): void {
    // Filtrar motivos por acción
    this.motivosFiltrados = this.motivosAccion.filter(
      motivo => motivo.iCompAccId === accionId
    );
  }

  private initForm(): void {
    this.compensacionForm = this.fb.group({
      iTipoDocId: [null, Validators.required],
      cAsigIncNumeroDocumento: ['', Validators.required],
      dtAsigIncFechaDocumento: [null, Validators.required],
      iArchId: [null, Validators.required],
      iRegLabId: [null, Validators.required],
      iCompAccId: [null, Validators.required],
      iCompMotAccId: [null, Validators.required],
      cAsigIncFallecido: ['titular'],
      iComTipFallId: [{ value: null, disabled: true }],
      cAsigIncDerechoHabienteFallecido: [''],
      cAsigIncDerechoSubsidiado: [''],
      iCompTipPagId: [null],
      iComTipMonId: [null],
      nAsigIncMonto: [null],
      cAsigIncMotivoPago: [''],
      cAsigIncAnotaciones: ['']
    });

    // Escuchar cambios en el radio button
    this.compensacionForm.get('cAsigIncFallecido')?.valueChanges.subscribe(value => {
      const fallecidoControl = this.compensacionForm.get('cAsigIncDerechoHabienteFallecido');
      const subsidiadoControl = this.compensacionForm.get('cAsigIncDerechoSubsidiado');
      const tipFallControl = this.compensacionForm.get('iComTipFallId');

      if (value === 'familiar') {
        fallecidoControl?.setValidators(Validators.required);
        subsidiadoControl?.setValidators(Validators.required);
        tipFallControl?.enable();
        tipFallControl?.setValidators(Validators.required);
        tipFallControl?.updateValueAndValidity();
      } else {
        fallecidoControl?.clearValidators();
        subsidiadoControl?.clearValidators();
        tipFallControl?.clearValidators();
        fallecidoControl?.setValue('');
        subsidiadoControl?.setValue('');
        tipFallControl?.setValue(null);
        tipFallControl?.disable();
      }

      fallecidoControl?.updateValueAndValidity();
      subsidiadoControl?.updateValueAndValidity();
    });
  }

  // Método para manejar el archivo
  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo) {
      console.log('Archivo seleccionado:', archivo);
      // Marcar el campo como touched para que se muestre la validación
      const control = this.compensacionForm.get('iArchId');
      if (control) {
        control.markAsTouched();
      }
    }
  }

  onArchivoIdSelected(archivoId: number | undefined): void {
    if (archivoId) {
      this.compensacionForm.patchValue({
        iArchId: archivoId
      });
      // Marcar el campo como touched para que se muestre la validación
      const control = this.compensacionForm.get('iArchId');
      if (control) {
        control.markAsTouched();
      }
    }
  }

  // Método para guardar
  onGuardar(): void {
    if (!this.iLegId) {
      this.snackBar.open('Error: No se ha seleccionado un legajo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.compensacionForm.controls).forEach(key => {
      const control = this.compensacionForm.get(key);
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });

    if (this.compensacionForm.valid) {
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
            ...this.compensacionForm.getRawValue(),
            iLegId: this.iLegId
          };

          if (this.modoEdicion && this.registroSeleccionado?.IAsigIncId) {
            // Asegurarse de incluir el ID de asignación en los datos de actualización
            const updateData = {
              ...formData,
              IAsigIncId: this.registroSeleccionado.IAsigIncId
            };

            // Actualizar registro existente usando el ID de asignación
            this.asignacionIncentivoService.update(this.registroSeleccionado.IAsigIncId, updateData)
              .subscribe({
                next: () => {
                  this.snackBar.open('Registro actualizado correctamente', 'Cerrar', {
                    duration: 3000
                  });
                  this.cargarDatos();
                  this.limpiar();
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
            // Crear nuevo registro
            this.asignacionIncentivoService.create(formData)
              .subscribe({
                next: () => {
                  this.snackBar.open('Registro creado correctamente', 'Cerrar', {
                    duration: 3000
                  });
                  this.cargarDatos();
                  this.limpiar();
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
      // Obtener los nombres amigables de los campos inválidos
      const camposInvalidos = Object.keys(this.compensacionForm.controls)
        .filter(key => {
          const control = this.compensacionForm.get(key);
          return control && !control.disabled && control.invalid;
        })
        .map(key => {
          // Mapear los nombres técnicos a nombres amigables
          const nombresCampos: { [key: string]: string } = {
            iTipoDocId: 'Tipo de documento',
            cAsigIncNumeroDocumento: 'Número de documento',
            dtAsigIncFechaDocumento: 'Fecha de documento',
            iArchId: 'Archivo',
            iRegLabId: 'Régimen laboral',
            iCompAccId: 'Acción',
            iCompMotAccId: 'Motivo de acción',
            iCompTipPagId: 'Tipo de pago',
            iComTipMonId: 'Tipo de moneda',
            nAsigIncMonto: 'Monto',
            iComTipFallId: 'Tipo de fallecido',
            cAsigIncDerechoHabienteFallecido: 'Derecho habiente fallecido',
            cAsigIncDerechoSubsidiado: 'Derecho subsidiado'
          };
          return nombresCampos[key] || key;
        });

      // Mostrar mensaje con los campos que faltan completar
      this.snackBar.open(
        `Por favor complete los siguientes campos requeridos: ${camposInvalidos.join(', ')}`, 
        'Cerrar',
        {
          duration: 5000,
          panelClass: ['error-snackbar'] // Asegúrate de tener esta clase definida en tus estilos
        }
      );

      // Hacer scroll al primer campo inválido
      const primerCampoInvalido = document.querySelector('.ng-invalid');
      if (primerCampoInvalido) {
        primerCampoInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  // Método para validar campos
  validarCampo(campo: string): boolean {
    const control = this.compensacionForm.get(campo);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  // Agregar este método
  onLimpiar(): void {
    // Resetear el formulario a sus valores iniciales
    this.compensacionForm.reset({
      cAsigIncFallecido: 'titular', // Mantener el valor por defecto
      iComTipFallId: { value: null, disabled: true },
      cAsigIncDerechoHabienteFallecido: '',
      cAsigIncDerechoSubsidiado: '',
      iTipoDocId: null,
      cAsigIncNumeroDocumento: '',
      dtAsigIncFechaDocumento: null,
      iArchId: null,
      iRegLabId: null,
      iCompAccId: null,
      iCompMotAccId: null,
      iCompTipPagId: null,
      iComTipMonId: null,
      nAsigIncMonto: null,
      cAsigIncMotivoPago: '',
      cAsigIncAnotaciones: ''
    });

    // Limpiar las listas filtradas
    this.accionesFiltradas = [];
    this.motivosFiltrados = [];

    // Desmarcar todos los campos como touched
    Object.keys(this.compensacionForm.controls).forEach(key => {
      const control = this.compensacionForm.get(key);
      if (control) {
        control.markAsUntouched();
        control.markAsPristine();
      }
    });
  }

  cargarDatos(): void {
    if (this.iLegId) {
      const params: GetAllFilterParams = {
        campo: 'iLegId',
        valor: this.iLegId.toString()
      };

      this.vCompensacionService.getAll(params).subscribe({
        next: (data: VCompensacion[]) => {
          this.dataSource.data = data;
          this.totalRegistros = data.length;
        },
        error: (error) => {
          console.error('Error al cargar compensaciones:', error);
          this.snackBar.open('Error al cargar los registros', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  limpiar(): void {
    this.camposHabilitados = true;
    this.compensacionForm.reset({
      cAsigIncFallecido: 'titular',
      iComTipFallId: { value: null, disabled: true }
    });
    this.modoEdicion = false;
    this.modoVisualizacion = false;
    this.registroSeleccionado = undefined;
    
    // Limpiar las listas filtradas
    this.accionesFiltradas = [];
    this.motivosFiltrados = [];

    // Desmarcar todos los campos como touched
    Object.keys(this.compensacionForm.controls).forEach(key => {
      const control = this.compensacionForm.get(key);
      if (control) {
        control.markAsUntouched();
        control.markAsPristine();
      }
    });
  }

  verRegistro(row: VCompensacion): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = row;
    this.camposHabilitados = false;
    
    // Primero deshabilitar todos los controles del formulario
    Object.keys(this.compensacionForm.controls).forEach(key => {
      const control = this.compensacionForm.get(key);
      if (control) {
        control.disable();
      }
    });
    
    // Primero establecer el ID del archivo
    this.compensacionForm.patchValue({
      iArchId: row.iArchId
    });
    
    // Luego cargar el resto de los datos
    setTimeout(() => {
      // Cargar las acciones basadas en el régimen
      this.accionesFiltradas = this.compensacionesAcciones.filter(
        accion => accion.iRegLabId === row.iRegLabId
      );

      // Cargar los motivos basados en la acción
      this.motivosFiltrados = this.motivosAccion.filter(
        motivo => motivo.iCompAccId === row.iCompAccId
      );
      
      const esFamiliar = row.iComTipFallId || 
                         row.cAsigIncDerechoHabienteFallecido || 
                         row.cAsigIncDerechoSubsidiado;
      
      // Cargar datos en el formulario
      this.compensacionForm.patchValue({
        iTipoDocId: row.iTipoDocId,
        cAsigIncNumeroDocumento: row.cAsigIncNumeroDocumento,
        dtAsigIncFechaDocumento: row.dtAsigIncFechaDocumento,
        iRegLabId: row.iRegLabId,
        iCompAccId: row.iCompAccId,
        iCompMotAccId: row.iCompMotAccId,
        iCompTipPagId: row.iCompTipPagId,
        iComTipMonId: row.iComTipMonId,
        nAsigIncMonto: row.nAsigIncMonto,
        cAsigIncAnotaciones: row.cAsigIncAnotaciones,
        cAsigIncDerechoHabienteFallecido: row.cAsigIncDerechoHabienteFallecido,
        cAsigIncDerechoSubsidiado: row.cAsigIncDerechoSubsidiado,
        cAsigIncMotivoPago: row.cAsigIncMotivoPago || '',
        cAsigIncFallecido: esFamiliar ? 'familiar' : 'titular',
        iComTipFallId: row.iComTipFallId
      });
    }, 100);

    // Asegurarse que todos los controles estén deshabilitados
    this.compensacionForm.disable();
  }

  editarRegistro(compensacion: VCompensacion) {
    this.registroSeleccionado = compensacion;
    this.modoEdicion = true;
    this.modoVisualizacion = false;
    this.camposHabilitados = true;
    
    // Habilitar el formulario antes de cargar los datos
    this.compensacionForm.enable();
    
    // Cargar las acciones basadas en el régimen
    this.accionesFiltradas = this.compensacionesAcciones.filter(
      accion => accion.iRegLabId === compensacion.iRegLabId
    );

    // Cargar los motivos basados en la acción
    this.motivosFiltrados = this.motivosAccion.filter(
      motivo => motivo.iCompAccId === compensacion.iCompAccId
    );
    
    const esFamiliar = compensacion.iComTipFallId || 
                       compensacion.cAsigIncDerechoHabienteFallecido || 
                       compensacion.cAsigIncDerechoSubsidiado;
    
    // Primero establecer el ID del archivo
    this.compensacionForm.patchValue({
      iArchId: compensacion.iArchId
    });
    
    // Luego, después de un breve retraso, establecer el resto de los valores
    setTimeout(() => {
      this.compensacionForm.patchValue({
        iTipoDocId: compensacion.iTipoDocId,
        cAsigIncNumeroDocumento: compensacion.cAsigIncNumeroDocumento,
        dtAsigIncFechaDocumento: compensacion.dtAsigIncFechaDocumento,
        iRegLabId: compensacion.iRegLabId,
        iCompAccId: compensacion.iCompAccId,
        iCompMotAccId: compensacion.iCompMotAccId,
        iCompTipPagId: compensacion.iCompTipPagId,
        iComTipMonId: compensacion.iComTipMonId,
        nAsigIncMonto: compensacion.nAsigIncMonto,
        cAsigIncMotivoPago: compensacion.cAsigIncMotivoPago,
        cAsigIncAnotaciones: compensacion.cAsigIncAnotaciones,
        cAsigIncDerechoHabienteFallecido: compensacion.cAsigIncDerechoHabienteFallecido,
        cAsigIncDerechoSubsidiado: compensacion.cAsigIncDerechoSubsidiado,
        cAsigIncFallecido: compensacion.cAsigIncFallecido,
        iComTipFallId: compensacion.iComTipFallId
      });
    }, 100);

    // Si es familiar, habilitar el control de tipo fallecido
    if (esFamiliar) {
      const tipFallControl = this.compensacionForm.get('iComTipFallId');
      if (tipFallControl) {
        tipFallControl.enable();
      }
    }
  }

  eliminarRegistro(row: VCompensacion): void {
    // Verificar que IAsigIncId exista y sea un número
    const asigIncId = row.IAsigIncId;
    if (!asigIncId || typeof asigIncId !== 'number') {
      this.snackBar.open('Error: No se puede eliminar el registro (ID inválido)', 'Cerrar', {
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
        // Ahora TypeScript sabe que asigIncId es un número
        this.asignacionIncentivoService.delete(asigIncId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', {
              duration: 3000
            });
            
            // Verificar si el registro eliminado es el que se está editando
            if (this.registroSeleccionado?.IAsigIncId === asigIncId) {
              this.limpiar(); // Limpiar el formulario
              this.modoEdicion = false;
              this.modoVisualizacion = false;
              this.registroSeleccionado = undefined;
            }
            
            this.cargarDatos(); // Recargar la tabla después de eliminar
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
} 