import { Component, Input, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Legajo } from '../../../../interfaces/legajo';
import { InfopefamiliarFamiliar } from '../../../../interfaces/infopefamiliar-familiar';
import { InfopefamiliarFamiliarParentesco } from '../../../../interfaces/infopefamiliar-familiar-parentesco';
import { TipoDocumentoIdentificacion } from '../../../../interfaces/tipo-documento-identificacion';
import { VInfopefamiliarFamiliar } from '../../../../interfaces/v-infopefamiliar-familiar';
import { InfopefamiliarFamiliarService } from '../../../../services/infopefamiliar-familiar.service';
import { InfopefamiliarFamiliarParentescoService } from '../../../../services/infopefamiliar-familiar-parentesco.service';
import { TipoDocumentoIdentificacionService } from '../../../../services/tipo-documento-identificacion.service';
import { VInfopefamiliarFamiliarService } from '../../../../services/v-infopefamiliar-familiar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../../../core/services/config.service';
import { BooleanUtilsService } from '../../../../core/services/boolean-utils.service';
import { Archivo } from '../../../../interfaces/archivo';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página';
  override nextPageLabel = 'Siguiente';
  override previousPageLabel = 'Anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) {
      return 'Página 1 de 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  };
}

@Component({
  selector: 'app-datos-familiares',
  templateUrl: './datos-familiares.component.html',
  styleUrls: ['./datos-familiares.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class DatosFamiliaresComponent implements OnInit {
  @Input() legajo?: Legajo;
  
  familiarForm: FormGroup;
  familiares: VInfopefamiliarFamiliar[] = [];
  tiposDocumento: TipoDocumentoIdentificacion[] = [];
  parentescos: InfopefamiliarFamiliarParentesco[] = [];
  loading = false;
  editandoId?: number;
  submitted = false;
  modoFormulario: 'crear' | 'editar' | 'ver' = 'crear';

  displayedColumns: string[] = [
    'numero', 
    'apellidosNombres', 
    'tipoDocumento', 
    'nroDocumento', 
    'sexo', 
    'fechaNacimiento', 
    'parentesco',
    'derechohabiente',
    'situacion',
    'acciones'
  ];

  dataSource: MatTableDataSource<VInfopefamiliarFamiliar>;
  @ViewChild(MatPaginator) paginator: MatPaginator = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    page: new EventEmitter(),
    pageSizeOptions: [5, 10, 25],
    hidePageSize: false,
    showFirstLastButtons: true
  } as MatPaginator;

  constructor(
    private fb: FormBuilder,
    private familiarService: InfopefamiliarFamiliarService,
    private vFamiliarService: VInfopefamiliarFamiliarService,
    private parentescoService: InfopefamiliarFamiliarParentescoService,
    private tipoDocumentoService: TipoDocumentoIdentificacionService,
    private snackBar: MatSnackBar,
    private configService: ConfigService,
    public booleanUtils: BooleanUtilsService,
    private dialog: MatDialog,
  ) {
    this.familiarForm = this.fb.group({
      iInfoPeFamFamiId: [null],
      iLegId: [null],
      iTipoIdentId: ['', Validators.required],
      cInfoPeFamFamiNumeroDocumento: ['', Validators.required],
      iPersId: [null],
      iInfoPeFamParentId: ['', Validators.required],
      bInfoPeFamFamiEsDerechohabiente: [false],
      cInfoPeFamFamiPrimerApellido: ['', Validators.required],
      cInfoPeFamFamiSegundoApellido: [''],
      cInfoPeFamFamiNombres: ['', Validators.required],
      dInfoPeFamFamiFechaNacimiento: [null, Validators.required],
      cInfoPeFamFamiSexo: ['', Validators.required],
      cInfoPeFamFamiNumeroActaNacimiento: [''],
      dInfoPeFamFamiFechaEmision: [null],
      iArchId: [null],
      bInfoPeFamFamiEsDiscapacitado: [false],
      bInfoPeFamFamiEsFallecido: [false]
    });
    this.dataSource = new MatTableDataSource<VInfopefamiliarFamiliar>([]);
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarDatos(): void {
    if (this.legajo?.iLegId) {
      this.loading = true;
      
      // Cargar tipos de documento
      this.tipoDocumentoService.getAll().subscribe(tipos => {
        this.tiposDocumento = tipos;
      });

      // Cargar parentescos
      this.parentescoService.getAll().subscribe(parentescos => {
        this.parentescos = parentescos;
      });

      // Cargar familiares
      this.vFamiliarService.getAll({ 
        campo: 'iLegId', 
        valor: this.legajo.iLegId.toString() 
      }).subscribe({
        next: (familiares) => {
          this.familiares = familiares;
          console.log('familiares****');
          console.log(this.familiares);
          this.dataSource.data = familiares;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        }
      });
    }
  }

  guardarFamiliar(): void {
    this.submitted = true;
    
    // Primero validamos el formulario
    if (!this.familiarForm.valid || !this.legajo?.iLegId) {
      this.familiarForm.markAllAsTouched();
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    // Si el formulario es válido, mostramos el diálogo de confirmación
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
    const formValues = this.familiarForm.value;
    const esDerechohabiente = this.booleanUtils.convertirABoolean(formValues.bInfoPeFamFamiEsDerechohabiente);
    const esFallecido = this.booleanUtils.convertirABoolean(formValues.bInfoPeFamFamiEsFallecido);

    const familiar: InfopefamiliarFamiliar = {
      ...this.familiarForm.value,
      iLegId: this.legajo!.iLegId,
      bInfoPeFamFamiEsDerechohabiente: esDerechohabiente,
      bInfoPeFamFamiEsFallecido: esFallecido
    };

    const operacion = this.editandoId 
      ? this.familiarService.update(this.editandoId, familiar)
      : this.familiarService.create(familiar);

    operacion.subscribe({
      next: () => {
        this.snackBar.open(
          `Familiar ${this.editandoId ? 'actualizado' : 'guardado'} exitosamente`, 
          'Cerrar', 
          { duration: 3000 }
        );
        this.cargarDatos();
        this.limpiarFormulario();
      },
      error: (error) => {
        this.snackBar.open(
          `Error al ${this.editandoId ? 'actualizar' : 'guardar'} familiar`, 
          'Cerrar', 
          { duration: 3000 }
        );
      }
    });
  }

  editarFamiliar(familiar: VInfopefamiliarFamiliar): void {
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
        this.editandoId = familiar.iInfoPeFamFamiId;
        this.familiarForm.enable();
        this.familiarForm.patchValue({
          ...familiar,
          dInfoPeFamFamiFechaNacimiento: familiar.dInfoPeFamFamiFechaNacimiento,
          dInfoPeFamFamiFechaEmision: familiar.dInfoPeFamFamiFechaEmision
        });
      }
    });
  }

  eliminarFamiliar(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Está seguro de eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.familiarService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Familiar eliminado exitosamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarDatos();
          },
          error: (error) => {
            this.snackBar.open('Error al eliminar familiar', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  limpiarFormulario(): void {
    this.submitted = false;
    this.editandoId = undefined;
    this.modoFormulario = 'crear';
    
    this.familiarForm.enable();
    
    // Inicializar con valores por defecto
    this.familiarForm.setValue({
      iInfoPeFamFamiId: null,
      iLegId: null,
      iTipoIdentId: '',
      cInfoPeFamFamiNumeroDocumento: '',
      iPersId: null,
      iInfoPeFamParentId: '',
      bInfoPeFamFamiEsDerechohabiente: false,
      cInfoPeFamFamiPrimerApellido: '',
      cInfoPeFamFamiSegundoApellido: '',
      cInfoPeFamFamiNombres: '',
      dInfoPeFamFamiFechaNacimiento: null,
      cInfoPeFamFamiSexo: '',
      cInfoPeFamFamiNumeroActaNacimiento: '',
      dInfoPeFamFamiFechaEmision: null,
      iArchId: null,
      bInfoPeFamFamiEsDiscapacitado: false,
      bInfoPeFamFamiEsFallecido: false
    });

    // Marcar el formulario como pristine y untouched
    this.familiarForm.markAsPristine();
    this.familiarForm.markAsUntouched();
    
    // Marcar todos los controles como pristine y untouched
    Object.keys(this.familiarForm.controls).forEach(key => {
      const control = this.familiarForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.setErrors(null);  // Limpiar errores explícitamente
    });
  }

  getParentescoNombre(id: number | undefined): string {
    if (!id) return '';
    const parentesco = this.parentescos.find(p => p.iInfoPeFamParentId === id);
    return parentesco ? parentesco.cInfoPeFamParentNombre || '' : '';
  }

  calcularEsMayorEdad(fechaNacimiento: Date | null): boolean {
    if (!fechaNacimiento) return false;
    
    // Asegurarnos de que sea un objeto Date
    const fecha = new Date(fechaNacimiento);
    if (isNaN(fecha.getTime())) return false;  // Fecha inválida
    
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      return edad - 1 >= this.configService.getMayoriaEdad();
    }
    
    return edad >= this.configService.getMayoriaEdad();
  }

  convertirABoolean(valor: any): boolean {
    return this.booleanUtils.convertirABoolean(valor);
  }

  onArchivoSeleccionado(archivo: Archivo | undefined): void {
    if (archivo) {
      this.familiarForm.patchValue({
        iArchId: archivo.iArchId
      });
    } else {
      this.familiarForm.patchValue({
        iArchId: null
      });
    }
  }

  visualizarFamiliar(familiar: VInfopefamiliarFamiliar): void {
    this.modoFormulario = 'ver';
    this.familiarForm.patchValue({
      ...familiar,
      dInfoPeFamFamiFechaNacimiento: familiar.dInfoPeFamFamiFechaNacimiento,
      dInfoPeFamFamiFechaEmision: familiar.dInfoPeFamFamiFechaEmision
    });
    this.familiarForm.disable();
  }
} 