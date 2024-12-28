import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoDireccionService } from '../../../services/tipo-direccion.service';
import { ZonaService } from '../../../services/zona.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoDireccion } from '../../../interfaces/tipo-direccion';
import { Zona } from '../../../interfaces/zona';
import { TipoViaService } from '../../../services/tipo-via.service';
import { TipoVia } from '../../../interfaces/tipo-via';
import { DepartamentoService } from '../../../services/departamento.service';
import { Departamento } from '../../../interfaces/departamento';
import { ProvinciaService } from '../../../services/provincia.service';
import { Provincia } from '../../../interfaces/provincia';
import { DistritoService } from '../../../services/distrito.service';
import { Distrito } from '../../../interfaces/distrito';
import { VLegajoService } from '../../../services/v-legajo.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { FormsModule } from '@angular/forms';
import { TipoEstadoCivilService } from '../../../services/tipo-estado-civil.service';
import { TipoEstadoCivil } from '../../../interfaces/tipo-estado-civil';
import { LegajoService } from '../../../services/legajo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Legajo } from '../../../interfaces/legajo';
import { PaisService } from '../../../services/pais.service';
import { Pais } from '../../../interfaces/pais';
import { ConfigService } from '../../../core/services/config.service';
import { InfopefamiliarDomicilioService } from '../../../services/infopefamiliar-domicilio.service';
import { InfopefamiliarDomicilio } from '../../../interfaces/infopefamiliar-domicilio';
import { Archivo } from '../../../interfaces/archivo';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {
  tiposDireccion: TipoDireccion[] = [];
  domicilioForm: FormGroup;
  zonas: Zona[] = [];
  tiposVia: TipoVia[] = [];
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  legajo: VLegajo | null = null;
  loading = true;
  error: string | null = null;
  estadosCiviles: TipoEstadoCivil[] = [];
  informacionPersonalForm: FormGroup;
  paises: Pais[] = [];
  provinciasNacimiento: Provincia[] = [];
  distritosNacimiento: Distrito[] = [];
  fotoUrl: string | null = null;
  token: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private vLegajoService: VLegajoService,
    private tipoDireccionService: TipoDireccionService,
    private zonaService: ZonaService,
    private fb: FormBuilder,
    private tipoViaService: TipoViaService,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private tipoEstadoCivilService: TipoEstadoCivilService,
    private legajoService: LegajoService,
    private snackBar: MatSnackBar,
    private paisService: PaisService,
    private configService: ConfigService,
    private infopefamiliarDomicilioService: InfopefamiliarDomicilioService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.token = this.authService.getToken();

    this.domicilioForm = this.fb.group({
      iTipDirId: [''],
      iZonaId: ['']
    });

    this.informacionPersonalForm = this.fb.group({
      cLegNumeroDocumentoIdentida: [''],
      cLegNombres: [''],
      cLegPrimerApellido: [''],
      cLegSegundoApellido: [''],
      iTipoEstCivId: [null, Validators.required],
      cLegSexo: [null, Validators.required],
      cLegTelefonoPrincipal: [''],
      cLegTelefonoMovil: [''],
      cLegCorreoElectronicoPersonal: ['', [Validators.email]],
      cLegCorreoElectronicoLaboral: ['', [Validators.email]],
      cLegContactoEmergenciaNombre: [''],
      cLegContactoEmergenciaTelefonoFijo: [''],
      cLegContactoEmergenciaTelefonoMovil: [''],
      bLegTieneDiscapacidad: [false],
      cLegEntidadEmisoraDiscapacidad: [''],
      cLegNumeroDocumentoDiscapacidad: [''],
      dLegFechaEmisionDocumentoDiscapacidad: [null],
      cLegNombreDiscapacidad: [''],
      cLegGradoDiscapacidad: [''],
      iArchIdDiscapacidad: [null],
      cLegAnotaciones: [''],
      bLegLicenciadoFaa: [false],
      cLegConstanciaFaa: [''],
      iArchIdFaa: [null],
      dtLegFechaFallecido: [null],
      dtLegFechaNacimiento: [null],
      iDptoIdDireccion: [null],
      iPrvnIdDireccion: [null],
      iDsttIdDireccion: [null],
      iPaisId: [this.configService.getDefaultPaisId()],
      cLegDireccion: [''],
      iDptoIdNacimiento: [null],
      iPrvnIdNacimiento: [null],
      iDsttIdNacimiento: [null],
      iPaisIdNacimiento: [this.configService.getDefaultPaisId()],
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      console.log('=== Iniciando carga de datos de referencia ===');

      // 1. Primero cargamos todos los datos de referencia en paralelo
      await Promise.all([
        this.cargarDepartamentos(),
        this.cargarPaises(),
        this.cargarTiposDireccion(),
        this.cargarZonas(),
        this.cargarTiposVia(),
        this.cargarEstadosCiviles()
      ]);

      console.log('=== Datos de referencia cargados ===');
      console.log('Departamentos:', this.departamentos);
      console.log('Países:', this.paises);
      console.log('Tipos de dirección:', this.tiposDireccion);
      console.log('Zonas:', this.zonas);
      console.log('Tipos de vía:', this.tiposVia);
      console.log('Estados civiles:', this.estadosCiviles);

      // 2. Luego cargamos el legajo
      this.route.params.subscribe(params => {
        const legajoId = +params['id'];
        if (legajoId) {
          console.log('Cargando legajo:', legajoId);
          this.cargarLegajo(legajoId).then(() => {
            this.cargarFotoExistente();
          });
        }
      });

    } catch (error) {
      console.error('Error en la inicialización:', error);
      this.error = 'Error al cargar los datos iniciales';
    } finally {
      this.loading = false;
    }
  }

  private cargarTiposDireccion(): Promise<void> {
    return new Promise((resolve) => {
      this.tipoDireccionService.getAll().subscribe({
        next: (tipos) => {
          this.tiposDireccion = tipos;
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar tipos de dirección:', error);
          resolve();
        }
      });
    });
  }

  private cargarZonas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.zonaService.getAll().subscribe({
        next: (zonas) => {
          this.zonas = zonas;
          console.log('Zonas cargadas:', this.zonas);
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar zonas:', error);
          reject(error);
        }
      });
    });
  }

  private cargarTiposVia(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tipoViaService.getAll().subscribe({
        next: (data) => {
          this.tiposVia = data;
          console.log('Tipos de vía cargados:', this.tiposVia);
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar tipos de vía:', error);
          reject(error);
        }
      });
    });
  }

  private cargarDepartamentos(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.departamentoService.getAll().subscribe({
        next: (departamentos) => {
          this.departamentos = departamentos;
          console.log('Departamentos cargados:', this.departamentos);
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar departamentos:', error);
          reject(error);
        }
      });
    });
  }

  private cargarPaises(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.paisService.getAll().subscribe({
        next: (paises) => {
          this.paises = paises;
          console.log('Países cargados:', this.paises);
          if (!this.informacionPersonalForm.get('iPaisId')?.value) {
            this.informacionPersonalForm.patchValue({
              iPaisId: this.configService.getDefaultPaisId()
            });
          }
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar países:', error);
          reject(error);
        }
      });
    });
  }

  private cargarProvincias(): void {
    this.provinciaService.getAll()
      .subscribe({
        next: (provincias) => {
          this.provincias = provincias;
          console.log('Provincias cargadas:', this.provincias);
        },
        error: (error) => {
          console.error('Error al cargar provincias:', error);
        }
      });
  }

  cargarDistritos(): void {
    this.distritoService.getAll()
      .subscribe({
        next: (distritos) => {
          this.distritos = distritos;
          console.log('Distritos cargados:', this.distritos);
        },
        error: (error) => {
          console.error('Error al cargar distritos:', error);
        }
      });
  }

  private cargarLegajo(id: number): Promise<void> {
    this.loading = true;
    this.error = null;
    return new Promise((resolve) => {
      this.cargarDatosLegajo(id);
      resolve();
    });
  }

  private cargarDatosLegajo(id: number): void {
    this.vLegajoService.getById(id).subscribe({
      next: (data: VLegajo) => {
        console.log('Datos del legajo cargados:', data);
        this.legajo = data;

        if (this.legajo?.iTipoEstCivId) {
          const estadoCivilEncontrado = this.estadosCiviles.find(
            ec => ec.iTipoEstCivId == this.legajo?.iTipoEstCivId
          );
          console.log('Estado civil encontrado:', estadoCivilEncontrado);
        }

        this.actualizarFormularioConDatosLegajo();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar el legajo:', error);
        this.error = 'Error al cargar los datos del legajo';
        this.loading = false;
        this.snackBar.open('Error al cargar los datos del legajo', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  private cargarEstadosCiviles(): Promise<void> {
    return new Promise((resolve) => {
      this.tipoEstadoCivilService.getAll()
        .subscribe({
          next: (estados) => {
            this.estadosCiviles = estados;
            console.log('Estados civiles cargados:', this.estadosCiviles);
            resolve();
          },
          error: (error) => {
            console.error('Error al cargar tipos de estado civil:', error);
            resolve();
          }
        });
    });
  }

  private actualizarFormularioConDatosLegajo(): void {
    if (this.legajo && this.informacionPersonalForm) {
      console.log('Datos del legajo a cargar:', {
        estadoCivil: this.legajo.iTipoEstCivId,
        sexo: this.legajo.cLegSexo
      });

      this.informacionPersonalForm.patchValue({
        iTipoEstCivId: this.legajo.iTipoEstCivId || null,
        cLegSexo: this.legajo.cLegSexo || null,
        cLegNumeroDocumentoIdentida: this.legajo.cLegNumeroDocumentoIdentida,
        cLegNombres: this.legajo.cLegNombres,
        cLegPrimerApellido: this.legajo.cLegPrimerApellido,
        cLegSegundoApellido: this.legajo.cLegSegundoApellido,
        cLegTelefonoPrincipal: this.legajo.cLegTelefonoPrincipal,
        cLegTelefonoMovil: this.legajo.cLegTelefonoMovil,
        cLegCorreoElectronicoPersonal: this.legajo.cLegCorreoElectronicoPersonal,
        cLegCorreoElectronicoLaboral: this.legajo.cLegCorreoElectronicoLaboral,
        cLegContactoEmergenciaNombre: this.legajo.cLegContactoEmergenciaNombre,
        cLegContactoEmergenciaTelefonoFijo: this.legajo.cLegContactoEmergenciaTelefonoFijo,
        cLegContactoEmergenciaTelefonoMovil: this.legajo.cLegContactoEmergenciaTelefonoMovil,
        bLegTieneDiscapacidad: Boolean(this.legajo.bLegTieneDiscapacidad),
        cLegEntidadEmisoraDiscapacidad: this.legajo.cLegEntidadEmisoraDiscapacidad,
        cLegNumeroDocumentoDiscapacidad: this.legajo.cLegNumeroDocumentoDiscapacidad,
        dLegFechaEmisionDocumentoDiscapacidad: this.legajo.dLegFechaEmisionDocumentoDiscapacidad,
        cLegNombreDiscapacidad: this.legajo.cLegNombreDiscapacidad,
        cLegGradoDiscapacidad: this.legajo.cLegGradoDiscapacidad,
        iArchIdDiscapacidad: this.legajo.iArchIdDiscapacidad || null,
        dtLegFechaFallecido: this.legajo.dtLegFechaFallecido,
        dtLegFechaNacimiento: this.legajo.dtLegFechaNacimiento,
        iDptoIdDireccion: this.legajo.iDptoIdDireccion,
        iPrvnIdDireccion: this.legajo.iPrvnIdDireccion,
        iDsttIdDireccion: this.legajo.iDsttIdDireccion,
        iPaisIdNacimiento: this.legajo.iPaisIdNacimiento,
        iDptoIdNacimiento: this.legajo.iDptoIdNacimiento,
        iPrvnIdNacimiento: this.legajo.iPrvnIdNacimiento,
        iDsttIdNacimiento: this.legajo.iDsttIdNacimiento,
        cLegAnotaciones: this.legajo.cLegAnotaciones,
        bLegLicenciadoFaa: Boolean(this.legajo.bLegLicenciadoFaa),
        iArchIdFaa: this.legajo.iArchIdFaa || null,
        cLegConstanciaFaa: this.legajo.cLegConstanciaFaa || null,
      }, { 
        emitEvent: false,
        onlySelf: true
      });

      // Forzar detección de cambios
      this.cdr.detectChanges();

      // 2. Manejamos la cascada de departamento-provincia-distrito
      if (this.legajo.iDptoIdDireccion) {
        // Primero establecemos el departamento
        this.informacionPersonalForm.patchValue({
          iDptoIdDireccion: this.legajo.iDptoIdDireccion
        }, { emitEvent: false });

        // Luego cargamos las provincias
        this.provinciaService.getAll({
          campo: 'iDptoId',
          valor: this.legajo.iDptoIdDireccion.toString()
        }).subscribe({
          next: (provincias) => {
            this.provincias = provincias;
            console.log('Provincias cargadas:', provincias);

            // Una vez que tenemos las provincias, establecemos la provincia
            if (this.legajo?.iPrvnIdDireccion) {
              this.informacionPersonalForm.patchValue({
                iPrvnIdDireccion: this.legajo.iPrvnIdDireccion
              }, { emitEvent: false });

              // Cargamos los distritos
              this.distritoService.getAll({
                campo: 'iPrvnId',
                valor: this.legajo.iPrvnIdDireccion.toString()
              }).subscribe({
                next: (distritos) => {
                  this.distritos = distritos;
                  console.log('Distritos cargados:', distritos);

                  // Finalmente establecemos el distrito
                  if (this.legajo?.iDsttIdDireccion) {
                    this.informacionPersonalForm.patchValue({
                      iDsttIdDireccion: this.legajo.iDsttIdDireccion
                    }, { emitEvent: false });
                  }

                  // Verificamos los valores establecidos
                  console.log('=== Valores establecidos ===');
                  console.log('Departamento:', this.informacionPersonalForm.get('iDptoIdDireccion')?.value);
                  console.log('Provincia:', this.informacionPersonalForm.get('iPrvnIdDireccion')?.value);
                  console.log('Distrito:', this.informacionPersonalForm.get('iDsttIdDireccion')?.value);
                }
              });
            }
          }
        });
      }

      // 3. Hacemos lo mismo para los campos de nacimiento
      if (this.legajo.iDptoIdNacimiento) {
        this.informacionPersonalForm.patchValue({
          iDptoIdNacimiento: this.legajo.iDptoIdNacimiento
        }, { emitEvent: false });

        this.provinciaService.getAll({
          campo: 'iDptoId',
          valor: this.legajo.iDptoIdNacimiento.toString()
        }).subscribe({
          next: (provincias) => {
            this.provinciasNacimiento = provincias;

            if (this.legajo?.iPrvnIdNacimiento) {
              this.informacionPersonalForm.patchValue({
                iPrvnIdNacimiento: this.legajo.iPrvnIdNacimiento
              }, { emitEvent: false });

              this.distritoService.getAll({
                campo: 'iPrvnId',
                valor: this.legajo.iPrvnIdNacimiento.toString()
              }).subscribe({
                next: (distritos) => {
                  this.distritosNacimiento = distritos;

                  if (this.legajo?.iDsttIdNacimiento) {
                    this.informacionPersonalForm.patchValue({
                      iDsttIdNacimiento: this.legajo.iDsttIdNacimiento
                    }, { emitEvent: false });
                  }
                }
              });
            }
          }
        });
      }
    }
  }

  guardarDatosPersonales(): void {
    if (!this.legajo?.iLegId) return;

    const formValues = this.informacionPersonalForm.value;
    
    const datosActualizados: Partial<Legajo> = {
      iTipoDocId: this.legajo.iTipoDocId,
      iTipoAperLegId: this.legajo.iTipoAperLegId,
      iPersId: this.legajo.iPersId,
      iRegLabId: this.legajo.iRegLabId,
      iAccVincId: this.legajo.iAccVincId,
      iMotAccVincId: this.legajo.iMotAccVincId,
      iEscCatId: this.legajo.iEscCatId,
      iCondLabId: this.legajo.iCondLabId,
      iCentLabId: this.legajo.iCentLabId,
      iSitLabId: this.legajo.iSitLabId,
      iTipoSerId: this.legajo.iTipoSerId,
      cLegCodigoPlaza: this.legajo.cLegCodigoPlaza,
      cUseZonaSubRegion: this.legajo.cUseZonaSubRegion,
      iCargLabId: this.legajo.iCargLabId,
      cLegCargo: this.legajo.cLegCargo,
      iJorLabId: this.legajo.iJorLabId,
      iTipoEstCivId: formValues.iTipoEstCivId,
      cLegSexo: formValues.cLegSexo,
      cLegDireccion: formValues.cLegDireccion,
      iDptoIdDireccion: formValues.iDptoIdDireccion,
      iPrvnIdDireccion: formValues.iPrvnIdDireccion,
      iDsttIdDireccion: formValues.iDsttIdDireccion,
      dtLegFechaNacimiento: formValues.dtLegFechaNacimiento,
      iPaisIdNacimiento: formValues.iPaisIdNacimiento,
      iDptoIdNacimiento: formValues.iDptoIdNacimiento,
      iPrvnIdNacimiento: formValues.iPrvnIdNacimiento,
      iDsttIdNacimiento: formValues.iDsttIdNacimiento,
      dtLegFechaFallecido: formValues.dtLegFechaFallecido,
      cLegContactoEmergenciaNombre: formValues.cLegContactoEmergenciaNombre,
      cLegContactoEmergenciaTelefonoFijo: formValues.cLegContactoEmergenciaTelefonoFijo,
      cLegContactoEmergenciaTelefonoMovil: formValues.cLegContactoEmergenciaTelefonoMovil,
      cLegTelefonoPrincipal: formValues.cLegTelefonoPrincipal,
      cLegTelefonoMovil: formValues.cLegTelefonoMovil,
      cLegCorreoElectronicoPersonal: formValues.cLegCorreoElectronicoPersonal,
      cLegCorreoElectronicoLaboral: formValues.cLegCorreoElectronicoLaboral,
      // Campos de discapacidad
      bLegTieneDiscapacidad: Boolean(formValues.bLegTieneDiscapacidad),
      cLegEntidadEmisoraDiscapacidad: formValues.cLegEntidadEmisoraDiscapacidad || null,
      cLegNumeroDocumentoDiscapacidad: formValues.cLegNumeroDocumentoDiscapacidad || null,
      dLegFechaEmisionDocumentoDiscapacidad: formValues.dLegFechaEmisionDocumentoDiscapacidad,
      cLegNombreDiscapacidad: formValues.cLegNombreDiscapacidad || null,
      cLegGradoDiscapacidad: formValues.cLegGradoDiscapacidad || null,
      iArchIdDiscapacidad: formValues.iArchIdDiscapacidad || null,
      cLegAnotaciones: formValues.cLegAnotaciones,
      // Campos de FAA
      bLegLicenciadoFaa: Boolean(formValues.bLegLicenciadoFaa),
      cLegConstanciaFaa: formValues.cLegConstanciaFaa || null,
      iArchIdFaa: formValues.iArchIdFaa || null,
      iArchIdFoto: this.legajo.iArchIdFoto
    };

    console.log('Datos de discapacidad a guardar:', {
      tiene: formValues.bLegTieneDiscapacidad,
      entidad: formValues.cLegEntidadEmisoraDiscapacidad,
      numero: formValues.cLegNumeroDocumentoDiscapacidad,
      fecha: formValues.dLegFechaEmisionDocumentoDiscapacidad,
      nombre: formValues.cLegNombreDiscapacidad,
      grado: formValues.cLegGradoDiscapacidad,
      archivo: formValues.iArchIdDiscapacidad
    });

    this.legajoService.update(this.legajo.iLegId, datosActualizados)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.snackBar.open('Datos guardados correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.cargarLegajo(this.legajo!.iLegId!);
        },
        error: (error) => {
          console.error('Error detallado al guardar:', error);
          this.snackBar.open(`Error al guardar los datos: ${error.error?.message || 'Error desconocido'}`, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
  }

  onEstadoCivilChange(event: any): void {
    const estadoCivilControl = this.informacionPersonalForm.get('iTipoEstCivId');
    if (estadoCivilControl) {
      estadoCivilControl.setValue(event.value);
    }
  }

  compareEstadoCivil(value1: any, value2: any): boolean {
    // Convertimos ambos valores a string para la comparación
    const val1 = value1?.toString();
    const val2 = value2?.toString();
    console.log('Comparando estados civiles:', val1, val2, val1 === val2);
    return val1 === val2;
  }

  // Método para cuando cambia el departamento
  onDepartamentoChange(event: any): void {
    const dptoId = event.value;
    // Resetear provincia y distrito
    this.informacionPersonalForm.patchValue({
      iPrvnId: null,
      iDsttId: null
    });
    
    // Limpiar las listas
    this.provincias = [];
    this.distritos = [];

    if (dptoId) {
      // Cargar provincias usando campo y valor
      this.provinciaService.getAll({
        campo: 'iDptoId',
        valor: dptoId.toString()
      }).subscribe({
        next: (provincias) => {
          this.provincias = provincias;
          console.log('Provincias filtradas por departamento:', this.provincias);
        },
        error: (error) => {
          console.error('Error al cargar provincias:', error);
        }
      });
    }
  }

  // Método para cuando cambia la provincia
  onProvinciaChange(event: any): void {
    const prvnId = event.value;
    // Resetear distrito
    this.informacionPersonalForm.patchValue({
      iDsttId: null
    });
    
    // Limpiar la lista de distritos
    this.distritos = [];

    if (prvnId) {
      // Cargar distritos usando campo y valor
      this.distritoService.getAll({
        campo: 'iPrvnId',
        valor: prvnId.toString()
      }).subscribe({
        next: (distritos) => {
          this.distritos = distritos;
          console.log('Distritos filtrados por provincia:', this.distritos);
        },
        error: (error) => {
          console.error('Error al cargar distritos:', error);
        }
      });
    }
  }

  // Método para cuando cambia el departamento en dirección principal
  onDepartamentoDireccionChange(event: any): void {
    console.log('=== Cambio de departamento ===');
    console.log('Valor seleccionado:', event.value);
    
    const dptoId = event.value;
    if (!dptoId) {
      console.log('No hay departamento seleccionado');
      return;
    }

    // Resetear provincia y distrito
    this.informacionPersonalForm.patchValue({
      iPrvnIdDireccion: null,
      iDsttIdDireccion: null
    });
    
    // Limpiar las listas
    this.provincias = [];
    this.distritos = [];

    console.log('Cargando provincias para departamento:', dptoId);
    this.provinciaService.getAll({
      campo: 'iDptoId',
      valor: dptoId.toString()
    }).subscribe({
      next: (provincias) => {
        this.provincias = provincias;
        console.log('Provincias cargadas:', this.provincias);
      },
      error: (error) => {
        console.error('Error al cargar provincias:', error);
      }
    });
  }

  // Método para cuando cambia la provincia en dirección principal
  onProvinciaDireccionChange(event: any): void {
    const prvnId = event.value;
    // Resetear distrito
    this.informacionPersonalForm.patchValue({
      iDsttIdDireccion: null
    });
    
    // Limpiar la lista de distritos
    this.distritos = [];

    if (prvnId) {
      this.distritoService.getAll({
        campo: 'iPrvnId',
        valor: prvnId.toString()
      }).subscribe({
        next: (distritos) => {
          this.distritos = distritos;
          console.log('Distritos filtrados por provincia (dirección):', this.distritos);
        },
        error: (error) => {
          console.error('Error al cargar distritos:', error);
        }
      });
    }
  }

  // Métodos para el lugar de nacimiento
  onDepartamentoNacimientoChange(event: any): void {
    const dptoId = event.value;
    this.informacionPersonalForm.patchValue({
      iPrvnIdNacimiento: null,
      iDsttIdNacimiento: null
    });
    
    // Limpiar las listas
    this.provinciasNacimiento = [];
    this.distritosNacimiento = [];

    if (dptoId) {
      this.provinciaService.getAll({
        campo: 'iDptoId',
        valor: dptoId.toString()
      }).subscribe({
        next: (provincias) => {
          this.provinciasNacimiento = provincias;
          console.log('Provincias de nacimiento filtradas:', this.provinciasNacimiento);
        },
        error: (error) => {
          console.error('Error al cargar provincias de nacimiento:', error);
        }
      });
    }
  }

  onProvinciaNacimientoChange(event: any): void {
    const prvnId = event.value;
    this.informacionPersonalForm.patchValue({
      iDsttIdNacimiento: null
    });
    
    // Limpiar la lista de distritos
    this.distritosNacimiento = [];

    if (prvnId) {
      this.distritoService.getAll({
        campo: 'iPrvnId',
        valor: prvnId.toString()
      }).subscribe({
        next: (distritos) => {
          this.distritosNacimiento = distritos;
          console.log('Distritos de nacimiento filtrados:', this.distritosNacimiento);
        },
        error: (error) => {
          console.error('Error al cargar distritos de nacimiento:', error);
        }
      });
    }
  }

  // Agregar un método para verificar los valores
  private verificarValoresFormulario(): void {
    const valores = this.informacionPersonalForm.value;
    console.log('=== Verificación de valores del formulario ===');
    console.log('Departamento:', valores.iDptoIdDireccion);
    console.log('Provincia:', valores.iPrvnIdDireccion);
    console.log('Distrito:', valores.iDsttIdDireccion);
    
    // Verificar que el departamento existe en la lista
    if (valores.iDptoIdDireccion) {
      const departamentoExiste = this.departamentos.some(d => d.iDptoId === valores.iDptoIdDireccion);
      console.log('¿El departamento existe en la lista?', departamentoExiste);
    }
  }

  // Agregar los métodos de comparación
  compareDepartamento(dpto1: any, dpto2: any): boolean {
    const val1 = dpto1?.toString();
    const val2 = dpto2?.toString();
    console.log('Comparando departamentos:', val1, val2, val1 === val2);
    return val1 === val2;
  }

  compareProvincia(prov1: any, prov2: any): boolean {
    const val1 = prov1?.toString();
    const val2 = prov2?.toString();
    console.log('Comparando provincias:', val1, val2, val1 === val2);
    return val1 === val2;
  }

  compareDistrito(dist1: any, dist2: any): boolean {
    const val1 = dist1?.toString();
    const val2 = dist2?.toString();
    console.log('Comparando distritos:', val1, val2, val1 === val2);
    return val1 === val2;
  }

  onArchivoDiscapacidadSelected(archivoId: number | undefined): void {
    this.informacionPersonalForm.patchValue({
      iArchIdDiscapacidad: archivoId ?? null
    }, { emitEvent: false });
  }

  onArchivoDiscapacidadDocumentoSelected(archivo: Archivo | undefined): void {
    this.informacionPersonalForm.patchValue({
      iArchIdDiscapacidad: archivo?.iArchId ?? null
    }, { emitEvent: false });
  }

  getArchivoDiscapacidadId(): number | null {
    return this.legajo ? this.legajo.iArchIdDiscapacidad || null : null;
  }

  onArchivoFaaSelected(archivoId: number | undefined): void {
    this.informacionPersonalForm.patchValue({
      iArchIdFaa: archivoId ?? null
    }, { emitEvent: false });
  }

  onArchivoFotoSelected(archivo: Archivo | undefined) {
    console.log('Foto seleccionada:', archivo);
    if (this.legajo) {
      this.legajo.iArchIdFoto = archivo?.iArchId;
    }
  }

  onArchivoFotoIdChange(id: number | undefined) {
    if (this.legajo) {
      this.legajo.iArchIdFoto = id;
    }
    console.log('Nuevo ID de foto:', id);
  }

  private cargarFotoExistente() {
    if (this.legajo?.iArchIdFoto) {
      this.http.get<any>(`/archivo-handler/${this.legajo.iArchIdFoto}`).subscribe({
        next: (response) => {
          if (response.status && response.data.cArchUuid) {
            this.fotoUrl = this.configService.getArchivoDownloadUrl(response.data.cArchUuid);
            console.log('Foto cargada url:', this.fotoUrl);
          }
        },
        error: (error) => {
          console.error('Error al cargar la foto:', error);
        }
      });
    }
  }

}
