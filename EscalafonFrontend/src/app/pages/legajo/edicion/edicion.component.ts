import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LegajoService } from '../../../services/legajo.service';
import { Legajo } from '../../../interfaces/legajo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoAperturaLegajoService } from '../../../services/tipo-apertura-legajo.service';
import { TipoDocumentoIdentificacionService } from '../../../services/tipo-documento-identificacion.service';
import { RegimenLaboralService } from '../../../services/regimen-laboral.service';
import { AccionVinculacionService } from '../../../services/accion-vinculacion.service';
import { MotivoAccionVinculacionService } from '../../../services/motivo-accion-vinculacion.service';
import { CondicionLaboralService } from '../../../services/condicion-laboral.service';
import { VCondicionLaboralSituacionLaboralService } from '../../../services/v-condicion-laboral-situacion-laboral.service';
import { TipoServidorService } from '../../../services/tipo-servidor.service';
import { EscalaCategoriaService } from '../../../services/escala-categoria.service';
import { JornadaLaboralService } from '../../../services/jornada-laboral.service';
import { CargoLaboralService } from '../../../services/cargo-laboral.service';
import { TipoAperturaLegajo } from '../../../interfaces/tipo-apertura-legajo';
import { TipoDocumentoIdentificacion } from '../../../interfaces/tipo-documento-identificacion';
import { RegimenLaboral } from '../../../interfaces/regimen-laboral';
import { AccionVinculacion } from '../../../interfaces/accion-vinculacion';
import { MotivoAccionVinculacion } from '../../../interfaces/motivo-accion-vinculacion';
import { EscalaCategoria } from '../../../interfaces/escala-categoria';
import { CondicionLaboral } from '../../../interfaces/condicion-laboral';
import { VCondicionLaboralSituacionLaboral } from '../../../interfaces/v-condicion-laboral-situacion-laboral';
import { TipoServidor } from '../../../interfaces/tipo-servidor';
import { CargoLaboral } from '../../../interfaces/cargo-laboral';
import { JornadaLaboral } from '../../../interfaces/jornada-laboral';
import { MatDialog } from '@angular/material/dialog';
import { BuscarCentroLaboralDialogComponent } from '../../../components/buscar-centro-laboral-dialog/buscar-centro-laboral-dialog.component';
import { VCentroLaboral } from '../../../interfaces/v-centro-laboral';
import { VCentroLaboralService } from '../../../services/v-centro-laboral.service';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { TipoDocumento } from '../../../interfaces/tipo-documento';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {
  legajoForm!: FormGroup;
  legajoId!: number;
  mostrarFormulario = true;
  
  // Propiedades para los selectores
  tiposApertura: TipoAperturaLegajo[] = [];
  tiposDocumentoIdentificacion: TipoDocumentoIdentificacion[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  accionesVinculacion: AccionVinculacion[] = [];
  motivosAccionVinculacion: MotivoAccionVinculacion[] = [];
  escalaCategorias: EscalaCategoria[] = [];
  condicionesLaborales: CondicionLaboral[] = [];
  situacionesLaborales: VCondicionLaboralSituacionLaboral[] = [];
  tiposServidor: TipoServidor[] = [];
  cargosLaborales: CargoLaboral[] = [];
  jornadasLaborales: JornadaLaboral[] = [];
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
  tiposDocumento: TipoDocumento[] = [];

  sexoOpciones = [
    { valor: 'M', descripcion: 'Masculino' },
    { valor: 'F', descripcion: 'Femenino' }
  ];

  constructor(
    private fb: FormBuilder,
    private legajoService: LegajoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private tipoAperturaService: TipoAperturaLegajoService,
    private tipoDocumentoIdentificacionService: TipoDocumentoIdentificacionService,
    private regimenLaboralService: RegimenLaboralService,
    private accionVinculacionService: AccionVinculacionService,
    private motivoAccionVinculacionService: MotivoAccionVinculacionService,
    private condicionLaboralService: CondicionLaboralService,
    private vCondicionLaboralSituacionLaboralService: VCondicionLaboralSituacionLaboralService,
    private tipoServidorService: TipoServidorService,
    private escalaCategoriaService: EscalaCategoriaService,
    private jornadaLaboralService: JornadaLaboralService,
    private cargoLaboralService: CargoLaboralService,
    private vCentroLaboralService: VCentroLaboralService,
    private dialog: MatDialog,
    private tipoDocumentoService: TipoDocumentoService
  ) {
    this.crearFormulario();
  }

  ngOnInit() {
    // Obtener el ID del legajo de la URL
    this.route.params.subscribe(params => {
      this.legajoId = +params['id'];
      this.cargarLegajo();
    });
    
    this.cargarDatosIniciales();

    // Suscribirse a los cambios en el régimen laboral
    this.legajoForm.get('iRegLabId')?.valueChanges.subscribe(regimenId => {
      if (regimenId) {
        this.cargarAccionesPorRegimen(regimenId);
      }
    });

    // Suscribirse a los cambios en la acción de vinculación
    this.legajoForm.get('iAccVincId')?.valueChanges.subscribe(accionId => {
      if (accionId) {
        this.cargarMotivosPorAccion(accionId);
      }
    });

    // Suscribirse a los cambios en la condición laboral
    this.legajoForm.get('iCondLabId')?.valueChanges.subscribe(condicionId => {
      if (condicionId) {
        this.cargarSituacionesPorCondicion(condicionId);
      }
    });
  }

  private crearFormulario() {
    this.legajoForm = this.fb.group({
      iTipoAperLegId: ['', Validators.required],
      iTipoIdentId: ['', Validators.required],
      cLegNumeroDocumentoIdentida: ['', Validators.required],
      
      cLegPrimerApellido: ['', Validators.required],
      cLegSegundoApellido: ['', Validators.required],
      cLegNombres: ['', Validators.required],
      dtLegFechaNacimiento: ['', Validators.required],
      cLegSexo: ['', Validators.required],
      
      iTipoDocId: ['', Validators.required],
      cVincLabNumeroDocumento: ['', Validators.required],
      dtVincLabFechaDocumento: [''],
      iArchId: [null],
      
      iRegLabId: ['', Validators.required],
      iAccVincId: [''],
      iMotAccVincId: [''],
      iEscCatId: [''],
      
      codigoModularIE: [''],
      iCentLabId: [null],
      iCondLabId: ['', Validators.required],
      iSitLabId: ['', Validators.required],
      iTipoSerId: ['', Validators.required],
      cLegCodigoPlaza: [''],
      cUseZonaSubRegion: [''],
      cLegCargo: ['', Validators.required],
      iJorLabId: ['', Validators.required],
      bVincLabMandatoJudicial: [false],
      dtVincLabFechaInicio: [''],
      dtVincLabFechaFin: [''],
      cLegAnotaciones: ['']
    });
  }

  private cargarLegajo() {
    this.legajoService.getById(this.legajoId).subscribe({
      next: (legajo) => {
        this.legajoForm.patchValue({
          iTipoAperLegId: legajo.iTipoAperLegId,
          iTipoIdentId: legajo.iTipoIdentId,
          cLegNumeroDocumentoIdentida: legajo.cLegNumeroDocumentoIdentida,
          
          cLegPrimerApellido: legajo.cLegPrimerApellido,
          cLegSegundoApellido: legajo.cLegSegundoApellido,
          cLegNombres: legajo.cLegNombres,
          dtLegFechaNacimiento: legajo.dtLegFechaNacimiento,
          cLegSexo: legajo.cLegSexo,
          
          iTipoDocId: legajo.iTipoDocId,
          cVincLabNumeroDocumento: legajo.cVincLabNumeroDocumento,
          dtVincLabFechaDocumento: legajo.dtVincLabFechaDocumento,
          iArchId: legajo.iArchId,
          
          iRegLabId: legajo.iRegLabId,
          iAccVincId: legajo.iAccVincId,
          iMotAccVincId: legajo.iMotAccVincId,
          iEscCatId: legajo.iEscCatId,
  
          iCentLabId: legajo.iCentLabId,
          iCondLabId: legajo.iCondLabId,
          iSitLabId: legajo.iSitLabId,
          iTipoSerId: legajo.iTipoSerId,
          cLegCodigoPlaza: legajo.cLegCodigoPlaza,
          cUseZonaSubRegion: legajo.cUseZonaSubRegion,
          cLegCargo: legajo.cLegCargo,
          iJorLabId: legajo.iJorLabId,
          bVincLabMandatoJudicial: legajo.bVincLabMandatoJudicial,
          dtVincLabFechaInicio: legajo.dtVincLabFechaInicio,
          dtVincLabFechaFin: legajo.dtVincLabFechaFin,
          cLegAnotaciones: legajo.cLegAnotaciones
        });

        if (legajo.iCentLabId) {
          this.vCentroLaboralService.getById(legajo.iCentLabId).subscribe({
            next: (centroLaboral) => {
              this.centroLaboralSeleccionado = {
                iCentLabId: centroLaboral.iCentLabId,
                cCentLabNombre: centroLaboral.cCentLabNombre,
                cModEduNombre: centroLaboral.cModEduNombre,
                cDirRegNombre: centroLaboral.cDirRegNombre,
                cInstGeEduNombre: centroLaboral.cInstGeEduNombre,
                cCentLabCodigoModular: centroLaboral.cCentLabCodigoModular
              };
              
              this.actualizarInformacionCentroLaboral(this.centroLaboralSeleccionado);
            },
            error: (error) => {
              console.error('Error al cargar centro laboral:', error);
              this.snackBar.open('Error al cargar datos del centro laboral', 'Cerrar', {
                duration: 3000
              });
            }
          });
        }

        if (legajo.iCondLabId) {
          this.cargarSituacionesPorCondicion(legajo.iCondLabId);
        }
        if (legajo.iRegLabId) {
          this.cargarAccionesPorRegimen(legajo.iRegLabId);
        }
        if (legajo.iAccVincId) {
          this.cargarMotivosPorAccion(legajo.iAccVincId);
        }
      },
      error: (error) => {
        console.error('Error al cargar el legajo:', error);
        this.snackBar.open('Error al cargar el legajo', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  private cargarDatosIniciales() {
    // Cargar tipos de apertura
    this.tipoAperturaService.getAll().subscribe({
      next: (data) => this.tiposApertura = data,
      error: (error) => console.error('Error al cargar tipos de apertura:', error)
    });

    // Cargar tipos de documento de identificación
    this.tipoDocumentoIdentificacionService.getAll().subscribe({
      next: (data) => this.tiposDocumentoIdentificacion = data,
      error: (error) => console.error('Error al cargar tipos de documento:', error)
    });

    // Cargar regímenes laborales
    this.regimenLaboralService.getAll().subscribe({
      next: (data) => this.regimenesLaborales = data,
      error: (error) => console.error('Error al cargar regímenes laborales:', error)
    });

    // Cargar condiciones laborales
    this.condicionLaboralService.getAll().subscribe({
      next: (data) => this.condicionesLaborales = data,
      error: (error) => console.error('Error al cargar condiciones laborales:', error)
    });

    // Cargar tipos de servidor
    this.tipoServidorService.getAll().subscribe({
      next: (data) => this.tiposServidor = data,
      error: (error) => console.error('Error al cargar tipos de servidor:', error)
    });

    // Cargar jornadas laborales
    this.jornadaLaboralService.getAll().subscribe({
      next: (data) => this.jornadasLaborales = data,
      error: (error) => console.error('Error al cargar jornadas laborales:', error)
    });

    // Cargar cargos laborales
    this.cargoLaboralService.getAll().subscribe({
      next: (data) => this.cargosLaborales = data,
      error: (error) => console.error('Error al cargar cargos laborales:', error)
    });

    // Cargar tipos de documento
    this.tipoDocumentoService.getAll().subscribe({
      next: (data) => this.tiposDocumento = data,
      error: (error) => console.error('Error al cargar tipos de documento:', error)
    });
  }

  cargarSituacionesPorCondicion(condicionId: number) {
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

  cargarAccionesPorRegimen(regimenId: number) {
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

  cargarMotivosPorAccion(accionId: number) {
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

  guardarLegajo() {
    if (this.legajoForm.valid) {
      const legajoData: Partial<Legajo> = this.legajoForm.value;
      
      this.legajoService.update(this.legajoId, legajoData).subscribe({
        next: (response) => {
          this.snackBar.open('Legajo actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.snackBar.open('Error al actualizar el legajo', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
      });
    }
  }

  buscarPersona() {
    // Implementar la búsqueda de persona
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

  onArchivoSeleccionado(archivo: any) {
    if (archivo?.iArchId) {
      this.legajoForm.patchValue({
        iArchId: archivo.iArchId
      });
    }
  }

  tieneEscalaCategoriaGrupo(regimenId: number): boolean {
    // Implementar la lógica para verificar si el régimen tiene escala
    return true;
  }
}
