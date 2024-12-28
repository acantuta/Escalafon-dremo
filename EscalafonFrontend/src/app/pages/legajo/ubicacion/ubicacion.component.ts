import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LegajoStateService } from '../../../core/services/legajo-state.service';
import { LegajoUbicacionService } from '../../../services/legajo-ubicacion.service';
import { VLegajo } from '../../../interfaces/v-legajo';
import { LegajoUbicacion } from '../../../interfaces/legajo-ubicacion';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  ubicacionForm: FormGroup;
  legajo?: VLegajo;
  ubicacionId?: number;

  constructor(
    private fb: FormBuilder,
    private legajoUbicacionService: LegajoUbicacionService,
    private legajoState: LegajoStateService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.ubicacionForm = this.fb.group({
      iLegId: [null],
      cLegUbiAmbiente: ['', Validators.required],
      cLegUbiEstante: ['', Validators.required],
      cLegUbiCaja: [''],
      cLegUbiSeccion1Folios: [''],
      cLegUbiSeccion2Folios: [''],
      cLegUbiSeccion3Folios: [''],
      cLegUbiSeccion4Folios: [''],
      cLegUbiSeccion5Folios: [''],
      cLegUbiSeccion6Folios: [''],
      cLegUbiSeccion7Folios: [''],
      cLegUbiSeccion8Folios: [''],
      cLegUbiSeccion9Folios: [''],
      cLegUbiSeccion10Folios: [''],
      cLegUbiSeccion11Folios: [''],
      cLegUbiSeccion12Folios: ['']
    });
  }

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe((legajo: VLegajo | null) => {
      if (legajo) {
        this.legajo = legajo;
        this.ubicacionForm.patchValue({
          iLegId: legajo.iLegId
        });
        this.cargarUbicacion();
      }
    });
  }

  private cargarUbicacion(): void {
    if (this.legajo?.iLegId) {
      this.legajoUbicacionService.getAll({
        campo: 'iLegId',
        valor: this.legajo.iLegId.toString()
      }).subscribe({
        next: (ubicaciones: LegajoUbicacion[]) => {
          if (ubicaciones && ubicaciones.length > 0) {
            const ubicacion = ubicaciones[0];
            this.ubicacionId = ubicacion.iLegUbiId;
            this.ubicacionForm.patchValue(ubicacion);
          }
        },
        error: (error: any) => {
          console.error('Error al cargar ubicación:', error);
        }
      });
    }
  }

  guardar(): void {
    if (this.ubicacionForm.valid) {
      const ubicacionData: LegajoUbicacion = this.ubicacionForm.value;

      const guardar$ = this.ubicacionId 
        ? this.legajoUbicacionService.update(this.ubicacionId, ubicacionData)
        : this.legajoUbicacionService.create(ubicacionData);

      guardar$.subscribe({
        next: (response: LegajoUbicacion) => {
          this.snackBar.open(
            this.ubicacionId ? 'Ubicación actualizada correctamente' : 'Ubicación creada correctamente',
            'Cerrar',
            { duration: 3000 }
          );
          if (!this.ubicacionId) {
            this.ubicacionId = response.iLegUbiId;
          }
        },
        error: (error: any) => {
          console.error('Error al guardar ubicación:', error);
          this.snackBar.open('Error al guardar la ubicación', 'Cerrar', {
            duration: 3000
          });
        }
      });
    } else {
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
    }
  }
}
