import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { RegimenLaboralService } from 'src/app/services/regimen-laboral.service';
import { RegimenLaboral } from 'src/app/interfaces/regimen-laboral';
import { AscensoAccionService } from 'src/app/services/ascenso-accion.service';
import { AscensoAccion } from 'src/app/interfaces/ascenso-accion';
import { AscensoMotivoService } from 'src/app/services/ascenso-motivo.service';
import { AscensoMotivo } from 'src/app/interfaces/ascenso-motivo';
import { EscalaCategoriaService } from 'src/app/services/escala-categoria.service';
import { EscalaCategoria } from 'src/app/interfaces/escala-categoria';
import { ConfigService } from 'src/app/core/services/config.service';
import { AscensoService } from 'src/app/services/ascenso.service';
import { Ascenso } from 'src/app/interfaces/ascenso';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Archivo } from 'src/app/interfaces/archivo';
import { ArchivoHandlerComponent } from 'src/app/components/archivo-handler/archivo-handler.component';
import { VAscensoService } from 'src/app/services/v-ascenso.service';
import { VAscenso } from 'src/app/interfaces/v-ascenso';
import { LegajoStateService } from 'src/app/core/services/legajo-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ascensos',
  templateUrl: './ascensos.component.html',
  styleUrls: ['./ascensos.component.css']
})
export class AscensosComponent implements OnInit {
  @ViewChild(ArchivoHandlerComponent) archivoHandler!: ArchivoHandlerComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<VAscenso>([]);
  tiposDocumento: TipoDocumento[] = [];
  regimenesLaborales: RegimenLaboral[] = [];
  accionesAscenso: AscensoAccion[] = [];
  motivosAscenso: AscensoMotivo[] = [];
  regimenSeleccionado: number | null = null;
  accionSeleccionada: number | null = null;
  escalaCategorias: EscalaCategoria[] = [];
  escalaActual: number | null = null;
  escalaNueva: number | null = null;
  mostrarEscalaCategorias: boolean = false;
  ascensoForm: FormGroup;
  ascensos: VAscenso[] = [];
  iLegId: number | null = null;
  ascensoSeleccionado: VAscenso | null = null;
  modoEdicion: boolean = false;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private regimenLaboralService: RegimenLaboralService,
    private ascensoAccionService: AscensoAccionService,
    private ascensoMotivoService: AscensoMotivoService,
    private escalaCategoriaService: EscalaCategoriaService,
    private configService: ConfigService,
    private ascensoService: AscensoService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private vAscensoService: VAscensoService,
    private legajoStateService: LegajoStateService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.ascensoForm = this.formBuilder.group({
      iLegId: [null, Validators.required],
      iTipoDocId: [null, Validators.required],
      cAscNumeroDocumento: ['', Validators.required],
      dtAscFechaDocumento: [null, Validators.required],
      iArchId: [null],
      iRegLabId: [null, Validators.required],
      iAscAccId: [null, Validators.required],
      iAscMotId: [null, Validators.required],
      dtAscFechaInicio: [null, Validators.required],
      iAscEscCatId: [null],
      iAscEscCatIdNueva: [null],
      cAscAnotaciones: ['']
    });
  }

  ngOnInit(): void {
    this.cargarTiposDocumento();
    this.cargarRegimenesLaborales();
    
    this.legajoStateService.getLegajo().subscribe(legajo => {
      console.log('Legajo recibido:', legajo);
      if (legajo?.iLegId) {
        this.iLegId = legajo.iLegId;
        console.log('ID Legajo:', this.iLegId);
        this.ascensoForm.patchValue({ iLegId: this.iLegId });
        this.cargarAscensos();
      } else {
        console.log('No se encontró iLegId en el legajo');
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe(tipos => {
      this.tiposDocumento = tipos;
    });
  }

  private cargarRegimenesLaborales(): void {
    this.regimenLaboralService.getAll().subscribe(regimenes => {
      this.regimenesLaborales = regimenes;
    });
  }

  onRegimenChange(regimenId: number): void {
    this.regimenSeleccionado = regimenId;
    this.accionSeleccionada = null;
    this.motivosAscenso = [];
    this.escalaCategorias = [];
    this.escalaActual = null;
    this.escalaNueva = null;
    
    // Verificar si el régimen tiene escala/categoría/grupo
    this.mostrarEscalaCategorias = this.configService.tieneEscalaCategoriaGrupo(regimenId);
    
    // Cargar acciones filtradas por régimen
    this.ascensoAccionService.getAll({
      campo: 'iRegLabId',
      valor: regimenId.toString()
    }).subscribe(acciones => {
      this.accionesAscenso = acciones;
    });

    // Solo cargar escalas/categorías si el régimen lo permite
    if (this.mostrarEscalaCategorias) {
      this.escalaCategoriaService.getAll({
        campo: 'iRegLabId',
        valor: regimenId.toString()
      }).subscribe(escalas => {
        this.escalaCategorias = escalas;
      });
    }
  }

  onAccionChange(accionId: number): void {
    this.accionSeleccionada = accionId;
    
    // Cargar motivos filtrados por acción
    this.ascensoMotivoService.getAll({
      campo: 'iAscAccId',
      valor: accionId.toString()
    }).subscribe(motivos => {
      this.motivosAscenso = motivos;
    });
  }

  guardarAscenso(): void {
    if (!this.iLegId) {
      this.snackBar.open('No se puede guardar sin un legajo seleccionado', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    if (this.ascensoForm.invalid) {
      // Marcar todos los campos como tocados para mostrar los errores
      Object.keys(this.ascensoForm.controls).forEach(key => {
        const control = this.ascensoForm.get(key);
        control?.markAsTouched();
      });
      
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const ascensoData: Ascenso = this.ascensoForm.value;
    
    if (!this.mostrarEscalaCategorias) {
      delete ascensoData.iAscEscCatId;
      delete ascensoData.iAscEscCatIdNueva;
    }

    if (this.modoEdicion && this.ascensoSeleccionado?.idAscId) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          title: 'Confirmar actualización',
          message: '¿Está seguro que desea actualizar este ascenso?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.actualizarAscenso();
        }
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          title: 'Confirmar registro',
          message: '¿Está seguro que desea registrar este ascenso?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.ascensoService.create(ascensoData).subscribe({
            next: (response) => {
              this.snackBar.open('Ascenso guardado exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.resetearFormularioCompleto();
              this.cargarAscensos();
            },
            error: (error) => {
              console.error('Error al guardar:', error);
              this.snackBar.open(
                error.error?.mensaje || 'Error al guardar el ascenso',
                'Cerrar',
                { duration: 3000 }
              );
            }
          });
        }
      });
    }
  }

  resetearFormularioCompleto(): void {
    // Resetear variables de estado
    this.regimenSeleccionado = null;
    this.accionSeleccionada = null;
    this.escalaActual = null;
    this.escalaNueva = null;
    this.escalaCategorias = [];
    this.accionesAscenso = [];
    this.motivosAscenso = [];

    // Limpiar el archivo handler
    if (this.archivoHandler) {
      this.archivoHandler.limpiar();
    }

    // Resetear el formulario de manera simple
    this.ascensoForm.reset();

    // Recargar datos
    this.cargarTiposDocumento();
    this.cargarRegimenesLaborales();
  }

  limpiarFormulario(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Limpiar Formulario',
        message: '¿Está seguro que desea limpiar todos los campos?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetearFormularioCompleto();
        this.ascensoForm.enable();
        this.snackBar.open('Formulario limpiado correctamente', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  onArchivoSelected(archivo: Archivo | undefined): void {
    if (archivo) {
      this.ascensoForm.patchValue({
        iFolios: archivo.iArchFolios
      });
    }
  }

  onArchivoIdSelected(archivoId: number | undefined): void {
    this.ascensoForm.patchValue({
      iArchId: archivoId
    });
  }

  cargarAscensos(): void {
    this.legajoStateService.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        this.vAscensoService.getAll({ 
          campo: 'iLegId',
          valor: legajo.iLegId.toString()
        }).subscribe({
          next: (response) => {
            this.ascensos = response;
            this.dataSource.data = response;
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }
          },
          error: (error) => {
            console.error('Error al cargar ascensos:', error);
            this.snackBar.open('Error al cargar los ascensos', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  private cargarDatosParaEdicion(ascenso: VAscenso): void {
    this.ascensoSeleccionado = ascenso;
    this.modoEdicion = true;

    // Cargar datos en el formulario
    this.ascensoForm.patchValue({
      iLegId: ascenso.iLegId,
      iTipoDocId: ascenso.iTipoDocId,
      cAscNumeroDocumento: ascenso.cAscNumeroDocumento,
      dtAscFechaDocumento: ascenso.dtAscFechaDocumento,
      iArchId: ascenso.iArchId,
      iRegLabId: ascenso.iRegLabId,
      iAscAccId: ascenso.iAscAccId,
      iAscMotId: ascenso.iAscMotId,
      dtAscFechaInicio: ascenso.dtAscFechaInicio,
      iAscEscCatId: ascenso.iAscEscCatId,
      iAscEscCatIdNueva: ascenso.iAscEscCatIdNueva,
      cAscAnotaciones: ascenso.cAscAnotaciones
    });

    // Cargar datos dependientes
    if (ascenso.iRegLabId) {
      this.onRegimenChange(ascenso.iRegLabId);
    }
    if (ascenso.iAscAccId) {
      this.onAccionChange(ascenso.iAscAccId);
    }

    // Si hay un archivo, actualizar el archivo handler
    if (this.archivoHandler && ascenso.iArchId) {
      // Aquí podrías implementar la lógica para cargar el archivo si es necesario
    }
  }

  editarAscenso(ascenso: VAscenso): void {
    // Cargar los datos en el formulario
    this.cargarDatosParaEdicion(ascenso);
    // Habilitar el formulario para edición
    this.ascensoForm.enable();
    // Desplazar hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  verAscenso(ascenso: VAscenso): void {
    // Cargar los datos en el formulario
    this.cargarDatosParaEdicion(ascenso);
    // Deshabilitar el formulario inicialmente
    this.ascensoForm.disable();
    // Desplazar hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarAscenso(ascenso: VAscenso): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Ascenso',
        message: '¿Está seguro que desea eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && ascenso.idAscId) {
        this.ascensoService.delete(ascenso.idAscId).subscribe({
          next: () => {
            this.snackBar.open('Registro eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarAscensos();
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

  retornar(): void {
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

  actualizarAscenso(): void {
    if (!this.ascensoSeleccionado?.idAscId) {
      this.snackBar.open('Error: No se encontró el ID del ascenso', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    if (this.ascensoForm.valid) {
      const ascensoData: Ascenso = this.ascensoForm.value;

      if (!this.mostrarEscalaCategorias) {
        delete ascensoData.iAscEscCatId;
        delete ascensoData.iAscEscCatIdNueva;
      }

      this.ascensoService.update(this.ascensoSeleccionado.idAscId, ascensoData).subscribe({
        next: () => {
          this.snackBar.open('Ascenso actualizado exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.resetearFormularioCompleto();
          this.cargarAscensos();
          this.modoEdicion = false;
          this.ascensoSeleccionado = null;
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          this.snackBar.open(
            error.error?.mensaje || 'Error al actualizar el ascenso',
            'Cerrar',
            { duration: 3000 }
          );
        }
      });
    }
  }

  // Método para verificar si un campo es inválido
  esCampoInvalido(nombreCampo: string): boolean {
    const campo = this.ascensoForm.get(nombreCampo);
    return !!(campo && campo.invalid && (campo.dirty || campo.touched));
  }

  // Método para obtener el mensaje de error de un campo
  obtenerMensajeError(nombreCampo: string): string {
    const campo = this.ascensoForm.get(nombreCampo);
    if (campo?.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }
} 