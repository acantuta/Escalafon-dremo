import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AperturaLegajoComponent } from './pages/apertura-legajo/apertura-legajo.component';
import { GestionEscalafonComponent } from './pages/principal/gestion-escalafon.component';
import { UbicacionLegajoComponent } from './pages/ubicacion-legajo/ubicacion-legajo.component';
import { LegajoComponent } from './pages/legajo/legajo.component';
import { ServidorPublicoComponent } from './pages/legajo/shared/servidor-publico/servidor-publico.component';
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
import { FileUploadComponent } from './pages/common/file-upload/file-upload.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MantenimientoComponent } from './pages/mantenimiento/mantenimiento.component';
import { CentrosTrabajoComponent } from './components/centros-trabajo/centros-trabajo.component';
import { SpanishPaginatorIntl } from './core/i18n/spanish-paginator';
import { BuscarCentroLaboralDialogComponent } from './components/buscar-centro-laboral-dialog/buscar-centro-laboral-dialog.component';
import { DatosDomiciliariosComponent } from './pages/legajo/informacion-personal/datos-domiciliarios/datos-domiciliarios.component';
import { DatosFamiliaresComponent } from './pages/legajo/informacion-personal/datos-familiares/datos-familiares.component';
import { AcreditacionLenguaComponent } from './pages/legajo/informacion-personal/acreditacion-lengua/acreditacion-lengua.component';
import { DeclaracionJuradaComponent } from './pages/legajo/informacion-personal/declaracion-jurada/declaracion-jurada.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-PE';
import { FormalizacionVinculoComponent } from './pages/legajo/incorporacion/formalizacion-vinculo/formalizacion-vinculo.component';
import { DocumentacionProcesoComponent } from './pages/legajo/incorporacion/documentacion-proceso/documentacion-proceso.component';
import { ArchivoHandlerComponent } from './components/archivo-handler/archivo-handler.component';
import { DatosFormacionComponent } from './pages/legajo/formacion-academica/datos-formacion/datos-formacion.component';
import { DatosCapacitacionesComponent } from './pages/legajo/formacion-academica/datos-capacitaciones/datos-capacitaciones.component';
import { CompensacionesInternoComponent } from './pages/legajo/compensaciones/compensaciones-interno/compensaciones-interno.component';
import { RetencionesComponent } from './pages/legajo/compensaciones/retenciones/retenciones.component';
import { DesplazamientosComponent } from './pages/legajo/evaluacion-desempeno/desplazamientos/desplazamientos.component';
import { AscensosComponent } from './pages/legajo/evaluacion-desempeno/ascensos/ascensos.component';
import { EvaluacionesComponent } from './pages/legajo/evaluacion-desempeno/evaluaciones/evaluaciones.component';
import { ReconocimientosComponent } from './pages/legajo/reconocimientos-sanciones/reconocimientos/reconocimientos.component';
import { SancionesComponent } from './pages/legajo/reconocimientos-sanciones/sanciones/sanciones.component';
import { SistemaPensionarioComponent } from './pages/legajo/desvinculacion/sistema-pensionario/sistema-pensionario.component';
import { CesesComponent } from './pages/legajo/desvinculacion/ceses/ceses.component';
import { CrearHojaVidaComponent } from './pages/legajo/reporte-hoja-vida/crear-hoja-vida/crear-hoja-vida.component';
import { HistorialHojaVidaComponent } from './pages/legajo/reporte-hoja-vida/historial-hoja-vida/historial-hoja-vida.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'
import { ConfigService } from './core/services/config.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MantenimientoDinamicoComponent } from './components/mantenimiento-dinamico/mantenimiento-dinamico.component';
import { MantenimientoCondicionesSituacionesComponent } from './pages/mantenimiento/mantenimiento-condiciones-situaciones/mantenimiento-condiciones-situaciones.component';
import { MantenimientoTiposDocumentosComponent } from './pages/mantenimiento/mantenimiento-tipos-documentos/mantenimiento-tipos-documentos.component';
import { MatGridListModule } from '@angular/material/grid-list';
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
import { UppercaseInputDirective } from './shared/directives/uppercase.directive';
import { CustomDateAdapter } from './core/adapters/custom-date.adapter';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
registerLocaleData(localeEs, 'es-PE');

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    InicioComponent,
    AperturaLegajoComponent,
    GestionEscalafonComponent,
    UbicacionLegajoComponent,
    LegajoComponent,
    ServidorPublicoComponent,
    InformacionPersonalComponent,
    IncorporacionComponent,
    FormacionAcademicaComponent,
    ExperienciaLaboralComponent,
    MovimientosPersonalComponent,
    CompensacionesComponent,
    EvaluacionDesempenoComponent,
    ReconocimientosSancionesComponent,
    RelacionesLaboralesComponent,
    SeguridadSaludTrabajoComponent,
    DesvinculacionComponent,
    OtrosEntidadComponent,
    ReporteHojaVidaComponent,
    PlaygroundComponent,
    FileUploadComponent,
    ErrorDialogComponent,
    LoadingComponent,
    MantenimientoComponent,
    CentrosTrabajoComponent,
    BuscarCentroLaboralDialogComponent,
    DatosDomiciliariosComponent,
    DatosFamiliaresComponent,
    AcreditacionLenguaComponent,
    DeclaracionJuradaComponent,
    FormalizacionVinculoComponent,
    DocumentacionProcesoComponent,
    ArchivoHandlerComponent,
    DatosFormacionComponent,
    DatosCapacitacionesComponent,
    CompensacionesInternoComponent,
    RetencionesComponent,
    DesplazamientosComponent,
    AscensosComponent,
    EvaluacionesComponent,
    ReconocimientosComponent,
    SancionesComponent,
    SistemaPensionarioComponent,
    CesesComponent,
    CrearHojaVidaComponent,
    HistorialHojaVidaComponent,
    ConfirmDialogComponent,
    MantenimientoDinamicoComponent,
    MantenimientoCondicionesSituacionesComponent,
    MantenimientoTiposDocumentosComponent,
    MantenimientoAccionesVinculacionesComponent,
    MantenimientoAfpComponent,
    MantenimientoMotivosCeseComponent,
    MantenimientoAscensosAccionesComponent,
    MantenimientoAscensosMotivosComponent,
    MantenimientoCargosLaboralesComponent,
    MantenimientoCategoriasRemunerativasComponent,
    MantenimientoCentrosLaboralesComponent,
    MantenimientoCesesAccionesComponent,
    MantenimientoCesesMotivosComponent,
    MantenimientoCompensacionesAccionesComponent,
    MantenimientoCompensacionesMotivosComponent,
    MantenimientoCompensacionesTiposFallecidosComponent,
    MantenimientoCompensacionesTiposMonedasComponent,
    MantenimientoCompensacionesTiposPagosComponent,
    MantenimientoCondicionesLaboralesComponent,
    MantenimientoDesplazamientosAccionesComponent,
    MantenimientoDesplazamientosMotivosComponent,
    MantenimientoDireccionesRegionalesComponent,
    MantenimientoEducacionCarrerasComponent,
    MantenimientoEducacionCentrosRegistrosComponent,
    MantenimientoEducacionDocumentosAcreditacionesComponent,
    MantenimientoEducacionGradosAlcanzadosComponent,
    MantenimientoEducacionModalidadesComponent,
    MantenimientoEducacionNivelesComponent,
    MantenimientoEducacionProgramasComponent,
    MantenimientoEducacionProgramasGeneralesComponent,
    MantenimientoEducacionProgramasProfesionalesComponent,
    MantenimientoEducacionSemestresComponent,
    MantenimientoEducacionSituacionesComponent,
    MantenimientoEducacionTiposCentrosComponent,
    MantenimientoEducacionTiposEstudiosComponent,
    MantenimientoEducacionTiposParticipacionesComponent,
    MantenimientoEducacionTiposSecundariasComponent,
    MantenimientoEducacionTiposSuperioresComponent,
    MantenimientoEscalasCategoriasComponent,
    MantenimientoEvaluacionesAccionesComponent,
    MantenimientoEvaluacionesMotivosComponent,
    MantenimientoExperienciasSectoresComponent,
    MantenimientoGruposOcupacionalesComponent,
    MantenimientoIncorporacionTiposDocumentosComponent,
    MantenimientoInfopefamiliarDeclaracionesJuradasTiposDocumentosComponent,
    MantenimientoInfopefamiliarParentescosComponent,
    MantenimientoInstanciasGestionComponent,
    MantenimientoJornadasLaboralesComponent,
    MantenimientoModalidadesEducativasComponent,
    MantenimientoMotivosVinculacionesComponent,
    MantenimientoMovimientosAccionesComponent,
    MantenimientoMovimientosMotivosRegimenesComponent,
    MantenimientoMovimientosMotivosComponent,
    MantenimientoNivelesEducativosComponent,
    MantenimientoReconocimientosMeritosComponent,
    MantenimientoReconocimientosTiposComponent,
    MantenimientoRegimenesLaboralesComponent,
    MantenimientoRegimenesPensionariosComponent,
    MantenimientoSituacionesLaboralesComponent,
    MantenimientoTipoDireccionesComponent,
    MantenimientoTipoViasComponent,
    MantenimientoTiposAperturaComponent,
    MantenimientoTiposBeneficiariosComponent,
    MantenimientoTiposComisionesComponent,
    MantenimientoTiposDocumentosIdentificacionesComponent,
    MantenimientoTiposRetencionesComponent,
    MantenimientoTiposSancionesComponent,
    MantenimientoTiposServidoresComponent,
    MantenimientoZonasComponent,
    EdicionComponent,
    UbicacionComponent,
    UppercaseInputDirective,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatGridListModule
  ],
  providers: [
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    { provide: MatPaginatorIntl, useClass: SpanishPaginatorIntl },
    { provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
