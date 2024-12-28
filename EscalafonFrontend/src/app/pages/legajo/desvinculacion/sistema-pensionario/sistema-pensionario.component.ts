import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegimenPensionario } from 'src/app/interfaces/regimen-pensionario';
import { SistemaPensionario } from 'src/app/interfaces/sistema-pensionario';
import { TipoComisionPensionario } from 'src/app/interfaces/tipo-comision-pensionario';
import { RegimenPensionarioService } from 'src/app/services/regimen-pensionario.service';
import { SistemaPensionarioService } from 'src/app/services/sistema-pensionario.service';
import { TipoComisionPensionarioService } from 'src/app/services/tipo-comision-pensionario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AdministradoraFondoPension } from 'src/app/interfaces/administradora-fondo-pension';
import { AdministradoraFondoPensionService } from 'src/app/services/administradora-fondo-pension.service';
import { VSistemaPensionario } from 'src/app/interfaces/v-sistema-pensionario';
import { VSistemaPensionarioService } from 'src/app/services/v-sistema-pensionario.service';
import { LegajoStateService } from 'src/app/core/services/legajo-state.service';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Archivo } from '../../../../interfaces/archivo';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-sistema-pensionario',
  templateUrl: './sistema-pensionario.component.html',
  styles: [`
    .error ::ng-deep .archivo-container {
      border: 1px solid #f44336 !important;
      border-radius: 4px;
      padding: 8px;
    }
    
    .error ::ng-deep .archivo-container:hover {
      border-color: #f44336 !important;
    }
  `]
})
export class SistemaPensionarioComponent implements OnInit, AfterViewInit {
  regimenesPensionarios: RegimenPensionario[] = [];
  tiposComision: TipoComisionPensionario[] = [];
  sistemaPensionarioForm: FormGroup = this.fb.group({
    iRegPenId: [null, Validators.required],
    dtSisPenFechaVigencia: [null],
    dtSisPenFechaAfiliacion: [null],
    dtSisPenFechaDevengue: [null],
    iAdmFonPenId: [null],
    iTipComPenId: [null],
    cSisPenNumeroCuspp: [''],
    cSisPenAnotaciones: [''],
    iArchId: [null, Validators.required],
    iLegId: [null]
  });
  administradorasFondoPension: AdministradoraFondoPension[] = [];
  dataSource = new MatTableDataSource<VSistemaPensionario>([]);
  iLegId: number | undefined;
  modoVisualizacion = false;
  modoEdicion = false;
  registroSeleccionado?: VSistemaPensionario;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // Propiedades para paginación
  totalRegistros = 0;
  tamanioPagina = 10;
  paginaActual = 0;

