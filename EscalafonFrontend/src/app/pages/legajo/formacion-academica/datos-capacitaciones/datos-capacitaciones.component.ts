import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EducacionTipoEstudio } from 'src/app/interfaces/educacion-tipo-estudio';
import { EducacionTipoEstudioService } from 'src/app/services/educacion-tipo-estudio.service';
import { Pais } from 'src/app/interfaces/pais';
import { PaisService } from 'src/app/services/pais.service';
import { EducacionTipoParticipacion } from 'src/app/interfaces/educacion-tipo-participacion';
import { EducacionTipoParticipacionService } from 'src/app/services/educacion-tipo-participacion.service';
import { EducacionDocumentoAcreditacion } from 'src/app/interfaces/educacion-documento-acreditacion';
import { EducacionDocumentoAcreditacionService } from 'src/app/services/educacion-documento-acreditacion.service';
import { EducacionModalidad } from 'src/app/interfaces/educacion-modalidad';
import { EducacionModalidadService } from 'src/app/services/educacion-modalidad.service';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { Capacitacion } from 'src/app/interfaces/capacitacion';
import { LegajoStateService } from 'src/app/core/services/legajo-state.service';
import { VLegajo } from 'src/app/interfaces/v-legajo';
import { EducacionSemestre } from 'src/app/interfaces/educacion-semestre';
import { EducacionSemestreService } from 'src/app/services/educacion-semestre.service';
import { VCapacitacion } from 'src/app/interfaces/v-capacitacion';
import { VCapacitacionService } from 'src/app/services/v-capacitacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-datos-capacitaciones',
  templateUrl: './datos-capacitaciones.component.html',
  styles: []
})
export class DatosCapacitacionesComponent implements OnInit {
  tiposEstudio: EducacionTipoEstudio[] = [];
  paises: Pais[] = [];
  tiposParticipacion: EducacionTipoParticipacion[] = [];
  documentosAcreditacion: EducacionDocumentoAcreditacion[] = [];
  modalidades: EducacionModalidad[] = [];
  capacitacionForm!: FormGroup;
  legajoActual: VLegajo | null = null;
  semestres: EducacionSemestre[] = [];
  capacitaciones: VCapacitacion[] = [];
  displayedColumns: string[] = [
    'numero', 
    'tipoEstudios', 
    'institucion', 
    'tema', 
    'documento', 
    'fechaInicio', 
    'fechaFin', 
    'duracion', 
    'creditos', 
    'acciones'
  ];
  modoEdicion: boolean = false;
  capacitacionId?: number;
  modoVisualizacion: boolean = false;
  registroSeleccionado: VCapacitacion | undefined;
  mostrarBotonesVisualizacion: boolean = false;

  constructor(
    private educacionTipoEstudioService: EducacionTipoEstudioService,
    private paisService: PaisService,
    private educacionTipoParticipacionService: EducacionTipoParticipacionService,
    private educacionDocumentoAcreditacionService: EducacionDocumentoAcreditacionService,
    private educacionModalidadService: EducacionModalidadService,
    private fb: FormBuilder,
    private capacitacionService: CapacitacionService,
    private legajoStateService: LegajoStateService,
    private educacionSemestreService: EducacionSemestreService,
    private vCapacitacionService: VCapacitacionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private configService: ConfigService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.cargarTiposEstudio();
    this.cargarPaises();
    this.cargarTiposParticipacion();
    this.cargarDocumentosAcreditacion();
    this.cargarModalidades();
    this.cargarSemestres();
    this.cargarCapacitaciones();
    
    // Suscribirse al estado del legajo y cargar capacitaciones cuando cambie
    this.legajoStateService.getLegajo().subscribe(legajo => {
      this.legajoActual = legajo;
      if (legajo) {
        this.cargarCapacitaciones();
      }
    });
  }

  cargarTiposEstudio() {
    this.educacionTipoEstudioService.getAll()
      .subscribe(tipos => {
        this.tiposEstudio = tipos;
      });
  }

  cargarPaises() {
    this.paisService.getAll()
      .subscribe(paises => {
        this.paises = paises;
      });
  }

