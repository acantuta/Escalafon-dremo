import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { ExperienciaLaboralSector } from '../../../interfaces/experiencia-laboral-sector';
import { ExperienciaLaboralSectorService } from '../../../services/experiencia-laboral-sector.service';
import { ExperienciaLaboralService } from '../../../services/experiencia-laboral.service';
import { ExperienciaLaboral } from '../../../interfaces/experiencia-laboral';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Archivo } from '../../../interfaces/archivo';
import { VExperienciaLaboralService } from '../../../services/v-experiencia-laboral.service';
import { VExperienciaLaboral } from '../../../interfaces/v-experiencia-laboral';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html'
})
export class ExperienciaLaboralComponent implements OnInit {
  legajo?: VLegajo;
  sectores: ExperienciaLaboralSector[] = [];
  form: FormGroup;

  // Configuración de la tabla
  displayedColumns: string[] = ['nro', 'sector', 'entidad', 'cargo', 'funciones', 'fInicio', 'fFin', 'documento', 'acciones'];
  dataSource = new MatTableDataSource<VExperienciaLaboral>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  experienciaEnEdicion?: VExperienciaLaboral;
  modoEdicion = false;
  modoVisualizacion = false;
  camposHabilitados = true;
  totalRegistros = 0;
  tamanioPagina = 10;

  // Agregar esta propiedad al inicio de la clase
  private readonly camposTraducidos: { [key: string]: string } = {
    iExpLabSecId: 'Sector',
    cExpLabEntidad: 'Entidad',
    cExpLabCargo: 'Cargo',
    cExpLabNumeroDocumento: 'Número de documento',
    dtExpLabFechaDocumento: 'Fecha de documento',
    iArchId: 'Documento adjunto'
  };

  // Agregar esta nueva propiedad para traducir los mensajes de error
  private readonly mensajesError: { [key: string]: string } = {
    'The i exp lab sec id field is required.': 'Debe seleccionar un sector',
    'The c exp lab entidad field is required.': 'Debe ingresar el nombre de la entidad',
    'The c exp lab cargo field is required.': 'Debe ingresar el cargo',
    'The c exp lab numero documento field is required.': 'Debe ingresar el número de documento',
    'The dt exp lab fecha documento field is required.': 'Debe seleccionar la fecha del documento',
    'The i arch id field is required.': 'Debe adjuntar un documento'
  };

