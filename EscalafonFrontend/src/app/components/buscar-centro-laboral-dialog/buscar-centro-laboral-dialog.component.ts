import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VCentroLaboral } from '../../interfaces/v-centro-laboral';

@Component({
  selector: 'app-buscar-centro-laboral-dialog',
  template: `
    <h2 mat-dialog-title>Buscar Centro Laboral</h2>
    <mat-dialog-content>
      <app-centros-trabajo
        [showTabs]="false"
        (centroLaboralSelected)="onCentroSelected($event)">
      </app-centros-trabajo>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
    </mat-dialog-actions>
  `
})
export class BuscarCentroLaboralDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<BuscarCentroLaboralDialogComponent>
  ) {}

  onCentroSelected(centro: VCentroLaboral) {
    this.dialogRef.close(centro);
  }
} 