  cargarTiposParticipacion() {
    this.educacionTipoParticipacionService.getAll()
      .subscribe(tipos => {
        this.tiposParticipacion = tipos;
      });
  }

  cargarDocumentosAcreditacion() {
    this.educacionDocumentoAcreditacionService.getAll()
      .subscribe(documentos => {
        this.documentosAcreditacion = documentos;
      });
  }

  cargarModalidades() {
    this.educacionModalidadService.getAll()
      .subscribe(modalidades => {
        this.modalidades = modalidades;
      });
  }

  cargarSemestres() {
    this.educacionSemestreService.getAll()
      .subscribe(semestres => {
        this.semestres = semestres;
      });
  }

  cargarCapacitaciones() {
    if (this.legajoActual?.iLegId) {  // Verificación segura de null
      this.vCapacitacionService.getAll({ 
        campo: 'iLegId', 
        valor: this.legajoActual.iLegId.toString() 
      }).subscribe({
        next: (data) => {
          this.capacitaciones = data;
        },
        error: (error) => {
          console.error('Error al cargar capacitaciones', error);
        }
      });
    }
  }

  private initForm(): void {
    this.capacitacionForm = this.fb.group({
      iEduTipEstId: [null, Validators.required],
      cCapaTema: ['', Validators.required],
      dtFechaInicio: [null, Validators.required],
      dtFechaFin: [null],
      iEduTipPartId: [null, Validators.required],
      cCapaInstitucion: ['', Validators.required],
      iPaisId: [this.configService.getDefaultPaisId(), Validators.required],
      cCapaCiudad: [''],
      iEduDocAcredId: [null],
      cCapaNumeroRegistro: [''],
      dtCapaFechaEmision: [null],
      iCapaDuracionHoras: [null],
      nCapaCreditos: [null],
      iEduSemId: [null],
      iEduModaId: [null],
      cCapaAnotaciones: [''],
      iArchId: [null]
    });
  }

  onArchivoIdChange(id: number | undefined) {
    this.capacitacionForm.patchValue({
      iArchId: id
    });
  }

  editarCapacitacion(capacitacion: VCapacitacion) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Editar Capacitación',
        message: '¿Desea editar esta capacitación?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modoEdicion = true;
        this.capacitacionId = capacitacion.iCapaId;
        
