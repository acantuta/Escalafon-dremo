import { Component, OnInit } from '@angular/core';
import { InstanciaGestionEducativaDescentralizadaService } from '../services/instancia-gestion-educativa-descentralizada.service';
import { InstanciaGestionEducativaDescentralizada } from '../interfaces/instancia-gestion-educativa-descentralizada';
import { PaginatedRequest } from '../core/interfaces/paginated-request';
import { VCentroLaboral } from '../interfaces/v-centro-laboral';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
    // Variables para almacenar datos
    listadoPaginado: any;
    instanciaSeleccionada: InstanciaGestionEducativaDescentralizada | null = null;
    nuevaInstancia: InstanciaGestionEducativaDescentralizada = {
        iInstGeEduId: 0,
        iDirRegId: 0,
        cInstGeEduNombre: ''
    };

    // Variables para paginación y filtros
    filtros: any = {};
    paginaActual = 1;
    tamanioPagina = 10;
    columnaOrden?: string;
    ordenDireccion: 'ASC' | 'DESC' = 'ASC';
    centroLaboralSeleccionado?: VCentroLaboral;
    selectedCentroLaboralId?: number;

    constructor(
        private instanciaService: InstanciaGestionEducativaDescentralizadaService
    ) {}

    ngOnInit() {
        // Cargar listado inicial
        this.cargarListadoPaginado();
    }

    // Obtener listado paginado
    cargarListadoPaginado(pagina: number = 1) {
        this.paginaActual = pagina;
        
        const request: PaginatedRequest = {
            filters: this.filtros,
            page: this.paginaActual,
            pageSize: this.tamanioPagina,
            sortColumn: this.columnaOrden,
            sortOrder: this.ordenDireccion
        };

        this.instanciaService.listarPaginado(request).subscribe({
            next: (response) => {
                this.listadoPaginado = response;
                console.log('Listado cargado:', response);
            },
            error: (error) => {
                console.error('Error al cargar listado:', error);
            }
        });
    }

    // Aplicar filtros
    aplicarFiltro(columna: string, operador: string, valor: any) {
        this.filtros[columna] = {
            operator: operador,
            value: valor
        };
        this.cargarListadoPaginado(1); // Volver a la primera página al filtrar
    }

    // Cambiar ordenamiento
    cambiarOrden(columna: string) {
        if (this.columnaOrden === columna) {
            // Si es la misma columna, cambiar dirección
            this.ordenDireccion = this.ordenDireccion === 'ASC' ? 'DESC' : 'ASC';
        } else {
            // Si es nueva columna, establecer orden ascendente
            this.columnaOrden = columna;
            this.ordenDireccion = 'ASC';
        }
        this.cargarListadoPaginado(this.paginaActual);
    }

    // Mostrar una instancia específica
    mostrarInstancia(id: number) {
        this.instanciaService.getById(id).subscribe({
            next: (instancia) => {
                this.instanciaSeleccionada = instancia;
                console.log('Instancia cargada:', instancia);
            },
            error: (error) => {
                console.error('Error al cargar instancia:', error);
            }
        });
    }

    // Crear nueva instancia
    crearInstancia() {
        this.instanciaService.create(this.nuevaInstancia).subscribe({
            next: (instancia) => {
                console.log('Instancia creada:', instancia);
                // Recargar listado
                this.cargarListadoPaginado();
                // Limpiar el formulario
                this.nuevaInstancia = {
                    iInstGeEduId: 0,
                    iDirRegId: 0,
                    cInstGeEduNombre: ''
                };
            },
            error: (error) => {
                console.error('Error al crear instancia:', error);
            }
        });
    }

    // Eliminar instancia
    eliminarInstancia(id: number) {
        if (confirm('¿Está seguro de eliminar esta instancia?')) {
            this.instanciaService.delete(id).subscribe({
                next: () => {
                    console.log('Instancia eliminada');
                    // Recargar listado
                    this.cargarListadoPaginado();
                    // Limpiar selección si es la misma
                    if (this.instanciaSeleccionada?.iInstGeEduId === id) {
                        this.instanciaSeleccionada = null;
                    }
                },
                error: (error) => {
                    console.error('Error al eliminar instancia:', error);
                }
            });
        }
    }

    onCentroLaboralSelected(centro: VCentroLaboral) {
        this.centroLaboralSeleccionado = centro;
        alert(`Centro laboral seleccionado: ${centro.cCentLabNombre}`);
    }

    onCentroLaboralIdSelected(id: number) {
        this.selectedCentroLaboralId = id;
        console.log('ID del centro laboral seleccionado:', id);
    }
}
