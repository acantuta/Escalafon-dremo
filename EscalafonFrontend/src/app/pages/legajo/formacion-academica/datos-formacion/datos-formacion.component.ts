import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { VLegajo } from '../../../../interfaces/v-legajo';
import { VFormacionAcademica } from '../../../../interfaces/v-formacion-academica';
import { VFormacionAcademicaService } from '../../../../services/v-formacion-academica.service';
import { EducacionNivelEducativoService } from '../../../../services/educacion-nivel-educativo.service';
import { EducacionTipoSecundariaService } from '../../../../services/educacion-tipo-secundaria.service';
import { EducacionTipoSuperiorService } from '../../../../services/educacion-tipo-superior.service';
import { PaisService } from '../../../../services/pais.service';
import { DepartamentoService } from '../../../../services/departamento.service';
import { ProvinciaService } from '../../../../services/provincia.service';
import { DistritoService } from '../../../../services/distrito.service';
import { EducacionSituacionAcademicaService } from '../../../../services/educacion-situacion-academica.service';
import { EducacionGradoAlcanzadoService } from '../../../../services/educacion-grado-alcanzado.service';
import { EducacionCarreraService } from '../../../../services/educacion-carrera.service';
import { EducacionProgramaGeneralService } from '../../../../services/educacion-programa-general.service';
import { EducacionProgramaProfesionalService } from '../../../../services/educacion-programa-profesional.service';
import { EducacionProgramaService } from '../../../../services/educacion-programa.service';
import { FormacionAcademicaService } from '../../../../services/formacion-academica.service';
import { Archivo } from '../../../../interfaces/archivo';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { ConfigService } from '../../../../core/services/config.service';
import { EducacionNivelEducativo } from '../../../../interfaces/educacion-nivel-educativo';
import { EducacionTipoSecundaria } from '../../../../interfaces/educacion-tipo-secundaria';
import { EducacionTipoSuperior } from '../../../../interfaces/educacion-tipo-superior';
import { Pais } from '../../../../interfaces/pais';
import { Departamento } from '../../../../interfaces/departamento';
import { Provincia } from '../../../../interfaces/provincia';
import { Distrito } from '../../../../interfaces/distrito';
import { EducacionSituacionAcademica } from '../../../../interfaces/educacion-situacion-academica';
import { EducacionGradoAlcanzado } from '../../../../interfaces/educacion-grado-alcanzado';
import { EducacionCarrera } from '../../../../interfaces/educacion-carrera';
import { EducacionProgramaGeneral } from '../../../../interfaces/educacion-programa-general';
import { EducacionProgramaProfesional } from '../../../../interfaces/educacion-programa-profesional';
import { EducacionPrograma } from '../../../../interfaces/educacion-programa';
import { EducacionNivelEspecialidadService } from '../../../../services/educacion-nivel-especialidad.service';
import { EducacionNivelEspecialidad } from '../../../../interfaces/educacion-nivel-especialidad';
import { ThisReceiver } from '@angular/compiler';
import { Observable, tap } from 'rxjs';
import { EducacionTipoCentroService } from '../../../../services/educacion-tipo-centro.service';
import { EducacionTipoCentro } from '../../../../interfaces/educacion-tipo-centro';

@Component({
  selector: 'app-datos-formacion',
  templateUrl: './datos-formacion.component.html'
})
export class DatosFormacionComponent implements OnInit, AfterViewInit {
  formacionForm!: FormGroup;
  legajo?: VLegajo;
  
  // Arrays para los selects
  nivelesEducativos: EducacionNivelEducativo[] = [];
  tiposSecundaria: EducacionTipoSecundaria[] = [];
  tiposEducacionSuperior: EducacionTipoSuperior[] = [];
  paises: Pais[] = [];
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  situacionesAcademicas: EducacionSituacionAcademica[] = [];
  gradosAlcanzados: EducacionGradoAlcanzado[] = [];
  carreras: EducacionCarrera[] = [];
  programasGenerales: EducacionProgramaGeneral[] = [];
  programasProfesionales: EducacionProgramaProfesional[] = [];
  programas: EducacionPrograma[] = [];
  anios: number[] = [];
  nivelesEspecialidad: EducacionNivelEspecialidad[] = [];
  tiposCentro: EducacionTipoCentro[] = [];

  displayedColumns = [
    'numero',
    'nivelEducativo',
    'centroEstudios',
    'situacionAcademica',
    'gradoAlcanzado',
    'anioInicio',
    'anioFin',
    'acciones'
  ];

  dataSource = new MatTableDataSource<VFormacionAcademica>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  modoEdicion = false;
  modoVisualizacion = false;
  registroSeleccionado?: VFormacionAcademica;
  camposHabilitados = true;

