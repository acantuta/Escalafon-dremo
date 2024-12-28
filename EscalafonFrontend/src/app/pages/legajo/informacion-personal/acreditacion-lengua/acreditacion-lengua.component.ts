import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Legajo } from '../../../../interfaces/legajo';
import { AcreditacionLenguaNativa } from '../../../../interfaces/acreditacion-lengua-nativa';
import { AcreditacionLenguaNativaService } from '../../../../services/acreditacion-lengua-nativa.service';

@Component({
  selector: 'app-acreditacion-lengua',
  templateUrl: './acreditacion-lengua.component.html'
})
export class AcreditacionLenguaComponent implements OnInit {
  @Input() legajo?: Legajo;
  
  acreditacionForm: FormGroup;
  dataSource: MatTableDataSource<AcreditacionLenguaNativa>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  editandoId?: number;
  submitted = false;

  displayedColumns: string[] = [
    'numero',
    'idioma', 
    'dominioEscritura', 
    'dominioOral', 
    'anioIngreso', 
    'anioEvaluacion', 
    'anioVencimiento',
    'acciones'
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private acreditacionService: AcreditacionLenguaNativaService
  ) {
    this.acreditacionForm = this.fb.group({
      iAcredId: [null],
      iLegId: [null],
      cAcredIdioma: ['', Validators.required],
      cAcredDominioEscritura: ['', Validators.required],
      cAcredDominioOral: ['', Validators.required],
      iAcredAnioIngreso: ['', Validators.required],
      iAcredAnioEvaluacion: ['', Validators.required],
      iAcredAnioVencimiento: ['', Validators.required]
    });

    this.dataSource = new MatTableDataSource<AcreditacionLenguaNativa>([]);
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarDatos(): void {
    if (this.legajo?.iLegId) {
      this.acreditacionService.getAll({
        campo: 'iLegId',
        valor: this.legajo.iLegId.toString()
      }).subscribe({
        next: (acreditaciones) => {
          this.dataSource.data = acreditaciones;
        },
        error: (error) => {
          this.snackBar.open('Error al cargar acreditaciones', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  guardarAcreditacion(): void {
    this.submitted = true;
    
    if (!this.acreditacionForm.valid) {
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    if (this.acreditacionForm.valid && this.legajo?.iLegId) {
      const acreditacion: AcreditacionLenguaNativa = {
        ...this.acreditacionForm.value,
        iLegId: this.legajo.iLegId
      };

      const operacion = this.editandoId 
        ? this.acreditacionService.update(this.editandoId, acreditacion)
        : this.acreditacionService.create(acreditacion);

      operacion.subscribe({
        next: () => {
          this.snackBar.open(
            `Acreditación ${this.editandoId ? 'actualizada' : 'guardada'} exitosamente`, 
            'Cerrar', 
            { duration: 3000 }
          );
          this.cargarDatos();
          this.limpiarFormulario();
        },
        error: (error) => {
          this.snackBar.open(
            `Error al ${this.editandoId ? 'actualizar' : 'guardar'} acreditación`, 
            'Cerrar', 
            { duration: 3000 }
          );
        }
      });
    }
  }

  editarAcreditacion(acreditacion: AcreditacionLenguaNativa): void {
    this.editandoId = acreditacion.iAcredId;
    this.acreditacionForm.patchValue(acreditacion);
  }

  eliminarAcreditacion(acreditacion: AcreditacionLenguaNativa): void {
    if (acreditacion.iAcredId && confirm('¿Está seguro de eliminar esta acreditación?')) {
      this.acreditacionService.delete(acreditacion.iAcredId).subscribe({
        next: () => {
          this.snackBar.open('Acreditación eliminada exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.cargarDatos();
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar acreditación', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  limpiarFormulario(): void {
    this.editandoId = undefined;
    this.submitted = false;
    this.acreditacionForm.reset({
      iAcredId: null,
      iLegId: null,
      cAcredIdioma: '',
      cAcredDominioEscritura: '',
      cAcredDominioOral: '',
      iAcredAnioIngreso: '',
      iAcredAnioEvaluacion: '',
      iAcredAnioVencimiento: ''
    });
    
    this.acreditacionForm.markAsPristine();
    this.acreditacionForm.markAsUntouched();
    
    Object.keys(this.acreditacionForm.controls).forEach(key => {
      const control = this.acreditacionForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.setErrors(null);
    });
  }
} 