  constructor(
    private fb: FormBuilder,
    private regimenPensionarioService: RegimenPensionarioService,
    private tipoComisionService: TipoComisionPensionarioService,
    private sistemaPensionarioService: SistemaPensionarioService,
    private vSistemaPensionarioService: VSistemaPensionarioService,
    private administradoraFondoPensionService: AdministradoraFondoPensionService,
    private legajoStateService: LegajoStateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.legajoStateService.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        this.iLegId = legajo.iLegId;
        this.sistemaPensionarioForm.patchValue({ iLegId: this.iLegId });
        this.cargarSistemasPensionarios();
      }
    });

    this.cargarRegimenesPensionarios();
    this.cargarTiposComision();
    this.cargarAdministradorasFondoPension();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarRegimenesPensionarios(): void {
    this.regimenPensionarioService.getAll()
      .subscribe(regimenes => {
        this.regimenesPensionarios = regimenes;
      });
  }

  private cargarTiposComision(): void {
    this.tipoComisionService.getAll()
      .subscribe(tipos => {
        this.tiposComision = tipos;
      });
  }

  private cargarAdministradorasFondoPension(): void {
    this.administradoraFondoPensionService.getAll()
      .subscribe(administradoras => {
        this.administradorasFondoPension = administradoras;
      });
  }

  private cargarSistemasPensionarios(): void {
    if (this.iLegId) {
      this.vSistemaPensionarioService.getAll({
        campo: 'iLegId',
        valor: this.iLegId.toString()
      }).subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.totalRegistros = response.length;
        },
        error: (error) => {
          console.error('Error al cargar sistemas pensionarios', error);
          this.snackBar.open('Error al cargar los sistemas pensionarios', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  onArchivoIdChange(archivoId: number | undefined): void {
    this.sistemaPensionarioForm.patchValue({
      iArchId: archivoId
    });
  }

  editarRegistro(row: VSistemaPensionario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Edición',
        message: '¿Está seguro de editar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modoEdicion = true;
        this.modoVisualizacion = false;
        this.registroSeleccionado = row;
        
        // Habilitar el formulario si estaba deshabilitado
        this.sistemaPensionarioForm.enable();
        
        // Cargar los datos en el formulario
        this.sistemaPensionarioForm.patchValue({
          iRegPenId: row.iRegPenId,
          dtSisPenFechaVigencia: row.dtSisPenFechaVigencia,
          dtSisPenFechaAfiliacion: row.dtSisPenFechaAfiliacion,
          dtSisPenFechaDevengue: row.dtSisPenFechaDevengue,
          iAdmFonPenId: row.iAdmFonPenId,
          iTipComPenId: row.iTipComPenId,
          cSisPenNumeroCuspp: row.cSisPenNumeroCuspp,
          cSisPenAnotaciones: row.cSisPenAnotaciones,
          iArchId: row.iArchId,
          iLegId: row.iLegId
        });
      }
    });
  }

  verRegistro(row: VSistemaPensionario): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = row;
    this.sistemaPensionarioForm.patchValue({
      iRegPenId: row.iRegPenId,
      iAdmFonPenId: row.iAdmFonPenId,
      iTipComPenId: row.iTipComPenId,
      dtSisPenFechaVigencia: row.dtSisPenFechaVigencia,
      dtSisPenFechaAfiliacion: row.dtSisPenFechaAfiliacion,
      dtSisPenFechaDevengue: row.dtSisPenFechaDevengue,
      cSisPenNumeroCuspp: row.cSisPenNumeroCuspp,
      cSisPenAnotaciones: row.cSisPenAnotaciones,
      iArchId: row.iArchId,
      iLegId: row.iLegId
    });
    this.sistemaPensionarioForm.disable();
  }

  eliminarRegistro(row: VSistemaPensionario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && row.iSisPenId) {
        this.sistemaPensionarioService.delete(row.iSisPenId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarSistemasPensionarios();
          },
          error: () => {
            this.snackBar.open('Error al eliminar el registro', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  limpiar(): void {
    if (this.modoVisualizacion) {
      this.sistemaPensionarioForm.enable();
    }
    
    this.sistemaPensionarioForm.reset();
    this.sistemaPensionarioForm.patchValue({
      iLegId: this.iLegId
    });
    this.modoEdicion = false;
    this.modoVisualizacion = false;
    this.registroSeleccionado = undefined;
  }

  guardarSistemaPensionario(): void {
    if (this.sistemaPensionarioForm.invalid) {
      // Marcar solo los campos requeridos como tocados
      const regimenControl = this.sistemaPensionarioForm.get('iRegPenId');
      const archivoControl = this.sistemaPensionarioForm.get('iArchId');
      
      if (regimenControl?.errors) regimenControl.markAsTouched();
      if (archivoControl?.errors) archivoControl.markAsTouched();

      // Marcar los campos condicionales según el régimen seleccionado
      const regimenId = regimenControl?.value;
      if (regimenId) {
        if (regimenId === this.configService.getRegimenPensionarioDL19990()) {
          const fechaVigenciaControl = this.sistemaPensionarioForm.get('dtSisPenFechaVigencia');
          if (fechaVigenciaControl?.errors) fechaVigenciaControl.markAsTouched();
        }
        // ... similar para otros regímenes ...
      }

      this.snackBar.open('Por favor complete los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    if (this.modoVisualizacion) {
      this.limpiar();
      return;
    }

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
        const sistemaPensionario = this.sistemaPensionarioForm.value;
        
        if (this.modoEdicion && this.registroSeleccionado) {
          this.sistemaPensionarioService.update(this.registroSeleccionado.iSisPenId!, sistemaPensionario).subscribe({
            next: () => {
              this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.limpiar();
              this.cargarSistemasPensionarios();
            },
            error: () => {
              this.snackBar.open('Error al actualizar el registro', 'Cerrar', {
                duration: 3000
              });
            }
          });
        } else {
          this.sistemaPensionarioService.create(sistemaPensionario).subscribe({
            next: () => {
              this.snackBar.open('Registro guardado exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.limpiar();
              this.cargarSistemasPensionarios();
            },
            error: () => {
              this.snackBar.open('Error al guardar el registro', 'Cerrar', {
                duration: 3000
              });
            }
          });
        }
      }
    });
  }

  // Método para manejar el archivo
  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo) {
      console.log('Archivo seleccionado:', archivo);
      // Marcar el campo como touched para que se muestre la validación
      const control = this.sistemaPensionarioForm.get('iArchId');
      if (control) {
        control.markAsTouched();
      }
    }
  }

  // Agregar el método validarCampo
  validarCampo(campo: string): boolean {
    const control = this.sistemaPensionarioForm.get(campo);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  // Métodos para controlar la visibilidad de campos
  mostrarFechaVigencia(): boolean {
    const regimenId = this.sistemaPensionarioForm.get('iRegPenId')?.value;
    return regimenId === this.configService.getRegimenPensionarioDL19990();
  }

  mostrarFechaAfiliacion(): boolean {
    const regimenId = this.sistemaPensionarioForm.get('iRegPenId')?.value;
    return regimenId === this.configService.getRegimenPensionarioDL20530() || 
           regimenId === this.configService.getRegimenPensionarioAFP();
  }

  mostrarCamposAFP(): boolean {
    const regimenId = this.sistemaPensionarioForm.get('iRegPenId')?.value;
    return regimenId === this.configService.getRegimenPensionarioAFP();
  }

  // Modificar el manejo del cambio de régimen
  onRegimenChange(regimenId: number): void {
    // Limpiar campos específicos según el régimen
    if (regimenId === this.configService.getRegimenPensionarioDL19990()) {
      this.sistemaPensionarioForm.patchValue({
        dtSisPenFechaAfiliacion: null,
        iAdmFonPenId: null,
        iTipComPenId: null,
        cSisPenNumeroCuspp: null
      });
    } else if (regimenId === this.configService.getRegimenPensionarioDL20530()) {
      this.sistemaPensionarioForm.patchValue({
        dtSisPenFechaVigencia: null,
        iAdmFonPenId: null,
        iTipComPenId: null,
        cSisPenNumeroCuspp: null
      });
    } else if (regimenId === this.configService.getRegimenPensionarioAFP()) {
      this.sistemaPensionarioForm.patchValue({
        dtSisPenFechaVigencia: null
      });
    }

    // Actualizar validadores según el régimen
    this.actualizarValidadores(regimenId);
  }

  private actualizarValidadores(regimenId: number): void {
    const fechaVigenciaControl = this.sistemaPensionarioForm.get('dtSisPenFechaVigencia');
    const fechaAfiliacionControl = this.sistemaPensionarioForm.get('dtSisPenFechaAfiliacion');
    const afpControl = this.sistemaPensionarioForm.get('iAdmFonPenId');
    const tipoComisionControl = this.sistemaPensionarioForm.get('iTipComPenId');
    const cusppControl = this.sistemaPensionarioForm.get('cSisPenNumeroCuspp');

    // Resetear todos los validadores condicionales
    fechaVigenciaControl?.clearValidators();
    fechaAfiliacionControl?.clearValidators();
    afpControl?.clearValidators();
    tipoComisionControl?.clearValidators();
    cusppControl?.clearValidators();

    // Aplicar validadores según el régimen
    if (regimenId === this.configService.getRegimenPensionarioDL19990()) {
      fechaVigenciaControl?.setValidators(Validators.required);
    } else if (regimenId === this.configService.getRegimenPensionarioDL20530()) {
      fechaAfiliacionControl?.setValidators(Validators.required);
    } else if (regimenId === this.configService.getRegimenPensionarioAFP()) {
      fechaAfiliacionControl?.setValidators(Validators.required);
      afpControl?.setValidators(Validators.required);
      tipoComisionControl?.setValidators(Validators.required);
      cusppControl?.setValidators(Validators.required);
    }

    // Actualizar estado de los controles
    fechaVigenciaControl?.updateValueAndValidity();
    fechaAfiliacionControl?.updateValueAndValidity();
    afpControl?.updateValueAndValidity();
    tipoComisionControl?.updateValueAndValidity();
    cusppControl?.updateValueAndValidity();
  }
} 