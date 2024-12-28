import { Component, OnInit } from '@angular/core';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';

@Component({
  selector: 'app-compensaciones',
  templateUrl: './compensaciones.component.html'
})
export class CompensacionesComponent implements OnInit {
  legajo?: VLegajo;

  constructor(
    private legajoState: LegajoStateService
  ) {}

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
    });
  }
}
