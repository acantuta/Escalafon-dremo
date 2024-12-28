import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoRetencionService } from 'src/app/services/tipo-retencion.service';
import { CompensacionTipoMonedaService } from 'src/app/services/compensacion-tipo-moneda.service';
import { TipoBeneficiarioRetencionService } from 'src/app/services/tipo-beneficiario-retencion.service';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { TipoRetencion } from 'src/app/interfaces/tipo-retencion';
import { CompensacionTipoMoneda } from 'src/app/interfaces/compensacion-tipo-moneda';
import { TipoBeneficiarioRetencion } from 'src/app/interfaces/tipo-beneficiario-retencion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Archivo } from '../../../../interfaces/archivo';
import { RetencionService } from 'src/app/services/retencion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { VLegajo } from '../../../../interfaces/v-legajo';
import { Retencion } from '../../../../interfaces/retencion';
import { VRetencionService } from 'src/app/services/v-retencion.service';
import { VRetencion } from 'src/app/interfaces/v-retencion';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-retenciones',
  templateUrl: './retenciones.component.html',
  styleUrls: ['./retenciones.component.css']
})
export class RetencionesComponent implements OnInit {
  tiposDocumento: TipoDocumento[] = [];
  tiposRetencion: TipoRetencion[] = [];
  tiposMoneda: CompensacionTipoMoneda[] = [];
  tiposBeneficiario: TipoBeneficiarioRetencion[] = [];
  retencionForm: FormGroup;
  legajo?: VLegajo;
  retenciones: VRetencion[] = [];
  displayedColumns: string[] = [
    'numero',
    'documento',
    'fechaDocumento',
    'tipoRetencion',
    'montoFijo',
    'porcentajeFijo',
    'acciones'
  ];
  modoEdicion: boolean = false;
  modoVisualizacion: boolean = false;
  retencionSeleccionada?: VRetencion;
  dataSource = new MatTableDataSource<VRetencion>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  camposHabilitados = true;
  totalRegistros = 0;
  tamanioPagina = 10;
  paginaActual = 0;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private tipoRetencionService: TipoRetencionService,
    private compensacionTipoMonedaService: CompensacionTipoMonedaService,
    private tipoBeneficiarioRetencionService: TipoBeneficiarioRetencionService,
    private fb: FormBuilder,
    private retencionService: RetencionService,
    private snackBar: MatSnackBar,
    private legajoState: LegajoStateService,
    private vRetencionService: VRetencionService,
    private dialog: MatDialog
  ) {
    this.retencionForm = this.fb.group({
      iLegId: [{ value: null, disabled: true }, Validators.required],
      iTipoDocId: ['', Validators.required],
      cRetenNumeroDocumento: ['', Validators.required],
      dtRetenFechaDocumento: ['', Validators.required],
      iArchId: [null, [Validators.required]],
      iTipRetenId: ['', Validators.required],
      iComTipMonId: ['', Validators.required],
      nRetenMontoTotal: [null, [Validators.required, Validators.min(0)]],
      nRetenNumeroCuotas: [null, [Validators.required, Validators.min(1)]],
      nRetenMontoFijoMensual: [null],
      nRetenPorcentajeFijoMensual: [null],
      iTipBenRetenId: ['', Validators.required],
      cRetenNumeroDocumentoBeneficiario: ['', Validators.required],
      cRetenNombreBeneficiario: ['', Validators.required],
      cRetenAnotaciones: ['']
    });
  }

  ngOnInit(): void {
    this.legajoState.legajo$.subscribe(legajo => {
      if (legajo) {
        this.legajo = legajo;
        const currentValues = this.retencionForm.getRawValue();
        this.retencionForm.patchValue({
          ...currentValues,
          iLegId: legajo.iLegId
        });
        this.cargarDatos();
      }
    });
    this.cargarTiposDocumento();
    this.cargarTiposRetencion();
    this.cargarTiposMoneda();
    this.cargarTiposBeneficiario();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe(tipos => {
      this.tiposDocumento = tipos;
    });
  }

  private cargarTiposRetencion(): void {
    this.tipoRetencionService.getAll().subscribe(tipos => {
      this.tiposRetencion = tipos;
    });
  }

  private cargarTiposMoneda(): void {
    this.compensacionTipoMonedaService.getAll().subscribe(tipos => {
      this.tiposMoneda = tipos;
    });
  }

  private cargarTiposBeneficiario(): void {
    this.tipoBeneficiarioRetencionService.getAll().subscribe(tipos => {
      this.tiposBeneficiario = tipos;
    });
  }

  private cargarDatos(): void {
    if (this.legajo?.iLegId) {
      this.vRetencionService.getAll({
        campo: 'iLegId',
        valor: this.legajo.iLegId.toString()
      }).subscribe({
        next: (retenciones) => {
          this.retenciones = retenciones;
          this.dataSource = new MatTableDataSource<VRetencion>(retenciones);
          this.dataSource.paginator = this.paginator;
          this.totalRegistros = retenciones.length;
        },
        error: (error) => {
          console.error('Error al cargar retenciones:', error);
          this.snackBar.open('Error al cargar las retenciones', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  onArchivoSeleccionado(archivo: Archivo | undefined): void {
    if (archivo) {
      this.retencionForm.patchValue({
        iArchId: archivo.iArchId
      });
      this.retencionForm.get('iArchId')?.markAsTouched();
    } else {
      this.retencionForm.patchValue({
        iArchId: null
      });
    }
  }

  editarRegistro(retencion: VRetencion): void {
    this.retencionSeleccionada = retencion;
    this.modoEdicion = true;
    this.modoVisualizacion = false;
    this.camposHabilitados = true;
    
    // Habilitar el formulario
    this.retencionForm.enable();
    // Mantener iLegId deshabilitado
    this.retencionForm.get('iLegId')?.disable();
    
    // Establecer valores en el formulario
    setTimeout(() => {
      this.retencionForm.patchValue({
        iArchId: retencion.iArchId,
        iTipoDocId: retencion.iTipoDocId,
        cRetenNumeroDocumento: retencion.cRetenNumeroDocumento,
        dtRetenFechaDocumento: retencion.dtRetenFechaDocumento,
        iTipRetenId: retencion.iTipRetenId,
        iComTipMonId: retencion.iComTipMonId,
        nRetenMontoTotal: retencion.nRetenMontoTotal,
        nRetenNumeroCuotas: retencion.nRetenNumeroCuotas,
        nRetenMontoFijoMensual: retencion.nRetenMontoFijoMensual,
        nRetenPorcentajeFijoMensual: retencion.nRetenPorcentajeFijoMensual,
        iTipBenRetenId: retencion.iTipBenRetenId,
        cRetenNumeroDocumentoBeneficiario: retencion.cRetenNumeroDocumento,
        cRetenNombreBeneficiario: retencion.cRetenNombreBeneficiario,
        cRetenAnotaciones: retencion.cRetenAnotaciones
      });
    }, 100);
  }

  eliminarRetencion(retencion: VRetencion): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro que desea eliminar esta retención?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retencionService.delete(retencion.iRetenId!).subscribe({
          next: () => {
            this.snackBar.open('Retención eliminada correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.cargarDatos();
          },
          error: (error) => {
            console.error('Error al eliminar retención:', error);
            this.snackBar.open(
              'Error al eliminar la retención',
              'Cerrar',
              {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            );
          }
        });
      }
    });
  }

  visualizarRetencion(retencion: VRetencion): void {
    this.modoVisualizacion = true;
    this.retencionSeleccionada = retencion;
    this.cargarDatosParaEdicion(retencion);
    this.retencionForm.disable();
  }

  private cargarDatosParaEdicion(retencion: VRetencion): void {
    console.log('Datos a cargar:', retencion);
    
    this.retencionForm.patchValue({
      iLegId: retencion.iLegId,
      iTipoDocId: retencion.iTipoDocId,
      cRetenNumeroDocumento: retencion.cRetenNumeroDocumento,
      dtRetenFechaDocumento: new Date(retencion.dtRetenFechaDocumento!),
      iArchId: retencion.iArchId,
      iTipRetenId: retencion.iTipRetenId,
      iComTipMonId: retencion.iComTipMonId,
      nRetenMontoTotal: retencion.nRetenMontoTotal,
      nRetenNumeroCuotas: retencion.nRetenNumeroCuotas,
      nRetenMontoFijoMensual: retencion.nRetenMontoFijoMensual,
      nRetenPorcentajeFijoMensual: retencion.nRetenPorcentajeFijoMensual,
      iTipBenRetenId: retencion.iTipBenRetenId,
      cRetenNumeroDocumentoBeneficiario: retencion.cRetenNumeroDocumento,
      cRetenNombreBeneficiario: retencion.cRetenNombreBeneficiario,
      cRetenAnotaciones: retencion.cRetenAnotaciones
    });

    console.log('Formulario después de cargar:', this.retencionForm.value);
  }

  cancelarEdicion(): void {
    this.camposHabilitados = true;
    this.modoEdicion = false;
    this.modoVisualizacion = false;
    this.retencionSeleccionada = undefined;
    this.retencionForm.enable();
    // Mantener iLegId deshabilitado
    this.retencionForm.get('iLegId')?.disable();
    this.limpiar();
  }

  guardar(): void {
    if (!this.legajo?.iLegId) {
      this.snackBar.open('Error: No se ha seleccionado un legajo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.retencionForm.controls).forEach(key => {
      const control = this.retencionForm.get(key);
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });

    if (this.retencionForm.valid) {
      const formValues = {
        ...this.retencionForm.getRawValue(),
        iLegId: this.legajo.iLegId
      };

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: this.modoEdicion ? 'Confirmar actualización' : 'Confirmar registro',
          message: this.modoEdicion ? 
            '¿Está seguro que desea actualizar esta retención?' : 
            '¿Está seguro que desea registrar esta retención?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const retencion: Retencion = {
            ...formValues,
            dtRetenFechaDocumento: this.retencionForm.get('dtRetenFechaDocumento')?.value ?
              new Date(this.retencionForm.get('dtRetenFechaDocumento')?.value) : undefined,
            bRetenEsVigente: true
          };

          if (this.modoEdicion && this.retencionSeleccionada?.iRetenId) {
            this.retencionService.update(this.retencionSeleccionada.iRetenId, retencion).subscribe({
              next: () => {
                this.snackBar.open('Retención actualizada correctamente', 'Cerrar', {
                  duration: 3000
                });
                this.cargarDatos();
                this.cancelarEdicion();
                if (this.paginator) {
                  this.paginator.firstPage();
                }
              },
              error: (error) => {
                console.error('Error al actualizar:', error);
                this.snackBar.open(
                  `Error al actualizar la retención: ${error.error?.message || 'Error desconocido'}`,
                  'Cerrar',
                  { duration: 5000 }
                );
              }
            });
          } else {
            this.retencionService.create(retencion).subscribe({
              next: () => {
                this.snackBar.open('Retención guardada correctamente', 'Cerrar', {
                  duration: 3000
                });
                this.cargarDatos();
                this.limpiar();
                if (this.paginator) {
                  this.paginator.firstPage();
                }
              },
              error: (error) => {
                console.error('Error al guardar:', error);
                this.snackBar.open(
                  `Error al guardar la retención: ${error.error?.message || 'Error desconocido'}`,
                  'Cerrar',
                  { duration: 5000 }
                );
              }
            });
          }
        }
      });
    } else {
      // Obtener los nombres amigables de los campos inválidos
      const camposInvalidos = Object.keys(this.retencionForm.controls)
        .filter(key => {
          const control = this.retencionForm.get(key);
          return control && !control.disabled && control.invalid;
        })
        .map(key => {
          const nombresCampos: { [key: string]: string } = {
            iTipoDocId: 'Tipo de documento',
            cRetenNumeroDocumento: 'Número de documento',
            dtRetenFechaDocumento: 'Fecha de documento',
            iArchId: 'Archivo',
            iTipRetenId: 'Tipo de retención',
            iComTipMonId: 'Tipo de moneda',
            nRetenMontoTotal: 'Monto total',
            nRetenNumeroCuotas: 'Número de cuotas',
            iTipBenRetenId: 'Tipo de beneficiario',
            cRetenNumeroDocumentoBeneficiario: 'Número de documento del beneficiario',
            cRetenNombreBeneficiario: 'Nombre del beneficiario'
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

  limpiar(): void {
    const legajoId = this.legajo?.iLegId;
    this.retencionForm.reset();
    if (legajoId) {
      this.retencionForm.patchValue({
        iLegId: legajoId
      }, { emitEvent: false });
    }
    this.modoEdicion = false;
    this.modoVisualizacion = false;
    this.retencionSeleccionada = undefined;
  }

  validarCampo(campo: string): boolean {
    const control = this.retencionForm.get(campo);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  verRegistro(retencion: VRetencion): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.retencionSeleccionada = retencion;
    this.camposHabilitados = false;
    
    // Deshabilitar todos los controles del formulario
    Object.keys(this.retencionForm.controls).forEach(key => {
      const control = this.retencionForm.get(key);
      if (control) {
        control.disable();
      }
    });
    
    // Establecer el ID del archivo
    this.retencionForm.patchValue({
      iArchId: retencion.iArchId
    });
    
    // Cargar el resto de los datos después de un breve retraso
    setTimeout(() => {
      this.retencionForm.patchValue({
        iTipoDocId: retencion.iTipoDocId,
        cRetenNumeroDocumento: retencion.cRetenNumeroDocumento,
        dtRetenFechaDocumento: retencion.dtRetenFechaDocumento,
        iTipRetenId: retencion.iTipRetenId,
        iComTipMonId: retencion.iComTipMonId,
        nRetenMontoTotal: retencion.nRetenMontoTotal,
        nRetenNumeroCuotas: retencion.nRetenNumeroCuotas,
        nRetenMontoFijoMensual: retencion.nRetenMontoFijoMensual,
        nRetenPorcentajeFijoMensual: retencion.nRetenPorcentajeFijoMensual,
        iTipBenRetenId: retencion.iTipBenRetenId,
        cRetenNumeroDocumentoBeneficiario: retencion.cRetenNumeroDocumento,
        cRetenNombreBeneficiario: retencion.cRetenNombreBeneficiario,
        cRetenAnotaciones: retencion.cRetenAnotaciones
      });
    }, 100);
  }
} 