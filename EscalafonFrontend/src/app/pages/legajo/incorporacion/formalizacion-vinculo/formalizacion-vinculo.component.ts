import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VVinculacionLaboral } from '../../../../interfaces/v-vinculacion-laboral';
import { VinculacionLaboral } from '../../../../interfaces/vinculacion-laboral';
import { TipoDocumento } from '../../../../interfaces/tipo-documento';
import { RegimenLaboral } from '../../../../interfaces/regimen-laboral';
import { AccionVinculacion } from '../../../../interfaces/accion-vinculacion';
import { MotivoAccionVinculacion } from '../../../../interfaces/motivo-accion-vinculacion';
import { Archivo } from '../../../../interfaces/archivo';

import { VVinculacionLaboralService } from '../../../../services/v-vinculacion-laboral.service';
import { VinculacionLaboralService } from '../../../../services/vinculacion-laboral.service';
import { TipoDocumentoService } from '../../../../services/tipo-documento.service';
import { RegimenLaboralService } from '../../../../services/regimen-laboral.service';
import { AccionVinculacionService } from '../../../../services/accion-vinculacion.service';
import { MotivoAccionVinculacionService } from '../../../../services/motivo-accion-vinculacion.service';
import { MatDialog } from '@angular/material/dialog';
import { BuscarCentroLaboralDialogComponent } from '../../../../components/buscar-centro-laboral-dialog/buscar-centro-laboral-dialog.component';
import { GrupoOcupacionalService } from '../../../../services/grupo-ocupacional.service';
import { CategoriaRemunerativaService } from '../../../../services/categoria-remunerativa.service';
import { CargoLaboralService } from '../../../../services/cargo-laboral.service';
import { JornadaLaboralService } from '../../../../services/jornada-laboral.service';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { Subscription } from 'rxjs';
import { EscalaCategoriaService } from '../../../../services/escala-categoria.service';
import { EscalaCategoria } from '../../../../interfaces/escala-categoria';
import { VCentroLaboralService } from '../../../../services/v-centro-laboral.service';
import { ConfigService } from '../../../../core/services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

interface CentroLaboral {
  iCentLabId: number;
  cCentLabCodigoModular: string;
  cCentLabNombre: string;
  cModEduNombre: string;
  cDirRegNombre: string;
  cInstGeEduNombre: string;
  cNivEduNombre: string;
}

