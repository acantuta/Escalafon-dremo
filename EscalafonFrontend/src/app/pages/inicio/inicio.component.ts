import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoDocumentoIdentificacionService } from '../../services/tipo-documento-identificacion.service';
import { TipoDocumentoIdentificacion } from '../../interfaces/tipo-documento-identificacion';
import { CondicionLaboralService } from '../../services/condicion-laboral.service';
import { CondicionLaboral } from '../../interfaces/condicion-laboral';
import { RegimenLaboralService } from '../../services/regimen-laboral.service';
import { RegimenLaboral } from '../../interfaces/regimen-laboral';
import { SituacionLaboralService } from '../../services/situacion-laboral.service';
import { SituacionLaboral } from '../../interfaces/situacion-laboral';
import { DireccionRegionalService } from '../../services/direccion-regional.service';
import { DireccionRegional } from '../../interfaces/direccion-regional';
import { InstanciaGestionEducativaDescentralizadaService } from '../../services/instancia-gestion-educativa-descentralizada.service';
import { InstanciaGestionEducativaDescentralizada } from '../../interfaces/instancia-gestion-educativa-descentralizada';
import { VLegajoService } from '../../services/v-legajo.service';
import { VLegajo } from '../../interfaces/v-legajo';

import { HttpParams } from '@angular/common/http';
import { PaginatedRequest } from '../../core/interfaces/paginated-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  tiposDocumento: TipoDocumentoIdentificacion[] = [];
  condicionesLaborales: CondicionLaboral[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  situacionesLaborales: SituacionLaboral[] = [];
  direccionesRegionales: DireccionRegional[] = [];
  searchForm: FormGroup;
  instanciasGestionEducativa: InstanciaGestionEducativaDescentralizada[] = [];
  totalElements: number = 0;
  resultados = new MatTableDataSource<VLegajo>([]);
  totalRegistros: number = 0;
  tamanioPagina: number = 10;
  paginaActual: number = 0;

  constructor(
    private tipoDocumentoService: TipoDocumentoIdentificacionService,
    private condicionLaboralService: CondicionLaboralService,
    private regimenLaboralService: RegimenLaboralService,
    private situacionLaboralService: SituacionLaboralService,
    private direccionRegionalService: DireccionRegionalService,
    private fb: FormBuilder,
    private igedService: InstanciaGestionEducativaDescentralizadaService,
    private vLegajoService: VLegajoService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      tipoDocumento: [''],
      numeroDocumento: [''],
      primerApellido: [''],
      segundoApellido: [''],
      nombres: [''],
      condicionLaboral: [''],
      situacionLaboral: [''],
      regimenLaboral: [''],
      codigoPlaza: [''],
      direccionRegional: [''],
      instanciaGestionEducativa: [''],
      codigoModular: [''],
      centroLaboral: ['']
    });
  }

  ngOnInit(): void {
    this.loadTiposDocumento();
    this.loadCondicionesLaborales();
    this.loadRegimenesLaborales();
    this.loadSituacionesLaborales();
    this.loadDireccionesRegionales();
  
    
    // Agregar suscripción para ver cambios en el select
    this.searchForm.get('tipoDocumento')?.valueChanges.subscribe(value => {
      console.log('Valor seleccionado:', value);
    });

    // Suscribirse a los cambios de dirección regional
    this.searchForm.get('direccionRegional')?.valueChanges.subscribe(dirRegId => {
      console.log('Valor seleccionado:', dirRegId);
      if (dirRegId) {
        this.cargarInstanciasGestionEducativa(dirRegId);
        //this.searchForm.get('instanciaGestionEducativa')?.setValue(''); // Reset IGED
      } else {
        this.instanciasGestionEducativa = [];
      }
    });
  }

  private loadTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe({
      next: (tipos) => {
        console.log('Tipos de documento cargados:', tipos); // Para verificar los datos
        this.tiposDocumento = tipos;
      },
      error: (error) => console.error('Error cargando tipos de documento:', error)
    });
  }

  private loadCondicionesLaborales(): void {
    this.condicionLaboralService.getAll().subscribe({
      next: (condiciones) => {
        this.condicionesLaborales = condiciones;
      },
      error: (error) => console.error('Error cargando condiciones laborales:', error)
    });
  }

  private loadRegimenesLaborales(): void {
    this.regimenLaboralService.getAll().subscribe({
      next: (regimenes) => {
        console.log('Regímenes laborales cargados:', regimenes);
        this.regimenesLaborales = regimenes;
      },
      error: (error) => console.error('Error cargando regímenes laborales:', error)
    });
  }

  private loadSituacionesLaborales(): void {
    this.situacionLaboralService.getAll().subscribe({
      next: (situaciones) => {
        this.situacionesLaborales = situaciones;
      },
      error: (error) => console.error('Error cargando situaciones laborales:', error)
    });
  }

  private loadDireccionesRegionales(): void {
    this.direccionRegionalService.getAll().subscribe({
      next: (direcciones) => {
        this.direccionesRegionales = direcciones;
      },
      error: (error) => console.error('Error cargando direcciones regionales:', error)
    });
  }

  private cargarInstanciasGestionEducativa(dirRegId: number): void {
    const request: PaginatedRequest = {
        filters: {
            iDirRegId: {
                operator: 'equals',
                value: dirRegId
            }
        },
        page: 1,
        pageSize: 10,
        sortOrder: 'ASC'
    };

    this.igedService.listarPaginado(request)
        .subscribe({
            next: (response) => {
                this.instanciasGestionEducativa = response.data;
                this.totalElements = response.meta.total;
            },
            error: (error) => console.error('Error cargando IGEDs:', error)
        });
  }

  onPageChange(event: PageEvent) {
    this.paginaActual = event.pageIndex;
    this.tamanioPagina = event.pageSize;
    this.buscar(); // Realizar nueva búsqueda con la página actualizada
  }

  handleEnterKey(event: Event): void {
    // Convertir el evento a KeyboardEvent
    const keyEvent = event as KeyboardEvent;
    keyEvent.preventDefault();
    keyEvent.stopPropagation();
    this.buscar();
  }

  buscar(): void {
    if (this.searchForm.valid) {
      const formValues = { ...this.searchForm.value };
      const filters: any = {};

      // Mapear los campos del formulario a los campos de la API
      if (formValues.tipoDocumento) filters.iTipoIdentId = { operator: 'equals', value: formValues.tipoDocumento };
      if (formValues.numeroDocumento) filters.cLegNumeroDocumentoIdentida = { operator: 'equals', value: formValues.numeroDocumento };
      if (formValues.primerApellido) filters.cLegPrimerApellido = { operator: 'like', value: formValues.primerApellido };
      if (formValues.segundoApellido) filters.cLegSegundoApellido = { operator: 'like', value: formValues.segundoApellido };
      if (formValues.nombres) filters.cLegNombres = { operator: 'like', value: formValues.nombres };
      if (formValues.condicionLaboral) filters.iCondLabId = { operator: 'equals', value: formValues.condicionLaboral };
      if (formValues.situacionLaboral) filters.iSitLabId = { operator: 'equals', value: formValues.situacionLaboral };
      if (formValues.regimenLaboral) filters.iRegLabId = { operator: 'equals', value: formValues.regimenLaboral };
      if (formValues.codigoPlaza) filters.cLegCodigoPlaza = { operator: 'like', value: formValues.codigoPlaza };
      if (formValues.direccionRegional) filters.iDirRegId = { operator: 'equals', value: formValues.direccionRegional };
      if (formValues.instanciaGestionEducativa) filters.iInstGeEduId = { operator: 'equals', value: formValues.instanciaGestionEducativa };
      if (formValues.codigoModular) filters.cCentLabCodigoModular = { operator: 'like', value: formValues.codigoModular };
      if (formValues.centroLaboral) filters.cCentLabNombre = { operator: 'like', value: formValues.centroLaboral };

      const request: PaginatedRequest = {
        filters,
        page: this.paginaActual + 1,
        pageSize: this.tamanioPagina,
        sortOrder: 'ASC'
      };

      this.vLegajoService.listarPaginado(request).subscribe({
        next: (response) => {
          this.resultados.data = response.data;
          this.totalRegistros = response.meta.total;
          this.snackBar.open('Búsqueda realizada con éxito', 'Cerrar', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error en la búsqueda:', error);
          this.snackBar.open('Error al realizar la búsqueda', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  limpiar(): void {
    this.searchForm.reset();
    this.instanciasGestionEducativa = [];
    this.resultados.data = [];
    this.totalRegistros = 0;
    this.snackBar.open('Formulario limpiado', 'Cerrar', {
      duration: 3000
    });
  }
}
