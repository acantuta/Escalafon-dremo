import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InfopefamiliarDomicilioService } from '../../../../services/infopefamiliar-domicilio.service';
import { TipoDireccionService } from '../../../../services/tipo-direccion.service';
import { ZonaService } from '../../../../services/zona.service';
import { TipoViaService } from '../../../../services/tipo-via.service';
import { DepartamentoService } from '../../../../services/departamento.service';
import { ProvinciaService } from '../../../../services/provincia.service';
import { DistritoService } from '../../../../services/distrito.service';
import { VLegajo } from '../../../../interfaces/v-legajo';
import { TipoDireccion } from '../../../../interfaces/tipo-direccion';
import { Zona } from '../../../../interfaces/zona';
import { TipoVia } from '../../../../interfaces/tipo-via';
import { Departamento } from '../../../../interfaces/departamento';
import { Provincia } from '../../../../interfaces/provincia';
import { Distrito } from '../../../../interfaces/distrito';
import { InfopefamiliarDomicilio } from '../../../../interfaces/infopefamiliar-domicilio';
import { VInfopefamiliarDomicilioService } from '../../../../services/v-infopefamiliar-domicilio.service';
import { VInfopefamiliarDomicilio } from '../../../../interfaces/v-infopefamiliar-domicilio';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-datos-domiciliarios',
  templateUrl: './datos-domiciliarios.component.html'
})
export class DatosDomiciliariosComponent implements OnInit {
  @Input() legajo!: VLegajo;
  
