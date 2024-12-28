import { Component, OnInit, ViewChild } from '@angular/core';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { HistorialHojaVidaComponent } from './historial-hoja-vida/historial-hoja-vida.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-reporte-hoja-vida',
  templateUrl: './reporte-hoja-vida.component.html'
})
export class ReporteHojaVidaComponent implements OnInit {
  legajo?: VLegajo;
  @ViewChild(HistorialHojaVidaComponent) historialComponent!: HistorialHojaVidaComponent;

  constructor(
    private legajoState: LegajoStateService
  ) {}

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    // El índice 1 corresponde a la pestaña de historial
    if (event.index === 1 && this.historialComponent) {
      this.historialComponent.cargarHistorial();
    }
  }
}
