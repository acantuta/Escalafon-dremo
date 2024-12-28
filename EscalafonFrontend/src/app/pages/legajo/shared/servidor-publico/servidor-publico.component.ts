import { Component, OnInit } from '@angular/core';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { VLegajo } from '../../../../interfaces/v-legajo';

@Component({
  selector: 'app-servidor-publico',
  templateUrl: './servidor-publico.component.html',
  styleUrls: ['./servidor-publico.component.css']
})
export class ServidorPublicoComponent implements OnInit {
  legajo: VLegajo | null = null;

  constructor(private legajoStateService: LegajoStateService) {}

  ngOnInit(): void {
    this.legajoStateService.getLegajo().subscribe(legajo => {
      this.legajo = legajo;
    });
  }
}
