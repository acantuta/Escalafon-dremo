import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

interface DependenciaConfig {
  campo: string;
  tabla: string;
  campoMostrar: string;
  campoClave?: string; // Campo clave (PK) de la tabla dependiente, por defecto 'id'
  dependeDe?: {
    campo: string;
    tabla: string;
  };
}

@Component({
  selector: 'mantenimiento-dinamico-component',
  template: `
    <div class="p-6">
      <div class="mantenimiento-container">
        <div class="header">
          <h2 class="text-xl font-medium mb-4">{{ config?.titulo || 'Mantenimiento: ' + (config?.tabla || config?.vista?.nombre) }}</h2>
          <div class="actions">
            <button mat-raised-button color="primary" (click)="nuevoRegistro()">
              <mat-icon>add</mat-icon>
              Nuevo Registro
            </button>
          </div>
        </div>

        <mat-progress-bar *ngIf="cargandoDatos" mode="indeterminate"></mat-progress-bar>

        <div class="table-container mat-elevation-z8">
          <table mat-table [dataSource]="dataSource" matSort>
            <ng-container *ngFor="let col of displayedColumns" [matColumnDef]="col">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ labels[col] || col }}</th>
              <td mat-cell *matCellDef="let element">{{ formatearCelda(element, col) }}</td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef style="width: 150px; text-align: center;">
                Acciones
              </th>
              <td mat-cell *matCellDef="let element" style="width: 150px; text-align: center;">
                <button mat-icon-button (click)="editarRegistro(element)" matTooltip="Editar">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="eliminarRegistro(element)" matTooltip="Eliminar">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumnsFull"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumnsFull;"></tr>
          </table>

          <mat-paginator [length]="totalRegistros"
                        [pageSize]="pageSize"
                        [pageIndex]="pageIndex"
                        [pageSizeOptions]="[5,10,20]"
                        showFirstLastButtons
                        (page)="cambioDePagina($event)">
          </mat-paginator>
        </div>

        <!-- Form Section -->
        <div *ngIf="formGroup" class="bg-white rounded shadow-sm">
          <div class="p-4 border-b">
            <h2 class="text-xl font-medium mb-4">{{ editando ? 'Editar Registro' : 'Nuevo Registro' }}</h2>
          </div>

          <mat-progress-bar *ngIf="cargandoForm" mode="indeterminate"></mat-progress-bar>

          <form [formGroup]="formGroup" class="p-4">
            <!-- Campos del formulario (solo de la tabla base) -->
            <div class="flex flex-col gap-4">
              <ng-container *ngFor="let campo of camposFormulario">
                <!-- Select Fields -->
                <ng-container *ngIf="esCampoDependencia(campo)">
                  <mat-form-field class="w-full">
                    <mat-label>{{ labels[campo] || campo }}</mat-label>
                    <mat-select [formControlName]="campo" [disabled]="!puedeSeleccionar(campo)">
                      <mat-option>Seleccione una opción</mat-option>
                      <mat-option *ngFor="let op of opcionesDependencia[campo]"
                                  [value]="op[dependenciasPorCampo[campo].campoClave || 'id']">
                        {{ op[campoMostrarDependencia[campo]] }}
                      </mat-option>
                    </mat-select>
                    <mat-error *ngIf="formGroup.get(campo)?.invalid">
                      {{ getMensajeError(campo) }}
                    </mat-error>
                  </mat-form-field>
                </ng-container>

                <!-- Input Fields -->
                <ng-container *ngIf="!esCampoDependencia(campo)">
                  <mat-form-field class="w-full">
                    <mat-label>{{ labels[campo] || campo }}</mat-label>
                    <input matInput [type]="tipoCampoTabla[campo]" [formControlName]="campo">
                    <mat-error *ngIf="formGroup.get(campo)?.invalid">
                      {{ getMensajeError(campo) }}
                    </mat-error>
                  </mat-form-field>
                </ng-container>
              </ng-container>
            </div>

            <div class="flex justify-end gap-2 mt-4 pt-4 border-t">
              <button mat-button type="button" (click)="cancelarEdicion()">
                Cancelar
              </button>
              <button mat-raised-button color="primary"
                      type="button"
                      (click)="guardarRegistro()"
                      [disabled]="!formGroup.valid || guardando">
                {{ guardando ? 'Guardando...' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mat-column-acciones {
      width: 150px;
      text-align: center;
      padding: 0 !important;
    }
  `]
})
export class MantenimientoDinamicoComponent implements OnInit {
  @Input() config!: {
    vista?: {
      nombre: string;
      columnas?: {
        campo: string;
        label?: string;
        orden?: number;
        visible?: boolean;
      }[];
    };
    tabla?: string;
    columnas?: string[];
    labels?: { [key: string]: string };
    dependencias?: DependenciaConfig[];
    titulo?: string;
  };

