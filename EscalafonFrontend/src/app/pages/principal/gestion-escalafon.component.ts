import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VLegajoService } from '../../services/v-legajo.service';
import { LegajoStateService } from '../../core/services/legajo-state.service';
import { VLegajo } from '../../interfaces/v-legajo';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gestion-escalafon',
  templateUrl: './gestion-escalafon.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class GestionEscalafonComponent implements OnInit {
  legajoActual?: VLegajo;
  isUserMenuOpen = false;
  userName = '';
  tieneAccesoMantenimiento = false;
  tieneAccesoAreaUsuaria = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vLegajoService: VLegajoService,
    private legajoState: LegajoStateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get user name from JWT
    this.userName = this.authService.getFullName();
    this.tieneAccesoMantenimiento = this.authService.hasPermission('mantenimiento');
    this.tieneAccesoAreaUsuaria = this.authService.hasPermission('area-usuaria');
    
    // Suscribirse al estado del legajo
    this.legajoState.getLegajo().subscribe(legajo => {
      this.legajoActual = legajo || undefined;
    });

    // Cargar el legajo inicial si estamos en una ruta de legajo
    this.cargarLegajoInicial();

    // Escuchar cambios en la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.actualizarLegajoActual();
    });
  }

  private cargarLegajoInicial() {
    const url = this.router.url;
    const matches = url.match(/\/legajo\/(\d+)/);
    if (matches && matches[1]) {
      const legajoId = parseInt(matches[1]);
      this.cargarDatosLegajo(legajoId);
    }
  }

  private actualizarLegajoActual() {
    const url = this.router.url;
    const matches = url.match(/\/legajo\/(\d+)/);
    if (matches && matches[1]) {
      const legajoId = parseInt(matches[1]);
      this.cargarDatosLegajo(legajoId);
    } else {
      this.legajoState.clearLegajo();
    }
  }

  private cargarDatosLegajo(id: number): void {
    console.log('Cargando legajo:', id);  // Debug
    this.vLegajoService.getById(id).subscribe({
      next: (legajo) => {
        console.log('Legajo cargado:', legajo);  // Debug
        this.legajoState.setLegajo(legajo);
      },
      error: (error) => {
        console.error('Error al cargar el legajo:', error);
        this.router.navigate(['/principal/inicio']);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isUserMenuOpen = false;
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  cerrarSesion(): void {
    this.authService.removeToken();
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error during logout:', error);
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
