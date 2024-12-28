import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { RegimenLaboralService } from 'src/app/services/regimen-laboral.service';
import { RegimenLaboral } from 'src/app/interfaces/regimen-laboral';
import { EvaluacionDesempenioAccionService } from 'src/app/services/evaluacion-desempenio-accion.service';
import { EvaluacionDesempenioAccion } from 'src/app/interfaces/evaluacion-desempenio-accion';
import { EvaluacionDesempenioMotivoAccionService } from 'src/app/services/evaluacion-desempenio-motivo-accion.service';
import { EvaluacionDesempenioMotivoAccion } from 'src/app/interfaces/evaluacion-desempenio-motivo-accion';
import { EvaluacionDesempenioService } from 'src/app/services/evaluacion-desempenio.service';
import { LegajoStateService } from 'src/app/core/services/legajo-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Archivo } from 'src/app/interfaces/archivo';
import { VEvaluacionDesempenioService } from 'src/app/services/v-evaluacion-desempenio.service';
import { VEvaluacionDesempenio } from 'src/app/interfaces/v-evaluacion-desempenio';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { ArchivoHandlerComponent } from 'src/app/components/archivo-handler/archivo-handler.component';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent implements OnInit {
  @ViewChild(ArchivoHandlerComponent) archivoHandler!: ArchivoHandlerComponent;
  
  tiposDocumento: TipoDocumento[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  evaluacionesAcciones: EvaluacionDesempenioAccion[] = [];
  motivosAccion: EvaluacionDesempenioMotivoAccion[] = [];
  evaluacionForm: FormGroup;
  evaluaciones: VEvaluacionDesempenio[] = [];
  displayedColumns: string[] = [
    'numero',
    'accion',
    'motivo',
    'regimen',
    'fechaDocumento',
    'documento',
    'acciones'
  ];

  // Variables para almacenar las selecciones
  regimenSeleccionado?: number;
  accionSeleccionada?: number;
  evaluacionEnEdicion?: number;
  modoEdicion = false;
  evaluacionSeleccionada: VEvaluacionDesempenio | null = null;
  iLegId: number | null = null;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private regimenLaboralService: RegimenLaboralService,
    private evaluacionAccionService: EvaluacionDesempenioAccionService,
    private motivoAccionService: EvaluacionDesempenioMotivoAccionService,
    private evaluacionService: EvaluacionDesempenioService,
    private legajoState: LegajoStateService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private vEvaluacionService: VEvaluacionDesempenioService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.evaluacionForm = this.fb.group({
      iTipoDocId: ['', Validators.required],
      cEvalDesNumeroDocumento: ['', Validators.required],
      dtEvalDesFechaDocumento: ['', Validators.required],
      iRegLabId: [''],
      iEvalDesAccId: [''],
      iEvalDescAccMotId: [''],
      cEvalDesAnotaciones: [''],
      iArchId: [null]
    });
  }

  ngOnInit(): void {
    this.cargarTiposDocumento();
    this.cargarRegimenesLaborales();
    
    // Obtener y mantener el iLegId
    this.legajoState.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        this.iLegId = legajo.iLegId;
        this.evaluacionForm.patchValue({ iLegId: this.iLegId });
        this.cargarEvaluaciones();
      }
    });
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe(tipos => {
      this.tiposDocumento = tipos;
    });
  }

  private cargarRegimenesLaborales(): void {
    this.regimenLaboralService.getAll().subscribe(regimenes => {
      this.regimenesLaborales = regimenes;
    });
  }

  private cargarEvaluaciones(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        this.vEvaluacionService.getAll({ 
          campo: 'iLegId',
          valor: legajo.iLegId.toString()
        }).subscribe(evaluaciones => {
          this.evaluaciones = evaluaciones;
        });
      }
    });
  }

  onRegimenChange(regimenId: number): void {
    this.regimenSeleccionado = regimenId;
    this.accionSeleccionada = undefined;
    this.motivosAccion = [];
    
    // Cargar acciones basadas en el régimen seleccionado
    if (regimenId) {
      this.evaluacionAccionService.getAll({ 
        campo: 'iRegLabId',
        valor: regimenId.toString()
      }).subscribe(acciones => {
        this.evaluacionesAcciones = acciones;
      });
    } else {
      this.evaluacionesAcciones = [];
    }
  }

  onAccionChange(accionId: number): void {
    this.accionSeleccionada = accionId;
    
    // Cargar motivos basados en la acción seleccionada
    if (accionId) {
      this.motivoAccionService.getAll({ 
        campo: 'iEvalDesAccId',
        valor: accionId.toString()
      }).subscribe(motivos => {
        this.motivosAccion = motivos;
      });
    } else {
      this.motivosAccion = [];
    }
  }

  editarEvaluacion(evaluacion: VEvaluacionDesempenio) {
    // Cargar los datos en el formulario
    this.cargarDatosParaEdicion(evaluacion);
    // Habilitar el formulario para edición
    this.evaluacionForm.enable();
    // Desplazar hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  verEvaluacion(evaluacion: VEvaluacionDesempenio) {
    // Cargar los datos en el formulario
    this.cargarDatosParaEdicion(evaluacion);
    // Deshabilitar el formulario inicialmente
    this.evaluacionForm.disable();
    // Desplazar hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarEvaluacion(evaluacion: VEvaluacionDesempenio) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Evaluación',
        message: '¿Está seguro que desea eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && evaluacion.iEvalDesId) {
        this.evaluacionService.delete(evaluacion.iEvalDesId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarEvaluaciones();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            this.snackBar.open('Error al eliminar el registro', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  guardarEvaluacion() {
    if (this.evaluacionForm.invalid) {
      this.marcarCamposInvalidos();
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: this.modoEdicion ? 'Actualizar Registro' : 'Guardar Registro',
        message: this.modoEdicion ? 
          '¿Está seguro que desea actualizar este registro?' : 
          '¿Está seguro que desea guardar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const datos = {
          ...this.evaluacionForm.value,
          iLegId: this.iLegId // Asegurar que el iLegId esté presente
        };
        
        if (this.modoEdicion && this.evaluacionSeleccionada?.iEvalDesId) {
          this.actualizarEvaluacion(datos);
        } else {
          this.crearNuevaEvaluacion(datos);
        }
      }
    });
  }

  limpiarFormulario() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Limpiar Formulario',
        message: '¿Está seguro que desea limpiar todos los campos?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetearFormulario();
        this.evaluacionForm.enable();
        this.snackBar.open('Formulario limpiado correctamente', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  retornar() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Retornar',
        message: '¿Está seguro que desea salir? Los cambios no guardados se perderán'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/legajo/principal']);
      }
    });
  }

  private cargarDatosParaEdicion(evaluacion: VEvaluacionDesempenio) {
    this.evaluacionSeleccionada = evaluacion;
    this.modoEdicion = true;

    // Mantener el iLegId al editar
    this.evaluacionForm.patchValue({
      iLegId: this.iLegId, // Asegurarnos de mantener el iLegId
      iTipoDocId: evaluacion.iTipoDocId,
      cEvalDesNumeroDocumento: evaluacion.cEvalDesNumeroDocumento,
      dtEvalDesFechaDocumento: evaluacion.dtEvalDesFechaDocumento,
      iRegLabId: evaluacion.iRegLabId,
      iEvalDesAccId: evaluacion.iEvalDesAccId,
      iEvalDescAccMotId: evaluacion.iEvalDescAccMotId,
      cEvalDesAnotaciones: evaluacion.cEvalDesAnotaciones,
      iArchId: evaluacion.iArchId
    });

    // Cargar datos dependientes
    if (evaluacion.iRegLabId) {
      this.onRegimenChange(evaluacion.iRegLabId);
    }
    if (evaluacion.iEvalDesAccId) {
      this.onAccionChange(evaluacion.iEvalDesAccId);
    }
  }

  private resetearFormulario() {
    this.evaluacionForm.reset();
    // Mantener el iLegId al resetear
    this.evaluacionForm.patchValue({ iLegId: this.iLegId });
    this.modoEdicion = false;
    this.evaluacionSeleccionada = null;
    
    if (this.archivoHandler) {
      this.archivoHandler.limpiar();
    }
  }

  private marcarCamposInvalidos() {
    Object.keys(this.evaluacionForm.controls).forEach(key => {
      const control = this.evaluacionForm.get(key);
      if (control?.errors) {
        control.markAsTouched();
      }
    });
  }

  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo) {
      this.evaluacionForm.patchValue({
        iArchId: archivo.iArchId
      });
    }
  }

  onArchivoIdReceived(archivoId: number | undefined): void {
    this.evaluacionForm.patchValue({
      iArchId: archivoId
    });
  }

  private crearNuevaEvaluacion(datos: any) {
    this.legajoState.getLegajo().subscribe(legajo => {
      if (!legajo?.iLegId) {
        this.snackBar.open('No se encontró el legajo asociado', 'Cerrar', {
          duration: 3000
        });
        return;
      }

      const evaluacion = {
        ...datos,
        iLegId: legajo.iLegId
      };

      this.evaluacionService.create(evaluacion).subscribe({
        next: () => {
          this.snackBar.open('Evaluación guardada exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.resetearFormulario();
          this.cargarEvaluaciones();
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          this.snackBar.open('Error al guardar la evaluación', 'Cerrar', {
            duration: 3000
          });
        }
      });
    });
  }

  private actualizarEvaluacion(datos: any) {
    if (!this.evaluacionSeleccionada?.iEvalDesId) {
      this.snackBar.open('Error: No se encontró el ID de la evaluación', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.evaluacionService.update(this.evaluacionSeleccionada.iEvalDesId, datos).subscribe({
      next: () => {
        this.snackBar.open('Evaluación actualizada exitosamente', 'Cerrar', {
          duration: 3000
        });
        this.resetearFormulario();
        this.cargarEvaluaciones();
        this.modoEdicion = false;
        this.evaluacionSeleccionada = null;
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        this.snackBar.open('Error al actualizar la evaluación', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
} 