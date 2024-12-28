import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { FormacionAcademica } from '../../../interfaces/formacion-academica';
import { FormacionAcademicaService } from '../../../services/formacion-academica.service';
import { EducacionNivelEducativoService } from '../../../services/educacion-nivel-educativo.service';
import { EducacionTipoSecundariaService } from '../../../services/educacion-tipo-secundaria.service';
import { EducacionTipoSuperiorService } from '../../../services/educacion-tipo-superior.service';
import { PaisService } from '../../../services/pais.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { ProvinciaService } from '../../../services/provincia.service';
import { DistritoService } from '../../../services/distrito.service';
import { EducacionNivelEducativo } from '../../../interfaces/educacion-nivel-educativo';
import { EducacionTipoSecundaria } from '../../../interfaces/educacion-tipo-secundaria';
import { Pais } from '../../../interfaces/pais';
import { Departamento } from '../../../interfaces/departamento';
import { Provincia } from '../../../interfaces/provincia';
import { Distrito } from '../../../interfaces/distrito';

@Component({
  selector: 'app-formacion-academica',
  templateUrl: './formacion-academica.component.html',
  styleUrls: ['./formacion-academica.component.css']
})
export class FormacionAcademicaComponent implements OnInit {

  // Datos para la tabla
  registros: FormacionAcademica[] = [];
  columns = [];

  // Selecciones
  nivelEducativo: number | null = null;
  pais: number | null = null;
  departamento: number | null = null;
  provincia: number | null = null;
  distrito: number | null = null;
  situacionAcademica: number | null = null;
  gradoAlcanzado: number | null = null;
  anioInicio: number | null = null;
  anioFin: number | null = null;
  nivel: number | null = null;
  carrera: number | null = null;
  programaGeneral: number | null = null;
  programaProfesional: number | null = null;
  programa: number | null = null;
  centroRegistro: number | null = null;

  legajo?: VLegajo;

  formacionForm!: FormGroup;
  
  // Listas para los desplegables
  nivelesEducativos: EducacionNivelEducativo[] = [];
  tiposSecundaria: EducacionTipoSecundaria[] = [];
  tiposEducacionSuperior: any[] = [];
  paises: Pais[] = [];
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];

  constructor(
    private fb: FormBuilder,
    private formacionAcademicaService: FormacionAcademicaService,
    private educacionNivelEducativoService: EducacionNivelEducativoService,
    private educacionTipoSecundariaService: EducacionTipoSecundariaService,
    private educacionTipoSuperiorService: EducacionTipoSuperiorService,
    private paisService: PaisService,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private legajoState: LegajoStateService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.formacionForm = this.fb.group({
      iEduNivEdId: [null],
      iEduTipoSecId: [null],
      iEduTipSupId: [null],
      iPaisId: [null],
      cFormAcadCiudad: [''],
      iDptoId: [null],
      iPrvnId: [null],
      iDsttId: [null]
    });

    // Suscribirse a cambios en el nivel educativo
    this.formacionForm.get('iEduNivEdId')?.valueChanges.subscribe(value => {
      this.onNivelEducativoChange(value);
    });

    // Suscribirse a cambios en el departamento
    this.formacionForm.get('iDptoId')?.valueChanges.subscribe(value => {
      if (value) this.cargarProvincias(value);
    });

    // Suscribirse a cambios en la provincia
    this.formacionForm.get('iPrvnId')?.valueChanges.subscribe(value => {
      if (value) this.cargarDistritos(value);
    });
  }

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarDatos();
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
    });
  }

  cargarCatalogos(): void {
    // Cargar niveles educativos
    this.educacionNivelEducativoService.getAll().subscribe({
      next: (data: EducacionNivelEducativo[]) => {
        this.nivelesEducativos = data;
      },
      error: (error: Error) => {
        console.error('Error al cargar niveles educativos:', error);
      }
    });

    // Cargar países
    this.paisService.getAll().subscribe({
      next: (data: Pais[]) => {
        this.paises = data;
      },
      error: (error: Error) => {
        console.error('Error al cargar países:', error);
      }
    });

    // Cargar departamentos
    this.departamentoService.getAll().subscribe({
      next: (data: Departamento[]) => {
        this.departamentos = data;
      },
      error: (error: Error) => {
        console.error('Error al cargar departamentos:', error);
      }
    });
  }

  cargarDatos(): void {
    this.formacionAcademicaService.getAll().subscribe({
      next: (data: FormacionAcademica[]) => {
        this.registros = data;
      },
      error: (error: Error) => {
        console.error('Error al cargar datos:', error);
      }
    });
  }

  onEdit(row: FormacionAcademica): void {
    console.log('Editando registro:', row);
  }

  onDelete(row: FormacionAcademica): void {
    console.log('Eliminando registro:', row);
  }

  onView(row: FormacionAcademica): void {
    console.log('Visualizando registro:', row);
  }

  onLimpiar(): void {
    this.formacionForm.reset();
  }

  onGuardar(): void {
    if (this.formacionForm.valid) {
      console.log('Guardando formulario', this.formacionForm.value);
    }
  }

  onNivelEducativoChange(nivelId: number): void {
    // Limpiar campos dependientes
    this.formacionForm.patchValue({
      iEduTipoSecId: null,
      iEduTipSupId: null
    });

    if (nivelId) {
      // Cargar tipos según el nivel educativo seleccionado
      this.educacionTipoSecundariaService.getAll().subscribe({
        next: (data: EducacionTipoSecundaria[]) => {
          this.tiposSecundaria = data;
        },
        error: (error: Error) => {
          console.error('Error al cargar tipos de secundaria:', error);
        }
      });
    }
  }

  cargarProvincias(departamentoId: number): void {
    this.formacionForm.patchValue({ iPrvnId: null, iDsttId: null });
    this.provinciaService.getAll({ campo: 'iDptoId', valor: departamentoId.toString() })
      .subscribe({
        next: (data: Provincia[]) => {
          this.provincias = data;
        },
        error: (error: Error) => {
          console.error('Error al cargar provincias:', error);
        }
      });
  }

  cargarDistritos(provinciaId: number): void {
    this.formacionForm.patchValue({ iDsttId: null });
    this.distritoService.getAll({ campo: 'iPrvnId', valor: provinciaId.toString() })
      .subscribe({
        next: (data: Distrito[]) => {
          this.distritos = data;
        },
        error: (error: Error) => {
          console.error('Error al cargar distritos:', error);
        }
      });
  }
}