@Component({
  selector: 'app-formalizacion-vinculo',
  templateUrl: './formalizacion-vinculo.component.html'
})
export class FormalizacionVinculoComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'numero', 
    'accion', 
    'motivo', 
    'regimen', 
    'fInicio', 
    'fFin', 
    'centroLaboral', 
    'cargo',
    'resolucion', 
    'acciones'
  ];

  vinculacionForm: FormGroup;
  vinculaciones: VVinculacionLaboral[] = [];
  tiposDocumento: TipoDocumento[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  accionesVinculacion: AccionVinculacion[] = [];
  motivosAccion: MotivoAccionVinculacion[] = [];
  legajoId!: number;
  selectedFileName: string = '';
  centroLaboralSeleccionado?: CentroLaboral;
  centroLaboralInfo: {
    centroLaboral: string;
    modalidadEducativa: string;
    region: string;
    instanciaGestion: string;
  } = {
    centroLaboral: '',
    modalidadEducativa: '',
    region: '',
    instanciaGestion: ''
  };
  gruposOcupacionales: any[] = [];
  categoriasRemunerativas: any[] = [];
  cargos: any[] = [];
  jornadasLaborales: any[] = [];
  escalaCategorias: EscalaCategoria[] = [];
  private subscription?: Subscription;
  modoFormulario: 'crear' | 'editar' | 'ver' = 'crear';

  constructor(
    private fb: FormBuilder,
    private legajoState: LegajoStateService,
    private vVinculacionService: VVinculacionLaboralService,
    private vinculacionService: VinculacionLaboralService,
    private tipoDocumentoService: TipoDocumentoService,
    private regimenLaboralService: RegimenLaboralService,
    private accionVinculacionService: AccionVinculacionService,
    private motivoAccionService: MotivoAccionVinculacionService,
    private dialog: MatDialog,
    private grupoOcupacionalService: GrupoOcupacionalService,
    private categoriaRemunerativaService: CategoriaRemunerativaService,
    private cargoLaboralService: CargoLaboralService,
    private jornadaLaboralService: JornadaLaboralService,
    private escalaCategoriaService: EscalaCategoriaService,
    private vCentroLaboralService: VCentroLaboralService,
    public configService: ConfigService,
    private snackBar: MatSnackBar
  ) {
    this.vinculacionForm = this.fb.group({
      iVincLabId: [null],
      iTipoDocId: ['', [Validators.required]],
      cVincLabNumeroDocumento: ['', [Validators.required]],
      dtVincLabFechaDocumento: ['', [Validators.required]],
      iArchId: [null],
      iFolios: [''],
      iRegLabId: ['', [Validators.required]],
      iAccVincId: ['', [Validators.required]],
      iMotAccVincId: [''],
      iCentLabId: [null, [Validators.required]],
      cVincLabCodigoPlaza: [''],
      cVincLabUseZonaSubRegion: [''],
      dtVincLabFechaInicio: ['', [Validators.required]],
      dtVincLabFechaFin: [''],
      bVincLabMandatoJudicial: [false],
      cVincLabAnotaciones: [''],
      codigoModularIE: [''],
      iGrupOcupId: [{ value: null, disabled: true }],
      iCatRemuId: [{ value: null, disabled: true }],
      iEscCatId: [{ value: null, disabled: true }],
      iCargLabId: [null, [Validators.required]],
      iJorLabId: [null, [Validators.required]]
    });

    // Suscribirse a los cambios del régimen laboral
    this.vinculacionForm.get('iRegLabId')?.valueChanges.subscribe(regimenId => {
      this.manejarCambioRegimen(regimenId);
    });
  }

  ngOnInit(): void {
    // Suscribirse al estado del legajo
    this.subscription = this.legajoState.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        this.legajoId = legajo.iLegId;
        this.cargarVinculaciones();
      }
    });

    this.cargarCatalogos();
  }

  ngOnDestroy() {
    // Limpiamos la suscripción al destruir el componente
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cargarVinculaciones() {
    if (this.legajoId && !isNaN(this.legajoId)) {  // Validación adicional
      this.vVinculacionService.getAll({ campo: 'iLegId', valor: this.legajoId.toString() })
        .subscribe({
          next: (vinculaciones) => {
            this.vinculaciones = vinculaciones;
          },
          error: (error) => {
            console.error('Error al cargar vinculaciones:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
          }
        });
    }
  }

  cargarCatalogos() {
    this.tipoDocumentoService.getAll()
      .subscribe(tipos => this.tiposDocumento = tipos);

    this.regimenLaboralService.getAll()
      .subscribe(regimenes => this.regimenesLaborales = regimenes);

    this.accionVinculacionService.getAll()
      .subscribe(acciones => this.accionesVinculacion = acciones);

    this.grupoOcupacionalService.getAll()
      .subscribe(grupos => this.gruposOcupacionales = grupos);

    this.categoriaRemunerativaService.getAll()
      .subscribe(categorias => this.categoriasRemunerativas = categorias);

    this.cargoLaboralService.getAll()
      .subscribe(cargos => this.cargos = cargos);

    this.jornadaLaboralService.getAll()
      .subscribe(jornadas => this.jornadasLaborales = jornadas);

    this.escalaCategoriaService.getAll()
      .subscribe({
        next: (escalas) => {
          this.escalaCategorias = escalas;
        },
        error: (error) => {
          console.error('Error al cargar escalas categorías:', error);
        }
      });
  }

  onRegimenChange(regimenId: number) {
    // Filtrar acciones por régimen
    this.accionVinculacionService.getAll({ campo: 'iRegLabId', valor: regimenId.toString() })
      .subscribe(acciones => this.accionesVinculacion = acciones);

    // Resetear campos relacionados
    this.vinculacionForm.patchValue({
      iGrupOcupId: null,
      iCatRemuId: null,
      iEscCatId: null
    });

    // Limpiar y cargar grupos ocupacionales si corresponde
    if (this.configService.tieneGrupoOcupacional(regimenId)) {
      this.cargarGruposOcupacionales();
    } else {
      this.gruposOcupacionales = [];
    }

    // Limpiar y cargar escala/categoría si corresponde
    if (this.configService.tieneEscalaCategoriaGrupo(regimenId)) {
      this.cargarEscalaCategorias();
    } else {
      this.escalaCategorias = [];
    }
  }

  onAccionChange(accionId: number) {
    // Cargar motivos según la acción seleccionada
    this.motivoAccionService.getAll({ 
      campo: 'iAccVincId', 
      valor: accionId.toString() 
    }).subscribe({
      next: (motivos) => {
        this.motivosAccion = motivos;
      },
      error: (error) => {
        console.error('Error al cargar motivos:', error);
        this.motivosAccion = [];
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      // Aquí iría la lógica para subir el archivo
    }
  }

  buscarCentroLaboral() {
    const dialogRef = this.dialog.open(BuscarCentroLaboralDialogComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.centroLaboralSeleccionado = result;
        this.vinculacionForm.patchValue({
          codigoModularIE: result.cCentLabCodigoModular,
          iCentLabId: result.iCentLabId,
          cVincLabCodigoPlaza: result.cCentLabCodigo || ''
        });
        this.actualizarInformacionCentroLaboral(result);
      }
    });
  }

  private actualizarInformacionCentroLaboral(centro: CentroLaboral) {
    this.centroLaboralInfo = {
      centroLaboral: centro.cCentLabNombre || '',
      modalidadEducativa: centro.cModEduNombre || '',
      region: centro.cDirRegNombre || '',
      instanciaGestion: centro.cInstGeEduNombre || ''
    };
  }

  guardarVinculacion() {
    if (this.vinculacionForm.invalid) {
      Object.keys(this.vinculacionForm.controls).forEach(key => {
        const control = this.vinculacionForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Confirmar ${this.modoFormulario === 'editar' ? 'edición' : 'guardado'}`,
        message: `¿Está seguro de ${this.modoFormulario === 'editar' ? 'editar' : 'guardar'} los cambios?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formValues = this.vinculacionForm.value;
        const vinculacion: VinculacionLaboral = {
          ...formValues,
          iLegId: this.legajoId,
          iCargLabId: formValues.iCargLabId,
          iJorLabId: formValues.iJorLabId,
          iGrupOcupId: formValues.iGrupOcupId,
          iCatRemuId: formValues.iCatRemuId,
          iEscCatId: formValues.iEscCatId,
          cVincLabAnotaciones: formValues.cVincLabAnotaciones?.toUpperCase() || null
        };

        // Determinar si es crear o actualizar
        const observable = this.modoFormulario === 'editar' 
          ? this.vinculacionService.update(formValues.iVincLabId, vinculacion)
          : this.vinculacionService.create(vinculacion);

        observable.subscribe({
          next: () => {
            this.snackBar.open(
              `Vinculación ${this.modoFormulario === 'editar' ? 'actualizada' : 'guardada'} exitosamente`, 
              'Cerrar', 
              { duration: 3000 }
            );
            this.cargarVinculaciones();
            
            // Inicializar un nuevo formulario limpio
            this.modoFormulario = 'crear';
            this.vinculacionForm.enable();
            
            // Resetear solo los valores sin disparar validaciones
            Object.keys(this.vinculacionForm.controls).forEach(key => {
              const control = this.vinculacionForm.get(key);
              control?.setValue(null);
              control?.setErrors(null);
              control?.markAsUntouched();
              control?.markAsPristine();
            });

            // Limpiar otros estados
            this.selectedFileName = '';
            this.centroLaboralSeleccionado = undefined;
          },
          error: (error) => {
            console.error('Error al guardar vinculación:', error);
            this.snackBar.open(
              `Error al ${this.modoFormulario === 'editar' ? 'actualizar' : 'guardar'} la vinculación`, 
              'Cerrar', 
              { duration: 3000 }
            );
          }
        });
      }
    });
  }

  editarVinculacion(vinculacion: VVinculacionLaboral) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro de editar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modoFormulario = 'editar';
        this.vinculacionForm.enable();

        // Primero cargar la acción para que se carguen los motivos
        if (vinculacion.iAccVincId) {
          this.onAccionChange(vinculacion.iAccVincId);
        }

        // Luego cargar todos los datos
        this.vinculacionForm.patchValue({
          iVincLabId: vinculacion.iVincLabId,
          iTipoDocId: vinculacion.iTipoDocId,
          cVincLabNumeroDocumento: vinculacion.cVincLabNumeroDocumento,
          dtVincLabFechaDocumento: vinculacion.dtVincLabFechaDocumento,
          iRegLabId: vinculacion.iRegLabId,
          iAccVincId: vinculacion.iAccVincId,
          iMotAccVincId: vinculacion.iMotAccVincId,
          cVincLabCodigoPlaza: vinculacion.cVincLabCodigoPlaza,
          dtVincLabFechaInicio: vinculacion.dtVincLabFechaInicio,
          dtVincLabFechaFin: vinculacion.dtVincLabFechaFin,
          bVincLabMandatoJudicial: vinculacion.bVincLabMandatoJudicial,
          iEscCatId: vinculacion.iEscCatId,
          cVincLabUseZonaSubRegion: vinculacion.cVincLabUseZonaSubRegion,
          iCentLabId: vinculacion.iCentLabId,
          iArchId: vinculacion.iArchId,
          iCargLabId: vinculacion.iCargLabId,
          iJorLabId: vinculacion.iJorLabId,
          iGrupOcupId: vinculacion.iGrupOcupId,
          iCatRemuId: vinculacion.iCatRemuId,
          cVincLabAnotaciones: vinculacion.cVincLabAnotaciones
        });

        const regimenId = vinculacion.iRegLabId || null;
        this.manejarCambioRegimen(regimenId);

        if (vinculacion.iCentLabId) {
          this.vCentroLaboralService.getById(vinculacion.iCentLabId).subscribe({
            next: (centroLaboral) => {
              this.vinculacionForm.patchValue({
                codigoModularIE: centroLaboral.cCentLabCodigoModular
              });

              this.centroLaboralSeleccionado = {
                iCentLabId: centroLaboral.iCentLabId!,
                cCentLabCodigoModular: centroLaboral.cCentLabCodigoModular || '',
                cCentLabNombre: centroLaboral.cCentLabNombre || '',
                cModEduNombre: centroLaboral.cModEduNombre || '',
                cDirRegNombre: centroLaboral.cDirRegNombre || '',
                cInstGeEduNombre: centroLaboral.cInstGeEduNombre || '',
                cNivEduNombre: centroLaboral.iNivEduNombre || ''
              };
            }
          });
        }
      }
    });
  }

  eliminarVinculacion(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vinculacionService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Vinculación eliminada exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarVinculaciones();
          },
          error: (error) => {
            console.error('Error al eliminar vinculación:', error);
            this.snackBar.open('Error al eliminar la vinculación', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  limpiarFormulario() {
    this.modoFormulario = 'crear';
    this.vinculacionForm.enable();
    this.vinculacionForm.reset();
    this.selectedFileName = '';
    this.centroLaboralSeleccionado = undefined;
    this.centroLaboralInfo = {
      centroLaboral: '',
      modalidadEducativa: '',
      region: '',
      instanciaGestion: ''
    };
  }

  onGrupoOcupacionalChange(grupoId: number) {
    // Resetear categoría remunerativa
    this.vinculacionForm.patchValue({
      iCatRemuId: null
    });

    if (grupoId) {
      this.categoriaRemunerativaService.getAll({
        campo: 'iGrupOcupId',
        valor: grupoId.toString()
      }).subscribe({
        next: (categorias) => {
          this.categoriasRemunerativas = categorias;
        },
        error: (error) => {
          console.error('Error al cargar categorías:', error);
          this.categoriasRemunerativas = [];
        }
      });
    } else {
      this.categoriasRemunerativas = [];
    }
  }

  onArchivoSeleccionado(archivo: Archivo | undefined): void {
    if (archivo) {
      this.vinculacionForm.patchValue({
        iArchId: archivo.iArchId
      });
    } else {
      this.vinculacionForm.patchValue({
        iArchId: null
      });
    }
  }

  private manejarCambioRegimen(regimenId: number | null): void {
    const grupoControl = this.vinculacionForm.get('iGrupOcupId');
    const categoriaControl = this.vinculacionForm.get('iCatRemuId');
    const escalaControl = this.vinculacionForm.get('iEscCatId');

    if (regimenId && this.configService.tieneGrupoOcupacional(regimenId)) {
      grupoControl?.enable();
      categoriaControl?.enable();
      grupoControl?.setValidators([Validators.required]);
      categoriaControl?.setValidators([Validators.required]);
      this.cargarGruposOcupacionales();
    } else {
      grupoControl?.disable();
      categoriaControl?.disable();
      grupoControl?.clearValidators();
      categoriaControl?.clearValidators();
      this.gruposOcupacionales = [];
      this.categoriasRemunerativas = [];
    }

    if (regimenId && this.configService.tieneEscalaCategoriaGrupo(regimenId)) {
      escalaControl?.enable();
      escalaControl?.setValidators([Validators.required]);
      this.cargarEscalaCategorias();
    } else {
      escalaControl?.disable();
      escalaControl?.clearValidators();
      this.escalaCategorias = [];
    }

    // Actualizar validaciones
    grupoControl?.updateValueAndValidity();
    categoriaControl?.updateValueAndValidity();
    escalaControl?.updateValueAndValidity();
  }

  private cargarEscalaCategorias(): void {
    const regimenId = this.vinculacionForm.get('iRegLabId')?.value;
    
    if (!regimenId) {
      this.escalaCategorias = [];
      return;
    }

    // Filtrar por régimen laboral
    this.escalaCategoriaService.getAll({
      campo: 'iRegLabId',
      valor: regimenId.toString()
    }).subscribe({
      next: (escalas) => {
        this.escalaCategorias = escalas;
      },
      error: (error) => {
        console.error('Error al cargar escalas categorías:', error);
        this.escalaCategorias = [];
      }
    });
  }

  private cargarGruposOcupacionales(): void {
    // Cargar todos los grupos ocupacionales sin filtro
    this.grupoOcupacionalService.getAll().subscribe({
      next: (grupos) => {
        this.gruposOcupacionales = grupos;
      },
      error: (error) => {
        console.error('Error al cargar grupos ocupacionales:', error);
        this.gruposOcupacionales = [];
      }
    });
  }

  visualizarVinculacion(vinculacion: VVinculacionLaboral) {
    this.modoFormulario = 'ver';
    
    // Cargar motivos de acción antes de patchear valores
    if (vinculacion.iAccVincId) {
      this.onAccionChange(vinculacion.iAccVincId);
    }
    
    this.vinculacionForm.patchValue({
      iTipoDocId: vinculacion.iTipoDocId,
      cVincLabNumeroDocumento: vinculacion.cVincLabNumeroDocumento,
      dtVincLabFechaDocumento: vinculacion.dtVincLabFechaDocumento,
      iRegLabId: vinculacion.iRegLabId,
      iAccVincId: vinculacion.iAccVincId,
      iMotAccVincId: vinculacion.iMotAccVincId,
      cVincLabCodigoPlaza: vinculacion.cVincLabCodigoPlaza,
      dtVincLabFechaInicio: vinculacion.dtVincLabFechaInicio,
      dtVincLabFechaFin: vinculacion.dtVincLabFechaFin,
      bVincLabMandatoJudicial: vinculacion.bVincLabMandatoJudicial,
      iEscCatId: vinculacion.iEscCatId,
      cVincLabUseZonaSubRegion: vinculacion.cVincLabUseZonaSubRegion,
      iCentLabId: vinculacion.iCentLabId,
      iArchId: vinculacion.iArchId,
      iCargLabId: vinculacion.iCargLabId,
      iJorLabId: vinculacion.iJorLabId,
      iGrupOcupId: vinculacion.iGrupOcupId,
      iCatRemuId: vinculacion.iCatRemuId,
      cVincLabAnotaciones: vinculacion.cVincLabAnotaciones
    });

    // Deshabilitar el formulario
    this.vinculacionForm.disable();

    // Cargar datos del centro laboral si existe
    if (vinculacion.iCentLabId) {
      this.vCentroLaboralService.getById(vinculacion.iCentLabId).subscribe({
        next: (centroLaboral) => {
          this.vinculacionForm.patchValue({
            codigoModularIE: centroLaboral.cCentLabCodigoModular
          });

          this.centroLaboralSeleccionado = {
            iCentLabId: centroLaboral.iCentLabId!,
            cCentLabCodigoModular: centroLaboral.cCentLabCodigoModular || '',
            cCentLabNombre: centroLaboral.cCentLabNombre || '',
            cModEduNombre: centroLaboral.cModEduNombre || '',
            cDirRegNombre: centroLaboral.cDirRegNombre || '',
            cInstGeEduNombre: centroLaboral.cInstGeEduNombre || '',
            cNivEduNombre: centroLaboral.iNivEduNombre || ''
          };
        }
      });
    }
  }
} 