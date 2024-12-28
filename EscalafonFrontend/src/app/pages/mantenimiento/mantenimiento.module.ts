import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MantenimientoComponent } from './mantenimiento.component';
import { MenuMantenimientoComponent } from './menu-mantenimiento.component';
import { CondicionesSituacionesComponent } from './mantenimiento-condiciones-situaciones/mantenimiento-condiciones-situaciones.component';
import { MantenimientoDinamicoComponent } from '../../components/mantenimiento-dinamico/mantenimiento-dinamico.component';

@NgModule({
  declarations: [
    MantenimientoComponent,
    MenuMantenimientoComponent,
    CondicionesSituacionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MantenimientoDinamicoComponent
  ],
  exports: [
    MantenimientoComponent,
    MenuMantenimientoComponent,
    CondicionesSituacionesComponent
  ]
})
export class MantenimientoModule { } 