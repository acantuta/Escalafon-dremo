import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { RegimenLaboralService } from 'src/app/services/regimen-laboral.service';
import { RegimenLaboral } from 'src/app/interfaces/regimen-laboral';
import { DesplazamientoAccionService } from 'src/app/services/desplazamiento-accion.service';
import { DesplazamientoAccion } from 'src/app/interfaces/desplazamiento-accion';
import { DesplazamientoMotivoAccionService } from 'src/app/services/desplazamiento-motivo-accion.service';
import { DesplazamientoMotivoAccion } from 'src/app/interfaces/desplazamiento-motivo-accion';
import { CondicionLaboralService } from 'src/app/services/condicion-laboral.service';
import { CondicionLaboral } from 'src/app/interfaces/condicion-laboral';
import { SituacionLaboralService } from 'src/app/services/situacion-laboral.service';
import { SituacionLaboral } from 'src/app/interfaces/situacion-laboral';
import { EscalaCategoriaService } from 'src/app/services/escala-categoria.service';
import { EscalaCategoria } from 'src/app/interfaces/escala-categoria';
import { CargoLaboralService } from 'src/app/services/cargo-laboral.service';
import { CargoLaboral } from 'src/app/interfaces/cargo-laboral';
import { JornadaLaboralService } from 'src/app/services/jornada-laboral.service';
import { JornadaLaboral } from 'src/app/interfaces/jornada-laboral';
import { VCentroLaboralService } from 'src/app/services/v-centro-laboral.service';
import { VCentroLaboral } from 'src/app/interfaces/v-centro-laboral';
import { MatDialog } from '@angular/material/dialog';
import { BuscarCentroLaboralDialogComponent } from 'src/app/components/buscar-centro-laboral-dialog/buscar-centro-laboral-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrupoOcupacionalService } from 'src/app/services/grupo-ocupacional.service';
import { GrupoOcupacional } from 'src/app/interfaces/grupo-ocupacional';
import { CategoriaRemunerativaService } from 'src/app/services/categoria-remunerativa.service';
import { CategoriaRemunerativa } from 'src/app/interfaces/categoria-remunerativa';
import { ConfigService } from 'src/app/core/services/config.service';
import { VCondicionLaboralSituacionLaboralService } from 'src/app/services/v-condicion-laboral-situacion-laboral.service';
import { VCondicionLaboralSituacionLaboral } from 'src/app/interfaces/v-condicion-laboral-situacion-laboral';
import { DesplazamientoService } from 'src/app/services/desplazamiento.service';
import { Desplazamiento } from 'src/app/interfaces/desplazamiento';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Archivo } from 'src/app/interfaces/archivo';
import { VDesplazamientoService } from 'src/app/services/v-desplazamiento.service';
import { VDesplazamiento } from 'src/app/interfaces/v-desplazamiento';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { LegajoStateService } from 'src/app/core/services/legajo-state.service';
import { VLegajo } from 'src/app/interfaces/v-legajo';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ArchivoHandlerComponent } from 'src/app/components/archivo-handler/archivo-handler.component';

@Component({
  selector: 'app-desplazamientos',
  templateUrl: './desplazamientos.component.html',
  styles: []
})
export class DesplazamientosComponent implements OnInit {
  @ViewChild(ArchivoHandlerComponent) archivoHandler!: ArchivoHandlerComponent;
  
