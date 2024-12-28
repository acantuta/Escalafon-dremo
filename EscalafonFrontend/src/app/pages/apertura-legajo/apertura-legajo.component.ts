import { Component, OnInit } from '@angular/core';
import { LegajoService } from '../../services/legajo.service';
import { Legajo } from '../../interfaces/legajo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoAperturaLegajoService } from '../../services/tipo-apertura-legajo.service';
import { TipoAperturaLegajo } from '../../interfaces/tipo-apertura-legajo';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoDocumento } from '../../interfaces/tipo-documento';
import { TipoDocumentoIdentificacionService } from '../../services/tipo-documento-identificacion.service';
import { TipoDocumentoIdentificacion } from '../../interfaces/tipo-documento-identificacion';
import { RegimenLaboralService } from '../../services/regimen-laboral.service';
import { RegimenLaboral } from '../../interfaces/regimen-laboral';
import { AccionVinculacionService } from '../../services/accion-vinculacion.service';
import { AccionVinculacion } from '../../interfaces/accion-vinculacion';
import { MotivoAccionVinculacionService } from '../../services/motivo-accion-vinculacion.service';
import { MotivoAccionVinculacion } from '../../interfaces/motivo-accion-vinculacion';
import { CondicionLaboralService } from '../../services/condicion-laboral.service';
import { CondicionLaboral } from '../../interfaces/condicion-laboral';
import { VCondicionLaboralSituacionLaboralService } from '../../services/v-condicion-laboral-situacion-laboral.service';
import { VCondicionLaboralSituacionLaboral } from '../../interfaces/v-condicion-laboral-situacion-laboral';
import { TipoServidorService } from '../../services/tipo-servidor.service';
import { TipoServidor } from '../../interfaces/tipo-servidor';
import { EscalaCategoriaService } from '../../services/escala-categoria.service';
import { EscalaCategoria } from '../../interfaces/escala-categoria';
import { JornadaLaboralService } from '../../services/jornada-laboral.service';
import { JornadaLaboral } from '../../interfaces/jornada-laboral';
import { PersonaService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BuscarCentroLaboralDialogComponent } from '../../components/buscar-centro-laboral-dialog/buscar-centro-laboral-dialog.component';
import { VCentroLaboral } from '../../interfaces/v-centro-laboral';
import { Archivo } from '../../interfaces/archivo';
import { ConfigService } from '../../core/services/config.service';
import { CargoLaboralService } from '../../services/cargo-laboral.service';
import { CargoLaboral } from '../../interfaces/cargo-laboral';