  displayedColumns: string[] = [];
  displayedColumnsFull: string[] = [];
  labels: { [key: string]: string } = {};

  // Metadatos vista
  vistaColumnas: string[] = [];
  vistaTipos: { [key: string]: string } = {};
  vistaIdentidades: { [columna: string]: boolean } = {};

  // Metadatos tabla
  tablaColumnas: string[] = [];
  tablaTipos: { [key: string]: string } = {};
  tablaIdentidades: { [columna: string]: boolean } = {};

  tipoCampoTabla: { [key: string]: string } = {};
  
  dataSource = new MatTableDataSource<any>([]);
  formGroup!: FormGroup;

  camposFormulario: string[] = [];
  
  editando = false;
  registroActual: any;
  
  cargandoDatos = false;
  cargandoForm = false;
  guardando = false;

  opcionesDependencia: { [campo: string]: any[] } = {};
  campoMostrarDependencia: { [campo: string]: string } = {};

  dependenciasConfig: DependenciaConfig[] = [];
  dependenciasPorCampo: { [campo: string]: DependenciaConfig } = {};
  camposDependientes: { [campoPadre: string]: string[] } = {};
  camposPadres: { [campoHijo: string]: string } = {};

  llavePrimariaTabla: string = 'id'; // PK de la tabla (para CRUD)
  llavePrimariaVista: string = 'id'; // PK de la vista (si existiera) - se utiliza en visualizar

