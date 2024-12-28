import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-mantenimiento',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <div class="menu-mantenimiento">
      <h2>Mantenimientos del Sistema</h2>
      
      <mat-nav-list>

        <!-- GENERAL -->
        <mat-list-item (click)="navegarA('condiciones-situaciones')">
          <mat-icon matListItemIcon>assignment</mat-icon>
          <span matListItemTitle>General / Condiciones Situaciones Laborales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipos-documentos')">
          <mat-icon matListItemIcon>description</mat-icon>
          <span matListItemTitle>General / Tipos de Documentos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('cargos-laborales')">
          <mat-icon matListItemIcon>work</mat-icon>
          <span matListItemTitle>General / Cargos Laborales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('categorias-remunerativas')">
          <mat-icon matListItemIcon>monetization_on</mat-icon>
          <span matListItemTitle>General / Categorías Remunerativas</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('centros-laborales')">
          <mat-icon matListItemIcon>business</mat-icon>
          <span matListItemTitle>General / Centros Laborales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('condiciones-laborales')">
          <mat-icon matListItemIcon>work</mat-icon>
          <span matListItemTitle>General / Condiciones Laborales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('direcciones-regionales')">
          <mat-icon matListItemIcon>location_city</mat-icon>
          <span matListItemTitle>General / Direcciones Regionales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('escalas-categorias')">
          <mat-icon matListItemIcon>category</mat-icon>
          <span matListItemTitle>General / Escalas de Categorías</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('grupos-ocupacionales')">
          <mat-icon matListItemIcon>group_work</mat-icon>
          <span matListItemTitle>General / Grupos Ocupacionales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('instancias-gestion')">
          <mat-icon matListItemIcon>account_balance</mat-icon>
          <span matListItemTitle>General / Instancias de Gestión Educativa</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('jornadas-laborales')">
          <mat-icon matListItemIcon>schedule</mat-icon>
          <span matListItemTitle>General / Jornadas Laborales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('niveles-educativos')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>General / Niveles Educativos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('regimenes-laborales')">
          <mat-icon matListItemIcon>work</mat-icon>
          <span matListItemTitle>General / Regímenes Laborales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('regimenes-pensionarios')">
          <mat-icon matListItemIcon>account_balance</mat-icon>
          <span matListItemTitle>General / Regímenes Pensionarios</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('situaciones-laborales')">
          <mat-icon matListItemIcon>work</mat-icon>
          <span matListItemTitle>General / Situaciones Laborales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipos-beneficiarios')">
          <mat-icon matListItemIcon>people</mat-icon>
          <span matListItemTitle>General / Tipos de Beneficiarios</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipos-comisiones')">
          <mat-icon matListItemIcon>account_balance</mat-icon>
          <span matListItemTitle>General / Tipos de Comisiones Pensionarias</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipos-documentos-identificaciones')">
          <mat-icon matListItemIcon>badge</mat-icon>
          <span matListItemTitle>General / Tipos de Documentos de Identificación</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipos-retenciones')">
          <mat-icon matListItemIcon>money_off</mat-icon>
          <span matListItemTitle>General / Tipos de Retenciones</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipos-servidores')">
          <mat-icon matListItemIcon>person</mat-icon>
          <span matListItemTitle>General / Tipos de Servidores</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipo-direcciones')">
          <mat-icon matListItemIcon>location_on</mat-icon>
          <span matListItemTitle>General / Tipos de Direcciones</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipo-vias')">
          <mat-icon matListItemIcon>add_road</mat-icon>
          <span matListItemTitle>General / Tipos de Vías</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('zonas')">
          <mat-icon matListItemIcon>place</mat-icon>
          <span matListItemTitle>General / Zonas</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('modalidades-educativas')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>General / Modalidades Educativas</span>
        </mat-list-item>
        
        <!-- 1. INFORMACIÓN PERSONAL Y FAMILIAR -->
        <mat-list-item (click)="navegarA('infopefamiliar-declaraciones-juradas-tipos-documentos')">
          <mat-icon matListItemIcon>description</mat-icon>
          <span matListItemTitle>1. Información Personal y Familiar / Declaraciones Juradas / Tipos de Documentos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('infopefamiliar-parentescos')">
          <mat-icon matListItemIcon>family_restroom</mat-icon>
          <span matListItemTitle>1. Información Personal y Familiar / Parentescos</span>
        </mat-list-item>

        <!-- 2. INCORPORACIÓN -->
        <mat-list-item (click)="navegarA('acciones-vinculaciones')">
          <mat-icon matListItemIcon>link</mat-icon>
          <span matListItemTitle>2. Incorporación / Acciones de Vinculación</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('motivos-vinculaciones')">
          <mat-icon matListItemIcon>link</mat-icon>
          <span matListItemTitle>2. Incorporación / Motivos de Vinculación</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipos-apertura')">
          <mat-icon matListItemIcon>folder_open</mat-icon>
          <span matListItemTitle>2. Incorporación / Tipos de Apertura de Legajos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('incorporacion-tipos-documentos')">
          <mat-icon matListItemIcon>description</mat-icon>
          <span matListItemTitle>2. Incorporación / Tipos de Documentos</span>
        </mat-list-item>

        <!-- 3. FORMACIÓN ACADÉMICA -->
        <mat-list-item (click)="navegarA('educacion-carreras')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Carreras</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-centros-registros')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Centros de Registro</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-documentos-acreditaciones')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Documentos de Acreditación</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-grados-alcanzados')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Grados Alcanzados</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-modalidades')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Modalidades</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-niveles')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Niveles Educativos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-programas')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Programas</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-programas-generales')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Programas Generales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-programas-profesionales')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Programas Profesionales</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-semestres')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Semestres</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-situaciones')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Situaciones Académicas</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-tipos-centros')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Tipos de Centros</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-tipos-estudios')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Tipos de Estudios</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-tipos-participaciones')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Tipos de Participaciones</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-tipos-secundarias')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Tipos de Secundarias</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('educacion-tipos-superiores')">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>3. Formación Académica / Tipos de Superiores</span>
        </mat-list-item>

        <!-- 4. EXPERIENCIA LABORAL -->
        <mat-list-item (click)="navegarA('experiencias-sectores')">
          <mat-icon matListItemIcon>work</mat-icon>
          <span matListItemTitle>4. Experiencia Laboral / Sectores</span>
        </mat-list-item>

        <!-- 5. MOVIMIENTOS DEL PERSONAL -->
        <mat-list-item (click)="navegarA('desplazamientos-acciones')">
          <mat-icon matListItemIcon>transfer_within_a_station</mat-icon>
          <span matListItemTitle>5. Movimientos del Personal / Acciones de Desplazamiento</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('desplazamientos-motivos')">
          <mat-icon matListItemIcon>transfer_within_a_station</mat-icon>
          <span matListItemTitle>5. Movimientos del Personal / Motivos de Desplazamiento</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('movimientos-acciones')">
          <mat-icon matListItemIcon>swap_horiz</mat-icon>
          <span matListItemTitle>5. Movimientos del Personal / Acciones</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('movimientos-motivos')">
          <mat-icon matListItemIcon>swap_horiz</mat-icon>
          <span matListItemTitle>5. Movimientos del Personal / Motivos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('movimientos-motivos-regimenes')">
          <mat-icon matListItemIcon>swap_horiz</mat-icon>
          <span matListItemTitle>5. Movimientos del Personal / Motivos por Régimen</span>
        </mat-list-item>

        <!-- 6. COMPENSACIONES -->
        <mat-list-item (click)="navegarA('compensaciones-acciones')">
          <mat-icon matListItemIcon>payments</mat-icon>
          <span matListItemTitle>6. Compensaciones / Acciones de Compensación</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('compensaciones-motivos')">
          <mat-icon matListItemIcon>payments</mat-icon>
          <span matListItemTitle>6. Compensaciones / Motivos de Compensación</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('compensaciones-tipos-fallecidos')">
          <mat-icon matListItemIcon>payments</mat-icon>
          <span matListItemTitle>6. Compensaciones / Tipos de Fallecidos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('compensaciones-tipos-monedas')">
          <mat-icon matListItemIcon>payments</mat-icon>
          <span matListItemTitle>6. Compensaciones / Tipos de Monedas</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('compensaciones-tipos-pagos')">
          <mat-icon matListItemIcon>payments</mat-icon>
          <span matListItemTitle>6. Compensaciones / Tipos de Pagos</span>
        </mat-list-item>

        <!-- 7. EVALUACIÓN DEL DESEMPEÑO -->
        <mat-list-item (click)="navegarA('evaluaciones-acciones')">
          <mat-icon matListItemIcon>assessment</mat-icon>
          <span matListItemTitle>7. Evaluación del Desempeño / Acciones</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('evaluaciones-motivos')">
          <mat-icon matListItemIcon>assessment</mat-icon>
          <span matListItemTitle>7. Evaluación del Desempeño / Motivos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('ascensos-acciones')">
          <mat-icon matListItemIcon>trending_up</mat-icon>
          <span matListItemTitle>7. Evaluación de Desempeño / Acciones de Ascenso</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('ascensos-motivos')">
          <mat-icon matListItemIcon>trending_up</mat-icon>
          <span matListItemTitle>7. Evaluación de Desempeño / Motivos de Ascenso</span>
        </mat-list-item>

        <!-- 8. RECONOCIMIENTOS Y SANCIONES -->
        <mat-list-item (click)="navegarA('reconocimientos-meritos')">
          <mat-icon matListItemIcon>military_tech</mat-icon>
          <span matListItemTitle>8. Reconocimientos y Sanciones / Reconocimientos méritos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('reconocimientos-tipos')">
          <mat-icon matListItemIcon>military_tech</mat-icon>
          <span matListItemTitle>8. Reconocimientos y Sanciones / Tipos de Reconocimientos</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('tipos-sanciones')">
          <mat-icon matListItemIcon>gavel</mat-icon>
          <span matListItemTitle>8. Reconocimientos y Sanciones / Tipos de Sanciones</span>
        </mat-list-item>

        <!-- 11. DESVINCULACIÓN -->
        <mat-list-item (click)="navegarA('afp')">
          <mat-icon matListItemIcon>account_balance</mat-icon>
          <span matListItemTitle>11. Desvinculación / Administradoras de Fondos de Pensiones</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('motivos-cese')">
          <mat-icon matListItemIcon>exit_to_app</mat-icon>
          <span matListItemTitle>11. Desvinculación / Motivos de Cese</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('ceses-acciones')">
          <mat-icon matListItemIcon>exit_to_app</mat-icon>
          <span matListItemTitle>11. Desvinculación / Acciones de Cese</span>
        </mat-list-item>

        <mat-list-item (click)="navegarA('ceses-motivos')">
          <mat-icon matListItemIcon>exit_to_app</mat-icon>
          <span matListItemTitle>11. Desvinculación / Motivos de Acciones de Cese</span>
        </mat-list-item>

      </mat-nav-list>
    </div>
  `,
  styles: [`
    .menu-mantenimiento {
      padding: 20px;
    }
    mat-list-item {
      cursor: pointer;
      margin: 8px 0;
    }
    mat-list-item:hover {
      background: rgba(0,0,0,0.04);
    }
  `]
})
export class MenuMantenimientoComponent {
  constructor(private router: Router) {}

  navegarA(ruta: string) {
    this.router.navigate(['/principal/mantenimiento', ruta]);
  }
}