@Component({
  selector: 'app-apertura-legajo',
  templateUrl: './apertura-legajo.component.html',
  styleUrls: ['./apertura-legajo.component.css']
})
export class AperturaLegajoComponent implements OnInit {
  legajoForm: FormGroup;
  tiposApertura: TipoAperturaLegajo[] = [];
  tiposDocumento: TipoDocumento[] = [];
  tiposDocumentoIdentificacion: TipoDocumentoIdentificacion[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  accionesVinculacion: AccionVinculacion[] = [];
  motivosAccionVinculacion: MotivoAccionVinculacion[] = [];
  condicionesLaborales: CondicionLaboral[] = [];
  situacionesLaborales: VCondicionLaboralSituacionLaboral[] = [];
  tiposServidor: TipoServidor[] = [];
  escalaCategorias: EscalaCategoria[] = [];
  jornadasLaborales: JornadaLaboral[] = [];
  mostrarFormulario = false;
  centroLaboralSeleccionado?: VCentroLaboral;
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
  archivoSeleccionado?: Archivo;
  cargosLaborales: CargoLaboral[] = [];

  sexoOpciones = [
    { valor: 'M', descripcion: 'MASCULINO' },
    { valor: 'F', descripcion: 'FEMENINO' },
    { valor: 'O', descripcion: 'OTROS' }
  ];

  constructor(
    private legajoService: LegajoService,
    private fb: FormBuilder,
    private tipoAperturaService: TipoAperturaLegajoService,
    private tipoDocumentoService: TipoDocumentoService,
    private tipoDocumentoIdentificacionService: TipoDocumentoIdentificacionService,
    private regimenLaboralService: RegimenLaboralService,
    private accionVinculacionService: AccionVinculacionService,
    private motivoAccionVinculacionService: MotivoAccionVinculacionService,
    private condicionLaboralService: CondicionLaboralService,
    private vCondicionLaboralSituacionLaboralService: VCondicionLaboralSituacionLaboralService,
    private tipoServidorService: TipoServidorService,
    private escalaCategoriaService: EscalaCategoriaService,
    private jornadaLaboralService: JornadaLaboralService,
    private personaService: PersonaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    public configService: ConfigService,
    private cargoLaboralService: CargoLaboralService
  ) {
    this.legajoForm = this.fb.group({
      iLegId: [null],
      iPersId: [null],
      iRegLabId: [null, Validators.required],
      iRegLabIdView: [{ value: null, disabled: true }],
      iCondLabId: [null, Validators.required],
      iAccVincId: [{ value: null, disabled: true }],
      iMotAccVincId: [{ value: null, disabled: true }],
      iEscCatId: [null, Validators.required],
      iEscCatIdView: [{ value: null, disabled: true }],
      iSitLabId: [{ value: null, disabled: true }, Validators.required],
      iTipoSerId: [null, Validators.required],
      iJorLabId: [null, Validators.required],
      iTipoAperLegId: [1],
      iTipoDocId: [null, Validators.required],
      iTipoIdentId: [null],
      cLegNumeroDocumentoIdentida: [''],
      cLegPrimerApellido: ['', Validators.required],
      cLegSegundoApellido: ['', Validators.required],
      cLegNombres: ['', Validators.required],
      dtLegFechaNacimiento: [null, Validators.required],
      cLegTelefonoPrincipal: [''],
      cLegTelefonoMovil: [''],
      cLegCorreoElectronicoPersonal: [''],
      cLegCorreoElectronicoLaboral: [''],
      cLegContactoEmergenciaNombre: [''],
      cLegContactoEmergenciaTelefonoFijo: [''],
      cLegContactoEmergenciaTelefonoMovil: [''],
      bLegLicenciadoFaa: [false],
      iTipoEstCivId: [null],
      cLegSexo: ['', Validators.required],
      dtLegFechaFallecido: [null],
      iPaisId: [null],
      iDptoId: [null],
      iPrvnId: [null],
      iDsttId: [null],
      numeroDocumento: [''],
      codigoModularIE: [''],
      iCentLabId: [null],
      cLegCodigoPlaza: [''],
      cUseZonaSubRegion: [''],
      cLegCargo: ['', Validators.required],
      bVincLabMandatoJudicial: [false],
      dtVincLabFechaInicio: [null],
      dtVincLabFechaFin: [null],
      cLegAnotaciones: [''],
      cVincLabNumeroDocumento: [''],
      dtVincLabFechaDocumento: [null],
    });

    this.legajoForm.get('iCondLabId')?.valueChanges.subscribe(condicionId => {
      const situacionControl = this.legajoForm.get('iSitLabId');
      
      if (condicionId) {
        situacionControl?.enable();
        this.cargarSituacionesPorCondicion(condicionId);
      } else {
        situacionControl?.disable();
        situacionControl?.setValue(null);
        this.situacionesLaborales = [];
      }
    });

    this.legajoForm.get('iRegLabId')?.valueChanges.subscribe(regimenId => {
      const accionControl = this.legajoForm.get('iAccVincId');
      const motivoControl = this.legajoForm.get('iMotAccVincId');
      
      accionControl?.setValue(null);
      motivoControl?.setValue(null);
      
      if (regimenId) {
        accionControl?.enable();
        this.cargarAccionesPorRegimen(regimenId);
      } else {
        accionControl?.disable();
        motivoControl?.disable();
        this.accionesVinculacion = [];
        this.motivosAccionVinculacion = [];
      }
    });

    this.legajoForm.get('iAccVincId')?.valueChanges.subscribe(accionId => {
      const motivoControl = this.legajoForm.get('iMotAccVincId');
      
      if (accionId) {
        motivoControl?.enable();
        this.cargarMotivosPorAccion(accionId);
      } else {
        motivoControl?.disable();
        motivoControl?.setValue(null);
        this.motivosAccionVinculacion = [];
      }
    });

    this.legajoForm.get('iRegLabId')?.valueChanges.subscribe(value => {
      this.legajoForm.get('iRegLabIdView')?.setValue(value);
    });

    this.legajoForm.get('iRegLabId')?.valueChanges.subscribe(regimenId => {
      const escalaCatControl = this.legajoForm.get('iEscCatId');
      const escalaCatViewControl = this.legajoForm.get('iEscCatIdView');
      
      if (this.configService.tieneEscalaCategoriaGrupo(regimenId)) {
        escalaCatControl?.enable();
        this.cargarEscalaCategoriasPorRegimen(regimenId);
      } else {
        escalaCatControl?.disable();
        escalaCatControl?.setValue(null);
        escalaCatViewControl?.setValue(null);
        this.escalaCategorias = [];
      }
    });

    this.legajoForm.get('iEscCatId')?.valueChanges.subscribe(value => {
      this.legajoForm.get('iEscCatIdView')?.setValue(value);
    });

    const escalaCatViewControl = this.legajoForm.get('iEscCatIdView');
    escalaCatViewControl?.disable();
  }

  ngOnInit() {
    this.cargarTiposApertura();
    this.cargarTiposDocumento();
    this.cargarTiposDocumentoIdentificacion();
    this.cargarRegimenesLaborales();
    this.cargarAccionesVinculacion();
    this.cargarMotivosAccionVinculacion();
    this.cargarCondicionesLaborales();
    this.cargarSituacionesLaborales();
    this.cargarTiposServidor();
    this.cargarEscalaCategorias();
    this.cargarJornadasLaborales();
    this.cargarCargosLaborales();
  }

  private cargarTiposApertura(): void {
    this.tipoAperturaService.getAll().subscribe({
      next: (tipos) => this.tiposApertura = tipos,
      error: (error) => console.error('Error al cargar tipos de apertura:', error)
    });
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe({
      next: (tipos) => this.tiposDocumento = tipos,
      error: (error) => console.error('Error al cargar tipos de documento:', error)
    });
  }

  private cargarTiposDocumentoIdentificacion(): void {
    this.tipoDocumentoIdentificacionService.getAll().subscribe({
      next: (tipos) => this.tiposDocumentoIdentificacion = tipos,
      error: (error) => console.error('Error al cargar tipos de documento de identificación:', error)
    });
  }

  private cargarRegimenesLaborales(): void {
    this.regimenLaboralService.getAll().subscribe({
      next: (regimenes) => this.regimenesLaborales = regimenes,
      error: (error) => console.error('Error al cargar regímenes laborales:', error)
    });
  }

  private cargarAccionesVinculacion(): void {
    this.accionVinculacionService.getAll().subscribe({
      next: (acciones) => this.accionesVinculacion = acciones,
      error: (error) => console.error('Error al cargar acciones de vinculación:', error)
    });
  }

  private cargarMotivosAccionVinculacion(): void {
    this.motivoAccionVinculacionService.getAll().subscribe({
      next: (motivos) => this.motivosAccionVinculacion = motivos,
      error: (error) => console.error('Error al cargar motivos de acción vinculación:', error)
    });
  }

  private cargarCondicionesLaborales(): void {
    this.condicionLaboralService.getAll().subscribe({
      next: (condiciones) => this.condicionesLaborales = condiciones,
      error: (error) => console.error('Error al cargar condiciones laborales:', error)
    });
  }

  private cargarSituacionesLaborales(): void {
    this.vCondicionLaboralSituacionLaboralService.getAll().subscribe({
      next: (situaciones) => this.situacionesLaborales = situaciones,
      error: (error) => console.error('Error al cargar situaciones laborales:', error)
    });
  }

  private cargarTiposServidor(): void {
    this.tipoServidorService.getAll().subscribe({
      next: (tipos) => this.tiposServidor = tipos,
      error: (error) => console.error('Error al cargar tipos de servidor:', error)
    });
  }

  private cargarEscalaCategorias(): void {
    this.escalaCategoriaService.getAll().subscribe({
      next: (categorias) => this.escalaCategorias = categorias,
      error: (error) => console.error('Error al cargar escalas categorías:', error)
    });
  }

  private cargarJornadasLaborales(): void {
    this.jornadaLaboralService.getAll().subscribe({
      next: (jornadas) => this.jornadasLaborales = jornadas,
      error: (error) => console.error('Error al cargar jornadas laborales:', error)
    });
  }

  private cargarCargosLaborales(): void {
    this.cargoLaboralService.getAll().subscribe({
      next: (cargos) => this.cargosLaborales = cargos,
      error: (error) => console.error('Error al cargar cargos laborales:', error)
    });
  }

  private cargarSituacionesPorCondicion(condicionId: number): void {
    this.vCondicionLaboralSituacionLaboralService.getAll({
      campo: 'iCondLabId',
      valor: condicionId.toString()
    }).subscribe({
      next: (situaciones) => {
        this.situacionesLaborales = situaciones;
        if (situaciones.length === 1) {
          this.legajoForm.get('iSitLabId')?.setValue(situaciones[0].iSitLabId);
        }
      },
      error: (error) => {
        console.error('Error al cargar situaciones laborales:', error);
        this.situacionesLaborales = [];
      }
    });
  }

  private cargarMotivosPorAccion(accionId: number): void {
    this.motivoAccionVinculacionService.getAll({
      campo: 'iAccVincId',
      valor: accionId.toString()
    }).subscribe({
      next: (motivos) => {
        this.motivosAccionVinculacion = motivos;
        if (motivos.length === 1) {
          this.legajoForm.get('iMotAccVincId')?.setValue(motivos[0].iMotAccVincId);
        }
      },
      error: (error) => {
        console.error('Error al cargar motivos de acción:', error);
        this.motivosAccionVinculacion = [];
      }
    });
  }

  private cargarAccionesPorRegimen(regimenId: number): void {
    this.accionVinculacionService.getAll({
      campo: 'iRegLabId',
      valor: regimenId.toString()
    }).subscribe({
      next: (acciones) => {
        this.accionesVinculacion = acciones;
        if (acciones.length === 1) {
          this.legajoForm.get('iAccVincId')?.setValue(acciones[0].iAccVincId);
        }
      },
      error: (error) => {
        console.error('Error al cargar acciones de vinculación:', error);
        this.accionesVinculacion = [];
      }
    });
  }

  private cargarEscalaCategoriasPorRegimen(regimenId: number): void {
    this.escalaCategoriaService.getAll({
      campo: 'iRegLabId',
      valor: regimenId.toString()
    }).subscribe({
      next: (categorias) => {
        this.escalaCategorias = categorias;
        if (categorias.length === 1) {
          const value = categorias[0].iEscCatId;
          this.legajoForm.get('iEscCatId')?.setValue(value);
          this.legajoForm.get('iEscCatIdView')?.setValue(value);
        }
      },
      error: (error) => {
        console.error('Error al cargar escalas categorías:', error);
        this.escalaCategorias = [];
      }
    });
  }

  guardarLegajo(): void {
    if (this.legajoForm.valid) {
      const formValues = this.legajoForm.getRawValue();
      
      if (this.centroLaboralSeleccionado) {
        formValues.iCentLabId = this.centroLaboralSeleccionado.iCentLabId;
      }
      
      const { numeroDocumento, codigoModularIE, ...legajoData } = formValues;
      
      this.legajoService.create(legajoData).subscribe({
        next: (response) => {
          if (response?.iLegId) {
            const legajoId = response.iLegId;
            this.snackBar.open(
              `Legajo creado correctamente. ID: ${legajoId}`,
              'Cerrar',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            );
            setTimeout(() => {
              this.legajoService.getById(legajoId).subscribe({
                next: (legajo) => {
                  this.router.navigate(['/principal/legajo', legajoId]);
                },
                error: (error) => {
                  console.error('Error al verificar el legajo:', error);
                  this.snackBar.open('Error al verificar el legajo creado', 'Cerrar', {
                    duration: 3000
                  });
                }
              });
            }, 1000);
          } else {
            console.error('Respuesta del servidor sin ID de legajo');
            this.snackBar.open('Error: Respuesta del servidor incompleta', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        },
        error: (error) => {
          console.error('Error al guardar el legajo', error);
          this.snackBar.open('Error al crear el legajo', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    } else {
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      
      Object.keys(this.legajoForm.controls).forEach(key => {
        const control = this.legajoForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  buscarPersona(): void {
    const tipoDocumento = this.legajoForm.get('iTipoIdentId')?.value;
    const numeroDocumento = this.legajoForm.get('numeroDocumento')?.value;

    if (!tipoDocumento || !numeroDocumento) {
        this.snackBar.open('Por favor, ingrese el tipo y número de documento', 'Cerrar', {
            duration: 3000
        });
        return;
    }

    this.mostrarFormulario = true;

    const params = {
        campo: 'cPersDocumento',
        valor: numeroDocumento
    };

    this.personaService.getAll(params).subscribe({
        next: (personas) => {
            if (personas && personas.length > 0) {
                const persona = personas[0];
                this.legajoForm.patchValue({
                    cLegPrimerApellido: persona.cPersPaterno || '',
                    cLegSegundoApellido: persona.cPersMaterno || '',
                    cLegNombres: persona.cPersNombre || '',
                    dtLegFechaNacimiento: persona.dPersNacimiento || null,
                    iPersId: persona.iPersId,
                    iTipoIdentIdPrincipal: tipoDocumento,
                    cLegNumeroDocumentoIdentida: numeroDocumento
                });
                this.snackBar.open('Persona encontrada', 'Cerrar', {
                    duration: 3000
                });
            } else {
                this.snackBar.open('No se encontró ninguna persona. Por favor, complete los datos manualmente.', 'Cerrar', {
                    duration: 3000
                });
                this.legajoForm.patchValue({
                    iPersId: null,
                    iTipoIdentIdPrincipal: tipoDocumento,
                    cLegNumeroDocumentoIdentida: numeroDocumento
                });
            }
        },
        error: (error) => {
            this.snackBar.open('Error al buscar la persona. Por favor, complete los datos manualmente.', 'Cerrar', {
                duration: 3000
            });
        }
    });
  }

  buscarCentroLaboral() {
    const dialogRef = this.dialog.open(BuscarCentroLaboralDialogComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.centroLaboralSeleccionado = result;
        this.legajoForm.patchValue({
          codigoModularIE: result.cCentLabCodigoModular,
          iCentLabId: result.iCentLabId
        });
        this.actualizarInformacionCentroLaboral(result);
      }
    });
  }

  private actualizarInformacionCentroLaboral(centro: VCentroLaboral) {
    this.centroLaboralInfo = {
      centroLaboral: centro.cCentLabNombre || '',
      modalidadEducativa: centro.cModEduNombre || '',
      region: centro.cDirRegNombre || '',
      instanciaGestion: centro.cInstGeEduNombre || ''
    };
  }

  onArchivoSeleccionado(archivo: Archivo): void {
    this.archivoSeleccionado = archivo;
    if (archivo?.iArchId) {
      this.legajoForm.patchValue({
        iArchId: archivo.iArchId
      });
    }
  }

  public tieneEscalaCategoriaGrupo(regimenId: number | undefined): boolean {
    return this.configService.tieneEscalaCategoriaGrupo(regimenId);
  }
}