  tiposDocumento: TipoDocumento[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  desplazamientoAcciones: DesplazamientoAccion[] = [];
  accionesFiltradas: DesplazamientoAccion[] = [];
  desplazamientoMotivos: DesplazamientoMotivoAccion[] = [];
  motivosFiltrados: DesplazamientoMotivoAccion[] = [];
  condicionesLaborales: CondicionLaboral[] = [];
  situacionesLaboralesFiltradas: VCondicionLaboralSituacionLaboral[] = [];
  escalaCategorias: EscalaCategoria[] = [];
  cargosLaborales: CargoLaboral[] = [];
  jornadasLaborales: JornadaLaboral[] = [];
  centroLaboralOrigenSeleccionado?: VCentroLaboral;
  centroLaboralDestinoSeleccionado?: VCentroLaboral;
  gruposOcupacionales: GrupoOcupacional[] = [];
  categoriasRemunerativas: CategoriaRemunerativa[] = [];
  categoriasFiltradas: CategoriaRemunerativa[] = [];
  grupoOcupacionalSeleccionado?: number;
  
  // Variables para controlar la selección
  regimenSeleccionado?: number;
  accionSeleccionada?: number;

  // Variables para grupo ocupacional y categoría remunerativa de origen
  grupoOcupacionalOrigenSeleccionado?: number;
  categoriasFiltradasOrigen: CategoriaRemunerativa[] = [];

  // Variables para grupo ocupacional y categoría remunerativa de destino
  grupoOcupacionalDestinoSeleccionado?: number;
  categoriasFiltradasDestino: CategoriaRemunerativa[] = [];

  mostrarGrupoOcupacional = false;
  mostrarEscala = false;

  escalaCategoriasFiltradas: EscalaCategoria[] = [];

  // Datos del documento
  tipoDocumentoSeleccionado?: number;
  numeroDocumento?: string;
  fechaDocumento?: Date;
  
  // Datos generales
  motivoSeleccionado?: number;
  fechaInicio?: Date;
  fechaFin?: Date;

  // Datos de origen
  condicionLaboralOrigenSeleccionada?: number;
  situacionLaboralOrigenSeleccionada?: number;
  codigoPlazaOrigen?: string;
  useZonaSubregionOrigen?: string;
  escalaCategoriaOrigenSeleccionada?: number;
  cargoLaboralOrigenSeleccionado?: number;
  jornadaLaboralOrigenSeleccionada?: number;

  // Datos de destino
  condicionLaboralDestinoSeleccionada?: number;
  situacionLaboralDestinoSeleccionada?: number;
  codigoPlazaDestino?: string;
  useZonaSubregionDestino?: string;
  escalaCategoriaDestinoSeleccionada?: number;
  cargoLaboralDestinoSeleccionado?: number;
  jornadaLaboralDestinoSeleccionada?: number;

  // Datos adicionales
  mandatoJudicial = false;
  anotaciones?: string;

  desplazamientoForm: FormGroup;

  archivoId: number | null = null;
  archivoSeleccionado?: Archivo;

  desplazamientos: VDesplazamiento[] = [];
  displayedColumns: string[] = [
    'numero',
    'accion',
    'motivo',
    'regimen',
    'fechaInicio',
    'fechaFin',
    'documento',
    'acciones'
  ];

  today = new Date(); // Para la comparación de fechas en el estado

  // Agregar propiedad para controlar edición
  desplazamientoEnEdicion?: number;

  legajoActual: VLegajo | null = null;

  // Modificar la propiedad dataSource para usar MatTableDataSource
  dataSource = new MatTableDataSource<VDesplazamiento>([]);

  // Agregar las propiedades faltantes
  desplazamientoSeleccionado: VDesplazamiento | null = null;
  modoEdicion = false;

  codigoModularOrigenControl = new FormControl('', Validators.required);
  codigoModularDestinoControl = new FormControl('', Validators.required);

  // Agregar a las propiedades de la clase
  centroLaboralInfo = {
    origen: {
      centroLaboral: '',
      modalidadEducativa: '',
      region: '',
      instanciaGestion: ''
    },
    destino: {
      centroLaboral: '',
      modalidadEducativa: '',
      region: '',
      instanciaGestion: ''
    }
  };

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private regimenLaboralService: RegimenLaboralService,
    private desplazamientoAccionService: DesplazamientoAccionService,
    private desplazamientoMotivoAccionService: DesplazamientoMotivoAccionService,
    private condicionLaboralService: CondicionLaboralService,
    private situacionLaboralService: VCondicionLaboralSituacionLaboralService,
    private escalaCategoriaService: EscalaCategoriaService,
    private cargoLaboralService: CargoLaboralService,
    private jornadaLaboralService: JornadaLaboralService,
    private centroLaboralService: VCentroLaboralService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private grupoOcupacionalService: GrupoOcupacionalService,
    private categoriaRemunerativaService: CategoriaRemunerativaService,
    private configService: ConfigService,
    private desplazamientoService: DesplazamientoService,
    private fb: FormBuilder,
    private vDesplazamientoService: VDesplazamientoService,
    private legajoStateService: LegajoStateService,
    private router: Router
  ) {
    this.desplazamientoForm = this.fb.group({
      // Datos del documento
      iTipoDocId: [null, Validators.required],
      cDespNumeroDocumento: ['', Validators.required],
      dtDespFechaDocumento: [null, Validators.required],
      
      // Datos generales
      iRegLabId: [null, Validators.required],
      iDespAccId: [null, Validators.required],
      iDespMotId: [null, Validators.required],
      dtFechaInicio: [null, Validators.required],
      dtFechaFin: [null],

      // Datos de origen
      iCondLabIdOrigen: [null, Validators.required],
      iSitLabIdOrigen: [null],
      cDespCodigoPlazaOrigen: [''],
      cDespLabUseZonaSubRegionOrigen: [''],
      iGrupOcupIdOrigen: [null],
      iCatRemuIdOrigen: [null],
      iEscCatIdOrigen: [null],
      iCargLabIdOrigen: [null],
      iJorLabIdOrigen: [null],

      // Datos de destino
      iCondLabIdDestino: [null, Validators.required],
      iSitLabIdDestino: [null],
      cDespCodigoPlazaDestino: [''],
      cDespLabUseZonaSubRegionDestino: [''],
      iGrupOcupIdDestino: [null],
      iCatRemuIdDestino: [null],
      iEscCatIdDestino: [null],
      iCargLabIdDestino: [null],
      iJorLabIdDestino: [null],

      // Datos adicionales
      bDespMandadoJudicial: [false],
      cDespAnotaciones: [''],
      iArchId: [null, Validators.required],
      iCentLabIdOrigen: [null, Validators.required],
      iCentLabIdDestino: [null, Validators.required]
    });

    // Suscribirse a los cambios de los controles de código modular
    this.codigoModularOrigenControl.valueChanges.subscribe(() => {
      if (!this.centroLaboralOrigenSeleccionado) {
        this.desplazamientoForm.get('iCentLabIdOrigen')?.setValue(null);
      }
    });

    this.codigoModularDestinoControl.valueChanges.subscribe(() => {
      if (!this.centroLaboralDestinoSeleccionado) {
        this.desplazamientoForm.get('iCentLabIdDestino')?.setValue(null);
      }
    });
  }