        this.capacitacionForm.patchValue({
          iEduTipEstId: capacitacion.iEduTipEstId,
          cCapaTema: capacitacion.cCapaTema,
          dtFechaInicio: capacitacion.dtFechaInicio,
          dtFechaFin: capacitacion.dtFechaFin,
          iEduTipPartId: capacitacion.iEduTipPartId,
          cCapaInstitucion: capacitacion.cCapaInstitucion,
          iPaisId: capacitacion.iPaisId,
          cCapaCiudad: capacitacion.cCapaCiudad,
          iEduDocAcredId: capacitacion.iEduDocAcredId,
          cCapaNumeroRegistro: capacitacion.cCapaNumeroRegistro,
          dtCapaFechaEmision: capacitacion.dtCapaFechaEmision,
          iCapaDuracionHoras: capacitacion.iCapaDuracionHoras,
          nCapaCreditos: capacitacion.nCapaCreditos,
          iEduSemId: capacitacion.iEduSemId,
          iEduModaId: capacitacion.iEduModaId,
          cCapaAnotaciones: capacitacion.cCapaAnotaciones,
          iArchId: capacitacion.iArchId
        });
      }
    });
  }

  eliminarCapacitacion(capacitacion: VCapacitacion) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Capacitación',
        message: '¿Está seguro de eliminar esta capacitación?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.capacitacionService.delete(capacitacion.iCapaId!).subscribe({
          next: () => {
            this.snackBar.open('Capacitación eliminada exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarCapacitaciones();
          },
          error: (error) => {
            console.error('Error al eliminar la capacitación', error);
            this.snackBar.open('Error al eliminar la capacitación', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  guardarCapacitacion(): void {
    if (!this.legajoActual?.iLegId) {
      this.snackBar.open('No hay un legajo seleccionado', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    Object.keys(this.capacitacionForm.controls).forEach(key => {
      const control = this.capacitacionForm.get(key);
      control?.markAsTouched();
    });

    if (this.capacitacionForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: this.modoEdicion ? 'Actualizar Capacitación' : 'Guardar Capacitación',
          message: this.modoEdicion ? 
            '¿Está seguro de actualizar esta capacitación?' : 
            '¿Está seguro de guardar esta capacitación?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const capacitacion: Capacitacion = {
            ...this.capacitacionForm.value,
            iLegId: this.legajoActual!.iLegId
          };

          if (this.modoEdicion && this.capacitacionId) {
            this.capacitacionService.update(this.capacitacionId, capacitacion).subscribe({
              next: () => {
                this.snackBar.open('Capacitación actualizada exitosamente', 'Cerrar', {
                  duration: 3000
                });
                this.limpiarFormulario();
                this.cargarCapacitaciones();
              },
              error: (error) => {
                console.error('Error al actualizar la capacitación', error);
                this.snackBar.open('Error al actualizar la capacitación', 'Cerrar', {
                  duration: 3000
                });
              }
            });
          } else {
            this.capacitacionService.create(capacitacion).subscribe({
              next: () => {
                this.snackBar.open('Capacitación guardada exitosamente', 'Cerrar', {
                  duration: 3000
                });
                this.limpiarFormulario();
                this.cargarCapacitaciones();
              },
              error: (error) => {
                console.error('Error al guardar la capacitación', error);
                this.snackBar.open('Error al guardar la capacitación', 'Cerrar', {
                  duration: 3000
                });
              }
            });
          }
        }
      });
    }
  }

  limpiarFormulario(): void {
    this.capacitacionForm.reset();
    this.capacitacionForm.patchValue({
      iPaisId: this.configService.getDefaultPaisId()
    });
    this.modoEdicion = false;
    this.capacitacionId = undefined;
  }

  visualizarCapacitacion(capacitacion: VCapacitacion): void {
    this.modoVisualizacion = true;
    this.modoEdicion = false;
    this.registroSeleccionado = capacitacion;

    // Cargar los datos en el formulario
    this.capacitacionForm.patchValue({
      iEduTipEstId: capacitacion.iEduTipEstId,
      cCapaTema: capacitacion.cCapaTema,
      dtFechaInicio: capacitacion.dtFechaInicio,
      dtFechaFin: capacitacion.dtFechaFin,
      iEduTipPartId: capacitacion.iEduTipPartId,
      cCapaInstitucion: capacitacion.cCapaInstitucion,
      iPaisId: capacitacion.iPaisId,
      cCapaCiudad: capacitacion.cCapaCiudad,
      iEduDocAcredId: capacitacion.iEduDocAcredId,
      cCapaNumeroRegistro: capacitacion.cCapaNumeroRegistro,
      dtCapaFechaEmision: capacitacion.dtCapaFechaEmision,
      iCapaDuracionHoras: capacitacion.iCapaDuracionHoras,
      nCapaCreditos: capacitacion.nCapaCreditos,
      iEduSemId: capacitacion.iEduSemId,
      iEduModaId: capacitacion.iEduModaId,
      cCapaAnotaciones: capacitacion.cCapaAnotaciones,
      iArchId: capacitacion.iArchId
    });

    // Deshabilitar todo el formulario
    this.capacitacionForm.disable();

    // Mostrar solo el botón de cerrar
    this.mostrarBotonesVisualizacion = true;
  }

  // Método para cerrar la visualización
  cerrarVisualizacion(): void {
    this.modoVisualizacion = false;
    this.modoEdicion = false;
    this.registroSeleccionado = undefined;
    this.mostrarBotonesVisualizacion = false;

    // Limpiar y habilitar el formulario
    this.capacitacionForm.reset();
    this.capacitacionForm.enable();

    // Restablecer valores por defecto
    this.capacitacionForm.patchValue({
      iPaisId: this.configService.getDefaultPaisId()
    });
  }
} 