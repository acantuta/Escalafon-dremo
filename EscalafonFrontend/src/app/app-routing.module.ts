import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AperturaLegajoComponent } from './pages/apertura-legajo/apertura-legajo.component';
import { GestionEscalafonComponent } from './pages/principal/gestion-escalafon.component';
import { UbicacionLegajoComponent } from './pages/ubicacion-legajo/ubicacion-legajo.component';
import { LegajoComponent } from './pages/legajo/legajo.component';
import { InformacionPersonalComponent } from './pages/legajo/informacion-personal/informacion-personal.component';
import { IncorporacionComponent } from './pages/legajo/incorporacion/incorporacion.component';
import { FormacionAcademicaComponent } from './pages/legajo/formacion-academica/formacion-academica.component';
import { ExperienciaLaboralComponent } from './pages/legajo/experiencia-laboral/experiencia-laboral.component';
import { MovimientosPersonalComponent } from './pages/legajo/movimientos-personal/movimientos-personal.component';
import { CompensacionesComponent } from './pages/legajo/compensaciones/compensaciones.component';
import { EvaluacionDesempenoComponent } from './pages/legajo/evaluacion-desempeno/evaluacion-desempeno.component';
import { ReconocimientosSancionesComponent } from './pages/legajo/reconocimientos-sanciones/reconocimientos-sanciones.component';
import { RelacionesLaboralesComponent } from './pages/legajo/relaciones-laborales/relaciones-laborales.component';
import { SeguridadSaludTrabajoComponent } from './pages/legajo/seguridad-salud-trabajo/seguridad-salud-trabajo.component';
import { DesvinculacionComponent } from './pages/legajo/desvinculacion/desvinculacion.component';
import { OtrosEntidadComponent } from './pages/legajo/otros-entidad/otros-entidad.component';
import { ReporteHojaVidaComponent } from './pages/legajo/reporte-hoja-vida/reporte-hoja-vida.component';
import { PlaygroundComponent } from './playground/playground.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MantenimientoComponent } from './pages/mantenimiento/mantenimiento.component';
import { MenuMantenimientoComponent } from './pages/mantenimiento/menu-mantenimiento.component';
import { MantenimientoCondicionesSituacionesComponent } from './pages/mantenimiento/mantenimiento-condiciones-situaciones/mantenimiento-condiciones-situaciones.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MantenimientoTiposDocumentosComponent } from './pages/mantenimiento/mantenimiento-tipos-documentos/mantenimiento-tipos-documentos.component';
import { MantenimientoAccionesVinculacionesComponent } from './pages/mantenimiento/mantenimiento-acciones-vinculaciones/mantenimiento-acciones-vinculaciones.component';
import { MantenimientoAfpComponent } from './pages/mantenimiento/mantenimiento-afp/mantenimiento-afp.component';
import { MantenimientoMotivosCeseComponent } from './pages/mantenimiento/mantenimiento-motivos-cese/mantenimiento-motivos-cese.component';
import { MantenimientoAscensosAccionesComponent } from './pages/mantenimiento/mantenimiento-ascensos-acciones/mantenimiento-ascensos-acciones.component';
import { MantenimientoAscensosMotivosComponent } from './pages/mantenimiento/mantenimiento-ascensos-motivos/mantenimiento-ascensos-motivos.component';
import { MantenimientoCargosLaboralesComponent } from './pages/mantenimiento/mantenimiento-cargos-laborales/mantenimiento-cargos-laborales.component';
import { MantenimientoCategoriasRemunerativasComponent } from './pages/mantenimiento/mantenimiento-categorias-remunerativas/mantenimiento-categorias-remunerativas.component';
import { MantenimientoCentrosLaboralesComponent } from './pages/mantenimiento/mantenimiento-centros-laborales/mantenimiento-centros-laborales.component';
import { MantenimientoCesesAccionesComponent } from './pages/mantenimiento/mantenimiento-ceses-acciones/mantenimiento-ceses-acciones.component';
import { MantenimientoCesesMotivosComponent } from './pages/mantenimiento/mantenimiento-ceses-motivos/mantenimiento-ceses-motivos.component';
import { MantenimientoCompensacionesAccionesComponent } from './pages/mantenimiento/mantenimiento-compensaciones-acciones/mantenimiento-compensaciones-acciones.component';
import { MantenimientoCompensacionesMotivosComponent } from './pages/mantenimiento/mantenimiento-compensaciones-motivos/mantenimiento-compensaciones-motivos.component';
import { MantenimientoCompensacionesTiposFallecidosComponent } from './pages/mantenimiento/mantenimiento-compensaciones-tipos-fallecidos/mantenimiento-compensaciones-tipos-fallecidos.component';
import { MantenimientoCompensacionesTiposMonedasComponent } from './pages/mantenimiento/mantenimiento-compensaciones-tipos-monedas/mantenimiento-compensaciones-tipos-monedas.component';
import { MantenimientoCompensacionesTiposPagosComponent } from './pages/mantenimiento/mantenimiento-compensaciones-tipos-pagos/mantenimiento-compensaciones-tipos-pagos.component';
import { MantenimientoCondicionesLaboralesComponent } from './pages/mantenimiento/mantenimiento-condiciones-laborales/mantenimiento-condiciones-laborales.component';
import { MantenimientoDesplazamientosAccionesComponent } from './pages/mantenimiento/mantenimiento-desplazamientos-acciones/mantenimiento-desplazamientos-acciones.component';
import { MantenimientoDesplazamientosMotivosComponent } from './pages/mantenimiento/mantenimiento-desplazamientos-motivos/mantenimiento-desplazamientos-motivos.component';
import { MantenimientoDireccionesRegionalesComponent } from './pages/mantenimiento/mantenimiento-direcciones-regionales/mantenimiento-direcciones-regionales.component';
import { MantenimientoEducacionCarrerasComponent } from './pages/mantenimiento/mantenimiento-educacion-carreras/mantenimiento-educacion-carreras.component';
import { MantenimientoEducacionCentrosRegistrosComponent } from './pages/mantenimiento/mantenimiento-educacion-centros-registros/mantenimiento-educacion-centros-registros.component';
import { MantenimientoEducacionDocumentosAcreditacionesComponent } from './pages/mantenimiento/mantenimiento-educacion-documentos-acreditaciones/mantenimiento-educacion-documentos-acreditaciones.component';
import { MantenimientoEducacionGradosAlcanzadosComponent } from './pages/mantenimiento/mantenimiento-educacion-grados-alcanzados/mantenimiento-educacion-grados-alcanzados.component';
import { MantenimientoEducacionModalidadesComponent } from './pages/mantenimiento/mantenimiento-educacion-modalidades/mantenimiento-educacion-modalidades.component';
import { MantenimientoEducacionNivelesComponent } from './pages/mantenimiento/mantenimiento-educacion-niveles/mantenimiento-educacion-niveles.component';
import { MantenimientoEducacionProgramasComponent } from './pages/mantenimiento/mantenimiento-educacion-programas/mantenimiento-educacion-programas.component';
import { MantenimientoEducacionProgramasGeneralesComponent } from './pages/mantenimiento/mantenimiento-educacion-programas-generales/mantenimiento-educacion-programas-generales.component';
import { MantenimientoEducacionProgramasProfesionalesComponent } from './pages/mantenimiento/mantenimiento-educacion-programas-profesionales/mantenimiento-educacion-programas-profesionales.component';
import { MantenimientoEducacionSemestresComponent } from './pages/mantenimiento/mantenimiento-educacion-semestres/mantenimiento-educacion-semestres.component';
import { MantenimientoEducacionSituacionesComponent } from './pages/mantenimiento/mantenimiento-educacion-situaciones/mantenimiento-educacion-situaciones.component';
import { MantenimientoEducacionTiposCentrosComponent } from './pages/mantenimiento/mantenimiento-educacion-tipos-centros/mantenimiento-educacion-tipos-centros.component';
import { MantenimientoEducacionTiposEstudiosComponent } from './pages/mantenimiento/mantenimiento-educacion-tipos-estudios/mantenimiento-educacion-tipos-estudios.component';
import { MantenimientoEducacionTiposParticipacionesComponent } from './pages/mantenimiento/mantenimiento-educacion-tipos-participaciones/mantenimiento-educacion-tipos-participaciones.component';
import { MantenimientoEducacionTiposSecundariasComponent } from './pages/mantenimiento/mantenimiento-educacion-tipos-secundarias/mantenimiento-educacion-tipos-secundarias.component';
import { MantenimientoEducacionTiposSuperioresComponent } from './pages/mantenimiento/mantenimiento-educacion-tipos-superiores/mantenimiento-educacion-tipos-superiores.component';
import { MantenimientoEscalasCategoriasComponent } from './pages/mantenimiento/mantenimiento-escalas-categorias/mantenimiento-escalas-categorias.component';
import { MantenimientoEvaluacionesAccionesComponent } from './pages/mantenimiento/mantenimiento-evaluaciones-acciones/mantenimiento-evaluaciones-acciones.component';
import { MantenimientoEvaluacionesMotivosComponent } from './pages/mantenimiento/mantenimiento-evaluaciones-motivos/mantenimiento-evaluaciones-motivos.component';
import { MantenimientoExperienciasSectoresComponent } from './pages/mantenimiento/mantenimiento-experiencias-sectores/mantenimiento-experiencias-sectores.component';
import { MantenimientoGruposOcupacionalesComponent } from './pages/mantenimiento/mantenimiento-grupos-ocupacionales/mantenimiento-grupos-ocupacionales.component';
import { MantenimientoIncorporacionTiposDocumentosComponent } from './pages/mantenimiento/mantenimiento-incorporacion-tipos-documentos/mantenimiento-incorporacion-tipos-documentos.component';
import { MantenimientoInfopefamiliarDeclaracionesJuradasTiposDocumentosComponent } from './pages/mantenimiento/mantenimiento-infopefamiliar-declaraciones-juradas-tipos-documentos/mantenimiento-infopefamiliar-declaraciones-juradas-tipos-documentos.component';
import { MantenimientoInfopefamiliarParentescosComponent } from './pages/mantenimiento/mantenimiento-infopefamiliar-parentescos/mantenimiento-infopefamiliar-parentescos.component';
import { MantenimientoInstanciasGestionComponent } from './pages/mantenimiento/mantenimiento-instancias-gestion/mantenimiento-instancias-gestion.component';
import { MantenimientoJornadasLaboralesComponent } from './pages/mantenimiento/mantenimiento-jornadas-laborales/mantenimiento-jornadas-laborales.component';
import { MantenimientoModalidadesEducativasComponent } from './pages/mantenimiento/mantenimiento-modalidades-educativas/mantenimiento-modalidades-educativas.component';
import { MantenimientoMotivosVinculacionesComponent } from './pages/mantenimiento/mantenimiento-motivos-vinculaciones/mantenimiento-motivos-vinculaciones.component';
import { MantenimientoMovimientosAccionesComponent } from './pages/mantenimiento/mantenimiento-movimientos-acciones/mantenimiento-movimientos-acciones.component';
import { MantenimientoMovimientosMotivosRegimenesComponent } from './pages/mantenimiento/mantenimiento-movimientos-motivos-regimenes/mantenimiento-movimientos-motivos-regimenes.component';
import { MantenimientoMovimientosMotivosComponent } from './pages/mantenimiento/mantenimiento-movimientos-motivos/mantenimiento-movimientos-motivos.component';
import { MantenimientoNivelesEducativosComponent } from './pages/mantenimiento/mantenimiento-niveles-educativos/mantenimiento-niveles-educativos.component';
import { MantenimientoReconocimientosMeritosComponent } from './pages/mantenimiento/mantenimiento-reconocimientos-meritos/mantenimiento-reconocimientos-meritos.component';
import { MantenimientoReconocimientosTiposComponent } from './pages/mantenimiento/mantenimiento-reconocimientos-tipos/mantenimiento-reconocimientos-tipos.component';
import { MantenimientoRegimenesLaboralesComponent } from './pages/mantenimiento/mantenimiento-regimenes-laborales/mantenimiento-regimenes-laborales.component';
import { MantenimientoRegimenesPensionariosComponent } from './pages/mantenimiento/mantenimiento-regimenes-pensionarios/mantenimiento-regimenes-pensionarios.component';
import { MantenimientoSituacionesLaboralesComponent } from './pages/mantenimiento/mantenimiento-situaciones-laborales/mantenimiento-situaciones-laborales.component';
import { MantenimientoTipoDireccionesComponent } from './pages/mantenimiento/mantenimiento-tipo-direcciones/mantenimiento-tipo-direcciones.component';
import { MantenimientoTipoViasComponent } from './pages/mantenimiento/mantenimiento-tipo-vias/mantenimiento-tipo-vias.component';
import { MantenimientoTiposAperturaComponent } from './pages/mantenimiento/mantenimiento-tipos-apertura/mantenimiento-tipos-apertura.component';
import { MantenimientoTiposBeneficiariosComponent } from './pages/mantenimiento/mantenimiento-tipos-beneficiarios/mantenimiento-tipos-beneficiarios.component';
import { MantenimientoTiposComisionesComponent } from './pages/mantenimiento/mantenimiento-tipos-comisiones/mantenimiento-tipos-comisiones.component';
import { MantenimientoTiposDocumentosIdentificacionesComponent } from './pages/mantenimiento/mantenimiento-tipos-documentos-identificaciones/mantenimiento-tipos-documentos-identificaciones.component';
import { MantenimientoTiposRetencionesComponent } from './pages/mantenimiento/mantenimiento-tipos-retenciones/mantenimiento-tipos-retenciones.component';
import { MantenimientoTiposSancionesComponent } from './pages/mantenimiento/mantenimiento-tipos-sanciones/mantenimiento-tipos-sanciones.component';
import { MantenimientoTiposServidoresComponent } from './pages/mantenimiento/mantenimiento-tipos-servidores/mantenimiento-tipos-servidores.component';
import { MantenimientoZonasComponent } from './pages/mantenimiento/mantenimiento-zonas/mantenimiento-zonas.component';
import { EdicionComponent } from './pages/legajo/edicion/edicion.component';
import { UbicacionComponent } from './pages/legajo/ubicacion/ubicacion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { 
    path: 'principal',
    component: GestionEscalafonComponent,
    canActivate: [authGuard],
    children: [
    { path: 'inicio', component: InicioComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'legajo/apertura', component: AperturaLegajoComponent},
    { path: 'legajo/edicion/:id', component: EdicionComponent },
    { path: 'legajo', component: LegajoComponent, children: [
        { path: ':id/informacion-personal', component: InformacionPersonalComponent },
          { path: ':id/incorporacion', component: IncorporacionComponent },
          { path: ':id/formacion-academica', component: FormacionAcademicaComponent },
          { path: ':id/experiencia-laboral', component: ExperienciaLaboralComponent },
          { path: ':id/movimientos-personal', component: MovimientosPersonalComponent },
          { path: ':id/compensaciones', component: CompensacionesComponent },
          { path: ':id/evaluacion-desempeno', component: EvaluacionDesempenoComponent },
          { path: ':id/reconocimientos-sanciones', component: ReconocimientosSancionesComponent },
          { path: ':id/relaciones-laborales', component: RelacionesLaboralesComponent },
          { path: ':id/seguridad-salud-trabajo', component: SeguridadSaludTrabajoComponent },
          { path: ':id/desvinculacion', component: DesvinculacionComponent },
          { path: ':id/otros-entidad', component: OtrosEntidadComponent },
          { path: ':id/reporte-hoja-vida', component: ReporteHojaVidaComponent },
          { path: ':id/ubicacion', component: UbicacionComponent },
          { path: ':id', redirectTo: ':id/informacion-personal' },
    ]},
    { 
      path: 'mantenimiento',
      component: MantenimientoComponent,
      children: [
        { path: '', component: MenuMantenimientoComponent },
        { path: 'condiciones-situaciones', component: MantenimientoCondicionesSituacionesComponent },
        { path: 'tipos-documentos', component: MantenimientoTiposDocumentosComponent },
        { path: 'acciones-vinculaciones', component: MantenimientoAccionesVinculacionesComponent },
        { path: 'afp', component: MantenimientoAfpComponent },
        { path: 'motivos-cese', component: MantenimientoMotivosCeseComponent },
        { path: 'ascensos-acciones', component: MantenimientoAscensosAccionesComponent },
        { path: 'ascensos-motivos', component: MantenimientoAscensosMotivosComponent },
        { path: 'cargos-laborales', component: MantenimientoCargosLaboralesComponent },
        { path: 'categorias-remunerativas', component: MantenimientoCategoriasRemunerativasComponent },
        { path: 'centros-laborales', component: MantenimientoCentrosLaboralesComponent },
        { path: 'ceses-acciones', component: MantenimientoCesesAccionesComponent },
        { path: 'ceses-motivos', component: MantenimientoCesesMotivosComponent },
        { path: 'compensaciones-acciones', component: MantenimientoCompensacionesAccionesComponent },
        { path: 'compensaciones-motivos', component: MantenimientoCompensacionesMotivosComponent },
        { path: 'compensaciones-tipos-fallecidos', component: MantenimientoCompensacionesTiposFallecidosComponent },
        { path: 'compensaciones-tipos-monedas', component: MantenimientoCompensacionesTiposMonedasComponent },
        { path: 'compensaciones-tipos-pagos', component: MantenimientoCompensacionesTiposPagosComponent },
        { path: 'condiciones-laborales', component: MantenimientoCondicionesLaboralesComponent },
        { path: 'desplazamientos-acciones', component: MantenimientoDesplazamientosAccionesComponent },
        { path: 'desplazamientos-motivos', component: MantenimientoDesplazamientosMotivosComponent },
        { path: 'direcciones-regionales', component: MantenimientoDireccionesRegionalesComponent },
        { path: 'educacion-carreras', component: MantenimientoEducacionCarrerasComponent },
        { path: 'educacion-centros-registros', component: MantenimientoEducacionCentrosRegistrosComponent },
        { path: 'educacion-documentos-acreditaciones', component: MantenimientoEducacionDocumentosAcreditacionesComponent },
        { path: 'educacion-grados-alcanzados', component: MantenimientoEducacionGradosAlcanzadosComponent },
        { path: 'educacion-modalidades', component: MantenimientoEducacionModalidadesComponent },
        { path: 'educacion-niveles', component: MantenimientoEducacionNivelesComponent },
        { path: 'educacion-programas', component: MantenimientoEducacionProgramasComponent },
        { path: 'educacion-programas-generales', component: MantenimientoEducacionProgramasGeneralesComponent },
        { path: 'educacion-programas-profesionales', component: MantenimientoEducacionProgramasProfesionalesComponent },
        { path: 'educacion-semestres', component: MantenimientoEducacionSemestresComponent },
        { path: 'educacion-situaciones', component: MantenimientoEducacionSituacionesComponent },
        { path: 'educacion-tipos-centros', component: MantenimientoEducacionTiposCentrosComponent },
        { path: 'educacion-tipos-estudios', component: MantenimientoEducacionTiposEstudiosComponent },
        { path: 'educacion-tipos-participaciones', component: MantenimientoEducacionTiposParticipacionesComponent },
        { path: 'educacion-tipos-secundarias', component: MantenimientoEducacionTiposSecundariasComponent },
        { path: 'educacion-tipos-superiores', component: MantenimientoEducacionTiposSuperioresComponent },
        { path: 'escalas-categorias', component: MantenimientoEscalasCategoriasComponent },
        { path: 'evaluaciones-acciones', component: MantenimientoEvaluacionesAccionesComponent },
        { path: 'evaluaciones-motivos', component: MantenimientoEvaluacionesMotivosComponent },
        { path: 'experiencias-sectores', component: MantenimientoExperienciasSectoresComponent },
        { path: 'grupos-ocupacionales', component: MantenimientoGruposOcupacionalesComponent },
        { path: 'incorporacion-tipos-documentos', component: MantenimientoIncorporacionTiposDocumentosComponent },
        { path: 'infopefamiliar-declaraciones-juradas-tipos-documentos', component: MantenimientoInfopefamiliarDeclaracionesJuradasTiposDocumentosComponent },
        { path: 'infopefamiliar-parentescos', component: MantenimientoInfopefamiliarParentescosComponent },
        { path: 'instancias-gestion', component: MantenimientoInstanciasGestionComponent },
        { path: 'jornadas-laborales', component: MantenimientoJornadasLaboralesComponent },
        { path: 'modalidades-educativas', component: MantenimientoModalidadesEducativasComponent },
        { path: 'motivos-vinculaciones', component: MantenimientoMotivosVinculacionesComponent },
        { path: 'movimientos-acciones', component: MantenimientoMovimientosAccionesComponent },
        { path: 'movimientos-motivos-regimenes', component: MantenimientoMovimientosMotivosRegimenesComponent },
        { path: 'movimientos-motivos', component: MantenimientoMovimientosMotivosComponent },
        { path: 'niveles-educativos', component: MantenimientoNivelesEducativosComponent },
        { path: 'reconocimientos-meritos', component: MantenimientoReconocimientosMeritosComponent },
        { path: 'reconocimientos-tipos', component: MantenimientoReconocimientosTiposComponent },
        { path: 'regimenes-laborales', component: MantenimientoRegimenesLaboralesComponent },
        { path: 'regimenes-pensionarios', component: MantenimientoRegimenesPensionariosComponent },
        { path: 'situaciones-laborales', component: MantenimientoSituacionesLaboralesComponent },
        { path: 'tipo-direcciones', component: MantenimientoTipoDireccionesComponent },
        { path: 'tipo-vias', component: MantenimientoTipoViasComponent },
        { path: 'tipos-apertura', component: MantenimientoTiposAperturaComponent },
        { path: 'tipos-beneficiarios', component: MantenimientoTiposBeneficiariosComponent },
        { path: 'tipos-comisiones', component: MantenimientoTiposComisionesComponent },
        { path: 'tipos-documentos-identificaciones', component: MantenimientoTiposDocumentosIdentificacionesComponent },
        { path: 'tipos-retenciones', component: MantenimientoTiposRetencionesComponent },
        { path: 'tipos-sanciones', component: MantenimientoTiposSancionesComponent },
        { path: 'tipos-servidores', component: MantenimientoTiposServidoresComponent },
        { path: 'zonas', component: MantenimientoZonasComponent },
        { path: '**', redirectTo: '' }
      ]
    },
    { path: '**', redirectTo: 'inicio'},
  ]},
  { path: 'playground', component: PlaygroundComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule],
  exports: [RouterModule]
})export class AppRoutingModule { }

//, canActivate: [authGuard]