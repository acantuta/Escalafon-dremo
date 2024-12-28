import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LegajoStateService } from '../../core/services/legajo-state.service';
import { VLegajo } from '../../interfaces/v-legajo';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-legajo',
  templateUrl: './legajo.component.html',
  styleUrls: ['./legajo.component.css']
})
export class LegajoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile: boolean = false;
  legajo?: VLegajo;
  private subscriptions: Subscription[] = [];

  menuItems = [
    { 
      route: 'informacion-personal', 
      text: '01: Información personal y familiar', 
      icon: 'person',
      description: 'Gestión de datos personales'
    },
    { route: 'incorporacion', text: '02: Incorporación (selección, vinculación, inducción, periodo de prueba)', icon: 'how_to_reg' },
    { route: 'formacion-academica', text: '03: Formación Académica y Capacitación', icon: 'school' },
    { route: 'experiencia-laboral', text: '04: Experiencia Laboral', icon: 'work' },
    { route: 'movimientos-personal', text: '05: Movimientos del Personal', icon: 'transfer_within_a_station' },
    { route: 'compensaciones', text: '06: Compensaciones', icon: 'payments' },
    { route: 'evaluacion-desempeno', text: '07: Evaluación de Desempeño, Progresión en la Carrera y Desplazamiento', icon: 'trending_up' },
    { route: 'reconocimientos-sanciones', text: '08: Reconocimientos y Sanciones Disciplinarias', icon: 'stars' },
    { route: 'relaciones-laborales', text: '09: Relaciones Laborales Individuales y Colectivas', icon: 'groups' },
    { route: 'seguridad-salud-trabajo', text: '10: Seguridad y Salud en el Trabajo Bienestar Social', icon: 'health_and_safety' },
    { route: 'desvinculacion', text: '11: Desvinculación', icon: 'person_remove' },
    { route: 'otros-entidad', text: '12: Otros que considere la entidad', icon: 'more' },
    { route: 'reporte-hoja-vida', text: 'Reporte de hoja de vida', icon: 'description' },
    { route: 'ubicacion', text: 'Ubicación física del legajo', icon: 'folder' }
  ];

  constructor(
    private legajoState: LegajoStateService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    // Suscripción al estado del legajo
    const legajoSub = this.legajoState.getLegajo().subscribe(legajo => {
      this.legajo = legajo || undefined;
    });
    this.subscriptions.push(legajoSub);
  }

  ngAfterViewInit() {
    // Mover la suscripción del breakpoint aquí y agregar delay
    const breakpointSub = this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(delay(1)) // Pequeño delay para asegurar que el sidenav esté listo
      .subscribe(result => {
        this.isMobile = result.matches;
        
        if (this.sidenav) {
          if (this.isMobile) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });
    this.subscriptions.push(breakpointSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}
