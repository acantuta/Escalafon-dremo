import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HojaVidaService } from '../../../../services/hoja-vida.service';
import { HojaVida } from '../../../../interfaces/hoja-vida';
import { LegajoStateService } from '../../../../core/services/legajo-state.service';
import { VLegajo } from '../../../../interfaces/v-legajo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-historial-hoja-vida',
  templateUrl: './historial-hoja-vida.component.html',
  styleUrls: ['./historial-hoja-vida.component.css']
})
export class HistorialHojaVidaComponent implements OnInit {
  displayedColumns: string[] = ['index', 'numero', 'usuarioCreacion', 'fechaCreacion', 'exportarInforme'];
  dataSource = new MatTableDataSource<HojaVida>([]);
  legajoActual: VLegajo | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private hojaVidaService: HojaVidaService,
    private legajoState: LegajoStateService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajoActual = legajo;
      if (legajo?.iLegId) {
        this.cargarHistorial();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onActivate() {
    if (this.legajoActual?.iLegId) {
      this.cargarHistorial();
    }
  }

  cargarHistorial(): void {
    if (!this.legajoActual?.iLegId) {
      this.snackBar.open('No hay un legajo seleccionado', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }

    this.hojaVidaService.getAll({
      campo: 'iLegId',
      valor: this.legajoActual.iLegId.toString()
    }).subscribe({
      next: (hojas) => {
        this.dataSource.data = hojas;
      },
      error: (error) => {
        this.snackBar.open('Error al cargar el historial', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }

  descargarHojaVida(hojaVida: HojaVida): void {
    if (hojaVida.iHojVidId) {
      this.hojaVidaService.getById(hojaVida.iHojVidId).subscribe({
        next: (response) => {
          // Aquí puedes implementar la lógica de descarga
          console.log('Descargando hoja de vida:', response);
        },
        error: (error) => {
          this.snackBar.open('Error al descargar la hoja de vida', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }

  async descargarPdf(uuid: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ success: boolean; data: string }>(`/hojas-vida/descargar/${uuid}`)
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
        throw new Error('Error al descargar el PDF');
      }

    } catch (error) {
      this.snackBar.open('Error al descargar el PDF', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      console.error('Error en descarga:', error);
    }
  }
} 