  constructor(
    private fb: FormBuilder,
    private legajoState: LegajoStateService,
    private experienciaLaboralSectorService: ExperienciaLaboralSectorService,
    private experienciaLaboralService: ExperienciaLaboralService,
    private vExperienciaLaboralService: VExperienciaLaboralService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.form = this.initializeForm();
  }

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
      if (this.legajo?.iLegId) {
        this.cargarExperienciasLaborales();
      }
    });

    this.experienciaLaboralSectorService.getAll().subscribe({
      next: (data) => {
        this.sectores = data;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      iExpLabSecId: [null, Validators.required],
      cExpLabEntidad: [null, Validators.required],
      cExpLabCargo: [null, Validators.required],
      cExpLabNumeroDocumento: [null, Validators.required],
      dtExpLabFechaDocumento: [null, Validators.required],
      dtExpLabFechaInicio: [null],
      dtExpLabFechaFin: [null],
      cExpLabFuncionesDesempenadas: [null],
      cExpLabAnotaciones: [null],
      iArchId: [null, Validators.required]
    });
  }

  private resetForm(): void {
    this.form = this.fb.group({
      iExpLabSecId: [null, Validators.required],
      cExpLabEntidad: [null, Validators.required],
      cExpLabCargo: [null, Validators.required],
      cExpLabNumeroDocumento: [null, Validators.required],
      dtExpLabFechaDocumento: [null, Validators.required],
      dtExpLabFechaInicio: [null],
      dtExpLabFechaFin: [null],
      cExpLabFuncionesDesempenadas: [null],
      cExpLabAnotaciones: [null],
      iArchId: [null, Validators.required]
    });
    
    this.cdr.detectChanges();
  }

  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo) {
      this.form.patchValue({
        iArchId: archivo.iArchId
      });
    } else {
      this.form.patchValue({
        iArchId: null
      });
    }
    this.form.get('iArchId')?.markAsTouched();
  }

  private cargarExperienciasLaborales(): void {
    if (this.legajo?.iLegId) {
      this.vExperienciaLaboralService.getAll({ 
        campo: 'iLegId', 
        valor: this.legajo.iLegId.toString() 
      }).subscribe({
        next: (experiencias) => {
          this.dataSource.data = experiencias;
        },
        error: (error) => {
          this.snackBar.open('Error al cargar las experiencias laborales', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  verRegistro(experiencia: VExperienciaLaboral): void {
    // Limpiar estado anterior
    this.limpiarFormulario();
    
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.experienciaEnEdicion = experiencia;
    this.camposHabilitados = false;

    // Cargar datos y deshabilitar el formulario
    this.form.patchValue({
      iExpLabSecId: experiencia.iExpLabSecId,
      cExpLabEntidad: experiencia.cExpLabEntidad,
      cExpLabCargo: experiencia.cExpLabCargo,
      cExpLabNumeroDocumento: experiencia.cExpLabNumeroDocumento,
      dtExpLabFechaDocumento: experiencia.dtExpLabFechaDocumento,
      dtExpLabFechaInicio: experiencia.dtExpLabFechaInicio,
      dtExpLabFechaFin: experiencia.dtExpLabFechaFin,
      cExpLabFuncionesDesempenadas: experiencia.cExpLabFuncionesDesempenadas,
      cExpLabAnotaciones: experiencia.cExpLabAnotaciones,
      iArchId: experiencia.iArchId
    });

    this.form.disable();
    this.cdr.detectChanges();
  }

  editarExperiencia(experiencia: VExperienciaLaboral): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar edición',
        message: '¿Está seguro que desea editar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.experienciaEnEdicion = experiencia;
        this.modoEdicion = true;
        this.modoVisualizacion = false;
        this.camposHabilitados = true;

        // Cargar datos en el formulario habilitado
        this.form.enable();
        this.form.patchValue({
          iExpLabSecId: experiencia.iExpLabSecId,
          cExpLabEntidad: experiencia.cExpLabEntidad,
          cExpLabCargo: experiencia.cExpLabCargo,
          cExpLabNumeroDocumento: experiencia.cExpLabNumeroDocumento,
          dtExpLabFechaDocumento: experiencia.dtExpLabFechaDocumento,
          dtExpLabFechaInicio: experiencia.dtExpLabFechaInicio,
          dtExpLabFechaFin: experiencia.dtExpLabFechaFin,
          cExpLabFuncionesDesempenadas: experiencia.cExpLabFuncionesDesempenadas,
          cExpLabAnotaciones: experiencia.cExpLabAnotaciones,
          iArchId: experiencia.iArchId
        });

        // Marcar todos los campos como untouched después de cargar los datos
        Object.keys(this.form.controls).forEach(key => {
          const control = this.form.get(key);
          if (control) {
            control.markAsUntouched();
            control.markAsPristine();
          }
        });

        this.cdr.detectChanges();
      }
    });
  }

  eliminarExperiencia(experiencia: VExperienciaLaboral): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro que desea eliminar esta experiencia laboral?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && experiencia.iExpLabId) {
        this.experienciaLaboralService.delete(experiencia.iExpLabId).subscribe({
          next: () => {
            this.snackBar.open('Experiencia laboral eliminada exitosamente', 'Cerrar', {
              duration: 3000
            });
            
            // Si el registro eliminado es el que se está editando, limpiar el formulario
            if (this.experienciaEnEdicion?.iExpLabId === experiencia.iExpLabId) {
              this.limpiarFormulario();
            }
            
            this.cargarExperienciasLaborales();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            let errorMessage = 'Error al eliminar la experiencia laboral';
            if (error.error?.message) {
              errorMessage += `: ${error.error.message}`;
            }
            this.snackBar.open(errorMessage, 'Cerrar', {
              duration: 5000
            });
          }
        });
      }
    });
  }

  limpiarFormulario(): void {
    this.form.reset();
    
    // Resetear estados
    this.modoEdicion = false;
    this.modoVisualizacion = false;
    this.experienciaEnEdicion = undefined;
    this.camposHabilitados = true;

    // Habilitar el formulario
    this.form.enable();
    
    // Asegurar que ningún campo esté marcado como touched
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsUntouched();
        control.markAsPristine();
        control.setErrors(null);
      }
    });

    this.cdr.detectChanges();
  }

  guardar(): void {
    if (!this.form.valid && !this.modoEdicion) {  // Solo validar si no es edición
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control) {
          control.markAsTouched();
        }
      });

      const camposInvalidos = Object.keys(this.form.controls)
        .filter(key => {
          const control = this.form.get(key);
          return control && control.errors && control.touched;
        })
        .map(key => this.camposTraducidos[key] || key);

      if (camposInvalidos.length > 0) {
        this.snackBar.open(
          `Por favor complete los siguientes campos: ${camposInvalidos.join(', ')}`,
          'Cerrar',
          { duration: 5000 }
        );
        return;
      }
    }

    if (!this.legajo?.iLegId) {
      this.snackBar.open('No se ha seleccionado un legajo', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const formValues = this.form.getRawValue();
    const formData: any = {
      iLegId: this.legajo.iLegId,
      iExpLabSecId: formValues.iExpLabSecId,
      cExpLabEntidad: formValues.cExpLabEntidad,
      cExpLabCargo: formValues.cExpLabCargo,
      cExpLabNumeroDocumento: formValues.cExpLabNumeroDocumento,
      dtExpLabFechaDocumento: formValues.dtExpLabFechaDocumento,
      iArchId: formValues.iArchId
    };

    // Agregar campos opcionales solo si tienen valor
    if (formValues.dtExpLabFechaInicio) {
      formData.dtExpLabFechaInicio = formValues.dtExpLabFechaInicio;
    }
    if (formValues.dtExpLabFechaFin) {
      formData.dtExpLabFechaFin = formValues.dtExpLabFechaFin;
    }
    if (formValues.cExpLabFuncionesDesempenadas) {
      formData.cExpLabFuncionesDesempenadas = formValues.cExpLabFuncionesDesempenadas;
    }
    if (formValues.cExpLabAnotaciones) {
      formData.cExpLabAnotaciones = formValues.cExpLabAnotaciones;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: this.modoEdicion ? 'Confirmar actualización' : 'Confirmar registro',
        message: this.modoEdicion ? 
          '¿Está seguro que desea actualizar esta experiencia laboral?' :
          '¿Está seguro que desea registrar esta experiencia laboral?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.modoEdicion && this.experienciaEnEdicion?.iExpLabId) {
          const updateData = {
            ...formData,
            iExpLabId: this.experienciaEnEdicion.iExpLabId
          };

          this.experienciaLaboralService.update(this.experienciaEnEdicion.iExpLabId, updateData)
            .subscribe({
              next: () => {
                this.snackBar.open('Experiencia laboral actualizada exitosamente', 'Cerrar', {
                  duration: 3000
                });
                this.cargarExperienciasLaborales();
                this.limpiarFormulario();
              },
              error: (error) => {
                console.error('Error al actualizar:', error);
                if (error.error?.errores) {
                  const erroresTraducidos = Object.entries(error.error.errores as Record<string, string[]>)
                    .map(([campo, mensajes]) => {
                      const campoTraducido = this.camposTraducidos[campo] || campo;
                      const mensajeTraducido = this.mensajesError[mensajes[0]] || mensajes[0];
                      return `${campoTraducido}: ${mensajeTraducido}`;
                    })
                    .join('\n');
                  
                  this.snackBar.open(erroresTraducidos, 'Cerrar', {
                    duration: 5000,
                    panelClass: ['error-snackbar']
                  });
                } else {
                  this.snackBar.open('Error al actualizar la experiencia laboral', 'Cerrar', {
                    duration: 5000
                  });
                }
              }
            });
        } else {
          this.experienciaLaboralService.create(formData).subscribe({
            next: () => {
              this.snackBar.open('Experiencia laboral guardada exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.cargarExperienciasLaborales();
              this.limpiarFormulario();
            },
            error: (error) => {
              console.error('Error al guardar:', error);
              if (error.error?.errores) {
                const erroresTraducidos = Object.entries(error.error.errores as Record<string, string[]>)
                  .map(([campo, mensajes]) => {
                    const campoTraducido = this.camposTraducidos[campo] || campo;
                    const mensajeTraducido = this.mensajesError[mensajes[0]] || mensajes[0];
                    return `${campoTraducido}: ${mensajeTraducido}`;
                  })
                  .join('\n');
                
                this.snackBar.open(erroresTraducidos, 'Cerrar', {
                  duration: 5000,
                  panelClass: ['error-snackbar']
                });
              } else {
                this.snackBar.open('Error al guardar la experiencia laboral', 'Cerrar', {
                  duration: 5000
                });
              }
            }
          });
        }
      }
    });
  }
}