  ngOnInit() {
    // Cargar tipos de documento
    this.tipoDocumentoService.getAll().subscribe(tipos => {
      this.tiposDocumento = tipos;
    });

    // Cargar regímenes laborales
    this.regimenLaboralService.getAll().subscribe(regimenes => {
      this.regimenesLaborales = regimenes;
    });

    // Cargar todas las acciones
    this.desplazamientoAccionService.getAll().subscribe(acciones => {
      this.desplazamientoAcciones = acciones;
    });

    // Cargar condiciones laborales
    this.condicionLaboralService.getAll().subscribe(condiciones => {
      this.condicionesLaborales = condiciones;
    });

    // Cargar escalas/categorías
    this.escalaCategoriaService.getAll().subscribe(escalas => {
      this.escalaCategorias = escalas;
    });

    // Cargar cargos laborales
    this.cargoLaboralService.getAll().subscribe(cargos => {
      this.cargosLaborales = cargos;
    });

    // Cargar jornadas laborales
    this.jornadaLaboralService.getAll().subscribe(jornadas => {
      this.jornadasLaborales = jornadas;
    });

    // Cargar grupos ocupacionales
    this.grupoOcupacionalService.getAll().subscribe(grupos => {
      this.gruposOcupacionales = grupos;
    });

    // Cargar todas las categorías remunerativas
    this.categoriaRemunerativaService.getAll().subscribe(categorias => {
      this.categoriasRemunerativas = categorias;
    });

    // Suscribirse al legajo actual y cargar desplazamientos
    this.legajoStateService.getLegajo().subscribe(legajo => {
      this.legajoActual = legajo;
      if (legajo) {
        this.cargarDesplazamientos();
      }
    });
  }

  onRegimenChange(regimenId: number) {
    this.regimenSeleccionado = regimenId;
    
    // Determinar si se debe mostrar grupo ocupacional
    this.mostrarGrupoOcupacional = this.configService.tieneGrupoOcupacional(regimenId);
    
    // Determinar si se debe mostrar escala categoria grupo
    this.mostrarEscala = this.configService.tieneEscalaCategoriaGrupo(regimenId);
    
    // Limpiar selecciones si es necesario
    if (!this.mostrarGrupoOcupacional) {
      this.grupoOcupacionalOrigenSeleccionado = undefined;
      this.grupoOcupacionalDestinoSeleccionado = undefined;
      this.categoriasFiltradasOrigen = [];
      this.categoriasFiltradasDestino = [];
    }
    
    // Filtrar escalas/categorías por régimen
    if (regimenId) {
      this.escalaCategoriasFiltradas = this.escalaCategorias.filter(
        escala => escala.iRegLabId === regimenId
      );
    } else {
      this.escalaCategoriasFiltradas = [];
    }
    
    // Limpiar selecciones dependientes
    this.accionSeleccionada = undefined;
    this.accionesFiltradas = [];
    this.motivosFiltrados = [];

    // Filtrar acciones por régimen
    if (regimenId) {
      this.accionesFiltradas = this.desplazamientoAcciones.filter(
        accion => accion.iRegLabId === regimenId
      );
    }
  }

  onAccionChange(accionId: number) {
    this.accionSeleccionada = accionId;
    
    // Limpiar motivos
    this.motivosFiltrados = [];

    // Cargar motivos por acción usando el servicio con filtro
    if (accionId) {
      this.desplazamientoMotivoAccionService.getAll({
        campo: 'iDespAccId',
        valor: accionId.toString()
      }).subscribe(motivos => {
        this.motivosFiltrados = motivos;
      });
    }
  }

  onGrupoOcupacionalOrigenChange(grupoId: number) {
    this.grupoOcupacionalOrigenSeleccionado = grupoId;
    
    // Filtrar categorías por grupo ocupacional para origen
    this.categoriasFiltradasOrigen = this.categoriasRemunerativas.filter(
        categoria => categoria.iGrupOcupId === grupoId
    );
  }

  onGrupoOcupacionalDestinoChange(grupoId: number) {
    this.grupoOcupacionalDestinoSeleccionado = grupoId;
    
    // Filtrar categorías por grupo ocupacional para destino
    this.categoriasFiltradasDestino = this.categoriasRemunerativas.filter(
        categoria => categoria.iGrupOcupId === grupoId
    );
  }

