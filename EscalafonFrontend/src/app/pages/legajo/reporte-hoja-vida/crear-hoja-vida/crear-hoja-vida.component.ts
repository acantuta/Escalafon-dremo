import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HojaVidaService } from '../../../../services/hoja-vida.service';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { VLegajo } from '../../../../interfaces/v-legajo';
import { HojaVida } from '../../../../interfaces/hoja-vida';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-hoja-vida',
  templateUrl: './crear-hoja-vida.component.html',
  styleUrls: ['./crear-hoja-vida.component.css']
})
export class CrearHojaVidaComponent implements OnInit {
  hojaVidaForm: FormGroup;
  legajoActual: VLegajo | null = null;

  constructor(
    private fb: FormBuilder,
    private hojaVidaService: HojaVidaService,
    private snackBar: MatSnackBar,
    private legajoState: LegajoStateService,
    private http: HttpClient
  ) {
    this.hojaVidaForm = this.fb.group({
      cHojVidAnotaciones: [''],
      cHojVidNumeroExpediente: ['', Validators.required],
      cHojVidNombreSolicitante: ['', Validators.required],
      dHojVidFechaExpediente: [new Date(), Validators.required],
      dHojVidFechaGeneracion: [{ value: new Date(), disabled: true }]
    });
  }

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajoActual = legajo;
    });
  }

  limpiarFormulario(): void {
    this.hojaVidaForm.reset({
      dHojVidFechaExpediente: new Date(),
      dHojVidFechaGeneracion: new Date()
    });
  }

  async generarHojaVida(): Promise<void> {
    if (this.hojaVidaForm.valid) {
      if (!this.legajoActual?.iLegId) {
        this.snackBar.open('No hay un legajo seleccionado', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        return;
      }

      const formData = this.hojaVidaForm.value;
      
      try {
        const hojaVida: Omit<HojaVida, 'iHojVidId'> = {
          iLegId: this.legajoActual.iLegId,
          cHojVidNumeroExpediente: formData.cHojVidNumeroExpediente,
          cHojVidNombreSolicitante: formData.cHojVidNombreSolicitante,
          cHojVidAnotaciones: formData.cHojVidAnotaciones,
          dHojVidFechaExpediente: this.formatDate(formData.dHojVidFechaExpediente),
          dHojVidFechaGeneracion: this.formatDate(new Date())
        };

        const response = await firstValueFrom(
          this.http.post<{
            success: boolean;
            data: HojaVida & {
              uuid?: string;
              nombreArchivo?: string;
              pdf?: string;
            }
          }>('/hojas-vida', hojaVida)
        );
        
        this.snackBar.open('Hoja de vida generada exitosamente', 'Descargar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }).onAction().subscribe(() => {
          if (response.data?.uuid) {
            this.descargarPdf(response.data.uuid);
          }
        });

        this.limpiarFormulario();
      } catch (error) {
        this.snackBar.open('Error al generar la hoja de vida', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    }
  }

  async vistaPrevia(): Promise<void> {
    if (this.hojaVidaForm.valid) {
      if (!this.legajoActual?.iLegId) {
        this.snackBar.open('No hay un legajo seleccionado', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        return;
      }

      const formData = this.hojaVidaForm.value;
      
      try {
        const data = {
          iLegId: this.legajoActual.iLegId,
          cHojVidNumeroExpediente: formData.cHojVidNumeroExpediente,
          cHojVidNombreSolicitante: formData.cHojVidNombreSolicitante,
          cHojVidAnotaciones: formData.cHojVidAnotaciones,
          dHojVidFechaExpediente: this.formatDate(formData.dHojVidFechaExpediente),
          dHojVidFechaGeneracion: this.formatDate(new Date())
        };

        const response = await firstValueFrom(
          this.http.post<{ success: boolean; data: string }>('/hojas-vida/vista-previa', data)
        );
        
        if (response.success && response.data) {
          // Crear un Blob con el PDF
          const byteCharacters = atob(response.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          // Crear URL y abrir en nueva ventana
          const fileURL = URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        } else {
          throw new Error('Error al generar el PDF');
        }

      } catch (error) {
        this.snackBar.open('Error al generar la vista previa', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        console.error('Error en vista previa:', error);
      }
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  private formatDate(date: Date): Date {
    // Resetear la hora a medianoche UTC
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  private descargarPdf(uuid: string): void {
    const url = `/hojas-vida/descargar/${uuid}`;
    // Crear un enlace temporal y simular clic
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}