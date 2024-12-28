import { Component, OnInit } from '@angular/core';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';

@Component({
  selector: 'app-evaluacion-desempeno',
  templateUrl: './evaluacion-desempeno.component.html'
})
export class EvaluacionDesempenoComponent implements OnInit {
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