  buscarCentroLaboralOrigen() {
    const dialogRef = this.dialog.open(BuscarCentroLaboralDialogComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.centroLaboralOrigenSeleccionado = result;
        this.actualizarInformacionCentroLaboralOrigen(result);
      }
    });
  }

  buscarCentroLaboralDestino() {
    const dialogRef = this.dialog.open(BuscarCentroLaboralDialogComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.centroLaboralDestinoSeleccionado = result;
        this.actualizarInformacionCentroLaboralDestino(result);
      }
    });
  }

  private actualizarInformacionCentroLaboralOrigen(centro: VCentroLaboral) {
    // Actualizar el ID del centro laboral en el formulario
    this.desplazamientoForm.patchValue({
      iCentLabIdOrigen: centro.iCentLabId
    });

    // Actualizar el código modular
    this.codigoModularOrigenControl.setValue(centro.cCentLabCodigoModular || '');

    // Actualizar la información visual
    this.centroLaboralInfo.origen = {
      centroLaboral: centro.cCentLabNombre || '',
      modalidadEducativa: centro.cModEduNombre || '',
      region: centro.cDirRegNombre || '',
      instanciaGestion: centro.cInstGeEduNombre || ''
    };

    // Actualizar los elementos del DOM
    const elementosParaActualizar = {
      '[data-origen-centro-laboral]': centro.cCentLabNombre,
      '[data-origen-region]': centro.cDirRegNombre,
      '[data-origen-instancia]': centro.cInstGeEduNombre,
      '[data-origen-modalidad]': centro.cModEduNombre,
      '[data-origen-nivel]': centro.iNivEduNombre
    };

    Object.entries(elementosParaActualizar).forEach(([selector, valor]) => {
      const elemento = document.querySelector(selector);
      if (elemento) {
        elemento.textContent = valor || '';
      }
    });
  }

  private actualizarInformacionCentroLaboralDestino(centro: VCentroLaboral) {
    // Actualizar el ID del centro laboral en el formulario
    this.desplazamientoForm.patchValue({
        iCentLabIdDestino: centro.iCentLabId
    });

    // Actualizar el código modular en el control y en el input
    const codigoModularInput = document.querySelector('[data-destino-codigo-modular]') as HTMLInputElement;
    if (codigoModularInput) {
        codigoModularInput.value = centro.cCentLabCodigoModular || '';
    }
    this.codigoModularDestinoControl.setValue(centro.cCentLabCodigoModular || '', { emitEvent: false });

    // Actualizar la información visual
    this.centroLaboralInfo.destino = {
        centroLaboral: centro.cCentLabNombre || '',
        modalidadEducativa: centro.cModEduNombre || '',
        region: centro.cDirRegNombre || '',
        instanciaGestion: centro.cInstGeEduNombre || ''
    };

    // Actualizar los elementos del DOM
    const elementosParaActualizar = {
        '[data-destino-centro-laboral]': centro.cCentLabNombre,
        '[data-destino-region]': centro.cDirRegNombre,
        '[data-destino-instancia]': centro.cInstGeEduNombre,
        '[data-destino-modalidad]': centro.cModEduNombre,
        '[data-destino-nivel]': centro.iNivEduNombre
    };

    Object.entries(elementosParaActualizar).forEach(([selector, valor]) => {
        const elemento = document.querySelector(selector);
        if (elemento) {
            elemento.textContent = valor || '';
        }
    });
  }

  onCondicionLaboralChange(condicionId: number) {
    // Limpiar situaciones laborales
    this.situacionesLaboralesFiltradas = [];

    // Cargar situaciones laborales según la condición
    if (condicionId) {
      this.situacionLaboralService.getAll({
        campo: 'iCondLabId',
        valor: condicionId.toString()
      }).subscribe(situaciones => {
        this.situacionesLaboralesFiltradas = situaciones;
      });
    }
  }

  guardarDesplazamiento() {
    if (!this.archivoId) {
      this.desplazamientoForm.get('iArchId')?.markAsTouched();
    }

    if (this.desplazamientoForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          title: this.desplazamientoEnEdicion ? 'Actualizar Registro' : 'Guardar Registro',
          message: this.desplazamientoEnEdicion ? 
            '¿Está seguro que desea actualizar este registro?' : 
            '¿Está seguro que desea guardar este registro?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const datos = this.prepararDatosDesplazamiento();
          
          if (this.desplazamientoEnEdicion) {
            this.actualizarDesplazamiento(datos);
          } else {
            this.crearNuevoDesplazamiento(datos);
          }
        }
      });
    } else {
      Object.keys(this.desplazamientoForm.controls).forEach(key => {
        const control = this.desplazamientoForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  private crearNuevoDesplazamiento(desplazamiento: Desplazamiento) {
    this.desplazamientoService.create(desplazamiento).subscribe({
      next: () => {
        this.snackBar.open('Desplazamiento guardado exitosamente', 'Cerrar', {
          duration: 3000
        });
        // Recargar los datos de la tabla
        this.cargarDesplazamientos();
        // Limpiar el formulario
        this.reinicializarFormulario();
      },
      error: (error) => {
        console.error('Error al guardar el desplazamiento:', error);
        this.snackBar.open('Error al guardar el desplazamiento', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  private actualizarDesplazamiento(desplazamiento: Desplazamiento) {
    if (!this.desplazamientoEnEdicion) return;

    this.desplazamientoService.update(this.desplazamientoEnEdicion, desplazamiento).subscribe({
      next: () => {
        this.snackBar.open('Desplazamiento actualizado exitosamente', 'Cerrar', {
          duration: 3000
        });
        // Recargar los datos de la tabla
        this.cargarDesplazamientos();
        // Limpiar el formulario y estado de edición
        this.reinicializarFormulario();
        this.desplazamientoEnEdicion = undefined;
      },
      error: (error) => {
        console.error('Error al actualizar el desplazamiento:', error);
        this.snackBar.open('Error al actualizar el desplazamiento', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  private prepararDatosDesplazamiento(): Desplazamiento {
    const formValue = this.desplazamientoForm.value;
    
    // Obtener los valores de grupo ocupacional y categoría remunerativa
    const grupoOcupacionalOrigen = this.mostrarGrupoOcupacional ? 
        this.grupoOcupacionalOrigenSeleccionado || undefined : undefined;
    const grupoOcupacionalDestino = this.mostrarGrupoOcupacional ? 
        this.grupoOcupacionalDestinoSeleccionado || undefined : undefined;
    
    // Obtener los valores de escala/categoría
    const escalaCategoriaOrigen = this.mostrarEscala ? 
        formValue.iEscCatIdOrigen || undefined : undefined;
    const escalaCategoriaDestino = this.mostrarEscala ? 
        formValue.iEscCatIdDestino || undefined : undefined;

    return {
        // Datos del documento
        iTipoDocId: formValue.iTipoDocId,
        cDespNumeroDocumento: formValue.cDespNumeroDocumento?.toUpperCase(),
        dtDespFechaDocumento: formValue.dtDespFechaDocumento,
        iArchId: formValue.iArchId,
        
        // Datos generales
        iRegLabId: formValue.iRegLabId,
        iDespAccId: formValue.iDespAccId,
        iDespMotId: formValue.iDespMotId,
        dtFechaInicio: formValue.dtFechaInicio,
        dtFechaFin: formValue.dtFechaFin,

        // Datos de origen
        iCentLabIdOrigen: formValue.iCentLabIdOrigen,
        cDespCodigoModularOrigen: this.centroLaboralOrigenSeleccionado?.cCentLabCodigoModular,
        iDirRegIdOrigen: this.centroLaboralOrigenSeleccionado?.iDirRegId,
        iInstGeEduIdOrigen: this.centroLaboralOrigenSeleccionado?.iInstGeEduId,
        iModEduIdOrigen: this.centroLaboralOrigenSeleccionado?.iModEduId,
        iNivEduIdOrigen: this.centroLaboralOrigenSeleccionado?.iNivEduId,
        iCondLabIdOrigen: formValue.iCondLabIdOrigen,
        iSitLabIdOrigen: formValue.iSitLabIdOrigen,
        cDespCodigoPlazaOrigen: formValue.cDespCodigoPlazaOrigen?.toUpperCase(),
        cDespLabUseZonaSubRegionOrigen: formValue.cDespLabUseZonaSubRegionOrigen?.toUpperCase(),
        iGrupOcupIdOrigen: grupoOcupacionalOrigen,
        iCatRemuIdOrigen: formValue.iCatRemuIdOrigen || undefined,
        iEscCatIdOrigen: escalaCategoriaOrigen,
        iCargLabIdOrigen: formValue.iCargLabIdOrigen,
        iJorLabIdOrigen: formValue.iJorLabIdOrigen,

        // Datos de destino
        iCentLabIdDestino: formValue.iCentLabIdDestino,
        cDespCodigoModularDestino: this.centroLaboralDestinoSeleccionado?.cCentLabCodigoModular,
        iDirRegIdDestino: this.centroLaboralDestinoSeleccionado?.iDirRegId,
        iInstGeEduIdDestino: this.centroLaboralDestinoSeleccionado?.iInstGeEduId,
        iModEduIdDestino: this.centroLaboralDestinoSeleccionado?.iModEduId,
        iNivEduIdDestino: this.centroLaboralDestinoSeleccionado?.iNivEduId,
        iCondLabIdDestino: formValue.iCondLabIdDestino,
        iSitLabIdDestino: formValue.iSitLabIdDestino,
        cDespCodigoPlazaDestino: formValue.cDespCodigoPlazaDestino?.toUpperCase(),
        cDespLabUseZonaSubRegionDestino: formValue.cDespLabUseZonaSubRegionDestino?.toUpperCase(),
        iGrupOcupIdDestino: grupoOcupacionalDestino,
        iCatRemuIdDestino: formValue.iCatRemuIdDestino || undefined,
        iEscCatIdDestino: escalaCategoriaDestino,
        iCargLabIdDestino: formValue.iCargLabIdDestino,
        iJorLabIdDestino: formValue.iJorLabIdDestino,

        // Datos adicionales
        bDespMandadoJudicial: formValue.bDespMandadoJudicial,
        cDespAnotaciones: formValue.cDespAnotaciones?.toUpperCase(),
        
        // ID del legajo
        iLegId: this.legajoActual!.iLegId,

        // ID del desplazamiento (solo para edición)
        iDespId: this.desplazamientoEnEdicion
    };
  }

  private getNombreCampo(key: string): string {
    const mapaCampos: { [key: string]: string } = {
      'iTipoDocId': 'Tipo de documento',
      'cDespNumeroDocumento': 'Número de documento',
      'dtDespFechaDocumento': 'Fecha de documento',
      'iRegLabId': 'Régimen laboral',
      'iDespAccId': 'Acción',
      'iDespMotId': 'Motivo de acción',
      'dtFechaInicio': 'Fecha de inicio',
      'iCondLabIdOrigen': 'Condición laboral (Origen)',
      'iSitLabIdOrigen': 'Situación laboral (Origen)',
      'cDespCodigoPlazaOrigen': 'Código de plaza (Origen)',
      'iCondLabIdDestino': 'Condición laboral (Destino)',
      'iSitLabIdDestino': 'Situación laboral (Destino)',
      'cDespCodigoPlazaDestino': 'Código de plaza (Destino)',
      // ... agregar más campos según sea necesario
    };

    return mapaCampos[key] || key;
  }

  onArchivoSelected(archivo: Archivo | undefined): void {
    this.archivoSeleccionado = archivo;
    
    // Actualizar el formulario con el ID del archivo si existe
    if (archivo?.iArchId) {
      this.desplazamientoForm.patchValue({
        iArchId: archivo.iArchId
      });
    } else {
      this.desplazamientoForm.patchValue({
        iArchId: null
      });
    }
  }

  onArchivoIdSelected(id: number | undefined): void {
    this.archivoId = id ?? null;  // Convertir undefined a null si es necesario
    
    // Actualizar el formulario
    this.desplazamientoForm.patchValue({
      iArchId: id ?? null
    }, { emitEvent: false });
  }

  cargarDesplazamientos() {
    if (!this.legajoActual?.iLegId) {
      this.snackBar.open('No hay un legajo seleccionado', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    // Cargar desplazamientos usando el servicio de vista
    this.vDesplazamientoService.getAll({
      campo: 'iLegId',
      valor: this.legajoActual.iLegId.toString()
    }).subscribe({
      next: (data) => {
        // Actualizar el dataSource con los nuevos datos
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error al cargar desplazamientos:', error);
        this.snackBar.open('Error al cargar los desplazamientos', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  editarDesplazamiento(element: VDesplazamiento) {
    // Cargar los datos en el formulario
    this.cargarDatosParaEdicion(element);
    // Habilitar el formulario para edición
    this.desplazamientoForm.enable();
    // Desplazar hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarDesplazamiento(element: VDesplazamiento) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Desplazamiento',
        message: '¿Está seguro que desea eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && element.iDespId) {
        this.desplazamientoService.delete(element.iDespId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarDesplazamientos();
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

  verDesplazamiento(element: VDesplazamiento) {
    // Cargar los datos en el formulario
    this.cargarDatosParaEdicion(element);
    // Deshabilitar el formulario inicialmente
    this.desplazamientoForm.disable();
    // Desplazar hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private reinicializarFormulario() {
    // Resetear el formulario con un objeto vacío y resetear validaciones
    this.desplazamientoForm.reset({}, { emitEvent: false });
    
    // Resetear los controles de código modular
    this.codigoModularOrigenControl.reset();
    this.codigoModularOrigenControl.markAsUntouched();
    this.codigoModularOrigenControl.markAsPristine();
    
    this.codigoModularDestinoControl.reset();
    this.codigoModularDestinoControl.markAsUntouched();
    this.codigoModularDestinoControl.markAsPristine();
    
    // Actualizar el estado del formulario completo
    this.desplazamientoForm.markAsUntouched();
    this.desplazamientoForm.markAsPristine();
    this.desplazamientoForm.updateValueAndValidity();

    // Actualizar cada control individualmente
    Object.keys(this.desplazamientoForm.controls).forEach(key => {
        const control = this.desplazamientoForm.get(key);
        control?.markAsUntouched();
        control?.markAsPristine();
        control?.updateValueAndValidity();
        control?.setErrors(null);  // Esto limpia cualquier error existente
    });

    // Limpiar variables
    this.archivoId = null;
    this.archivoSeleccionado = undefined;
    
    // Limpiar selecciones
    this.regimenSeleccionado = undefined;
    this.accionSeleccionada = undefined;
    this.centroLaboralOrigenSeleccionado = undefined;
    this.centroLaboralDestinoSeleccionado = undefined;
    this.grupoOcupacionalOrigenSeleccionado = undefined;
    this.grupoOcupacionalDestinoSeleccionado = undefined;
    
    // Limpiar listas filtradas
    this.accionesFiltradas = [];
    this.motivosFiltrados = [];
    this.situacionesLaboralesFiltradas = [];
    this.categoriasFiltradasOrigen = [];
    this.categoriasFiltradasDestino = [];

    // Limpiar información de centros laborales
    this.limpiarInformacionCentrosLaborales();

    // Forzar la detección de cambios
    this.desplazamientoForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    // Resetear también las propiedades de edición
    this.modoEdicion = false;
    this.desplazamientoSeleccionado = null;
    this.desplazamientoEnEdicion = undefined;
  }

  private limpiarInformacionCentrosLaborales() {
    // Limpiar controles de código modular
    this.codigoModularOrigenControl.reset();
    this.codigoModularDestinoControl.reset();
    
    // Limpiar origen
    const elementosOrigen = [
      '[data-origen-codigo-modular]',
      '[data-origen-centro-laboral]',
      '[data-origen-region]',
      '[data-origen-instancia]',
      '[data-origen-modalidad]',
      '[data-origen-nivel]'
    ];

    // Limpiar destino
    const elementosDestino = [
      '[data-destino-codigo-modular]',
      '[data-destino-centro-laboral]',
      '[data-destino-region]',
      '[data-destino-instancia]',
      '[data-destino-modalidad]',
      '[data-destino-nivel]'
    ];

    elementosOrigen.forEach(selector => {
      const elemento = document.querySelector(selector);
      if (elemento instanceof HTMLInputElement) {
        elemento.value = '';
      } else if (elemento) {
        elemento.textContent = '';
      }
    });

    elementosDestino.forEach(selector => {
      const elemento = document.querySelector(selector);
      if (elemento instanceof HTMLInputElement) {
        elemento.value = '';
      } else if (elemento) {
        elemento.textContent = '';
      }
    });
  }

  // Botones principales
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
        this.reinicializarFormulario();
        this.desplazamientoForm.enable();
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

  private marcarCamposInvalidos() {
    Object.keys(this.desplazamientoForm.controls).forEach(key => {
      const control = this.desplazamientoForm.get(key);
      if (control?.errors) {
        control.markAsTouched();
      }
    });
  }

  private cargarDatosParaEdicion(desplazamiento: VDesplazamiento) {
    this.desplazamientoSeleccionado = desplazamiento;
    this.modoEdicion = true;
    this.desplazamientoEnEdicion = desplazamiento.iDespId;

    // Actualizar el archivoId antes de patchear el formulario
    if (desplazamiento.iArchId) {
        this.archivoId = desplazamiento.iArchId;
    }

    // Cargar datos en el formulario
    this.desplazamientoForm.patchValue({
        iTipoDocId: desplazamiento.iTipoDocId,
        cDespNumeroDocumento: desplazamiento.cDespNumeroDocumento,
        dtDespFechaDocumento: desplazamiento.dtDespFechaDocumento,
        iArchId: desplazamiento.iArchId,
        iRegLabId: desplazamiento.iRegLabId,
        iDespAccId: desplazamiento.iDespAccId,
        iDespMotId: desplazamiento.iDespMotId,
        dtFechaInicio: desplazamiento.dtFechaInicio,
        dtFechaFin: desplazamiento.dtFechaFin,
        
        // Datos de origen
        iCondLabIdOrigen: desplazamiento.iCondLabIdOrigen,
        iSitLabIdOrigen: desplazamiento.iSitLabIdOrigen,
        cDespCodigoPlazaOrigen: desplazamiento.cDespCodigoPlazaOrigen,
        cDespLabUseZonaSubRegionOrigen: desplazamiento.cDespLabUseZonaSubRegionOrigen,
        iGrupOcupIdOrigen: desplazamiento.iGrupOcupIdOrigen,
        iCatRemuIdOrigen: desplazamiento.iCatRemuIdOrigen,
        iEscCatIdOrigen: desplazamiento.iEscCatIdOrigen,
        iCargLabIdOrigen: desplazamiento.iCargLabIdOrigen,
        iJorLabIdOrigen: desplazamiento.iJorLabIdOrigen,

        // Datos de destino
        iCondLabIdDestino: desplazamiento.iCondLabIdDestino,
        iSitLabIdDestino: desplazamiento.iSitLabIdDestino,
        cDespCodigoPlazaDestino: desplazamiento.cDespCodigoPlazaDestino,
        cDespLabUseZonaSubRegionDestino: desplazamiento.cDespLabUseZonaSubRegionDestino,
        iGrupOcupIdDestino: desplazamiento.iGrupOcupIdDestino,
        iCatRemuIdDestino: desplazamiento.iCatRemuIdDestino,
        iEscCatIdDestino: desplazamiento.iEscCatIdDestino,
        iCargLabIdDestino: desplazamiento.iCargLabIdDestino,
        iJorLabIdDestino: desplazamiento.iJorLabIdDestino,

        // Datos adicionales
        bDespMandadoJudicial: desplazamiento.bDespMandadoJudicial,
        cDespAnotaciones: desplazamiento.cDespAnotaciones
    });

    // Cargar datos dependientes
    if (desplazamiento.iRegLabId) {
      this.onRegimenChange(desplazamiento.iRegLabId);
    }
    if (desplazamiento.iDespAccId) {
      this.onAccionChange(desplazamiento.iDespAccId);
    }
    if (desplazamiento.iCondLabIdOrigen) {
      this.onCondicionLaboralChange(desplazamiento.iCondLabIdOrigen);
    }

    // Manejar la carga del archivo
    if (desplazamiento.iArchId && this.archivoHandler) {
        // Forzar la actualización del archivo handler estableciendo el archivoId
        this.archivoHandler.archivoId = desplazamiento.iArchId;
    }

    // Cargar información del centro laboral origen
    if (desplazamiento.iCentLabIdOrigen) {
      this.centroLaboralService.getById(desplazamiento.iCentLabIdOrigen).subscribe({
        next: (centroLaboral: VCentroLaboral) => {
          this.centroLaboralOrigenSeleccionado = centroLaboral;
          this.actualizarInformacionCentroLaboralOrigen(centroLaboral);
        },
        error: (error: any) => {
          console.error('Error al cargar centro laboral origen:', error);
          this.snackBar.open('Error al cargar datos del centro laboral origen', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }

    // Cargar información del centro laboral destino
    if (desplazamiento.iCentLabIdDestino) {
      this.centroLaboralService.getById(desplazamiento.iCentLabIdDestino).subscribe({
        next: (centroLaboral: VCentroLaboral) => {
          this.centroLaboralDestinoSeleccionado = centroLaboral;
          this.actualizarInformacionCentroLaboralDestino(centroLaboral);
        },
        error: (error: any) => {
          console.error('Error al cargar centro laboral destino:', error);
          this.snackBar.open('Error al cargar datos del centro laboral destino', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }

    // Actualizar las selecciones de grupo ocupacional
    if (desplazamiento.iGrupOcupIdOrigen) {
        this.grupoOcupacionalOrigenSeleccionado = desplazamiento.iGrupOcupIdOrigen;
        this.onGrupoOcupacionalOrigenChange(desplazamiento.iGrupOcupIdOrigen);
    }

    if (desplazamiento.iGrupOcupIdDestino) {
        this.grupoOcupacionalDestinoSeleccionado = desplazamiento.iGrupOcupIdDestino;
        this.onGrupoOcupacionalDestinoChange(desplazamiento.iGrupOcupIdDestino);
    }
  }

  cerrarVisualizacion() {
    // Primero habilitar el formulario
    this.desplazamientoForm.enable();
    
    // Resetear el formulario con valores iniciales
    this.desplazamientoForm.reset({
        bDespMandadoJudicial: false  // Valor inicial para el toggle
    });
    
    // Resetear los controles de código modular sin marcarlos como touched
    this.codigoModularOrigenControl.reset();
    this.codigoModularDestinoControl.reset();
    
    // Limpiar variables y selecciones
    this.archivoId = null;
    this.archivoSeleccionado = undefined;
    this.regimenSeleccionado = undefined;
    this.accionSeleccionada = undefined;
    this.centroLaboralOrigenSeleccionado = undefined;
    this.centroLaboralDestinoSeleccionado = undefined;
    this.grupoOcupacionalOrigenSeleccionado = undefined;
    this.grupoOcupacionalDestinoSeleccionado = undefined;
    
    // Limpiar listas filtradas
    this.accionesFiltradas = [];
    this.motivosFiltrados = [];
    this.situacionesLaboralesFiltradas = [];
    this.categoriasFiltradasOrigen = [];
    this.categoriasFiltradasDestino = [];

    // Limpiar información de centros laborales
    this.limpiarInformacionCentrosLaborales();

    // Resetear estado de edición
    this.modoEdicion = false;
    this.desplazamientoSeleccionado = null;
    this.desplazamientoEnEdicion = undefined;

    // Asegurarse de que ningún control esté marcado como touched
    Object.keys(this.desplazamientoForm.controls).forEach(key => {
        const control = this.desplazamientoForm.get(key);
        if (control) {
            control.markAsUntouched();
            control.markAsPristine();
            control.setErrors(null);  // Asegurarse de que no haya errores
        }
    });

    // Reinicializar el archivo handler
    if (this.archivoHandler) {
        this.archivoHandler.limpiar();
    }

    // Forzar la actualización del formulario
    this.desplazamientoForm.updateValueAndValidity();
  }
} 