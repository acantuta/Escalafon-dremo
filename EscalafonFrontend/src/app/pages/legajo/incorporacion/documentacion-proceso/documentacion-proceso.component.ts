import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { IncorporacionDocumentoService } from '../../../../services/incorporacion-documento.service';
import { VIncorporacionDocumentoService } from '../../../../services/v-incorporacion-documento.service';
import { IncorporacionTipoDocumentoService } from '../../../../services/incorporacion-tipo-documento.service';
import { IncorporacionTipoDocumento } from '../../../../interfaces/incorporacion-tipo-documento';
import { Archivo } from '../../../../interfaces/archivo';
import { IncorporacionDocumento } from '../../../../interfaces/incorporacion-documento';
import { VIncorporacionDocumento } from '../../../../interfaces/v-incorporacion-documento';
import { ArchivoHandlerComponent } from '../../../../components/archivo-handler/archivo-handler.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-documentacion-proceso',
  templateUrl: './documentacion-proceso.component.html'
})
export class DocumentacionProcesoComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'numero',
    'tipoDocumento',
    'fEmision',
    'acciones'
  ];

  documentacionForm: FormGroup;
  documentos: VIncorporacionDocumento[] = [];
  tiposDocumento: IncorporacionTipoDocumento[] = [];
  legajoId!: number;
  selectedFileName: string = '';
  private subscription?: Subscription;
  modoFormulario: 'crear' | 'editar' | 'ver' = 'crear';
  documentoSeleccionadoId?: number;
  formularioVisible = true;

  @ViewChild(ArchivoHandlerComponent) archivoHandler!: ArchivoHandlerComponent;

  constructor(
    private fb: FormBuilder,
    private legajoState: LegajoStateService,
    private incorporacionDocumentoService: IncorporacionDocumentoService,
    private vIncorporacionDocumentoService: VIncorporacionDocumentoService,
    private incorporacionTipoDocumentoService: IncorporacionTipoDocumentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.documentacionForm = this.fb.group({
      iIncorTipDocId: ['', [Validators.required]],
      dIncorDocFechEmision: ['', [Validators.required]],
      iArchId: [null, [Validators.required]],
      cIncorDocAnotaciones: ['']
    });
  }

  ngOnInit(): void {
    this.subscription = this.legajoState.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        this.legajoId = legajo.iLegId;
        this.cargarDocumentos();
      }
    });

    this.cargarTiposDocumento();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cargarDocumentos() {
    this.vIncorporacionDocumentoService.getAll({
      campo: 'iLegId',
      valor: this.legajoId.toString()
    }).subscribe(documentos => {
      this.documentos = documentos;
    });
  }

  cargarTiposDocumento() {
    this.incorporacionTipoDocumentoService.getAll()
      .subscribe({
        next: (tipos: IncorporacionTipoDocumento[]) => {
          this.tiposDocumento = tipos;
          console.log('Tipos de documento cargados:', tipos);
        },
        error: (error) => {
          console.error('Error al cargar tipos de documento:', error);
        }
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      // Aquí iría la lógica para subir el archivo
    }
  }

  guardarDocumento() {
    if (this.documentacionForm.invalid) {
      Object.keys(this.documentacionForm.controls).forEach(key => {
        const control = this.documentacionForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Confirmar ${this.modoFormulario === 'editar' ? 'edición' : 'guardado'}`,
        message: `¿Está seguro de ${this.modoFormulario === 'editar' ? 'editar' : 'guardar'} este documento?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const documento: IncorporacionDocumento = {
          iLegId: this.legajoId,
          iIncorTipDocId: Number(this.documentacionForm.get('iIncorTipDocId')?.value),
          iArchId: Number(this.documentacionForm.get('iArchId')?.value),
          dIncorDocFechEmision: this.documentacionForm.get('dIncorDocFechEmision')?.value,
          cIncorDocAnotaciones: this.documentacionForm.get('cIncorDocAnotaciones')?.value?.toUpperCase() || ''
        };

        // Determinar si es crear o actualizar
        const observable = this.modoFormulario === 'editar' && this.documentoSeleccionadoId
          ? this.incorporacionDocumentoService.update(this.documentoSeleccionadoId, documento)
          : this.incorporacionDocumentoService.create(documento);

        observable.subscribe({
          next: () => {
            this.snackBar.open(
              `Documento ${this.modoFormulario === 'editar' ? 'actualizado' : 'guardado'} exitosamente`,
              'Cerrar',
              { duration: 3000 }
            );
            this.cargarDocumentos();
            this.limpiarFormularioCompleto();
          },
          error: (error) => {
            console.error('Error al guardar documento:', error);
            this.snackBar.open(
              `Error al ${this.modoFormulario === 'editar' ? 'actualizar' : 'guardar'} el documento`,
              'Cerrar',
              { duration: 3000 }
            );
          }
        });
      }
    });
  }

  limpiarFormularioCompleto() {
    this.modoFormulario = 'crear';
    this.documentoSeleccionadoId = undefined;
    this.documentacionForm.enable();
    // Limpia el formulario
    this.documentacionForm.reset();
    
    // Limpia el archivo seleccionado
    if (this.archivoHandler) {
      this.archivoHandler.limpiar();
    }
    
    // Resetea otros estados
    this.selectedFileName = '';
    
    // Asegura que los validadores se actualicen
    this.documentacionForm.markAsPristine();
    this.documentacionForm.markAsUntouched();
    
    // Resetea específicamente cada control
    Object.keys(this.documentacionForm.controls).forEach(key => {
      const control = this.documentacionForm.get(key);
      control?.reset();
      control?.setErrors(null);
    });
  }

  limpiarFormulario() {
    this.formularioVisible = true;
    this.limpiarFormularioCompleto();
  }

  editarDocumento(documento: VIncorporacionDocumento) {
    this.modoFormulario = 'editar';
    this.documentoSeleccionadoId = documento.iIncorDocId;

    const tipoDoc = this.tiposDocumento.find(
      tipo => tipo.iIncorTipDocId === documento.iIncorTipDocId
    );

    // Cargar los datos del formulario
    this.documentacionForm.patchValue({
      iIncorTipDocId: documento.iIncorTipDocId,
      dIncorDocFechEmision: documento.dIncorDocFechEmision,
      cIncorDocAnotaciones: documento.cIncorDocAnotaciones,
      iArchId: documento.iArchId
    });

    // Actualizar el archivo usando el ID
    if (documento.iArchId) {
      this.onArchivoId(documento.iArchId);
    }
  }

  eliminarDocumento(id: number | undefined) {
    if (!id) {
      console.error('Error: ID de documento no válido');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro de eliminar este documento?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.incorporacionDocumentoService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Documento eliminado exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarDocumentos();
          },
          error: (error) => {
            console.error('Error al eliminar documento:', error);
            this.snackBar.open('Error al eliminar el documento', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  onArchivoSeleccionado(archivo: Archivo | null) {
    if (archivo) {
      this.documentacionForm.patchValue({
        iArchId: archivo.iArchId
      });
    } else {
      this.documentacionForm.patchValue({
        iArchId: null
      });
    }
  }

  onArchivoId(id: number | undefined): void {
    if (id !== undefined) {
      this.documentacionForm.patchValue({
        iArchId: id
      }, { emitEvent: true });

      // Actualizar el archivo en el componente archivo-handler
      if (this.archivoHandler) {
        this.archivoHandler.archivoId = id;
      }
    }
  }

  visualizarDocumento(documento: VIncorporacionDocumento) {
    this.formularioVisible = true;
    this.modoFormulario = 'ver';

    // Cargar los datos del formulario
    this.documentacionForm.patchValue({
      iIncorTipDocId: documento.iIncorTipDocId,
      dIncorDocFechEmision: documento.dIncorDocFechEmision,
      cIncorDocAnotaciones: documento.cIncorDocAnotaciones,
      iArchId: documento.iArchId
    });

    // Actualizar el archivo usando el ID
    if (documento.iArchId) {
      this.onArchivoId(documento.iArchId);
    }

    // Deshabilitar el formulario completo
    this.documentacionForm.disable();
  }
} 