  constructor(
    private fb: FormBuilder,
    private legajoState: LegajoStateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private configService: ConfigService,
    private educacionNivelEducativoService: EducacionNivelEducativoService,
    private educacionTipoSecundariaService: EducacionTipoSecundariaService,
    private educacionTipoSuperiorService: EducacionTipoSuperiorService,
    private paisService: PaisService,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private educacionSituacionAcademicaService: EducacionSituacionAcademicaService,
    private educacionGradoAlcanzadoService: EducacionGradoAlcanzadoService,
    private educacionCarreraService: EducacionCarreraService,
    private educacionProgramaGeneralService: EducacionProgramaGeneralService,
    private educacionProgramaProfesionalService: EducacionProgramaProfesionalService,
    private educacionProgramaService: EducacionProgramaService,
    private formacionAcademicaService: FormacionAcademicaService,
    private vFormacionAcademicaService: VFormacionAcademicaService,
    private educacionNivelEspecialidadService: EducacionNivelEspecialidadService,
    private educacionTipoCentroService: EducacionTipoCentroService
  ) {
    this.initForm();
    this.generarListaAnios();
  }

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      if (legajo) {
        this.legajo = legajo;
        this.cargarDatos();
      }
    });
    this.cargarDatosIniciales();

    // Disparar el onPaisChange con el país por defecto
    const paisId = this.configService.getDefaultPaisId();
    this.onPaisChange(paisId);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private initForm(): void {
    this.formacionForm = this.fb.group({
      iEduNivEdId: ['', [Validators.required]],
      iEduTipoSecId: [{ value: '', disabled: true }],
      iEduTipSupId: [{ value: '', disabled: true }],
      cFormAcadCentroEstudios: ['', [Validators.required]],
      iPaisId: [this.configService.getDefaultPaisId(), [Validators.required]],
      cFormAcadCiudad: [''],
      iDptoId: [{ value: '', disabled: true }],
      iPrvnId: [{ value: '', disabled: true }],
      iDsttId: [{ value: '', disabled: true }],
      iEduSitAcadId: ['', [Validators.required]],
      iEduGradAlcId: [{ value: '', disabled: true }],
      iEduSitAcadAnioInicio: ['', [Validators.required]],
      iEduSitAcadAnioFin: ['', [Validators.required]],
      iEduNivEspId: [{ value: '', disabled: true }],
      iEduCarrId: [''],
      iEduProGenId: [''],
      iEduProProfId: [''],
      iEduProId: [''],
      cFormAcadTitulo: [''],
      cFormAcadEspecialidad: [''],
      dtFormAcadFechaExpedicion: [null],
      iEduCentRegId: [''],
      cFormAcadCentroRegistro: [''],
      cFormAcadNumeroRegistro: [''],
      dtFormAcadFechaRegistro: [null],
      dtFormAcadFechaDocumento: [null],
      cFormAcadNumeroDocumento: [''],
      iArchId: ['', Validators.required]
    });

    // Suscripción al cambio de nivel educativo
    this.formacionForm.get('iEduNivEdId')?.valueChanges.subscribe(nivelId => {
      this.onNivelEducativoChange(nivelId);
      // Manejar nivel especialidad
      const nivelEspecialidadControl = this.formacionForm.get('iEduNivEspId');
      if (this.mostrarNivelEspecialidad) {
        nivelEspecialidadControl?.enable();
      } else {
        nivelEspecialidadControl?.disable();
        nivelEspecialidadControl?.setValue(null);
        this.nivelesEspecialidad = [];
      }
    });

    // Suscripciones a cambios en el formulario
    this.formacionForm.get('iPaisId')?.valueChanges.subscribe(paisId => {
      this.onPaisChange(paisId);
    });

    this.formacionForm.get('iDptoId')?.valueChanges.subscribe(dptoId => {
      if (dptoId) {
        this.onDepartamentoChange(dptoId);
      }
    });

    this.formacionForm.get('iPrvnId')?.valueChanges.subscribe(prvnId => {
      if (prvnId) this.cargarDistritos(prvnId);
    });

    this.formacionForm.get('iEduSitAcadId')?.valueChanges.subscribe(situacionId => {
      this.onSituacionAcademicaChange(situacionId);
    });

    this.formacionForm.get('iEduCarrId')?.valueChanges.subscribe(carreraId => {
      const programaGeneralControl = this.formacionForm.get('iEduProGenId');
      const programaProfesionalControl = this.formacionForm.get('iEduProProfId');
      const programaControl = this.formacionForm.get('iEduProId');

      // Resetear y deshabilitar controles dependientes
      [programaGeneralControl, programaProfesionalControl, programaControl].forEach(control => {
        control?.setValue(null);
        control?.disable();
      });

      // Limpiar listas
      this.programasGenerales = [];
      this.programasProfesionales = [];
      this.programas = [];

      if (carreraId) {
        programaGeneralControl?.enable();
        this.cargarProgramasGenerales(carreraId).subscribe(() => {
          // Habilitar el control después de cargar los datos
          programaGeneralControl?.enable();
        });
      }
    });

    this.formacionForm.get('iEduProGenId')?.valueChanges.subscribe(programaGeneralId => {
      const programaProfesionalControl = this.formacionForm.get('iEduProProfId');
      const programaControl = this.formacionForm.get('iEduProId');

      // Resetear y deshabilitar controles dependientes
      [programaProfesionalControl, programaControl].forEach(control => {
        control?.setValue(null);
        control?.disable();
      });

      // Limpiar listas
      this.programasProfesionales = [];
      this.programas = [];

      if (programaGeneralId) {
        this.cargarProgramasProfesionales(programaGeneralId).subscribe(() => {
          // Habilitar el control después de cargar los datos
          programaProfesionalControl?.enable();
        });
      }
    });

    this.formacionForm.get('iEduProProfId')?.valueChanges.subscribe(programaProfesionalId => {
      const programaControl = this.formacionForm.get('iEduProId');

      // Resetear y deshabilitar control dependiente
      programaControl?.setValue(null);
      programaControl?.disable();

      // Limpiar lista
      this.programas = [];

      if (programaProfesionalId) {
        this.cargarProgramas(programaProfesionalId).subscribe(() => {
          // Habilitar el control después de cargar los datos
          programaControl?.enable();
        });
      }
    });

    // Agregar suscripción a cambios en grado alcanzado
    this.formacionForm.get('iEduGradAlcId')?.valueChanges.subscribe(gradoId => {
      const nivelId = this.formacionForm.get('iEduNivEdId')?.value;
      
      if (nivelId === this.configService.getNivelEducativoPosgradoId() && gradoId) {
        this.cargarNivelesEspecialidad(undefined, undefined, gradoId);
      }
    });
  }

  // Métodos para cargar datos iniciales y manejar cambios
  private cargarDatosIniciales(): void {
    this.cargarNivelesEducativos();
    this.cargarTiposSecundaria();
    this.cargarTiposEducacionSuperior();
    this.cargarPaises();
    this.cargarGradosAlcanzados();
    this.cargarCarreras();
    this.cargarNivelesEspecialidad();
    this.cargarTiposCentro();
  }

  private cargarDatos(): void {
    if (this.legajo?.iLegId) {
      this.vFormacionAcademicaService.getAll({ 
        campo: 'iLegId', 
        valor: this.legajo.iLegId.toString() 
      }).subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (error) => {
          console.error('Error al cargar formaciones académicas:', error);
          this.snackBar.open('Error al cargar los registros', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  // Métodos para cargar datos de los servicios
  private cargarNivelesEducativos(): void {
    this.educacionNivelEducativoService.getAll().subscribe({
      next: (niveles) => {
        this.nivelesEducativos = niveles;
      },
      error: (error) => {
        console.error('Error al cargar niveles educativos:', error);
      }
    });
  }

  private cargarTiposSecundaria(): void {
    this.educacionTipoSecundariaService.getAll().subscribe({
      next: (tipos) => {
        this.tiposSecundaria = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de secundaria:', error);
        this.snackBar.open('Error al cargar tipos de secundaria', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  private cargarTiposEducacionSuperior(): void {
    this.educacionTipoSuperiorService.getAll().subscribe({
      next: (tipos) => {
        this.tiposEducacionSuperior = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de educación superior:', error);
      }
    });
  }

  private cargarPaises(): void {
    this.paisService.getAll().subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: (error) => {
        console.error('Error al cargar países:', error);
      }
    });
  }

  private cargarDepartamentos(): void {
    this.departamentoService.getAll().subscribe({
      next: (departamentos) => {
        this.departamentos = departamentos;
      },
      error: (error) => {
        console.error('Error al cargar departamentos:', error);
      }
    });
  }

  private cargarProvincias(dptoId: number): void {
    this.provinciaService.getAll({ 
      campo: 'iDptoId', 
      valor: dptoId.toString() 
    }).subscribe({
      next: (provincias) => {
        this.provincias = provincias;
      },
      error: (error) => {
        console.error('Error al cargar provincias:', error);
      }
    });
  }

  private cargarDistritos(prvnId: number): void {
    this.distritoService.getAll({ 
      campo: 'iPrvnId', 
      valor: prvnId.toString() 
    }).subscribe({
      next: (distritos) => {
        this.distritos = distritos;
      },
      error: (error) => {
        console.error('Error al cargar distritos:', error);
      }
    });
  }

  private cargarGradosAlcanzados(): void {
    this.educacionGradoAlcanzadoService.getAll().subscribe({
      next: (grados) => {
        this.gradosAlcanzados = grados;
      },
      error: (error) => {
        console.error('Error al cargar grados alcanzados:', error);
      }
    });
  }

  private cargarCarreras(): void {
    this.educacionCarreraService.getAll().subscribe({
      next: (carreras) => {
        this.carreras = carreras;
      },
      error: (error) => {
        console.error('Error al cargar carreras:', error);
      }
    });
  }

  private cargarProgramasGenerales(carreraId: number): Observable<EducacionProgramaGeneral[]> {
    return this.educacionProgramaGeneralService.getAll({ 
      campo: 'iEduCarrId', 
      valor: carreraId.toString() 
    }).pipe(
      tap(programas => {
        this.programasGenerales = programas;
      })
    );
  }

  private cargarProgramasProfesionales(programaGeneralId: number): Observable<EducacionProgramaProfesional[]> {
    return this.educacionProgramaProfesionalService.getAll({ 
      campo: 'iEduProGenId', 
      valor: programaGeneralId.toString() 
    }).pipe(
      tap(programas => {
        this.programasProfesionales = programas;
      })
    );
  }

  private cargarProgramas(programaProfesionalId: number): Observable<EducacionPrograma[]> {
    return this.educacionProgramaService.getAll({ 
      campo: 'iEduProProfId', 
      valor: programaProfesionalId.toString() 
    }).pipe(
      tap(programas => {
        this.programas = programas;
      })
    );
  }

  // Métodos para manejar cambios en los selects
  private onNivelEducativoChange(nivelId: number): void {
    const secundariaControl = this.formacionForm.get('iEduTipoSecId');
    const superiorControl = this.formacionForm.get('iEduTipSupId');
    const situacionControl = this.formacionForm.get('iEduSitAcadId');
    const gradoControl = this.formacionForm.get('iEduGradAlcId');
    const nivelEspecialidadControl = this.formacionForm.get('iEduNivEspId');

    // Resetear y deshabilitar todos los controles
    [secundariaControl, superiorControl, situacionControl, gradoControl, nivelEspecialidadControl].forEach(control => {
      control?.setValue(null);
      control?.disable();
    });

    // Habilitar situación académica por defecto
    situacionControl?.enable();

    this.situacionesAcademicas = [];
    this.nivelesEspecialidad = [];

    // Habilitar controles según el nivel educativo
    switch(nivelId) {
      case this.configService.getNivelTecnicoProductivaId():
        nivelEspecialidadControl?.enable();
        this.cargarSituacionesAcademicas(nivelId);
        this.cargarNivelesEspecialidad(undefined, nivelId);
        break;

      case this.configService.getSecundariaNivelId():
        secundariaControl?.enable();
        this.cargarTiposSecundaria();
        this.cargarSituacionesAcademicas(nivelId);
        break;
        
      case this.configService.getSuperiorNivelId():
        superiorControl?.enable();
        nivelEspecialidadControl?.enable();
        this.cargarSituacionesAcademicas(nivelId);
        
        // Suscribirse a cambios en el tipo superior
        this.formacionForm.get('iEduTipSupId')?.valueChanges.subscribe(tipoSupId => {
          if (tipoSupId) {
            this.cargarSituacionesAcademicas(tipoSupId, true);
            this.cargarNivelesEspecialidad(tipoSupId);
          }
        });
        break;
        
      case this.configService.getNivelEducativoPosgradoId():
        gradoControl?.enable();
        nivelEspecialidadControl?.enable();
        this.cargarSituacionesAcademicas(nivelId);
        break;
        
      default:
        this.cargarSituacionesAcademicas(nivelId);
    }
  }

  private cargarSituacionesAcademicas(id: number, esTipoSuperior: boolean = false): void {
    this.educacionSituacionAcademicaService.getAll({ 
      campo: esTipoSuperior ? 'iEduTipSupId' : 'iEduNivEdId', 
      valor: id.toString() 
    }).subscribe({
      next: (situaciones) => {
        this.situacionesAcademicas = situaciones;
      },
      error: (error) => {
        console.error('Error al cargar situaciones académicas:', error);
        this.snackBar.open('Error al cargar situaciones académicas', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  private onPaisChange(paisId: number): void {
    const dptoControl = this.formacionForm.get('iDptoId');
    const prvnControl = this.formacionForm.get('iPrvnId');
    const dsttControl = this.formacionForm.get('iDsttId');

    if (paisId === this.configService.getDefaultPaisId()) {
      // Habilitar departamento y cargar datos
      dptoControl?.enable();
      prvnControl?.enable(); // Habilitar provincia también
      dsttControl?.enable(); // Habilitar distrito también
      this.cargarDepartamentos();
    } else {
      // Deshabilitar y limpiar controles de ubicación
      dptoControl?.disable();
      prvnControl?.disable();
      dsttControl?.disable();
      
      // Limpiar valores
      dptoControl?.setValue(null);
      prvnControl?.setValue(null);
      dsttControl?.setValue(null);
      
      // Limpiar listas
      this.departamentos = [];
      this.provincias = [];
      this.distritos = [];
    }
  }

  // Agregar método específico para cambios de departamento
  private onDepartamentoChange(dptoId: number): void {
    const prvnControl = this.formacionForm.get('iPrvnId');
    const dsttControl = this.formacionForm.get('iDsttId');

    // Habilitar provincia
    prvnControl?.enable();
    
    // Resetear valores
    prvnControl?.setValue(null);
    dsttControl?.setValue(null);
    
    // Limpiar listas
    this.provincias = [];
    this.distritos = [];

    // Cargar provincias
    if (dptoId) {
      this.cargarProvincias(dptoId);
    }
  }

  private onSituacionAcademicaChange(situacionId: number): void {
    const gradoControl = this.formacionForm.get('iEduGradAlcId');
    const nivelId = this.formacionForm.get('iEduNivEdId')?.value;
    
    // Si es posgrado, mantener habilitado independientemente de la situación
    if (nivelId === this.configService.getNivelEducativoPosgradoId()) {
      gradoControl?.enable();
    } else {
        gradoControl?.enable();
        gradoControl?.setValue(null);
    }
  }

  // Métodos para manejar el archivo
  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo) {
      this.formacionForm.patchValue({
        iArchId: archivo.iArchId
      });
    }
  }

  // Métodos CRUD
  guardar(): void {
    if (this.formacionForm.valid && this.legajo) {
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
            ...this.formacionForm.getRawValue(),
            iLegId: this.legajo?.iLegId
          };

          if (this.modoEdicion && this.registroSeleccionado?.iFormAcadId) {
            this.formacionAcademicaService.update(this.registroSeleccionado.iFormAcadId, formData)
              .subscribe({
                next: () => {
                  this.snackBar.open('Registro actualizado correctamente', 'Cerrar', {
                    duration: 3000
                  });
                  this.cargarDatos();
                  this.limpiar();
                },
                error: this.handleError
              });
          } else {
            this.formacionAcademicaService.create(formData)
              .subscribe({
                next: () => {
                  this.snackBar.open('Registro creado correctamente', 'Cerrar', {
                    duration: 3000
                  });
                  this.cargarDatos();
                  this.limpiar();
                },
                error: this.handleError
              });
          }
        }
      });
    } else {
      this.mostrarErroresValidacion();
    }
  }

  private handleError = (error: any): void => {
    console.error('Error:', error);
    let errorMessage = 'Error al procesar la solicitud';
    if (error.error?.message) {
      errorMessage += `: ${error.error.message}`;
    }
    this.snackBar.open(errorMessage, 'Cerrar', {
      duration: 5000
    });
  };

  private mostrarErroresValidacion(): void {
    const camposInvalidos = Object.keys(this.formacionForm.controls)
      .filter(key => {
        const control = this.formacionForm.get(key);
        return control && !control.disabled && control.invalid;
      })
      .map(key => {
        // Mapear los nombres técnicos a nombres amigables
        const nombresCampos: { [key: string]: string } = {
          iEduNivEdId: 'Nivel educativo',
          cFormAcadCentroEstudios: 'Centro de estudios',
          iPaisId: 'País',
          iEduSitAcadId: 'Situación académica',
          iEduSitAcadAnioInicio: 'Año de inicio',
          iEduSitAcadAnioFin: 'Año de fin',
          iArchId: 'Archivo'
        };
        return nombresCampos[key] || key;
      });

    this.snackBar.open(
      `Por favor complete los siguientes campos requeridos: ${camposInvalidos.join(', ')}`,
      'Cerrar',
      {
        duration: 5000
      }
    );
  }

  limpiar(): void {
    this.formacionForm.reset();
    this.modoEdicion = false;
    this.modoVisualizacion = false;
    this.registroSeleccionado = undefined;
    this.camposHabilitados = true;
  }

  verRegistro(formacion: VFormacionAcademica): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = formacion;
    this.camposHabilitados = false;
    this.formacionForm.disable();
    this.cargarDatosRegistro(formacion);
  }

  editarRegistro(formacion: VFormacionAcademica): void {
    this.modoEdicion = true;
    this.modoVisualizacion = false;
    this.registroSeleccionado = formacion;
    this.camposHabilitados = true;
    this.formacionForm.enable();
    this.cargarDatosRegistro(formacion);
  }

  private cargarDatosRegistro(formacion: VFormacionAcademica): void {
    // Cargar datos en el formulario
    this.formacionForm.patchValue({
      ...formacion
    });

    // Manejar las dependencias
    if (formacion.iPaisId === this.configService.getDefaultPaisId()) {
      this.cargarDepartamentos();
      if (formacion.iDptoId) {
        this.cargarProvincias(formacion.iDptoId);
        if (formacion.iPrvnId) {
          this.cargarDistritos(formacion.iPrvnId);
        }
      }
    }
  }

  eliminarRegistro(formacion: VFormacionAcademica): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && formacion.iFormAcadId) {
        this.formacionAcademicaService.delete(formacion.iFormAcadId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
            
            this.cargarDatos();
            if (this.registroSeleccionado?.iFormAcadId === formacion.iFormAcadId) {
              this.limpiar();
            }
          },
          error: this.handleError
        });
      }
    });
  }

  private generarListaAnios(): void {
    const anioActual = new Date().getFullYear();
    const anioInicial = anioActual - 50;
    this.anios = Array.from(
      { length: anioActual - anioInicial + 1 }, 
      (_, i) => anioActual - i
    );
  }

  // Agregar getters para los IDs de configuración
  get nivelSecundariaId(): number {
    return this.configService.getSecundariaNivelId();
  }

  get nivelSuperiorId(): number {
    return this.configService.getSuperiorNivelId();
  }

  get situacionConGradoId(): number {
    return this.configService.getNivelEducativoPosgradoId();
  }

  get defaultPaisId(): number {
    return this.configService.getDefaultPaisId();
  }

  // Método para validar campos
  validarCampo(campo: string): boolean {
    const control = this.formacionForm.get(campo);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  // Método para manejar la selección de archivo
  onArchivoIdSelected(archivoId: number): void {
    this.formacionForm.patchValue({
      iArchId: archivoId
    });
  }

  // Método para guardar
  onGuardar(): void {
    if (this.modoVisualizacion) {
      return;
    }
    this.guardar();
  }

  // Agregar getter para controlar visibilidad del grado alcanzado
  get mostrarGradoAlcanzado(): boolean {
    const nivelId = this.formacionForm.get('iEduNivEdId')?.value;
    return nivelId === this.configService.getNivelEducativoPosgradoId();
  }

  get mostrarNivelEspecialidad(): boolean {
    const nivelId = this.formacionForm.get('iEduNivEdId')?.value;
    if (!nivelId) return false;

    return (
      nivelId === this.configService.getNivelTecnicoProductivaId() || 
      nivelId === this.configService.getSuperiorNivelId() ||
      nivelId === this.configService.getNivelEducativoPosgradoId()
    );
  }

  private cargarNivelesEspecialidad(tipoSupId?: number, nivelEducativoId?: number, gradoAlcanzadoId?: number): void {
    const nivelId = this.formacionForm.get('iEduNivEdId')?.value;
    
    // Solo cargar si es técnico productivo, superior o posgrado
    if (!nivelId || (
      nivelId !== this.configService.getNivelTecnicoProductivaId() && 
      nivelId !== this.configService.getSuperiorNivelId() &&
      nivelId !== this.configService.getNivelEducativoPosgradoId()
    )) {
      this.nivelesEspecialidad = [];
      return;
    }

    let params;
    if (tipoSupId) {
      params = { campo: 'iEduTipSupId', valor: tipoSupId.toString() };
    } else if (nivelEducativoId) {
      params = { campo: 'iEduNivEdId', valor: nivelEducativoId.toString() };
    } else if (gradoAlcanzadoId) {
      params = { campo: 'iEduGradAlcId', valor: gradoAlcanzadoId.toString() };
    }

    this.educacionNivelEspecialidadService.getAll(params).subscribe({
      next: (niveles) => {
        this.nivelesEspecialidad = niveles;
      },
      error: (error) => {
        console.error('Error al cargar niveles de especialidad:', error);
        this.snackBar.open('Error al cargar niveles de especialidad', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  // Agregar estos getters
  get isSecundaria(): boolean {
    return this.formacionForm.get('iEduNivEdId')?.value === this.configService.getSecundariaNivelId();
  }

  get isSuperior(): boolean {
    return this.formacionForm.get('iEduNivEdId')?.value === this.configService.getSuperiorNivelId();
  }

  editarFormacion(formacion: VFormacionAcademica): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro que desea editar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modoEdicion = true;
        this.registroSeleccionado = formacion;

        // Habilitar los controles principales primero
        const controlesParaHabilitar = [
          'iEduNivEdId',
          'cFormAcadCentroEstudios',
          'iPaisId',
          'iEduSitAcadId',
          'iEduSitAcadAnioInicio',
          'iEduSitAcadAnioFin',
          'iEduCarrId',
          'cFormAcadTitulo',
          'cFormAcadEspecialidad',
          'dtFormAcadFechaExpedicion',
          'iEduCentRegId',
          'cFormAcadCentroRegistro',
          'cFormAcadNumeroRegistro',
          'dtFormAcadFechaRegistro',
          'dtFormAcadFechaDocumento',
          'cFormAcadNumeroDocumento',
          'iArchId'
        ];

        controlesParaHabilitar.forEach(controlName => {
          const control = this.formacionForm.get(controlName);
          control?.enable();
        });
        
        // Primero cargar y habilitar los controles según el nivel educativo
        if (formacion.iEduNivEdId !== undefined) {
          this.onNivelEducativoChange(formacion.iEduNivEdId);
        }

        // Si hay carrera, cargar programas en cascada
        if (formacion.iEduCarrId) {
          const programaGeneralControl = this.formacionForm.get('iEduProGenId');
          const programaProfesionalControl = this.formacionForm.get('iEduProProfId');
          const programaControl = this.formacionForm.get('iEduProId');

          // Habilitar y cargar programa general
          programaGeneralControl?.enable();
          this.cargarProgramasGenerales(formacion.iEduCarrId).subscribe(() => {
            // Una vez cargados los programas generales, establecer el valor y cargar profesionales
            programaGeneralControl?.setValue(formacion.iEduProGenId);
            
            if (formacion.iEduProGenId) {
              programaProfesionalControl?.enable();
              this.cargarProgramasProfesionales(formacion.iEduProGenId).subscribe(() => {
                // Una vez cargados los programas profesionales, establecer el valor y cargar programas
                programaProfesionalControl?.setValue(formacion.iEduProProfId);
                
                if (formacion.iEduProProfId) {
                  programaControl?.enable();
                  this.cargarProgramas(formacion.iEduProProfId).subscribe(() => {
                    // Finalmente establecer el programa
                    programaControl?.setValue(formacion.iEduProId);
                  });
                }
              });
            }
          });
        }

        // Luego cargar los datos en el formulario
        this.formacionForm.patchValue({
          iFormAcadId: formacion.iFormAcadId,
          iLegId: formacion.iLegId,
          iEduNivEdId: formacion.iEduNivEdId,
          iEduTipoSecId: formacion.iEduTipoSecId,
          iEduTipSupId: formacion.iEduTipSupId,
          cFormAcadCentroEstudios: formacion.cFormAcadCentroEstudios,
          iPaisId: formacion.iPaisId,
          cFormAcadCiudad: formacion.cFormAcadCiudad,
          iDptoId: formacion.iDptoId,
          iPrvnId: formacion.iPrvnId,
          iDsttId: formacion.iDsttId,
          iEduSitAcadId: formacion.iEduSitAcadId,
          iEduGradAlcId: formacion.iEduGradAlcId,
          iEduSitAcadAnioInicio: formacion.iEduSitAcadAnioInicio,
          iEduSitAcadAnioFin: formacion.iEduSitAcadAnioFin,
          iEduNivEspId: formacion.iEduNivEspId,
          iEduCarrId: formacion.iEduCarrId,
          iEduProGenId: formacion.iEduProGenId,
          iEduProProfId: formacion.iEduProProfId,
          iEduProId: formacion.iEduProId,
          cFormAcadTitulo: formacion.cFormAcadTitulo,
          cFormAcadEspecialidad: formacion.cFormAcadEspecialidad,
          dtFormAcadFechaExpedicion: formacion.dtFormAcadFechaExpedicion,
          iEduCentRegId: formacion.iEduCentRegId,
          cFormAcadCentroRegistro: formacion.cFormAcadCentroRegistro,
          cFormAcadNumeroRegistro: formacion.cFormAcadNumeroRegistro,
          dtFormAcadFechaRegistro: formacion.dtFormAcadFechaRegistro,
          dtFormAcadFechaDocumento: formacion.dtFormAcadFechaDocumento,
          cFormAcadNumeroDocumento: formacion.cFormAcadNumeroDocumento,
          iArchId: formacion.iArchId
        });

        // Si es Perú, cargar datos de ubicación
        if (formacion.iPaisId === this.configService.getDefaultPaisId()) {
          if (formacion.iDptoId) {
            this.cargarProvincias(formacion.iDptoId);
            if (formacion.iPrvnId) {
              this.cargarDistritos(formacion.iPrvnId);
            }
          }
        }

        // Si es nivel superior, cargar datos relacionados
        if (formacion.iEduNivEdId === this.configService.getSuperiorNivelId() && formacion.iEduTipSupId) {
          this.cargarSituacionesAcademicas(formacion.iEduTipSupId, true);
        }

        // Si hay carrera, cargar datos relacionados
        if (formacion.iEduCarrId) {
          this.cargarProgramasGenerales(formacion.iEduCarrId);
        }
      }
    });
  }

  eliminarFormacion(formacion: VFormacionAcademica): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro que desea eliminar este registro? Esta acción no se puede deshacer.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && formacion.iFormAcadId) {
        this.formacionAcademicaService.delete(formacion.iFormAcadId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarDatos();
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

  visualizarFormacion(formacion: VFormacionAcademica): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = formacion;

    // Habilitar los controles principales primero
    const controlesParaHabilitar = [
      'iEduNivEdId',
      'cFormAcadCentroEstudios',
      'iPaisId',
      'iEduSitAcadId',
      'iEduSitAcadAnioInicio',
      'iEduSitAcadAnioFin',
      'iEduCarrId',
      'cFormAcadTitulo',
      'cFormAcadEspecialidad',
      'dtFormAcadFechaExpedicion',
      'iEduCentRegId',
      'cFormAcadCentroRegistro',
      'cFormAcadNumeroRegistro',
      'dtFormAcadFechaRegistro',
      'dtFormAcadFechaDocumento',
      'cFormAcadNumeroDocumento',
      'iArchId'
    ];

    controlesParaHabilitar.forEach(controlName => {
      const control = this.formacionForm.get(controlName);
      control?.disable();
    });
    
    // Primero cargar y habilitar los controles según el nivel educativo
    if (formacion.iEduNivEdId !== undefined) {
      this.onNivelEducativoChange(formacion.iEduNivEdId);
    }

    // Si hay carrera, cargar programas en cascada
    if (formacion.iEduCarrId) {
      const programaGeneralControl = this.formacionForm.get('iEduProGenId');
      const programaProfesionalControl = this.formacionForm.get('iEduProProfId');
      const programaControl = this.formacionForm.get('iEduProId');

      // Habilitar y cargar programa general
      programaGeneralControl?.enable();
      this.cargarProgramasGenerales(formacion.iEduCarrId).subscribe(() => {
        // Una vez cargados los programas generales, establecer el valor y cargar profesionales
        programaGeneralControl?.setValue(formacion.iEduProGenId);
        
        if (formacion.iEduProGenId) {
          programaProfesionalControl?.enable();
          this.cargarProgramasProfesionales(formacion.iEduProGenId).subscribe(() => {
            // Una vez cargados los programas profesionales, establecer el valor y cargar programas
            programaProfesionalControl?.setValue(formacion.iEduProProfId);
            
            if (formacion.iEduProProfId) {
              programaControl?.enable();
              this.cargarProgramas(formacion.iEduProProfId).subscribe(() => {
                // Finalmente establecer el programa
                programaControl?.setValue(formacion.iEduProId);
              });
            }
          });
        }
      });
    }

    // Luego cargar los datos en el formulario
    this.formacionForm.patchValue({
      iFormAcadId: formacion.iFormAcadId,
      iLegId: formacion.iLegId,
      iEduNivEdId: formacion.iEduNivEdId,
      iEduTipoSecId: formacion.iEduTipoSecId,
      iEduTipSupId: formacion.iEduTipSupId,
      cFormAcadCentroEstudios: formacion.cFormAcadCentroEstudios,
      iPaisId: formacion.iPaisId,
      cFormAcadCiudad: formacion.cFormAcadCiudad,
      iDptoId: formacion.iDptoId,
      iPrvnId: formacion.iPrvnId,
      iDsttId: formacion.iDsttId,
      iEduSitAcadId: formacion.iEduSitAcadId,
      iEduGradAlcId: formacion.iEduGradAlcId,
      iEduSitAcadAnioInicio: formacion.iEduSitAcadAnioInicio,
      iEduSitAcadAnioFin: formacion.iEduSitAcadAnioFin,
      iEduNivEspId: formacion.iEduNivEspId,
      iEduCarrId: formacion.iEduCarrId,
      iEduProGenId: formacion.iEduProGenId,
      iEduProProfId: formacion.iEduProProfId,
      iEduProId: formacion.iEduProId,
      cFormAcadTitulo: formacion.cFormAcadTitulo,
      cFormAcadEspecialidad: formacion.cFormAcadEspecialidad,
      dtFormAcadFechaExpedicion: formacion.dtFormAcadFechaExpedicion,
      iEduCentRegId: formacion.iEduCentRegId,
      cFormAcadCentroRegistro: formacion.cFormAcadCentroRegistro,
      cFormAcadNumeroRegistro: formacion.cFormAcadNumeroRegistro,
      dtFormAcadFechaRegistro: formacion.dtFormAcadFechaRegistro,
      dtFormAcadFechaDocumento: formacion.dtFormAcadFechaDocumento,
      cFormAcadNumeroDocumento: formacion.cFormAcadNumeroDocumento,
      iArchId: formacion.iArchId
    });

    // Si es Perú, cargar datos de ubicación
    if (formacion.iPaisId === this.configService.getDefaultPaisId()) {
      if (formacion.iDptoId) {
        this.cargarProvincias(formacion.iDptoId);
        if (formacion.iPrvnId) {
          this.cargarDistritos(formacion.iPrvnId);
        }
      }
    }

    // Si es nivel superior, cargar datos relacionados
    if (formacion.iEduNivEdId === this.configService.getSuperiorNivelId() && formacion.iEduTipSupId) {
      this.cargarSituacionesAcademicas(formacion.iEduTipSupId, true);
    }

    // Si hay carrera, cargar datos relacionados
    if (formacion.iEduCarrId) {
      this.cargarProgramasGenerales(formacion.iEduCarrId);
    }
  }

  // Método auxiliar para establecer valores
  private establecerValoresFormulario(formacion: VFormacionAcademica): void {
    this.formacionForm.patchValue({
      iFormAcadId: formacion.iFormAcadId,
      iLegId: formacion.iLegId,
      iEduNivEdId: formacion.iEduNivEdId,
      iEduTipoSecId: formacion.iEduTipoSecId,
      iEduTipSupId: formacion.iEduTipSupId,
      cFormAcadCentroEstudios: formacion.cFormAcadCentroEstudios,
      iPaisId: formacion.iPaisId,
      cFormAcadCiudad: formacion.cFormAcadCiudad,
      iDptoId: formacion.iDptoId,
      iPrvnId: formacion.iPrvnId,
      iDsttId: formacion.iDsttId,
      iEduSitAcadId: formacion.iEduSitAcadId,
      iEduGradAlcId: formacion.iEduGradAlcId,
      iEduSitAcadAnioInicio: formacion.iEduSitAcadAnioInicio,
      iEduSitAcadAnioFin: formacion.iEduSitAcadAnioFin,
      iEduNivEspId: formacion.iEduNivEspId,
      iEduCarrId: formacion.iEduCarrId,
      iEduProGenId: formacion.iEduProGenId,
      iEduProProfId: formacion.iEduProProfId,
      iEduProId: formacion.iEduProId,
      cFormAcadTitulo: formacion.cFormAcadTitulo,
      cFormAcadEspecialidad: formacion.cFormAcadEspecialidad,
      dtFormAcadFechaExpedicion: formacion.dtFormAcadFechaExpedicion,
      iEduCentRegId: formacion.iEduCentRegId,
      cFormAcadCentroRegistro: formacion.cFormAcadCentroRegistro,
      cFormAcadNumeroRegistro: formacion.cFormAcadNumeroRegistro,
      dtFormAcadFechaRegistro: formacion.dtFormAcadFechaRegistro,
      dtFormAcadFechaDocumento: formacion.dtFormAcadFechaDocumento,
      cFormAcadNumeroDocumento: formacion.cFormAcadNumeroDocumento,
      iArchId: formacion.iArchId
    });
  }

  // Método auxiliar para deshabilitar todo el formulario
  private deshabilitarTodoElFormulario(): void {
    // Deshabilitar todo el formulario
    this.formacionForm.disable();
    
    // Deshabilitar también los controles que podrían estar habilitados por onNivelEducativoChange
    Object.keys(this.formacionForm.controls).forEach(key => {
      const control = this.formacionForm.get(key);
      control?.disable();
    });
  }

  // Agregar el método para cargar tipos de centro
  private cargarTiposCentro(): void {
    this.educacionTipoCentroService.getAll().subscribe({
      next: (tipos) => {
        this.tiposCentro = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de centro:', error);
        this.snackBar.open('Error al cargar tipos de centro', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  cerrarVisualizacion(): void {
    // Resetear el modo
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;

    // Limpiar y habilitar el formulario
    this.formacionForm.reset();
    this.formacionForm.enable();

    // Restablecer valores por defecto
    this.formacionForm.patchValue({
      iPaisId: this.configService.getDefaultPaisId()
    });

    // Reiniciar las listas dependientes
    this.programasGenerales = [];
    this.programasProfesionales = [];
    this.programas = [];

    // Disparar el onPaisChange con el país por defecto
    this.onPaisChange(this.configService.getDefaultPaisId());
  }
} 