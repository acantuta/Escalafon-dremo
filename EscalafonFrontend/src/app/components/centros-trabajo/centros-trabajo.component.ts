import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DireccionRegionalService } from '../../services/direccion-regional.service';
import { DireccionRegional } from '../../interfaces/direccion-regional';
import { InstanciaGestionEducativaDescentralizadaService } from '../../services/instancia-gestion-educativa-descentralizada.service';
import { InstanciaGestionEducativaDescentralizada } from '../../interfaces/instancia-gestion-educativa-descentralizada';
import { VCentroLaboralService } from '../../services/v-centro-laboral.service';
import { VCentroLaboral } from '../../interfaces/v-centro-laboral';
import { PaginatedRequest } from '../../core/interfaces/paginated-request';
import { ModalidadEducativaService } from '../../services/modalidad-educativa.service';
import { NivelEducativoService } from '../../services/nivel-educativo.service';

@Component({
  selector: 'app-centros-trabajo',
  templateUrl: './centros-trabajo.component.html',
  styleUrls: ['./centros-trabajo.component.css']
})
export class CentrosTrabajoComponent {
  @Input() showTabs = true;
  @Output() searchResults = new EventEmitter<any>();
  @Output() centroLaboralSelected = new EventEmitter<VCentroLaboral>();
  @Output() centroLaboralIdSelected = new EventEmitter<number>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  activeTab = 'vigente';
  searchForm: FormGroup;
  resultados = new MatTableDataSource<VCentroLaboral>([]);
  displayedColumns: string[] = [
    'codigoModular', 
    'centroLaboral', 
    'iged', 
    'nivelEducativo', 
    'modalidadEducativa'
  ];
  selectedTabIndex = 0;
  direccionesRegionales: DireccionRegional[] = [];
  ugeles: InstanciaGestionEducativaDescentralizada[] = [];
  totalRegistros: number = 0;
  tamanioPagina: number = 1000;
  paginaActual: number = 0;
  totalPaginas: number = 0;
  modalidades: any[] = [];
  nivelesEducativos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private direccionRegionalService: DireccionRegionalService,
    private igedService: InstanciaGestionEducativaDescentralizadaService,
    private centroLaboralService: VCentroLaboralService,
    private modalidadService: ModalidadEducativaService,
    private nivelEducativoService: NivelEducativoService
  ) {
    this.searchForm = this.fb.group({
      dre: [''],
      ugel: [{ value: '', disabled: true }],
      modalidadEducativa: [''],
      nivelEducativa: [{ value: '', disabled: true }],
      codigoModularIE: [''],
      institucionEducativa: ['']
    });

    this.searchForm.get('dre')?.valueChanges.subscribe(dreId => {
      const ugelControl = this.searchForm.get('ugel');
      
      if (dreId) {
        ugelControl?.enable();
        this.cargarUgelesPorDre(dreId);
      } else {
        ugelControl?.disable();
        ugelControl?.setValue('');
        this.ugeles = [];
      }
    });

    this.searchForm.get('modalidadEducativa')?.valueChanges.subscribe(modalidadId => {
      const nivelControl = this.searchForm.get('nivelEducativa');
      
      if (modalidadId) {
        nivelControl?.enable();
        this.cargarNivelesPorModalidad(modalidadId);
      } else {
        nivelControl?.disable();
        nivelControl?.setValue('');
        this.nivelesEducativos = [];
      }
    });
  }

  ngAfterViewInit() {
    this.resultados.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      this.buscarCentrosLaborales();
    });
  }

  ngOnInit() {
    this.cargarDireccionesRegionales();
    this.cargarModalidades();
  }

  private cargarUgelesPorDre(dreId: number) {
    this.ugeles = [];
    this.searchForm.get('ugel')?.setValue('');

    this.igedService.getAll({ 
      campo: 'iDirRegId',
      valor: dreId.toString()
    }).subscribe({
      next: (ugeles) => {
        this.ugeles = ugeles;
        if (ugeles.length === 1) {
          this.searchForm.get('ugel')?.setValue(ugeles[0].iInstGeEduId);
        }
      },
      error: (error) => {
        console.error('Error al cargar UGELs:', error);
        this.ugeles = [];
      }
    });
  }

  private cargarDireccionesRegionales() {
    this.direccionRegionalService.getAll().subscribe({
      next: (direcciones) => {
        this.direccionesRegionales = direcciones;
      },
      error: (error) => {
        console.error('Error al cargar direcciones regionales:', error);
      }
    });
  }

  private cargarModalidades() {
    this.modalidadService.getAll().subscribe({
      next: (modalidades) => {
        this.modalidades = modalidades;
      },
      error: (error) => {
        console.error('Error al cargar modalidades:', error);
      }
    });
  }

  private cargarNivelesPorModalidad(modalidadId: number) {
    this.nivelesEducativos = [];
    this.searchForm.get('nivelEducativa')?.setValue('');

    this.nivelEducativoService.getAll({ 
      campo: 'iModEduId',
      valor: modalidadId.toString()
    }).subscribe({
      next: (niveles) => {
        this.nivelesEducativos = niveles;
        if (niveles.length === 1) {
          this.searchForm.get('nivelEducativa')?.setValue(niveles[0].iNivEduId);
        }
      },
      error: (error) => {
        console.error('Error al cargar niveles educativos:', error);
        this.nivelesEducativos = [];
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSearch() {
    this.paginaActual = 0;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.buscarCentrosLaborales();
  }

  private buscarCentrosLaborales() {
    const formValues = this.searchForm.value;
    
    const filters: any = {};

    if (formValues.dre) filters.iDirRegId = { operator: 'equals', value: formValues.dre };
    if (formValues.ugel) filters.iInstGeEduId = { operator: 'equals', value: formValues.ugel };
    if (formValues.modalidadEducativa) filters.iModEduId = { operator: 'equals', value: formValues.modalidadEducativa };
    if (formValues.nivelEducativa) filters.iNivEduId = { operator: 'equals', value: formValues.nivelEducativa };
    if (formValues.codigoModularIE) filters.cCentLabCodigoModular = { operator: 'equals', value: formValues.codigoModularIE };
    if (formValues.institucionEducativa) filters.cCentLabNombre = { operator: 'like', value: formValues.institucionEducativa };
    
    filters.bCentLabEsVigente = { 
      operator: 'equals', 
      value: this.selectedTabIndex === 0 
    };

    const request: PaginatedRequest = {
      page: this.paginator ? this.paginator.pageIndex + 1 : 1,
      pageSize: this.paginator ? this.paginator.pageSize : 10,
      filters
    };

    this.centroLaboralService.listarPaginado(request).subscribe({
      next: (response) => {
        this.resultados.data = response.data;
        this.totalRegistros = response.meta.total;
        this.tamanioPagina = response.meta.per_page;
        this.paginaActual = response.meta.current_page - 1;
        this.totalPaginas = response.meta.last_page;
        
        if (this.paginator) {
          this.paginator.length = this.totalRegistros;
          this.paginator.pageSize = this.tamanioPagina;
          this.paginator.pageIndex = this.paginaActual;
        }
      },
      error: (error) => {
        console.error('Error al buscar centros laborales:', error);
      }
    });
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
    this.resetFilters();
    this.onSearch();
  }

  private resetFilters() {
    const ugelDisabled = this.searchForm.get('ugel')?.disabled;
    const nivelDisabled = this.searchForm.get('nivelEducativa')?.disabled;

    this.searchForm.reset();

    if (ugelDisabled) {
      this.searchForm.get('ugel')?.disable();
    }
    if (nivelDisabled) {
      this.searchForm.get('nivelEducativa')?.disable();
    }
  }

  onClear() {
    this.resetFilters();
    this.paginaActual = 0;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.buscarCentrosLaborales();
  }

  onRowClick(row: VCentroLaboral) {
    this.centroLaboralSelected.emit(row);
    if (row.iCentLabId) {
      this.centroLaboralIdSelected.emit(row.iCentLabId);
    }
  }
}