  totalRegistros = 0;
  pageSize = 10; 
  pageIndex = 0;
  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  private apiUrl = '/mantenimiento-dinamico';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.config.labels) {
      this.labels = this.config.labels;
    }

    if (this.config.dependencias) {
      this.dependenciasConfig = this.config.dependencias;
      for (const dep of this.dependenciasConfig) {
        this.dependenciasPorCampo[dep.campo] = dep;
        this.campoMostrarDependencia[dep.campo] = dep.campoMostrar;
        if (dep.dependeDe) {
          this.camposPadres[dep.campo] = dep.dependeDe.campo;
          if (!this.camposDependientes[dep.dependeDe.campo]) {
            this.camposDependientes[dep.dependeDe.campo] = [];
          }
          this.camposDependientes[dep.dependeDe.campo].push(dep.campo);
        }
      }
    }

    this.cargarMetadataInicial();
  }

  cargarMetadataInicial() {
    if (this.config.vista && this.config.vista.nombre) {
      // Si hay vista, primero cargamos metadatos de la vista para la tabla
      this.cargarMetadataVista().then(() => {
        // Luego cargamos metadatos de la tabla para el formulario
        if (this.config.tabla) {
          this.cargarMetadataTabla().then(() => {
            this.inicializarFormulario();
            this.pageIndex = 0;
            this.pageSize = 10;
            this.listarRegistros(this.pageIndex+1, this.pageSize);
          });
        } else {
          this.pageIndex = 0;
          this.pageSize = 10;
          this.listarRegistros(this.pageIndex+1, this.pageSize);
          // Sin tabla no habrá formulario de edición/creación
        }
      });
    } else {
      // Sin vista, sólo tabla
      this.cargarMetadataTabla().then(() => {
        this.displayedColumns = this.tablaColumnas;
        this.displayedColumnsFull = [...this.displayedColumns, 'acciones'];
        this.tipoCampoTabla = this.tablaTipos;
        this.inicializarFormulario();
        this.pageIndex = 0;
        this.pageSize = 10;
        this.listarRegistros(this.pageIndex+1, this.pageSize);
      });
    }
  }

  cargarMetadataVista(): Promise<void> {
    this.cargandoDatos = true;
    const nombreVista = this.config.vista!.nombre;
    const endpoint = `${this.apiUrl}/metadatos?vista=${nombreVista}`;
    return new Promise((resolve, reject) => {
      this.http.get<any>(endpoint, {observe:'response'})
        .pipe(finalize(()=> this.cargandoDatos=false))
        .subscribe(response => {
          const data = response.body;
          this.llavePrimariaVista = data.llave_primaria || 'id';
          
          let columnasVista: string[];
          if (this.config.vista!.columnas && this.config.vista!.columnas.length > 0) {
            // Si se proporcionaron columnas en la vista, usamos sus campos visibles
            columnasVista = this.config.vista!.columnas
              .filter(col => col.visible !== false) 
              .map(col => col.campo);
          } else {
            columnasVista = data.columnas;
          }

          this.vistaColumnas = columnasVista;
          this.vistaTipos = data.tipos;
          this.vistaIdentidades = data.identidades;

          // Actualizar labels con lo proporcionado en la vista
          if (this.config.vista!.columnas) {
            for (const colConfig of this.config.vista!.columnas) {
              if (colConfig.label) {
                this.labels[colConfig.campo] = colConfig.label;
              }
            }
          }

          this.displayedColumns = this.vistaColumnas;
          this.displayedColumnsFull = [...this.vistaColumnas, 'acciones'];
          
          resolve();
        }, error => {
          this.handleError(error);
          reject(error);
        });
    });
  }

  cargarMetadataTabla(): Promise<void> {
    if (!this.config.tabla) return Promise.resolve();
    this.cargandoDatos = true;
    const endpoint = `${this.apiUrl}/metadatos?tabla=${this.config.tabla}`;

    return new Promise((resolve, reject) => {
      this.http.get<any>(endpoint, {observe:'response'})
        .pipe(finalize(()=> this.cargandoDatos=false))
        .subscribe(response => {
          const data = response.body;
          this.llavePrimariaTabla = data.llave_primaria || 'id';
          this.tablaColumnas = data.columnas;
          this.tablaTipos = data.tipos;
          this.tablaIdentidades = data.identidades;
          resolve();
        }, error => {
          this.handleError(error);
          reject(error);
        });
    });
  }

  inicializarFormulario() {
    // Crear el formulario con las columnas de la tabla, excluyendo identidades
    const columnasParaFormulario = this.tablaColumnas.filter((c: string) => !this.tablaIdentidades[c]);
    this.crearFormulario(columnasParaFormulario);
  }

  crearFormulario(columnas: string[]) {
    const group: {[key:string]: FormControl} = {};
    this.camposFormulario = columnas;
    columnas.forEach(campo => {
      group[campo] = new FormControl('', [Validators.required]);
    });
    this.formGroup = this.fb.group(group);
    this.tipoCampoTabla = this.tablaTipos;

    // Escuchar cambios en campos padres (dependencias)
    for (const campoPadre of Object.keys(this.camposDependientes)) {
      this.formGroup.get(campoPadre)?.valueChanges.subscribe(val => {
        this.actualizarDependientes(campoPadre, val);
      });
    }

    // Cargar dependencias raíz (sin padre)
    for (const dep of this.dependenciasConfig) {
      if (!dep.dependeDe) {
        this.cargarOpcionesDependencia(dep.campo);
      }
    }
  }

  listarRegistros(page: number = 1, pageSize: number = 10) {
    this.cargandoDatos = true;
    const nombreVista = this.config.vista?.nombre;
    const endpoint = nombreVista 
      ? `${this.apiUrl}/listar?vista=${nombreVista}&page=${page}&pageSize=${pageSize}`
      : `${this.apiUrl}/listar?tabla=${this.config.tabla}&page=${page}&pageSize=${pageSize}`;
    
    this.http.get<any>(endpoint, {observe:'response'})
      .pipe(finalize(()=> this.cargandoDatos=false))
      .subscribe(response => {
        const data = response.body;
        this.dataSource.data = data.data;
        this.totalRegistros = data.total;
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      }, error => {
        this.handleError(error);
      });
  }

  cambioDePagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarRegistros(this.pageIndex+1, this.pageSize);
  }

  nuevoRegistro() {
    this.editando = false;
    this.registroActual = null;
    this.formGroup?.reset();
    for (const campo of Object.keys(this.opcionesDependencia)) {
      if (this.camposPadres[campo]) {
        this.opcionesDependencia[campo] = [];
      }
    }
  }

  editarRegistro(element: any) {
    if (!this.formGroup) return; // Si no hay formulario (no hay tabla base), no se edita
    this.editando = true;
    this.registroActual = element;
    const formValues: any = {};
    this.camposFormulario.forEach(c => {
      formValues[c] = element[c];
    });
    this.formGroup.patchValue(formValues);
    this.cargarDependenciasAlEditar(element);
  }

  visualizarRegistro(element: any) {
    this.snackBar.open(`Detalles del registro: ${JSON.stringify(element)}`, 'Cerrar', { duration: 5000 });
  }

  eliminarRegistro(element: any) {
    if (!this.config.tabla) {
      this.snackBar.open('No se puede eliminar: no se ha definido una tabla base.', 'Cerrar', {duration:3000});
      return;
    }

    const valorLlave = element[this.llavePrimariaTabla];
    if (!valorLlave) {
      this.snackBar.open('No se puede eliminar este registro: llave primaria no definida.', 'Cerrar', {duration:3000});
      return;
    }

    if (!confirm('¿Está seguro de eliminar este registro?')) return;
    this.guardando = true;
    this.http.delete(`${this.apiUrl}/eliminar/${valorLlave}?tabla=${this.config.tabla}`, {observe:'response'})
      .pipe(finalize(()=> this.guardando=false))
      .subscribe(response => {
        this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {duration:3000});
        this.listarRegistros(this.pageIndex+1, this.pageSize);
      }, error => {
        this.handleError(error);
      });
  }

  guardarRegistro() {
    if (!this.config.tabla) {
      this.snackBar.open('No se puede guardar: no se ha definido una tabla base.', 'Cerrar', {duration:3000});
      return;
    }

    if (this.formGroup.invalid) return;

    this.guardando = true;
    const payload = this.formGroup.value;
    let url: string;
    const metodo = this.editando ? 'put' : 'post';

    if (this.editando) {
      const valorLlave = this.registroActual[this.llavePrimariaTabla];
      if (!valorLlave) {
        this.snackBar.open('No se puede actualizar este registro: llave primaria no definida.', 'Cerrar', {duration:3000});
        this.guardando = false;
        return;
      }
      url = `${this.apiUrl}/actualizar/${valorLlave}?tabla=${this.config.tabla}`;
    } else {
      url = `${this.apiUrl}/crear?tabla=${this.config.tabla}`;
    }

    this.http.request(metodo, url, {body: payload, observe:'response'})
      .pipe(finalize(()=> this.guardando=false))
      .subscribe(response => {
        this.snackBar.open('Registro guardado correctamente.', 'Cerrar', {duration:3000});
        this.listarRegistros(this.pageIndex+1, this.pageSize);
        this.nuevoRegistro();
      }, error => {
        this.handleError(error);
      });
  }

  cancelarEdicion() {
    this.nuevoRegistro();
  }

  formatearCelda(element: any, col: string): string {
    if (element[col] == null) return '';
    return element[col];
  }

  esCampoDependencia(campo: string): boolean {
    return !!this.dependenciasPorCampo[campo];
  }

  puedeSeleccionar(campo: string): boolean {
    const padre = this.camposPadres[campo];
    if (padre) {
      return !!this.formGroup.get(padre)?.value;
    }
    return true;
  }

  actualizarDependientes(campoPadre: string, valorPadre: any) {
    if (this.camposDependientes[campoPadre]) {
      for (const campoHijo of this.camposDependientes[campoPadre]) {
        this.formGroup.get(campoHijo)?.reset();
        this.opcionesDependencia[campoHijo] = [];
        if (valorPadre) {
          this.cargarOpcionesDependencia(campoHijo, valorPadre);
        }
      }
    }
  }

  cargarOpcionesDependencia(campo: string, valorPadre?: any) {
    const dep = this.dependenciasPorCampo[campo];
    if (!dep) return;
    let params = `?tabla=${dep.tabla}`;
    if (dep.dependeDe && valorPadre) {
      params += `&campoDependencia=${dep.dependeDe.campo}&valorDependencia=${valorPadre}`;
    }
    this.http.get<any>(`${this.apiUrl}/dependencias${params}`, {observe:'response'})
      .subscribe(response => {
        this.opcionesDependencia[campo] = response.body.data;
      }, error => {
        this.handleError(error);
      });
  }

  async cargarDependenciasAlEditar(element: any) {
    const niveles = this.ordenarDependenciasPorJerarquia();
    this.cargandoForm = true;
    try {
      for (const dep of niveles) {
        const valorPadre = dep.dependeDe ? element[dep.dependeDe.campo] : null;
        await this.cargarOpcionesDependenciaPromesa(dep, valorPadre);
        if (this.formGroup.get(dep.campo)) {
          const valor = element[dep.campo];
          this.formGroup.get(dep.campo)?.setValue(valor);
        }
      }
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    } finally {
      this.cargandoForm = false;
    }
  }

  cargarOpcionesDependenciaPromesa(dep: DependenciaConfig, valorPadre: any): Promise<void> {
    return new Promise((resolve, reject) => {
      let params = `?tabla=${dep.tabla}`;
      if (dep.dependeDe && valorPadre) {
        params += `&campoDependencia=${dep.dependeDe.campo}&valorDependencia=${valorPadre}`;
      }
      this.http.get<any>(`${this.apiUrl}/dependencias${params}`, {observe:'response'})
        .subscribe(response => {
          this.opcionesDependencia[dep.campo] = response.body.data;
          resolve();
        }, err => {
          reject(err);
        });
    });
  }

  ordenarDependenciasPorJerarquia(): DependenciaConfig[] {
    // Aquí se podría implementar una lógica para ordenar dependencias
    // desde las raíces hasta las dependencias más "hijas".
    return this.dependenciasConfig;
  }

  handleError(error: HttpErrorResponse) {
    console.error('Error HTTP:', error);
    let mensaje = 'Error desconocido.';
    switch (error.status) {
      case 400:
        mensaje = 'Datos inválidos. Por favor, revise la información ingresada.';
        break;
      case 401:
      case 403:
        mensaje = 'No tiene permisos para realizar esta acción.';
        break;
      case 404:
        mensaje = 'El registro solicitado no existe.';
        break;
      case 422:
        mensaje = 'Error de validación. Verifique los datos ingresados.';
        break;
      case 500:
        mensaje = 'Error interno del servidor. Por favor, intente más tarde.';
        break;
      default:
        mensaje = 'Ha ocurrido un error. Por favor, intente más tarde.';
        break;
    }
    this.snackBar.open(mensaje, 'Cerrar', {duration:4000});
  }

  getMensajeError(campo: string): string {
    const control = this.formGroup.get(campo);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    return 'Campo inválido.';
  }
}
