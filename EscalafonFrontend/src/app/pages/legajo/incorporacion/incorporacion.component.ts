import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncorporacionDocumentoService } from '../../../services/incorporacion-documento.service';
import { IncorporacionTipoDocumentoService } from '../../../services/incorporacion-tipo-documento.service';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { VLegajo } from '../../../interfaces/v-legajo';

@Component({
  selector: 'app-incorporacion',
  templateUrl: './incorporacion.component.html'
})
export class IncorporacionComponent implements OnInit {
  legajo?: VLegajo;

  constructor(
    private router: Router,
    private incorporacionDocumentoService: IncorporacionDocumentoService,
    private incorporacionTipoDocumentoService: IncorporacionTipoDocumentoService,
    private legajoState: LegajoStateService
  ) {}

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
    });
  }

  onRetornar(): void {
    this.router.navigate(['/principal/inicio']);
  }

  onLimpiar(): void {
    // Implementar lógica de limpieza
  }

  onGuardar(): void {
    alert('Guardando información...');
  }
}