  datosDomiciliariosForm: FormGroup;
  datosDomiciliarios: VInfopefamiliarDomicilio[] = [];
  tiposDireccion: TipoDireccion[] = [];
  zonas: Zona[] = [];
  tiposVia: TipoVia[] = [];
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  displayedColumns: string[] = ['numero', 'tipoDireccion', 'zona', 'direccion', 'acciones'];
  modoFormulario: 'crear' | 'editar' | 'ver' = 'crear';
  registroSeleccionado?: InfopefamiliarDomicilio;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private infopefamiliarDomicilioService: InfopefamiliarDomicilioService,
    private tipoDireccionService: TipoDireccionService,
    private zonaService: ZonaService,
    private tipoViaService: TipoViaService,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private vInfopefamiliarDomicilioService: VInfopefamiliarDomicilioService
  ) {
    this.datosDomiciliariosForm = this.fb.group({
      iTipDirId: [null, Validators.required],
      iZonaId: [null, Validators.required],
      iTipViaId: [null, Validators.required],
      iDptoId: [null, Validators.required],
      iPrvnId: [null, Validators.required],
      iDsttId: [null, Validators.required],
      cInfoPeFamDireccion: ['', Validators.required],
      cInfoPeFamReferencia: [''],
      iArchId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
    if (this.legajo?.iLegId) {
      this.cargarDatosDomiciliarios(this.legajo.iLegId);
    }
  }

  private cargarDatosIniciales(): void {
    console.log('Iniciando carga de datos iniciales...');

    // Cargar tipos de dirección
    this.tipoDireccionService.getAll().subscribe({
      next: (tipos) => {
        console.log('Respuesta de tipos de dirección:', tipos);
        this.tiposDireccion = tipos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de dirección:', error);
      }
    });

    // Cargar zonas
    this.zonaService.getAll().subscribe({
      next: (zonas) => {
        console.log('Respuesta de zonas:', zonas);
        this.zonas = zonas;
      },
      error: (error) => {
        console.error('Error al cargar zonas:', error);
      }
    });

    // Cargar tipos de vía
    this.tipoViaService.getAll().subscribe({
      next: (tipos) => {
        this.tiposVia = tipos;
        console.log('Tipos de vía cargados:', this.tiposVia);
      },
      error: (error) => {
        console.error('Error al cargar tipos de vía:', error);
        this.snackBar.open('Error al cargar tipos de vía', 'Cerrar', { duration: 3000 });
      }
    });

    // Cargar departamentos
    this.departamentoService.getAll().subscribe({
      next: (dptos) => {
        this.departamentos = dptos;
        console.log('Departamentos cargados:', this.departamentos);
      },
      error: (error) => {
        console.error('Error al cargar departamentos:', error);
        this.snackBar.open('Error al cargar departamentos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onDepartamentoDomicilioChange(event: any): void {
    const dptoId = event.value;
    // Resetear provincia y distrito
    this.datosDomiciliariosForm.patchValue({
      iPrvnId: null,
      iDsttId: null
    });
    
    // Limpiar las listas
    this.provincias = [];
    this.distritos = [];

    if (dptoId) {
      this.provinciaService.getAll({
        campo: 'iDptoId',
        valor: dptoId.toString()
      }).subscribe({
        next: (provincias) => {
          this.provincias = provincias;
          console.log('Provincias cargadas:', provincias);
        },
        error: (error) => console.error('Error al cargar provincias:', error)
      });
    }
  }

  onProvinciaDomicilioChange(event: any): void {
    const prvnId = event.value;
    // Resetear distrito
    this.datosDomiciliariosForm.patchValue({
      iDsttId: null
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
          console.log('Distritos cargados:', distritos);
        },
        error: (error) => console.error('Error al cargar distritos:', error)
      });
    }
  }

  private cargarDatosDomiciliarios(legajoId: number): void {
    this.vInfopefamiliarDomicilioService.getAll({
      campo: 'iLegId',
      valor: legajoId.toString()
    }).subscribe({
      next: (domicilios) => {
        this.datosDomiciliarios = domicilios;
        console.log('Datos domiciliarios cargados:', domicilios);
      },
      error: (error) => {
        console.error('Error al cargar datos domiciliarios:', error);
        this.snackBar.open('Error al cargar datos domiciliarios', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  guardarDatosDomiciliarios(): void {
    if (this.datosDomiciliariosForm.invalid) {
      this.datosDomiciliariosForm.markAllAsTouched();
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar guardado',
        message: '¿Está seguro de guardar los cambios?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.procesarGuardado();
      }
    });
  }

  private procesarGuardado(): void {
    const legajoId = this.legajo?.iLegId;
    if (!legajoId) {
      this.snackBar.open('Error: No se encontró el ID del legajo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const formValues = this.datosDomiciliariosForm.value;
    
    const datosDomiciliarios: Partial<InfopefamiliarDomicilio> = {
      iLegId: legajoId,
      iTipDirId: formValues.iTipDirId,
      iZonaId: formValues.iZonaId,
      iTipViaId: formValues.iTipViaId,
      iDptoId: formValues.iDptoId,
      iPrvnId: formValues.iPrvnId,
      iDsttId: formValues.iDsttId,
      cInfoPeFamDireccion: formValues.cInfoPeFamDireccion,
      cInfoPeFamReferencia: formValues.cInfoPeFamReferencia,
      iArchId: formValues.iArchId
    };

    if (this.modoFormulario === 'editar' && this.registroSeleccionado?.iSecInfoPeFamDomiId) {
      this.infopefamiliarDomicilioService.update(
        this.registroSeleccionado.iSecInfoPeFamDomiId,
        datosDomiciliarios
      ).subscribe({
        next: (response) => {
          console.log('Datos domiciliarios actualizados:', response);
          this.snackBar.open('Datos domiciliarios actualizados correctamente', 'Cerrar', {
            duration: 3000
          });
          this.limpiarFormulario(legajoId);
        },
        error: (error) => {
          console.error('Error al actualizar datos domiciliarios:', error);
          this.snackBar.open('Error al actualizar datos domiciliarios', 'Cerrar', {
            duration: 3000
          });
        }
      });
    } else {
      this.infopefamiliarDomicilioService.create(datosDomiciliarios)
        .subscribe({
          next: (response) => {
            console.log('Datos domiciliarios guardados:', response);
            this.snackBar.open('Datos domiciliarios guardados correctamente', 'Cerrar', {
              duration: 3000
            });
            this.limpiarFormulario(legajoId);
          },
          error: (error) => {
            console.error('Error al guardar datos domiciliarios:', error);
            this.snackBar.open('Error al guardar datos domiciliarios', 'Cerrar', {
              duration: 3000
            });
          }
        });
    }
  }

  private limpiarFormulario(legajoId: number): void {
    this.modoFormulario = 'crear';
    this.registroSeleccionado = undefined;
    this.datosDomiciliariosForm.reset();
    this.cargarDatosDomiciliarios(legajoId);
    this.provincias = [];
    this.distritos = [];
  }

  editarDomicilio(domicilio: InfopefamiliarDomicilio): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro de editar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modoFormulario = 'editar';
        this.registroSeleccionado = domicilio;
        this.cargarDomicilioEnFormulario(domicilio);
      }
    });
  }

  visualizarDomicilio(domicilio: InfopefamiliarDomicilio): void {
    this.modoFormulario = 'ver';
    this.cargarDomicilioEnFormulario(domicilio);
  }

  private cargarDomicilioEnFormulario(domicilio: InfopefamiliarDomicilio): void {
    if (domicilio.iDptoId) {
      this.provinciaService.getAll({
        campo: 'iDptoId',
        valor: domicilio.iDptoId.toString()
      }).subscribe({
        next: (provincias) => {
          this.provincias = provincias;
          
          if (domicilio.iPrvnId) {
            this.distritoService.getAll({
              campo: 'iPrvnId',
              valor: domicilio.iPrvnId.toString()
            }).subscribe({
              next: (distritos) => {
                this.distritos = distritos;
                this.actualizarFormulario(domicilio);
              },
              error: (error) => {
                console.error('Error al cargar distritos:', error);
                this.snackBar.open('Error al cargar distritos', 'Cerrar', { duration: 3000 });
              }
            });
          }
        },
        error: (error) => {
          console.error('Error al cargar provincias:', error);
          this.snackBar.open('Error al cargar provincias', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.actualizarFormulario(domicilio);
    }
  }

  private actualizarFormulario(domicilio: InfopefamiliarDomicilio): void {
    this.datosDomiciliariosForm.patchValue({
      iTipDirId: domicilio.iTipDirId,
      iZonaId: domicilio.iZonaId,
      iTipViaId: domicilio.iTipViaId,
      iDptoId: domicilio.iDptoId,
      iPrvnId: domicilio.iPrvnId,
      iDsttId: domicilio.iDsttId,
      cInfoPeFamDireccion: domicilio.cInfoPeFamDireccion,
      cInfoPeFamReferencia: domicilio.cInfoPeFamReferencia,
      iArchId: domicilio.iArchId
    });

    if (this.modoFormulario === 'ver') {
      this.datosDomiciliariosForm.disable();
    } else {
      this.datosDomiciliariosForm.enable();
    }
  }

  limpiar(): void {
    this.modoFormulario = 'crear';
    this.registroSeleccionado = undefined;
    this.datosDomiciliariosForm.enable();
    this.datosDomiciliariosForm.reset();
    this.provincias = [];
    this.distritos = [];
  }

  eliminarDomicilio(domicilio: InfopefamiliarDomicilio): void {
    const idDomicilio = domicilio.iSecInfoPeFamDomiId;
    if (!idDomicilio) {
      this.snackBar.open('Error: No se encontró el ID del domicilio', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.infopefamiliarDomicilioService.delete(idDomicilio)
          .subscribe({
            next: () => {
              this.snackBar.open('Domicilio eliminado correctamente', 'Cerrar', {
                duration: 3000
              });
              if (this.legajo?.iLegId) {
                this.cargarDatosDomiciliarios(this.legajo.iLegId);
              }
            },
            error: (error) => {
              console.error('Error al eliminar domicilio:', error);
              this.snackBar.open('Error al eliminar domicilio', 'Cerrar', {
                duration: 3000
              });
            }
          });
      }
    });
  }

  onArchivoIdChange(archivoId: number | undefined): void {
    this.datosDomiciliariosForm.patchValue({
      iArchId: archivoId
    });
    this.datosDomiciliariosForm.get('iArchId')?.markAsTouched();
  }
}