import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { InfopefamiliarDeclaracionJurada } from '../../../../interfaces/infopefamiliar-declaracion-jurada';
import { InfopefamiliarDeclaracionJuradaTipoDocumento } from '../../../../interfaces/infopefamiliar-declaracion-jurada-tipo-documento';
import { InfopefamiliarDeclaracionJuradaService } from '../../../../services/infopefamiliar-declaracion-jurada.service';
import { InfopefamiliarDeclaracionJuradaTipoDocumentoService } from '../../../../services/infopefamiliar-declaracion-jurada-tipo-documento.service';
import { Subscription } from 'rxjs';
import { Archivo } from '../../../../interfaces/archivo';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-declaracion-jurada',
  templateUrl: './declaracion-jurada.component.html'
})
export class DeclaracionJuradaComponent implements OnInit, OnDestroy {
  declaracionForm: FormGroup;
  dataSource: MatTableDataSource<InfopefamiliarDeclaracionJurada>;
  tiposDocumento: InfopefamiliarDeclaracionJuradaTipoDocumento[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  editandoId?: number;
  submitted = false;
  private subscriptions = new Subscription();
  loading = false;
  modoFormulario: 'crear' | 'editar' | 'ver' = 'crear';

  displayedColumns: string[] = [
    'numero',
    'tipoDocumento',
    'fechaEmision',
    'anotaciones',
    'acciones'
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private legajoState: LegajoStateService,
    private declaracionService: InfopefamiliarDeclaracionJuradaService,
    private tipoDocumentoService: InfopefamiliarDeclaracionJuradaTipoDocumentoService,
    private dialog: MatDialog
  ) {
    this.declaracionForm = this.fb.group({
      iSecInfDecId: [null],
      iLegId: [null],
      iInfoPeFamDecTipId: ['', Validators.required],
      dtInfoPeFamDecFechaEmision: [null, Validators.required],
      cInfoPeFamDecAnotaciones: [''],
      iArchivoId: [null]
    });

    this.dataSource = new MatTableDataSource<InfopefamiliarDeclaracionJurada>([]);
  }

  ngOnInit() {
    this.cargarTiposDocumento();
    this.subscriptions.add(
      this.legajoState.getLegajo().subscribe(legajo => {
        if (legajo?.iLegId) {
          this.cargarDeclaraciones(legajo.iLegId);
        }
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarTiposDocumento() {
    this.loading = true;
    this.subscriptions.add(
      this.tipoDocumentoService.getAll().subscribe({
        next: (tipos) => {
          this.tiposDocumento = tipos;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar tipos de documento:', error);
          this.snackBar.open('Error al cargar tipos de documento', 'Cerrar', {
            duration: 3000
          });
          this.loading = false;
        }
      })
    );
  }

  private cargarDeclaraciones(legajoId: number | undefined): void {
    if (!legajoId) return;

    this.declaracionService.getAll({
      campo: 'iLegId',
      valor: legajoId.toString()
    }).subscribe({
      next: (declaraciones) => {
        this.dataSource.data = declaraciones;
      },
      error: (error) => {
        console.error('Error al cargar declaraciones:', error);
      }
    });
  }

  guardarDeclaracion() {
    this.submitted = true;
    if (!this.declaracionForm.valid) {
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

  private procesarGuardado() {
    if (!this.tiposDocumento.length) {
      this.snackBar.open('Error: No hay tipos de documento disponibles', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.legajoState.getLegajo().subscribe(legajo => {
      if (legajo?.iLegId) {
        const declaracion = {
          ...this.declaracionForm.value,
          iLegId: legajo.iLegId
        };

        const operacion = this.editandoId
          ? this.declaracionService.update(this.editandoId, declaracion)
          : this.declaracionService.create(declaracion);

        operacion.subscribe({
          next: () => {
            this.snackBar.open(
              `Declaración ${this.editandoId ? 'actualizada' : 'guardada'} exitosamente`,
              'Cerrar',
              { duration: 3000 }
            );
            this.cargarDeclaraciones(legajo.iLegId);
            this.limpiarFormulario();
          },
          error: (error) => {
            console.error('Error al guardar:', error);
            this.snackBar.open('Error al guardar la declaración', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  editarDeclaracion(declaracion: InfopefamiliarDeclaracionJurada) {
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
        this.editandoId = declaracion.iSecInfDecId;
        this.declaracionForm.enable();
        this.declaracionForm.patchValue(declaracion);
      }
    });
  }

  eliminarDeclaracion(declaracion: InfopefamiliarDeclaracionJurada) {
    const idDeclaracion = declaracion.iSecInfDecId;
    if (!idDeclaracion) {
      this.snackBar.open('Error: No se encontró el ID de la declaración', 'Cerrar', {
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
        this.declaracionService.delete(idDeclaracion).subscribe({
          next: () => {
            this.snackBar.open('Declaración eliminada exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.legajoState.getLegajo().subscribe(legajo => {
              if (legajo?.iLegId) {
                this.cargarDeclaraciones(legajo.iLegId);
              }
            });
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            this.snackBar.open('Error al eliminar la declaración', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  visualizarDeclaracion(declaracion: InfopefamiliarDeclaracionJurada) {
    this.modoFormulario = 'ver';
    this.declaracionForm.patchValue(declaracion);
    this.declaracionForm.disable();
  }

  limpiarFormulario() {
    this.editandoId = undefined;
    this.submitted = false;
    this.modoFormulario = 'crear';
    this.declaracionForm.enable();
    this.declaracionForm.reset();
    Object.keys(this.declaracionForm.controls).forEach(key => {
      const control = this.declaracionForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.setErrors(null);
    });
  }

  obtenerNombreTipoDocumento(id: number | undefined): string {
    if (!id || !this.tiposDocumento.length) return '';
    const tipo = this.tiposDocumento.find(t => t.iInfoPeFamDecTipId === id);
    return tipo?.cInfoPeFamDecTipNombre || 'No especificado';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onArchivoSeleccionado(archivo: Archivo | undefined): void {
    if (archivo) {
      this.declaracionForm.patchValue({
        iArchivoId: archivo.iArchId
      });
    } else {
      this.declaracionForm.patchValue({
        iArchivoId: null
      });
    }
  }
} 