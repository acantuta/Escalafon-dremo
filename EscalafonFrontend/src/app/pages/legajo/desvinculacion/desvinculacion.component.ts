import { Component, OnInit } from '@angular/core';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';

@Component({
  selector: 'app-desvinculacion',
  templateUrl: './desvinculacion.component.html'
})
export class DesvinculacionComponent implements OnInit {
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
