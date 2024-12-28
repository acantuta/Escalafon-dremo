<?php

use Illuminate\Support\Facades\Route;



use App\Http\Controllers\Escalafon\AuthController;

Route::prefix('escalafon/mantenimiento-dinamico')->group(function () {
    Route::get('/listar', [App\Http\Controllers\Escalafon\MantenimientoDinamicoController::class, 'listar']);
    Route::get('/metadatos', [App\Http\Controllers\Escalafon\MantenimientoDinamicoController::class, 'metadatos']);
    Route::post('/crear', [App\Http\Controllers\Escalafon\MantenimientoDinamicoController::class, 'crear']);
    Route::put('/actualizar/{id}', [App\Http\Controllers\Escalafon\MantenimientoDinamicoController::class, 'actualizar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\Escalafon\MantenimientoDinamicoController::class, 'eliminar']);
    Route::get('/visualizar/{id}', [App\Http\Controllers\Escalafon\MantenimientoDinamicoController::class, 'visualizar']);
    Route::get('/dependencias', [App\Http\Controllers\Escalafon\MantenimientoDinamicoController::class, 'dependencias']);
});


// Rutas de autenticación
Route::post('escalafon/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('escalafon/logout', [AuthController::class, 'logout']);
    Route::post('escalafon/refresh', [AuthController::class, 'refresh']);
    
    // ... resto de tus rutas existentes ...
});

Route::post('escalafon/hojas-vida/vista-previa', [App\Http\Controllers\Escalafon\HojaVidaController::class, 'vistaPrevia']);
Route::post('escalafon/hojas-vida/descargar/{uuid}', [App\Http\Controllers\Escalafon\HojaVidaController::class, 'descargar']);
Route::get('escalafon/hojas-vida/descargar/{uuid}', [App\Http\Controllers\Escalafon\HojaVidaController::class, 'descargar']);

// Routes for ArchivoHandler
Route::prefix('escalafon/archivo-handler')->group(function () {
    Route::post('/upload', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'upload'
    ]);
    Route::get('/download/{uuid}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'download'
    ]);
    Route::get('/view/{uuid}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'viewFile'
    ]);
    Route::get('/{id}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'getArchivo'
    ]);
    Route::put('/{id}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'update'
    ]);
    Route::delete('/{uuid}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'delete'
    ]);
});

// Routes for ArchivoHandler
Route::prefix('escalafon/archivo-handler')->group(function () {
    Route::post('/upload', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'upload'
    ]);
    Route::get('/download/{uuid}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'download'
    ]);
    Route::get('/view/{uuid}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'viewFile'
    ]);
    Route::get('/{id}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'getArchivo'
    ]);
    Route::put('/{id}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'update'
    ]);
    Route::delete('/{uuid}', [
        App\Http\Controllers\Escalafon\ArchivoHandlerController::class,
        'delete'
    ]);
});
// Routes for esc.formaciones_academicas
Route::match(['GET', 'POST'], 'escalafon/formaciones-academicas/listar-paginado', [
    App\Http\Controllers\Escalafon\FormacionAcademicaController::class, 
    'listarPaginado'
])->name('formaciones-academicas.listar-paginado');

Route::apiResource('escalafon/formaciones-academicas', App\Http\Controllers\Escalafon\FormacionAcademicaController::class, [
    'parameters' => [
        'formaciones-academicas' => 'formaciones-academicas'
    ]
]);
// Routes for esc.V_ExperienciasLaborales
Route::match(['GET', 'POST'], 'escalafon/v-experiencias-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\VExperienciaLaboralController::class, 
    'listarPaginado'
])->name('v-experiencias-laborales.listar-paginado');

Route::apiResource('escalafon/v-experiencias-laborales', App\Http\Controllers\Escalafon\VExperienciaLaboralController::class, [
    'parameters' => [
        'v-experiencias-laborales' => 'v-experiencias-laborales'
    ]
]);
// Routes for esc.V_MantenimientoEscalasCategorias
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-escalas-categorias/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoEscalaCategoriaController::class, 
    'listarPaginado'
])->name('v-mantenimiento-escalas-categorias.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-escalas-categorias', App\Http\Controllers\Escalafon\VMantenimientoEscalaCategoriaController::class, [
    'parameters' => [
        'v-mantenimiento-escalas-categorias' => 'v-mantenimiento-escalas-categori'
    ]
]);
// Routes for esc.V_MantenimientoEvaluacionesDesempeniosAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-evaluaciones-desempenios-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoEvaluacionDesempenioAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-evaluaciones-desempenios-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-evaluaciones-desempenios-acciones', App\Http\Controllers\Escalafon\VMantenimientoEvaluacionDesempenioAccionController::class, [
    'parameters' => [
        'v-mantenimiento-evaluaciones-desempenios-acciones' => 'v-mantenimiento-evaluaciones-des'
    ]
]);
// Routes for esc.cargos_laborales
Route::match(['GET', 'POST'], 'escalafon/cargos-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\CargoLaboralController::class, 
    'listarPaginado'
])->name('cargos-laborales.listar-paginado');

Route::apiResource('escalafon/cargos-laborales', App\Http\Controllers\Escalafon\CargoLaboralController::class, [
    'parameters' => [
        'cargos-laborales' => 'cargos-laborales'
    ]
]);
// Routes for esc.asignaciones_incentivos
Route::match(['GET', 'POST'], 'escalafon/asignaciones-incentivos/listar-paginado', [
    App\Http\Controllers\Escalafon\AsignacionIncentivoController::class, 
    'listarPaginado'
])->name('asignaciones-incentivos.listar-paginado');

Route::apiResource('escalafon/asignaciones-incentivos', App\Http\Controllers\Escalafon\AsignacionIncentivoController::class, [
    'parameters' => [
        'asignaciones-incentivos' => 'asignaciones-incentivos'
    ]
]);
// Routes for esc.V_MantenimientoEvaluacionesDesempeniosMotivosAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-evaluaciones-desempenios-motivos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoEvaluacionDesempenioMotivoAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-evaluaciones-desempenios-motivos-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-evaluaciones-desempenios-motivos-acciones', App\Http\Controllers\Escalafon\VMantenimientoEvaluacionDesempenioMotivoAccionController::class, [
    'parameters' => [
        'v-mantenimiento-evaluaciones-desempenios-motivos-acciones' => 'v-mantenimiento-evaluaciones-des'
    ]
]);
// Routes for esc.V_MantenimientoInstanciasGestionEducativaDescentralizadas
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-instancias-gestion-educativa-descentralizadas/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoInstanciaGestionEducativaDescentralizadaController::class, 
    'listarPaginado'
])->name('v-mantenimiento-instancias-gestion-educativa-descentralizadas.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-instancias-gestion-educativa-descentralizadas', App\Http\Controllers\Escalafon\VMantenimientoInstanciaGestionEducativaDescentralizadaController::class, [
    'parameters' => [
        'v-mantenimiento-instancias-gestion-educativa-descentralizadas' => 'v-mantenimiento-instancias-gesti'
    ]
]);
// Routes for esc.V_MantenimientoMovimientosAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-movimientos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoMovimientoAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-movimientos-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-movimientos-acciones', App\Http\Controllers\Escalafon\VMantenimientoMovimientoAccionController::class, [
    'parameters' => [
        'v-mantenimiento-movimientos-acciones' => 'v-mantenimiento-movimientos-acci'
    ]
]);
// Routes for esc.tipos_comisiones_pensionarios
Route::match(['GET', 'POST'], 'escalafon/tipos-comisiones-pensionarios/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoComisionPensionarioController::class, 
    'listarPaginado'
])->name('tipos-comisiones-pensionarios.listar-paginado');

Route::apiResource('escalafon/tipos-comisiones-pensionarios', App\Http\Controllers\Escalafon\TipoComisionPensionarioController::class, [
    'parameters' => [
        'tipos-comisiones-pensionarios' => 'tipos-comisiones-pensionarios'
    ]
]);
// Routes for esc.tipo_direcciones
Route::match(['GET', 'POST'], 'escalafon/tipo-direcciones/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoDireccionController::class, 
    'listarPaginado'
])->name('tipo-direcciones.listar-paginado');

Route::apiResource('escalafon/tipo-direcciones', App\Http\Controllers\Escalafon\TipoDireccionController::class, [
    'parameters' => [
        'tipo-direcciones' => 'tipo-direcciones'
    ]
]);
// Routes for esc.V_MantenimientoMovimientosAccionesMotivosRegimenes
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-movimientos-acciones-motivos-regimenes/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoMovimientoAccionMotivoRegimenController::class, 
    'listarPaginado'
])->name('v-mantenimiento-movimientos-acciones-motivos-regimenes.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-movimientos-acciones-motivos-regimenes', App\Http\Controllers\Escalafon\VMantenimientoMovimientoAccionMotivoRegimenController::class, [
    'parameters' => [
        'v-mantenimiento-movimientos-acciones-motivos-regimenes' => 'v-mantenimiento-movimientos-acci'
    ]
]);
// Routes for esc.administradoras_fondos_pensiones
Route::match(['GET', 'POST'], 'escalafon/administradoras-fondos-pensiones/listar-paginado', [
    App\Http\Controllers\Escalafon\AdministradoraFondoPensionController::class, 
    'listarPaginado'
])->name('administradoras-fondos-pensiones.listar-paginado');

Route::apiResource('escalafon/administradoras-fondos-pensiones', App\Http\Controllers\Escalafon\AdministradoraFondoPensionController::class, [
    'parameters' => [
        'administradoras-fondos-pensiones' => 'administradoras-fondos-pensiones'
    ]
]);
// Routes for esc.V_MantenimientoNivelesEducativos
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-niveles-educativos/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoNivelEducativoController::class, 
    'listarPaginado'
])->name('v-mantenimiento-niveles-educativos.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-niveles-educativos', App\Http\Controllers\Escalafon\VMantenimientoNivelEducativoController::class, [
    'parameters' => [
        'v-mantenimiento-niveles-educativos' => 'v-mantenimiento-niveles-educativ'
    ]
]);
// Routes for esc.V_MantenimientoReconocimientosMeritos
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-reconocimientos-meritos/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoReconocimientoMeritoController::class, 
    'listarPaginado'
])->name('v-mantenimiento-reconocimientos-meritos.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-reconocimientos-meritos', App\Http\Controllers\Escalafon\VMantenimientoReconocimientoMeritoController::class, [
    'parameters' => [
        'v-mantenimiento-reconocimientos-meritos' => 'v-mantenimiento-reconocimientos-'
    ]
]);
// Routes for esc.tipo_vias
Route::match(['GET', 'POST'], 'escalafon/tipo-vias/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoViaController::class, 
    'listarPaginado'
])->name('tipo-vias.listar-paginado');

Route::apiResource('escalafon/tipo-vias', App\Http\Controllers\Escalafon\TipoViaController::class, [
    'parameters' => [
        'tipo-vias' => 'tipo-vias'
    ]
]);
// Routes for esc.regimenes_pensionarios
Route::match(['GET', 'POST'], 'escalafon/regimenes-pensionarios/listar-paginado', [
    App\Http\Controllers\Escalafon\RegimenPensionarioController::class, 
    'listarPaginado'
])->name('regimenes-pensionarios.listar-paginado');

Route::apiResource('escalafon/regimenes-pensionarios', App\Http\Controllers\Escalafon\RegimenPensionarioController::class, [
    'parameters' => [
        'regimenes-pensionarios' => 'regimenes-pensionarios'
    ]
]);
// Routes for esc.escalas_categorias
Route::match(['GET', 'POST'], 'escalafon/escalas-categorias/listar-paginado', [
    App\Http\Controllers\Escalafon\EscalaCategoriaController::class, 
    'listarPaginado'
])->name('escalas-categorias.listar-paginado');

Route::apiResource('escalafon/escalas-categorias', App\Http\Controllers\Escalafon\EscalaCategoriaController::class, [
    'parameters' => [
        'escalas-categorias' => 'escalas-categorias'
    ]
]);
// Routes for esc.jornadas_laborales
Route::match(['GET', 'POST'], 'escalafon/jornadas-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\JornadaLaboralController::class, 
    'listarPaginado'
])->name('jornadas-laborales.listar-paginado');

Route::apiResource('escalafon/jornadas-laborales', App\Http\Controllers\Escalafon\JornadaLaboralController::class, [
    'parameters' => [
        'jornadas-laborales' => 'jornadas-laborales'
    ]
]);
// Routes for esc.V_Capacitaciones
Route::match(['GET', 'POST'], 'escalafon/v-capacitaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VCapacitacionController::class, 
    'listarPaginado'
])->name('v-capacitaciones.listar-paginado');

Route::apiResource('escalafon/v-capacitaciones', App\Http\Controllers\Escalafon\VCapacitacionController::class, [
    'parameters' => [
        'v-capacitaciones' => 'v-capacitaciones'
    ]
]);
// Routes for esc.centros_laborales
Route::match(['GET', 'POST'], 'escalafon/centros-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\CentroLaboralController::class, 
    'listarPaginado'
])->name('centros-laborales.listar-paginado');

Route::apiResource('escalafon/centros-laborales', App\Http\Controllers\Escalafon\CentroLaboralController::class, [
    'parameters' => [
        'centros-laborales' => 'centros-laborales'
    ]
]);
// Routes for esc.capacitaciones
Route::match(['GET', 'POST'], 'escalafon/capacitaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\CapacitacionController::class, 
    'listarPaginado'
])->name('capacitaciones.listar-paginado');

Route::apiResource('escalafon/capacitaciones', App\Http\Controllers\Escalafon\CapacitacionController::class, [
    'parameters' => [
        'capacitaciones' => 'capacitaciones'
    ]
]);
// Routes for esc.ceses_acciones
Route::match(['GET', 'POST'], 'escalafon/ceses-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\CeseAccionController::class, 
    'listarPaginado'
])->name('ceses-acciones.listar-paginado');

Route::apiResource('escalafon/ceses-acciones', App\Http\Controllers\Escalafon\CeseAccionController::class, [
    'parameters' => [
        'ceses-acciones' => 'ceses-acciones'
    ]
]);
// Routes for esc.compensaciones_tipos_pagos
Route::match(['GET', 'POST'], 'escalafon/compensaciones-tipos-pagos/listar-paginado', [
    App\Http\Controllers\Escalafon\CompensacionTipoPagoController::class, 
    'listarPaginado'
])->name('compensaciones-tipos-pagos.listar-paginado');

Route::apiResource('escalafon/compensaciones-tipos-pagos', App\Http\Controllers\Escalafon\CompensacionTipoPagoController::class, [
    'parameters' => [
        'compensaciones-tipos-pagos' => 'compensaciones-tipos-pagos'
    ]
]);
// Routes for esc.educacion_programas
Route::match(['GET', 'POST'], 'escalafon/educacion-programas/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionProgramaController::class, 
    'listarPaginado'
])->name('educacion-programas.listar-paginado');

Route::apiResource('escalafon/educacion-programas', App\Http\Controllers\Escalafon\EducacionProgramaController::class, [
    'parameters' => [
        'educacion-programas' => 'educacion-programas'
    ]
]);
// Routes for esc.ceses_motivos_acciones
Route::match(['GET', 'POST'], 'escalafon/ceses-motivos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\CeseMotivoAccionController::class, 
    'listarPaginado'
])->name('ceses-motivos-acciones.listar-paginado');

Route::apiResource('escalafon/ceses-motivos-acciones', App\Http\Controllers\Escalafon\CeseMotivoAccionController::class, [
    'parameters' => [
        'ceses-motivos-acciones' => 'ceses-motivos-acciones'
    ]
]);
// Routes for esc.educacion_tipos_centros
Route::match(['GET', 'POST'], 'escalafon/educacion-tipos-centros/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionTipoCentroController::class, 
    'listarPaginado'
])->name('educacion-tipos-centros.listar-paginado');

Route::apiResource('escalafon/educacion-tipos-centros', App\Http\Controllers\Escalafon\EducacionTipoCentroController::class, [
    'parameters' => [
        'educacion-tipos-centros' => 'educacion-tipos-centros'
    ]
]);
// Routes for esc.incorporacion_tipos_documentos
Route::match(['GET', 'POST'], 'escalafon/incorporaciones-tipos-documentos/listar-paginado', [
    App\Http\Controllers\Escalafon\IncorporacionTipoDocumentoController::class, 
    'listarPaginado'
])->name('incorporaciones-tipos-documentos.listar-paginado');

Route::apiResource('escalafon/incorporaciones-tipos-documentos', App\Http\Controllers\Escalafon\IncorporacionTipoDocumentoController::class, [
    'parameters' => [
        'incorporaciones-tipos-documentos' => 'incorporaciones-tipos-documentos'
    ]
]);
// Routes for esc.V_VacacionesLicencias
Route::match(['GET', 'POST'], 'escalafon/v-vacaciones-licencias/listar-paginado', [
    App\Http\Controllers\Escalafon\VVacacionLicenciaController::class, 
    'listarPaginado'
])->name('v-vacaciones-licencias.listar-paginado');

Route::apiResource('escalafon/v-vacaciones-licencias', App\Http\Controllers\Escalafon\VVacacionLicenciaController::class, [
    'parameters' => [
        'v-vacaciones-licencias' => 'v-vacaciones-licencias'
    ]
]);
// Routes for esc.legajos_ubicaciones
Route::match(['GET', 'POST'], 'escalafon/legajos-ubicaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\LegajoUbicacionController::class, 
    'listarPaginado'
])->name('legajos-ubicaciones.listar-paginado');

Route::apiResource('escalafon/legajos-ubicaciones', App\Http\Controllers\Escalafon\LegajoUbicacionController::class, [
    'parameters' => [
        'legajos-ubicaciones' => 'legajos-ubicaciones'
    ]
]);
// Routes for esc.reconocimientos_meritos
Route::match(['GET', 'POST'], 'escalafon/reconocimientos-meritos/listar-paginado', [
    App\Http\Controllers\Escalafon\ReconocimientoMeritoController::class, 
    'listarPaginado'
])->name('reconocimientos-meritos.listar-paginado');

Route::apiResource('escalafon/reconocimientos-meritos', App\Http\Controllers\Escalafon\ReconocimientoMeritoController::class, [
    'parameters' => [
        'reconocimientos-meritos' => 'reconocimientos-meritos'
    ]
]);
// Routes for esc.compensaciones_tipos_monedas
Route::match(['GET', 'POST'], 'escalafon/compensaciones-tipos-monedas/listar-paginado', [
    App\Http\Controllers\Escalafon\CompensacionTipoMonedaController::class, 
    'listarPaginado'
])->name('compensaciones-tipos-monedas.listar-paginado');

Route::apiResource('escalafon/compensaciones-tipos-monedas', App\Http\Controllers\Escalafon\CompensacionTipoMonedaController::class, [
    'parameters' => [
        'compensaciones-tipos-monedas' => 'compensaciones-tipos-monedas'
    ]
]);
// Routes for esc.educacion_centros_registros
Route::match(['GET', 'POST'], 'escalafon/educacion-centros-registros/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionCentroRegistroController::class, 
    'listarPaginado'
])->name('educacion-centros-registros.listar-paginado');

Route::apiResource('escalafon/educacion-centros-registros', App\Http\Controllers\Escalafon\EducacionCentroRegistroController::class, [
    'parameters' => [
        'educacion-centros-registros' => 'educacion-centros-registros'
    ]
]);
// Routes for esc.legajos
Route::match(['GET', 'POST'], 'escalafon/legajos/listar-paginado', [
    App\Http\Controllers\Escalafon\LegajoController::class, 
    'listarPaginado'
])->name('legajos.listar-paginado');

Route::apiResource('escalafon/legajos', App\Http\Controllers\Escalafon\LegajoController::class, [
    'parameters' => [
        'legajos' => 'legajos'
    ]
]);
// Routes for esc.ascensos_acciones
Route::match(['GET', 'POST'], 'escalafon/ascensos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\AscensoAccionController::class, 
    'listarPaginado'
])->name('ascensos-acciones.listar-paginado');

Route::apiResource('escalafon/ascensos-acciones', App\Http\Controllers\Escalafon\AscensoAccionController::class, [
    'parameters' => [
        'ascensos-acciones' => 'ascensos-acciones'
    ]
]);
// Routes for esc.educacion_niveles_educativos
Route::match(['GET', 'POST'], 'escalafon/educacion-niveles-educativos/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionNivelEducativoController::class, 
    'listarPaginado'
])->name('educacion-niveles-educativos.listar-paginado');

Route::apiResource('escalafon/educacion-niveles-educativos', App\Http\Controllers\Escalafon\EducacionNivelEducativoController::class, [
    'parameters' => [
        'educacion-niveles-educativos' => 'educacion-niveles-educativos'
    ]
]);
// Routes for esc.tipos_documentos_identificaciones
Route::match(['GET', 'POST'], 'escalafon/tipos-documentos-identificaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoDocumentoIdentificacionController::class, 
    'listarPaginado'
])->name('tipos-documentos-identificaciones.listar-paginado');

Route::apiResource('escalafon/tipos-documentos-identificaciones', App\Http\Controllers\Escalafon\TipoDocumentoIdentificacionController::class, [
    'parameters' => [
        'tipos-documentos-identificaciones' => 'tipos-documentos-identificacione'
    ]
]);
// Routes for esc.V_Compensaciones
Route::match(['GET', 'POST'], 'escalafon/v-compensaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VCompensacionController::class, 
    'listarPaginado'
])->name('v-compensaciones.listar-paginado');

Route::apiResource('escalafon/v-compensaciones', App\Http\Controllers\Escalafon\VCompensacionController::class, [
    'parameters' => [
        'v-compensaciones' => 'v-compensaciones'
    ]
]);
// Routes for esc.V_Retenciones
Route::match(['GET', 'POST'], 'escalafon/v-retenciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VRetencionController::class, 
    'listarPaginado'
])->name('v-retenciones.listar-paginado');

Route::apiResource('escalafon/v-retenciones', App\Http\Controllers\Escalafon\VRetencionController::class, [
    'parameters' => [
        'v-retenciones' => 'v-retenciones'
    ]
]);
// Routes for esc.V_Desplazamientos
Route::match(['GET', 'POST'], 'escalafon/v-desplazamientos/listar-paginado', [
    App\Http\Controllers\Escalafon\VDesplazamientoController::class, 
    'listarPaginado'
])->name('v-desplazamientos.listar-paginado');

Route::apiResource('escalafon/v-desplazamientos', App\Http\Controllers\Escalafon\VDesplazamientoController::class, [
    'parameters' => [
        'v-desplazamientos' => 'v-desplazamientos'
    ]
]);
// Routes for esc.educacion_tipos_superiores
Route::match(['GET', 'POST'], 'escalafon/educacion-tipos-superiores/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionTipoSuperiorController::class, 
    'listarPaginado'
])->name('educacion-tipos-superiores.listar-paginado');

Route::apiResource('escalafon/educacion-tipos-superiores', App\Http\Controllers\Escalafon\EducacionTipoSuperiorController::class, [
    'parameters' => [
        'educacion-tipos-superiores' => 'educacion-tipos-superiores'
    ]
]);
// Routes for esc.V_Ascensos
Route::match(['GET', 'POST'], 'escalafon/v-ascensos/listar-paginado', [
    App\Http\Controllers\Escalafon\VAscensoController::class, 
    'listarPaginado'
])->name('v-ascensos.listar-paginado');

Route::apiResource('escalafon/v-ascensos', App\Http\Controllers\Escalafon\VAscensoController::class, [
    'parameters' => [
        'v-ascensos' => 'v-ascensos'
    ]
]);
// Routes for esc.retenciones
Route::match(['GET', 'POST'], 'escalafon/retenciones/listar-paginado', [
    App\Http\Controllers\Escalafon\RetencionController::class, 
    'listarPaginado'
])->name('retenciones.listar-paginado');

Route::apiResource('escalafon/retenciones', App\Http\Controllers\Escalafon\RetencionController::class, [
    'parameters' => [
        'retenciones' => 'retenciones'
    ]
]);
// Routes for esc.V_EvaluacionesDesempenios
Route::match(['GET', 'POST'], 'escalafon/v-evaluaciones-desempenios/listar-paginado', [
    App\Http\Controllers\Escalafon\VEvaluacionDesempenioController::class, 
    'listarPaginado'
])->name('v-evaluaciones-desempenios.listar-paginado');

Route::apiResource('escalafon/v-evaluaciones-desempenios', App\Http\Controllers\Escalafon\VEvaluacionDesempenioController::class, [
    'parameters' => [
        'v-evaluaciones-desempenios' => 'v-evaluaciones-desempenios'
    ]
]);
// Routes for esc.educacion_tipos_secundarias
Route::match(['GET', 'POST'], 'escalafon/educacion-tipos-secundarias/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionTipoSecundariaController::class, 
    'listarPaginado'
])->name('educacion-tipos-secundarias.listar-paginado');

Route::apiResource('escalafon/educacion-tipos-secundarias', App\Http\Controllers\Escalafon\EducacionTipoSecundariaController::class, [
    'parameters' => [
        'educacion-tipos-secundarias' => 'educacion-tipos-secundarias'
    ]
]);
// Routes for esc.ascensos
Route::match(['GET', 'POST'], 'escalafon/ascensos/listar-paginado', [
    App\Http\Controllers\Escalafon\AscensoController::class, 
    'listarPaginado'
])->name('ascensos.listar-paginado');

Route::apiResource('escalafon/ascensos', App\Http\Controllers\Escalafon\AscensoController::class, [
    'parameters' => [
        'ascensos' => 'ascensos'
    ]
]);
// Routes for esc.modalidades_educativas
Route::match(['GET', 'POST'], 'escalafon/modalidades-educativas/listar-paginado', [
    App\Http\Controllers\Escalafon\ModalidadEducativaController::class, 
    'listarPaginado'
])->name('modalidades-educativas.listar-paginado');

Route::apiResource('escalafon/modalidades-educativas', App\Http\Controllers\Escalafon\ModalidadEducativaController::class, [
    'parameters' => [
        'modalidades-educativas' => 'modalidades-educativas'
    ]
]);
// Routes for esc.relaciones_individuales_colectivas
Route::match(['GET', 'POST'], 'escalafon/relaciones-individuales-colectivas/listar-paginado', [
    App\Http\Controllers\Escalafon\RelacionIndividualColectivaController::class, 
    'listarPaginado'
])->name('relaciones-individuales-colectivas.listar-paginado');

Route::apiResource('escalafon/relaciones-individuales-colectivas', App\Http\Controllers\Escalafon\RelacionIndividualColectivaController::class, [
    'parameters' => [
        'relaciones-individuales-colectivas' => 'relaciones-individuales-colectiv'
    ]
]);
// Routes for esc.direcciones_regionales
Route::match(['GET', 'POST'], 'escalafon/direcciones-regionales/listar-paginado', [
    App\Http\Controllers\Escalafon\DireccionRegionalController::class, 
    'listarPaginado'
])->name('direcciones-regionales.listar-paginado');

Route::apiResource('escalafon/direcciones-regionales', App\Http\Controllers\Escalafon\DireccionRegionalController::class, [
    'parameters' => [
        'direcciones-regionales' => 'direcciones-regionales'
    ]
]);
// Routes for esc.evaluaciones_desempenios
Route::match(['GET', 'POST'], 'escalafon/evaluaciones-desempenios/listar-paginado', [
    App\Http\Controllers\Escalafon\EvaluacionDesempenioController::class, 
    'listarPaginado'
])->name('evaluaciones-desempenios.listar-paginado');

Route::apiResource('escalafon/evaluaciones-desempenios', App\Http\Controllers\Escalafon\EvaluacionDesempenioController::class, [
    'parameters' => [
        'evaluaciones-desempenios' => 'evaluaciones-desempenios'
    ]
]);
// Routes for esc.V_Reconocimientos
Route::match(['GET', 'POST'], 'escalafon/v-reconocimientos/listar-paginado', [
    App\Http\Controllers\Escalafon\VReconocimientoController::class, 
    'listarPaginado'
])->name('v-reconocimientos.listar-paginado');

Route::apiResource('escalafon/v-reconocimientos', App\Http\Controllers\Escalafon\VReconocimientoController::class, [
    'parameters' => [
        'v-reconocimientos' => 'v-reconocimientos'
    ]
]);
// Routes for esc.V_InfopefamiliarDomicilios
Route::match(['GET', 'POST'], 'escalafon/v-infopefamiliar-domicilios/listar-paginado', [
    App\Http\Controllers\Escalafon\VInfopefamiliarDomicilioController::class, 
    'listarPaginado'
])->name('v-infopefamiliar-domicilios.listar-paginado');

Route::apiResource('escalafon/v-infopefamiliar-domicilios', App\Http\Controllers\Escalafon\VInfopefamiliarDomicilioController::class, [
    'parameters' => [
        'v-infopefamiliar-domicilios' => 'v-infopefamiliar-domicilios'
    ]
]);
// Routes for esc.evaluaciones_desempenios_acciones
Route::match(['GET', 'POST'], 'escalafon/evaluaciones-desempenios-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\EvaluacionDesempenioAccionController::class, 
    'listarPaginado'
])->name('evaluaciones-desempenios-acciones.listar-paginado');

Route::apiResource('escalafon/evaluaciones-desempenios-acciones', App\Http\Controllers\Escalafon\EvaluacionDesempenioAccionController::class, [
    'parameters' => [
        'evaluaciones-desempenios-acciones' => 'evaluaciones-desempenios-accione'
    ]
]);
// Routes for esc.educacion_tipos_estudios
Route::match(['GET', 'POST'], 'escalafon/educacion-tipos-estudios/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionTipoEstudioController::class, 
    'listarPaginado'
])->name('educacion-tipos-estudios.listar-paginado');

Route::apiResource('escalafon/educacion-tipos-estudios', App\Http\Controllers\Escalafon\EducacionTipoEstudioController::class, [
    'parameters' => [
        'educacion-tipos-estudios' => 'educacion-tipos-estudios'
    ]
]);
// Routes for esc.V_Sanciones
Route::match(['GET', 'POST'], 'escalafon/v-sanciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VSancionController::class, 
    'listarPaginado'
])->name('v-sanciones.listar-paginado');

Route::apiResource('escalafon/v-sanciones', App\Http\Controllers\Escalafon\VSancionController::class, [
    'parameters' => [
        'v-sanciones' => 'v-sanciones'
    ]
]);
// Routes for esc.V_SistemasPensionarios
Route::match(['GET', 'POST'], 'escalafon/v-sistemas-pensionarios/listar-paginado', [
    App\Http\Controllers\Escalafon\VSistemaPensionarioController::class, 
    'listarPaginado'
])->name('v-sistemas-pensionarios.listar-paginado');

Route::apiResource('escalafon/v-sistemas-pensionarios', App\Http\Controllers\Escalafon\VSistemaPensionarioController::class, [
    'parameters' => [
        'v-sistemas-pensionarios' => 'v-sistemas-pensionarios'
    ]
]);
// Routes for esc.tipos_apertura_legajos
Route::match(['GET', 'POST'], 'escalafon/tipos-apertura-legajos/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoAperturaLegajoController::class, 
    'listarPaginado'
])->name('tipos-apertura-legajos.listar-paginado');

Route::apiResource('escalafon/tipos-apertura-legajos', App\Http\Controllers\Escalafon\TipoAperturaLegajoController::class, [
    'parameters' => [
        'tipos-apertura-legajos' => 'tipos-apertura-legajos'
    ]
]);
// Routes for esc.V_Ceses
Route::match(['GET', 'POST'], 'escalafon/v-ceses/listar-paginado', [
    App\Http\Controllers\Escalafon\VCeseController::class, 
    'listarPaginado'
])->name('v-ceses.listar-paginado');

Route::apiResource('escalafon/v-ceses', App\Http\Controllers\Escalafon\VCeseController::class, [
    'parameters' => [
        'v-ceses' => 'v-ceses'
    ]
]);
// Routes for esc.compensaciones_tipos_fallecidos
Route::match(['GET', 'POST'], 'escalafon/compensaciones-tipos-fallecidos/listar-paginado', [
    App\Http\Controllers\Escalafon\CompensacionTipoFallecidoController::class, 
    'listarPaginado'
])->name('compensaciones-tipos-fallecidos.listar-paginado');

Route::apiResource('escalafon/compensaciones-tipos-fallecidos', App\Http\Controllers\Escalafon\CompensacionTipoFallecidoController::class, [
    'parameters' => [
        'compensaciones-tipos-fallecidos' => 'compensaciones-tipos-fallecidos'
    ]
]);
// Routes for esc.V_CondicionesLaboralesSituacionesLaborales
Route::match(['GET', 'POST'], 'escalafon/v-condiciones-laborales-situaciones-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\VCondicionLaboralSituacionLaboralController::class, 
    'listarPaginado'
])->name('v-condiciones-laborales-situaciones-laborales.listar-paginado');

Route::apiResource('escalafon/v-condiciones-laborales-situaciones-laborales', App\Http\Controllers\Escalafon\VCondicionLaboralSituacionLaboralController::class, [
    'parameters' => [
        'v-condiciones-laborales-situaciones-laborales' => 'v-condiciones-laborales-situacio'
    ]
]);
// Routes for esc.niveles_educativos
Route::match(['GET', 'POST'], 'escalafon/niveles-educativos/listar-paginado', [
    App\Http\Controllers\Escalafon\NivelEducativoController::class, 
    'listarPaginado'
])->name('niveles-educativos.listar-paginado');

Route::apiResource('escalafon/niveles-educativos', App\Http\Controllers\Escalafon\NivelEducativoController::class, [
    'parameters' => [
        'niveles-educativos' => 'niveles-educativos'
    ]
]);
// Routes for esc.experiencias_laborales
Route::match(['GET', 'POST'], 'escalafon/experiencias-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\ExperienciaLaboralController::class, 
    'listarPaginado'
])->name('experiencias-laborales.listar-paginado');

Route::apiResource('escalafon/experiencias-laborales', App\Http\Controllers\Escalafon\ExperienciaLaboralController::class, [
    'parameters' => [
        'experiencias-laborales' => 'experiencias-laborales'
    ]
]);
// Routes for esc.instancias_gestion_educativa_descentralizadas
Route::match(['GET', 'POST'], 'escalafon/instancias-gestion-educativa-descentralizadas/listar-paginado', [
    App\Http\Controllers\Escalafon\InstanciaGestionEducativaDescentralizadaController::class, 
    'listarPaginado'
])->name('instancias-gestion-educativa-descentralizadas.listar-paginado');

Route::apiResource('escalafon/instancias-gestion-educativa-descentralizadas', App\Http\Controllers\Escalafon\InstanciaGestionEducativaDescentralizadaController::class, [
    'parameters' => [
        'instancias-gestion-educativa-descentralizadas' => 'instancias-gestion-educativa-des'
    ]
]);
// Routes for esc.condiciones_laborales
Route::match(['GET', 'POST'], 'escalafon/condiciones-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\CondicionLaboralController::class, 
    'listarPaginado'
])->name('condiciones-laborales.listar-paginado');

Route::apiResource('escalafon/condiciones-laborales', App\Http\Controllers\Escalafon\CondicionLaboralController::class, [
    'parameters' => [
        'condiciones-laborales' => 'condiciones-laborales'
    ]
]);
// Routes for esc.otros
Route::match(['GET', 'POST'], 'escalafon/otros/listar-paginado', [
    App\Http\Controllers\Escalafon\OtroController::class, 
    'listarPaginado'
])->name('otros.listar-paginado');

Route::apiResource('escalafon/otros', App\Http\Controllers\Escalafon\OtroController::class, [
    'parameters' => [
        'otros' => 'otros'
    ]
]);
// Routes for esc.desplazamientos
Route::match(['GET', 'POST'], 'escalafon/desplazamientos/listar-paginado', [
    App\Http\Controllers\Escalafon\DesplazamientoController::class, 
    'listarPaginado'
])->name('desplazamientos.listar-paginado');

Route::apiResource('escalafon/desplazamientos', App\Http\Controllers\Escalafon\DesplazamientoController::class, [
    'parameters' => [
        'desplazamientos' => 'desplazamientos'
    ]
]);
// Routes for esc.ceses
Route::match(['GET', 'POST'], 'escalafon/ceses/listar-paginado', [
    App\Http\Controllers\Escalafon\CeseController::class, 
    'listarPaginado'
])->name('ceses.listar-paginado');

Route::apiResource('escalafon/ceses', App\Http\Controllers\Escalafon\CeseController::class, [
    'parameters' => [
        'ceses' => 'ceses'
    ]
]);
// Routes for esc.movimientos_motivos
Route::match(['GET', 'POST'], 'escalafon/movimientos-motivos/listar-paginado', [
    App\Http\Controllers\Escalafon\MovimientoMotivoController::class, 
    'listarPaginado'
])->name('movimientos-motivos.listar-paginado');

Route::apiResource('escalafon/movimientos-motivos', App\Http\Controllers\Escalafon\MovimientoMotivoController::class, [
    'parameters' => [
        'movimientos-motivos' => 'movimientos-motivos'
    ]
]);
// Routes for esc.V_InfopefamiliarFamiliares
Route::match(['GET', 'POST'], 'escalafon/v-infopefamiliar-familiares/listar-paginado', [
    App\Http\Controllers\Escalafon\VInfopefamiliarFamiliarController::class, 
    'listarPaginado'
])->name('v-infopefamiliar-familiares.listar-paginado');

Route::apiResource('escalafon/v-infopefamiliar-familiares', App\Http\Controllers\Escalafon\VInfopefamiliarFamiliarController::class, [
    'parameters' => [
        'v-infopefamiliar-familiares' => 'v-infopefamiliar-familiares'
    ]
]);
// Routes for esc.seguridad_salud_bienestares
Route::match(['GET', 'POST'], 'escalafon/seguridad-salud-bienestares/listar-paginado', [
    App\Http\Controllers\Escalafon\SeguridadSaludBienestarController::class, 
    'listarPaginado'
])->name('seguridad-salud-bienestares.listar-paginado');

Route::apiResource('escalafon/seguridad-salud-bienestares', App\Http\Controllers\Escalafon\SeguridadSaludBienestarController::class, [
    'parameters' => [
        'seguridad-salud-bienestares' => 'seguridad-salud-bienestares'
    ]
]);
// Routes for esc.movimientos_acciones
Route::match(['GET', 'POST'], 'escalafon/movimientos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\MovimientoAccionController::class, 
    'listarPaginado'
])->name('movimientos-acciones.listar-paginado');

Route::apiResource('escalafon/movimientos-acciones', App\Http\Controllers\Escalafon\MovimientoAccionController::class, [
    'parameters' => [
        'movimientos-acciones' => 'movimientos-acciones'
    ]
]);
// Routes for esc.hojas_vida
Route::match(['GET', 'POST'], 'escalafon/hojas-vida/listar-paginado', [
    App\Http\Controllers\Escalafon\HojaVidaController::class, 
    'listarPaginado'
])->name('hojas-vida.listar-paginado');

Route::apiResource('escalafon/hojas-vida', App\Http\Controllers\Escalafon\HojaVidaController::class, [
    'parameters' => [
        'hojas-vida' => 'hojas-vida'
    ]
]);
// Routes for esc.educacion_tipos_participaciones
Route::match(['GET', 'POST'], 'escalafon/educacion-tipos-participaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionTipoParticipacionController::class, 
    'listarPaginado'
])->name('educacion-tipos-participaciones.listar-paginado');

Route::apiResource('escalafon/educacion-tipos-participaciones', App\Http\Controllers\Escalafon\EducacionTipoParticipacionController::class, [
    'parameters' => [
        'educacion-tipos-participaciones' => 'educacion-tipos-participaciones'
    ]
]);
// Routes for esc.situaciones_laborales
Route::match(['GET', 'POST'], 'escalafon/situaciones-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\SituacionLaboralController::class, 
    'listarPaginado'
])->name('situaciones-laborales.listar-paginado');

Route::apiResource('escalafon/situaciones-laborales', App\Http\Controllers\Escalafon\SituacionLaboralController::class, [
    'parameters' => [
        'situaciones-laborales' => 'situaciones-laborales'
    ]
]);
// Routes for esc.regimenes_laborales
Route::match(['GET', 'POST'], 'escalafon/regimenes-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\RegimenLaboralController::class, 
    'listarPaginado'
])->name('regimenes-laborales.listar-paginado');

Route::apiResource('escalafon/regimenes-laborales', App\Http\Controllers\Escalafon\RegimenLaboralController::class, [
    'parameters' => [
        'regimenes-laborales' => 'regimenes-laborales'
    ]
]);
// Routes for esc.sistemas_pensonarios
Route::match(['GET', 'POST'], 'escalafon/sistemas-pensionarios/listar-paginado', [
    App\Http\Controllers\Escalafon\SistemaPensionarioController::class, 
    'listarPaginado'
])->name('sistemas-pensionarios.listar-paginado');

Route::apiResource('escalafon/sistemas-pensionarios', App\Http\Controllers\Escalafon\SistemaPensionarioController::class, [
    'parameters' => [
        'sistemas-pensionarios' => 'sistemas-pensionarios'
    ]
]);
// Routes for esc.educacion_situaciones_academicas
Route::match(['GET', 'POST'], 'escalafon/educacion-situaciones-academicas/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionSituacionAcademicaController::class, 
    'listarPaginado'
])->name('educacion-situaciones-academicas.listar-paginado');

Route::apiResource('escalafon/educacion-situaciones-academicas', App\Http\Controllers\Escalafon\EducacionSituacionAcademicaController::class, [
    'parameters' => [
        'educacion-situaciones-academicas' => 'educacion-situaciones-academicas'
    ]
]);
// Routes for esc.evaluaciones_desempenios_motivos_acciones
Route::match(['GET', 'POST'], 'escalafon/evaluaciones-desempenios-motivos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\EvaluacionDesempenioMotivoAccionController::class, 
    'listarPaginado'
])->name('evaluaciones-desempenios-motivos-acciones.listar-paginado');

Route::apiResource('escalafon/evaluaciones-desempenios-motivos-acciones', App\Http\Controllers\Escalafon\EvaluacionDesempenioMotivoAccionController::class, [
    'parameters' => [
        'evaluaciones-desempenios-motivos-acciones' => 'evaluaciones-desempenios-motivos'
    ]
]);
// Routes for esc.tipos_beneficiarios_retenciones
Route::match(['GET', 'POST'], 'escalafon/tipos-beneficiarios-retenciones/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoBeneficiarioRetencionController::class, 
    'listarPaginado'
])->name('tipos-beneficiarios-retenciones.listar-paginado');

Route::apiResource('escalafon/tipos-beneficiarios-retenciones', App\Http\Controllers\Escalafon\TipoBeneficiarioRetencionController::class, [
    'parameters' => [
        'tipos-beneficiarios-retenciones' => 'tipos-beneficiarios-retenciones'
    ]
]);
// Routes for esc.tipos_retenciones
Route::match(['GET', 'POST'], 'escalafon/tipos-retenciones/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoRetencionController::class, 
    'listarPaginado'
])->name('tipos-retenciones.listar-paginado');

Route::apiResource('escalafon/tipos-retenciones', App\Http\Controllers\Escalafon\TipoRetencionController::class, [
    'parameters' => [
        'tipos-retenciones' => 'tipos-retenciones'
    ]
]);
// Routes for esc.educacion_documentos_acreditaciones
Route::match(['GET', 'POST'], 'escalafon/educacion-documentos-acreditaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionDocumentoAcreditacionController::class, 
    'listarPaginado'
])->name('educacion-documentos-acreditaciones.listar-paginado');

Route::apiResource('escalafon/educacion-documentos-acreditaciones', App\Http\Controllers\Escalafon\EducacionDocumentoAcreditacionController::class, [
    'parameters' => [
        'educacion-documentos-acreditaciones' => 'educacion-documentos-acreditacio'
    ]
]);
// Routes for esc.condiciones_situaciones_laborales
Route::match(['GET', 'POST'], 'escalafon/condiciones-situaciones-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\CondicionSituacionLaboralController::class, 
    'listarPaginado'
])->name('condiciones-situaciones-laborales.listar-paginado');

Route::apiResource('escalafon/condiciones-situaciones-laborales', App\Http\Controllers\Escalafon\CondicionSituacionLaboralController::class, [
    'parameters' => [
        'condiciones-situaciones-laborales' => 'condiciones-situaciones-laborale'
    ]
]);
// Routes for esc.infopefamiliar_familiares
Route::match(['GET', 'POST'], 'escalafon/infopefamiliar-familiares/listar-paginado', [
    App\Http\Controllers\Escalafon\InfopefamiliarFamiliarController::class, 
    'listarPaginado'
])->name('infopefamiliar-familiares.listar-paginado');

Route::apiResource('escalafon/infopefamiliar-familiares', App\Http\Controllers\Escalafon\InfopefamiliarFamiliarController::class, [
    'parameters' => [
        'infopefamiliar-familiares' => 'infopefamiliar-familiares'
    ]
]);
// Routes for esc.educacion_grados_alcanzados
Route::match(['GET', 'POST'], 'escalafon/educacion-grados-alcanzados/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionGradoAlcanzadoController::class, 
    'listarPaginado'
])->name('educacion-grados-alcanzados.listar-paginado');

Route::apiResource('escalafon/educacion-grados-alcanzados', App\Http\Controllers\Escalafon\EducacionGradoAlcanzadoController::class, [
    'parameters' => [
        'educacion-grados-alcanzados' => 'educacion-grados-alcanzados'
    ]
]);
// Routes for esc.reconocimientos_tipos_meritos
Route::match(['GET', 'POST'], 'escalafon/reconocimientos-tipos-meritos/listar-paginado', [
    App\Http\Controllers\Escalafon\ReconocimientoTipoMeritoController::class, 
    'listarPaginado'
])->name('reconocimientos-tipos-meritos.listar-paginado');

Route::apiResource('escalafon/reconocimientos-tipos-meritos', App\Http\Controllers\Escalafon\ReconocimientoTipoMeritoController::class, [
    'parameters' => [
        'reconocimientos-tipos-meritos' => 'reconocimientos-tipos-meritos'
    ]
]);
// Routes for esc.infopefamiliar_declaraciones_juradas_tipos_documentos
Route::match(['GET', 'POST'], 'escalafon/infopefamiliar-declaraciones-juradas-tipos-documentos/listar-paginado', [
    App\Http\Controllers\Escalafon\InfopefamiliarDeclaracionJuradaTipoDocumentoController::class, 
    'listarPaginado'
])->name('infopefamiliar-declaraciones-juradas-tipos-documentos.listar-paginado');

Route::apiResource('escalafon/infopefamiliar-declaraciones-juradas-tipos-documentos', App\Http\Controllers\Escalafon\InfopefamiliarDeclaracionJuradaTipoDocumentoController::class, [
    'parameters' => [
        'infopefamiliar-declaraciones-juradas-tipos-documentos' => 'infopefamiliar-declaraciones-jur'
    ]
]);
// Routes for esc.educacion_semestres
Route::match(['GET', 'POST'], 'escalafon/educacion-semestres/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionSemestreController::class, 
    'listarPaginado'
])->name('educacion-semestres.listar-paginado');

Route::apiResource('escalafon/educacion-semestres', App\Http\Controllers\Escalafon\EducacionSemestreController::class, [
    'parameters' => [
        'educacion-semestres' => 'educacion-semestres'
    ]
]);
// Routes for esc.infopefamiliar_familiares_parentescos
Route::match(['GET', 'POST'], 'escalafon/infopefamiliar-familiares-parentescos/listar-paginado', [
    App\Http\Controllers\Escalafon\InfopefamiliarFamiliarParentescoController::class, 
    'listarPaginado'
])->name('infopefamiliar-familiares-parentescos.listar-paginado');

Route::apiResource('escalafon/infopefamiliar-familiares-parentescos', App\Http\Controllers\Escalafon\InfopefamiliarFamiliarParentescoController::class, [
    'parameters' => [
        'infopefamiliar-familiares-parentescos' => 'infopefamiliar-familiares-parent'
    ]
]);
// Routes for esc.tipos_documentos
Route::match(['GET', 'POST'], 'escalafon/tipos-documentos/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoDocumentoController::class, 
    'listarPaginado'
])->name('tipos-documentos.listar-paginado');

Route::apiResource('escalafon/tipos-documentos', App\Http\Controllers\Escalafon\TipoDocumentoController::class, [
    'parameters' => [
        'tipos-documentos' => 'tipos-documentos'
    ]
]);
// Routes for esc.infopefamiliar_declaraciones_juradas
Route::match(['GET', 'POST'], 'escalafon/infopefamiliar-declaraciones-juradas/listar-paginado', [
    App\Http\Controllers\Escalafon\InfopefamiliarDeclaracionJuradaController::class, 
    'listarPaginado'
])->name('infopefamiliar-declaraciones-juradas.listar-paginado');

Route::apiResource('escalafon/infopefamiliar-declaraciones-juradas', App\Http\Controllers\Escalafon\InfopefamiliarDeclaracionJuradaController::class, [
    'parameters' => [
        'infopefamiliar-declaraciones-juradas' => 'infopefamiliar-declaraciones-jur'
    ]
]);
// Routes for esc.educacion_modalidades
Route::match(['GET', 'POST'], 'escalafon/educacion-modalidades/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionModalidadController::class, 
    'listarPaginado'
])->name('educacion-modalidades.listar-paginado');

Route::apiResource('escalafon/educacion-modalidades', App\Http\Controllers\Escalafon\EducacionModalidadController::class, [
    'parameters' => [
        'educacion-modalidades' => 'educacion-modalidades'
    ]
]);
// Routes for esc.zonas
Route::match(['GET', 'POST'], 'escalafon/zonas/listar-paginado', [
    App\Http\Controllers\Escalafon\ZonaController::class, 
    'listarPaginado'
])->name('zonas.listar-paginado');

Route::apiResource('escalafon/zonas', App\Http\Controllers\Escalafon\ZonaController::class, [
    'parameters' => [
        'zonas' => 'zonas'
    ]
]);
// Routes for esc.V_VinculacionesLaborales
Route::match(['GET', 'POST'], 'escalafon/v-vinculaciones-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\VVinculacionLaboralController::class, 
    'listarPaginado'
])->name('v-vinculaciones-laborales.listar-paginado');

Route::apiResource('escalafon/v-vinculaciones-laborales', App\Http\Controllers\Escalafon\VVinculacionLaboralController::class, [
    'parameters' => [
        'v-vinculaciones-laborales' => 'v-vinculaciones-laborales'
    ]
]);
// Routes for esc.tipos_servidores
Route::match(['GET', 'POST'], 'escalafon/tipos-servidores/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoServidorController::class, 
    'listarPaginado'
])->name('tipos-servidores.listar-paginado');

Route::apiResource('escalafon/tipos-servidores', App\Http\Controllers\Escalafon\TipoServidorController::class, [
    'parameters' => [
        'tipos-servidores' => 'tipos-servidores'
    ]
]);
// Routes for esc.V_Legajos
Route::match(['GET', 'POST'], 'escalafon/v-legajos/listar-paginado', [
    App\Http\Controllers\Escalafon\VLegajoController::class, 
    'listarPaginado'
])->name('v-legajos.listar-paginado');

Route::apiResource('escalafon/v-legajos', App\Http\Controllers\Escalafon\VLegajoController::class, [
    'parameters' => [
        'v-legajos' => 'v-legajos'
    ]
]);
// Routes for esc.incorporacion_documentos
Route::match(['GET', 'POST'], 'escalafon/incorporaciones-documentos/listar-paginado', [
    App\Http\Controllers\Escalafon\IncorporacionDocumentoController::class, 
    'listarPaginado'
])->name('incorporaciones-documentos.listar-paginado');

Route::apiResource('escalafon/incorporaciones-documentos', App\Http\Controllers\Escalafon\IncorporacionDocumentoController::class, [
    'parameters' => [
        'incorporaciones-documentos' => 'incorporaciones-documentos'
    ]
]);
// Routes for esc.V_InfopefamiliarDeclaracionesJuradas
Route::match(['GET', 'POST'], 'escalafon/v-infopefamiliar-declaraciones-juradas/listar-paginado', [
    App\Http\Controllers\Escalafon\VInfopefamiliarDeclaracionJuradaController::class, 
    'listarPaginado'
])->name('v-infopefamiliar-declaraciones-juradas.listar-paginado');

Route::apiResource('escalafon/v-infopefamiliar-declaraciones-juradas', App\Http\Controllers\Escalafon\VInfopefamiliarDeclaracionJuradaController::class, [
    'parameters' => [
        'v-infopefamiliar-declaraciones-juradas' => 'v-infopefamiliar-declaraciones-j'
    ]
]);
// Routes for esc.educacion_niveles_especialidad
Route::match(['GET', 'POST'], 'escalafon/educacion-niveles-especialidad/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionNivelEspecialidadController::class, 
    'listarPaginado'
])->name('educacion-niveles-especialidad.listar-paginado');

Route::apiResource('escalafon/educacion-niveles-especialidad', App\Http\Controllers\Escalafon\EducacionNivelEspecialidadController::class, [
    'parameters' => [
        'educacion-niveles-especialidad' => 'educacion-niveles-especialidad'
    ]
]);
// Routes for esc.reconocimientos
Route::match(['GET', 'POST'], 'escalafon/reconocimientos/listar-paginado', [
    App\Http\Controllers\Escalafon\ReconocimientoController::class, 
    'listarPaginado'
])->name('reconocimientos.listar-paginado');

Route::apiResource('escalafon/reconocimientos', App\Http\Controllers\Escalafon\ReconocimientoController::class, [
    'parameters' => [
        'reconocimientos' => 'reconocimientos'
    ]
]);
// Routes for esc.acciones_vinculaciones
Route::match(['GET', 'POST'], 'escalafon/acciones-vinculaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\AccionVinculacionController::class, 
    'listarPaginado'
])->name('acciones-vinculaciones.listar-paginado');

Route::apiResource('escalafon/acciones-vinculaciones', App\Http\Controllers\Escalafon\AccionVinculacionController::class, [
    'parameters' => [
        'acciones-vinculaciones' => 'acciones-vinculaciones'
    ]
]);
// Routes for esc.archivos
Route::match(['GET', 'POST'], 'escalafon/archivos/listar-paginado', [
    App\Http\Controllers\Escalafon\ArchivoController::class, 
    'listarPaginado'
])->name('archivos.listar-paginado');

Route::apiResource('escalafon/archivos', App\Http\Controllers\Escalafon\ArchivoController::class, [
    'parameters' => [
        'archivos' => 'archivos'
    ]
]);
// Routes for esc.educacion_carreras
Route::match(['GET', 'POST'], 'escalafon/educacion-carreras/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionCarreraController::class, 
    'listarPaginado'
])->name('educacion-carreras.listar-paginado');

Route::apiResource('escalafon/educacion-carreras', App\Http\Controllers\Escalafon\EducacionCarreraController::class, [
    'parameters' => [
        'educacion-carreras' => 'educacion-carreras'
    ]
]);
// Routes for esc.sanciones
Route::match(['GET', 'POST'], 'escalafon/sanciones/listar-paginado', [
    App\Http\Controllers\Escalafon\SancionController::class, 
    'listarPaginado'
])->name('sanciones.listar-paginado');

Route::apiResource('escalafon/sanciones', App\Http\Controllers\Escalafon\SancionController::class, [
    'parameters' => [
        'sanciones' => 'sanciones'
    ]
]);
// Routes for esc.V_IncorporacionesDocumentos
Route::match(['GET', 'POST'], 'escalafon/v-incorporaciones-documentos/listar-paginado', [
    App\Http\Controllers\Escalafon\VIncorporacionDocumentoController::class, 
    'listarPaginado'
])->name('v-incorporaciones-documentos.listar-paginado');

Route::apiResource('escalafon/v-incorporaciones-documentos', App\Http\Controllers\Escalafon\VIncorporacionDocumentoController::class, [
    'parameters' => [
        'v-incorporaciones-documentos' => 'v-incorporaciones-documentos'
    ]
]);
// Routes for esc.vacaciones_licencias
Route::match(['GET', 'POST'], 'escalafon/vacaciones-licencias/listar-paginado', [
    App\Http\Controllers\Escalafon\VacacionLicenciaController::class, 
    'listarPaginado'
])->name('vacaciones-licencias.listar-paginado');

Route::apiResource('escalafon/vacaciones-licencias', App\Http\Controllers\Escalafon\VacacionLicenciaController::class, [
    'parameters' => [
        'vacaciones-licencias' => 'vacaciones-licencias'
    ]
]);
// Routes for esc.ascensos_motivos
Route::match(['GET', 'POST'], 'escalafon/ascensos-motivos/listar-paginado', [
    App\Http\Controllers\Escalafon\AscensoMotivoController::class, 
    'listarPaginado'
])->name('ascensos-motivos.listar-paginado');

Route::apiResource('escalafon/ascensos-motivos', App\Http\Controllers\Escalafon\AscensoMotivoController::class, [
    'parameters' => [
        'ascensos-motivos' => 'ascensos-motivos'
    ]
]);
// Routes for esc.V_CentrosLaborales
Route::match(['GET', 'POST'], 'escalafon/v-centros-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\VCentroLaboralController::class, 
    'listarPaginado'
])->name('v-centros-laborales.listar-paginado');

Route::apiResource('escalafon/v-centros-laborales', App\Http\Controllers\Escalafon\VCentroLaboralController::class, [
    'parameters' => [
        'v-centros-laborales' => 'v-centros-laborales'
    ]
]);
// Routes for esc.compensaciones_acciones
Route::match(['GET', 'POST'], 'escalafon/compensaciones-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\CompensacionAccionController::class, 
    'listarPaginado'
])->name('compensaciones-acciones.listar-paginado');

Route::apiResource('escalafon/compensaciones-acciones', App\Http\Controllers\Escalafon\CompensacionAccionController::class, [
    'parameters' => [
        'compensaciones-acciones' => 'compensaciones-acciones'
    ]
]);
// Routes for esc.V_MantenimientoAccionesVinculaciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-acciones-vinculaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoAccionVinculacionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-acciones-vinculaciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-acciones-vinculaciones', App\Http\Controllers\Escalafon\VMantenimientoAccionVinculacionController::class, [
    'parameters' => [
        'v-mantenimiento-acciones-vinculaciones' => 'v-mantenimiento-acciones-vincula'
    ]
]);
// Routes for esc.vinculaciones_laborales
Route::match(['GET', 'POST'], 'escalafon/vinculaciones-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\VinculacionLaboralController::class, 
    'listarPaginado'
])->name('vinculaciones-laborales.listar-paginado');

Route::apiResource('escalafon/vinculaciones-laborales', App\Http\Controllers\Escalafon\VinculacionLaboralController::class, [
    'parameters' => [
        'vinculaciones-laborales' => 'vinculaciones-laborales'
    ]
]);
// Routes for esc.V_MantenimientoAscensosAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-ascensos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoAscensoAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-ascensos-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-ascensos-acciones', App\Http\Controllers\Escalafon\VMantenimientoAscensoAccionController::class, [
    'parameters' => [
        'v-mantenimiento-ascensos-acciones' => 'v-mantenimiento-ascensos-accione'
    ]
]);
// Routes for esc.desplazamientos_motivos_acciones
Route::match(['GET', 'POST'], 'escalafon/desplazamientos-motivos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\DesplazamientoMotivoAccionController::class, 
    'listarPaginado'
])->name('desplazamientos-motivos-acciones.listar-paginado');

Route::apiResource('escalafon/desplazamientos-motivos-acciones', App\Http\Controllers\Escalafon\DesplazamientoMotivoAccionController::class, [
    'parameters' => [
        'desplazamientos-motivos-acciones' => 'desplazamientos-motivos-acciones'
    ]
]);
// Routes for esc.V_RelacionesIndividualesColectivas
Route::match(['GET', 'POST'], 'escalafon/v-relaciones-individuales-colectivas/listar-paginado', [
    App\Http\Controllers\Escalafon\VRelacionIndividualColectivaController::class, 
    'listarPaginado'
])->name('v-relaciones-individuales-colectivas.listar-paginado');

Route::apiResource('escalafon/v-relaciones-individuales-colectivas', App\Http\Controllers\Escalafon\VRelacionIndividualColectivaController::class, [
    'parameters' => [
        'v-relaciones-individuales-colectivas' => 'v-relaciones-individuales-colect'
    ]
]);
// Routes for esc.compensaciones_motivos_acciones
Route::match(['GET', 'POST'], 'escalafon/compensaciones-motivos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\CompensacionMotivoAccionController::class, 
    'listarPaginado'
])->name('compensaciones-motivos-acciones.listar-paginado');

Route::apiResource('escalafon/compensaciones-motivos-acciones', App\Http\Controllers\Escalafon\CompensacionMotivoAccionController::class, [
    'parameters' => [
        'compensaciones-motivos-acciones' => 'compensaciones-motivos-acciones'
    ]
]);
// Routes for esc.V_MantenimientoAscensosMotivos
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-ascensos-motivos/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoAscensoMotivoController::class, 
    'listarPaginado'
])->name('v-mantenimiento-ascensos-motivos.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-ascensos-motivos', App\Http\Controllers\Escalafon\VMantenimientoAscensoMotivoController::class, [
    'parameters' => [
        'v-mantenimiento-ascensos-motivos' => 'v-mantenimiento-ascensos-motivos'
    ]
]);
// Routes for esc.motivos_acciones_vinculaciones
Route::match(['GET', 'POST'], 'escalafon/motivos-acciones-vinculaciones/listar-paginado', [
    App\Http\Controllers\Escalafon\MotivoAccionVinculacionController::class, 
    'listarPaginado'
])->name('motivos-acciones-vinculaciones.listar-paginado');

Route::apiResource('escalafon/motivos-acciones-vinculaciones', App\Http\Controllers\Escalafon\MotivoAccionVinculacionController::class, [
    'parameters' => [
        'motivos-acciones-vinculaciones' => 'motivos-acciones-vinculaciones'
    ]
]);
// Routes for esc.V_SeguridadSaludBienestares
Route::match(['GET', 'POST'], 'escalafon/v-seguridad-salud-bienestares/listar-paginado', [
    App\Http\Controllers\Escalafon\VSeguridadSaludBienestarController::class, 
    'listarPaginado'
])->name('v-seguridad-salud-bienestares.listar-paginado');

Route::apiResource('escalafon/v-seguridad-salud-bienestares', App\Http\Controllers\Escalafon\VSeguridadSaludBienestarController::class, [
    'parameters' => [
        'v-seguridad-salud-bienestares' => 'v-seguridad-salud-bienestares'
    ]
]);
// Routes for esc.V_MantenimientoCategoriasRemunerativas
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-categorias-remunerativas/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoCategoriaRemunerativaController::class, 
    'listarPaginado'
])->name('v-mantenimiento-categorias-remunerativas.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-categorias-remunerativas', App\Http\Controllers\Escalafon\VMantenimientoCategoriaRemunerativaController::class, [
    'parameters' => [
        'v-mantenimiento-categorias-remunerativas' => 'v-mantenimiento-categorias-remun'
    ]
]);
// Routes for esc.V_MovimientosAccionesMotivosRegimenes
Route::match(['GET', 'POST'], 'escalafon/v-movimientos-acciones-motivos-regimenes/listar-paginado', [
    App\Http\Controllers\Escalafon\VMovimientoAccionMotivoRegimenController::class, 
    'listarPaginado'
])->name('v-movimientos-acciones-motivos-regimenes.listar-paginado');

Route::apiResource('escalafon/v-movimientos-acciones-motivos-regimenes', App\Http\Controllers\Escalafon\VMovimientoAccionMotivoRegimenController::class, [
    'parameters' => [
        'v-movimientos-acciones-motivos-regimenes' => 'v-movimientos-acciones-motivos-r'
    ]
]);
// Routes for esc.V_Otros
Route::match(['GET', 'POST'], 'escalafon/v-otros/listar-paginado', [
    App\Http\Controllers\Escalafon\VOtroController::class, 
    'listarPaginado'
])->name('v-otros.listar-paginado');

Route::apiResource('escalafon/v-otros', App\Http\Controllers\Escalafon\VOtroController::class, [
    'parameters' => [
        'v-otros' => 'v-otros'
    ]
]);
// Routes for esc.categorias_remunerativas
Route::match(['GET', 'POST'], 'escalafon/categorias-remunerativas/listar-paginado', [
    App\Http\Controllers\Escalafon\CategoriaRemunerativaController::class, 
    'listarPaginado'
])->name('categorias-remunerativas.listar-paginado');

Route::apiResource('escalafon/categorias-remunerativas', App\Http\Controllers\Escalafon\CategoriaRemunerativaController::class, [
    'parameters' => [
        'categorias-remunerativas' => 'categorias-remunerativas'
    ]
]);
// Routes for esc.V_MantenimientoCentrosLaborales
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-centros-laborales/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoCentroLaboralController::class, 
    'listarPaginado'
])->name('v-mantenimiento-centros-laborales.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-centros-laborales', App\Http\Controllers\Escalafon\VMantenimientoCentroLaboralController::class, [
    'parameters' => [
        'v-mantenimiento-centros-laborales' => 'v-mantenimiento-centros-laborale'
    ]
]);
// Routes for esc.V_MantenimientoCesesAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-ceses-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoCeseAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-ceses-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-ceses-acciones', App\Http\Controllers\Escalafon\VMantenimientoCeseAccionController::class, [
    'parameters' => [
        'v-mantenimiento-ceses-acciones' => 'v-mantenimiento-ceses-acciones'
    ]
]);
// Routes for esc.experencias_laborales_sectores
Route::match(['GET', 'POST'], 'escalafon/experiencias-laborales-sectores/listar-paginado', [
    App\Http\Controllers\Escalafon\ExperienciaLaboralSectorController::class, 
    'listarPaginado'
])->name('experiencias-laborales-sectores.listar-paginado');

Route::apiResource('escalafon/experiencias-laborales-sectores', App\Http\Controllers\Escalafon\ExperienciaLaboralSectorController::class, [
    'parameters' => [
        'experiencias-laborales-sectores' => 'experiencias-laborales-sectores'
    ]
]);
// Routes for esc.grupos_ocupacionales
Route::match(['GET', 'POST'], 'escalafon/grupos-ocupacionales/listar-paginado', [
    App\Http\Controllers\Escalafon\GrupoOcupacionalController::class, 
    'listarPaginado'
])->name('grupos-ocupacionales.listar-paginado');

Route::apiResource('escalafon/grupos-ocupacionales', App\Http\Controllers\Escalafon\GrupoOcupacionalController::class, [
    'parameters' => [
        'grupos-ocupacionales' => 'grupos-ocupacionales'
    ]
]);
// Routes for esc.V_MantenimientoCesesMotivosAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-ceses-motivos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoCeseMotivoAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-ceses-motivos-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-ceses-motivos-acciones', App\Http\Controllers\Escalafon\VMantenimientoCeseMotivoAccionController::class, [
    'parameters' => [
        'v-mantenimiento-ceses-motivos-acciones' => 'v-mantenimiento-ceses-motivos-ac'
    ]
]);
// Routes for esc.movimientos_acciones_motivos_regimenes
Route::match(['GET', 'POST'], 'escalafon/movimientos-acciones-motivos-regimenes/listar-paginado', [
    App\Http\Controllers\Escalafon\MovimientoAccionMotivoRegimenController::class, 
    'listarPaginado'
])->name('movimientos-acciones-motivos-regimenes.listar-paginado');

Route::apiResource('escalafon/movimientos-acciones-motivos-regimenes', App\Http\Controllers\Escalafon\MovimientoAccionMotivoRegimenController::class, [
    'parameters' => [
        'movimientos-acciones-motivos-regimenes' => 'movimientos-acciones-motivos-reg'
    ]
]);
// Routes for esc.V_MovimientosPersonales
Route::match(['GET', 'POST'], 'escalafon/v-movimientos-personales/listar-paginado', [
    App\Http\Controllers\Escalafon\VMovimientoPersonalController::class, 
    'listarPaginado'
])->name('v-movimientos-personales.listar-paginado');

Route::apiResource('escalafon/v-movimientos-personales', App\Http\Controllers\Escalafon\VMovimientoPersonalController::class, [
    'parameters' => [
        'v-movimientos-personales' => 'v-movimientos-personales'
    ]
]);
// Routes for esc.V_MantenimientoCompensacionesAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-compensaciones-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoCompensacionAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-compensaciones-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-compensaciones-acciones', App\Http\Controllers\Escalafon\VMantenimientoCompensacionAccionController::class, [
    'parameters' => [
        'v-mantenimiento-compensaciones-acciones' => 'v-mantenimiento-compensaciones-a'
    ]
]);
// Routes for esc.infopefamiliar_domicilios
Route::match(['GET', 'POST'], 'escalafon/infopefamiliar-domicilios/listar-paginado', [
    App\Http\Controllers\Escalafon\InfopefamiliarDomicilioController::class, 
    'listarPaginado'
])->name('infopefamiliar-domicilios.listar-paginado');

Route::apiResource('escalafon/infopefamiliar-domicilios', App\Http\Controllers\Escalafon\InfopefamiliarDomicilioController::class, [
    'parameters' => [
        'infopefamiliar-domicilios' => 'infopefamiliar-domicilios'
    ]
]);
// Routes for esc.tipos_sanciones
Route::match(['GET', 'POST'], 'escalafon/tipos-sanciones/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoSancionController::class, 
    'listarPaginado'
])->name('tipos-sanciones.listar-paginado');

Route::apiResource('escalafon/tipos-sanciones', App\Http\Controllers\Escalafon\TipoSancionController::class, [
    'parameters' => [
        'tipos-sanciones' => 'tipos-sanciones'
    ]
]);
// Routes for esc.V_MantenimientoCompensacionesMotivosAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-compensaciones-motivos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoCompensacionMotivoAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-compensaciones-motivos-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-compensaciones-motivos-acciones', App\Http\Controllers\Escalafon\VMantenimientoCompensacionMotivoAccionController::class, [
    'parameters' => [
        'v-mantenimiento-compensaciones-motivos-acciones' => 'v-mantenimiento-compensaciones-m'
    ]
]);
// Routes for esc.educacion_programas_generales
Route::match(['GET', 'POST'], 'escalafon/educacion-programas-generales/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionProgramaGeneralController::class, 
    'listarPaginado'
])->name('educacion-programas-generales.listar-paginado');

Route::apiResource('escalafon/educacion-programas-generales', App\Http\Controllers\Escalafon\EducacionProgramaGeneralController::class, [
    'parameters' => [
        'educacion-programas-generales' => 'educacion-programas-generales'
    ]
]);
// Routes for esc.V_MantenimientoDesplazamientosAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-desplazamientos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoDesplazamientoAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-desplazamientos-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-desplazamientos-acciones', App\Http\Controllers\Escalafon\VMantenimientoDesplazamientoAccionController::class, [
    'parameters' => [
        'v-mantenimiento-desplazamientos-acciones' => 'v-mantenimiento-desplazamientos-'
    ]
]);
// Routes for esc.V_MantenimientoDesplazamientosMotivosAcciones
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-desplazamientos-motivos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoDesplazamientoMotivoAccionController::class, 
    'listarPaginado'
])->name('v-mantenimiento-desplazamientos-motivos-acciones.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-desplazamientos-motivos-acciones', App\Http\Controllers\Escalafon\VMantenimientoDesplazamientoMotivoAccionController::class, [
    'parameters' => [
        'v-mantenimiento-desplazamientos-motivos-acciones' => 'v-mantenimiento-desplazamientos-'
    ]
]);
// Routes for esc.desplazamientos_acciones
Route::match(['GET', 'POST'], 'escalafon/desplazamientos-acciones/listar-paginado', [
    App\Http\Controllers\Escalafon\DesplazamientoAccionController::class, 
    'listarPaginado'
])->name('desplazamientos-acciones.listar-paginado');

Route::apiResource('escalafon/desplazamientos-acciones', App\Http\Controllers\Escalafon\DesplazamientoAccionController::class, [
    'parameters' => [
        'desplazamientos-acciones' => 'desplazamientos-acciones'
    ]
]);
// Routes for esc.acreditaciones_lenguas_nativas
Route::match(['GET', 'POST'], 'escalafon/acreditaciones-lenguas-nativas/listar-paginado', [
    App\Http\Controllers\Escalafon\AcreditacionLenguaNativaController::class, 
    'listarPaginado'
])->name('acreditaciones-lenguas-nativas.listar-paginado');

Route::apiResource('escalafon/acreditaciones-lenguas-nativas', App\Http\Controllers\Escalafon\AcreditacionLenguaNativaController::class, [
    'parameters' => [
        'acreditaciones-lenguas-nativas' => 'acreditaciones-lenguas-nativas'
    ]
]);
// Routes for esc.V_MantenimientoEducacionProgramas
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-educacion-programas/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoEducacionProgramaController::class, 
    'listarPaginado'
])->name('v-mantenimiento-educacion-programas.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-educacion-programas', App\Http\Controllers\Escalafon\VMantenimientoEducacionProgramaController::class, [
    'parameters' => [
        'v-mantenimiento-educacion-programas' => 'v-mantenimiento-educacion-progra'
    ]
]);
// Routes for esc.V_MantenimientoEducacionProgramasGenerales
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-educacion-programas-generales/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoEducacionProgramaGeneralController::class, 
    'listarPaginado'
])->name('v-mantenimiento-educacion-programas-generales.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-educacion-programas-generales', App\Http\Controllers\Escalafon\VMantenimientoEducacionProgramaGeneralController::class, [
    'parameters' => [
        'v-mantenimiento-educacion-programas-generales' => 'v-mantenimiento-educacion-progra'
    ]
]);
// Routes for esc.educacion_programas_profesionales
Route::match(['GET', 'POST'], 'escalafon/educacion-programas-profesionales/listar-paginado', [
    App\Http\Controllers\Escalafon\EducacionProgramaProfesionalController::class, 
    'listarPaginado'
])->name('educacion-programas-profesionales.listar-paginado');

Route::apiResource('escalafon/educacion-programas-profesionales', App\Http\Controllers\Escalafon\EducacionProgramaProfesionalController::class, [
    'parameters' => [
        'educacion-programas-profesionales' => 'educacion-programas-profesionale'
    ]
]);
// Routes for esc.V_FormacionesAcademicas
Route::match(['GET', 'POST'], 'escalafon/v-formaciones-academicas/listar-paginado', [
    App\Http\Controllers\Escalafon\VFormacionAcademicaController::class, 
    'listarPaginado'
])->name('v-formaciones-academicas.listar-paginado');

Route::apiResource('escalafon/v-formaciones-academicas', App\Http\Controllers\Escalafon\VFormacionAcademicaController::class, [
    'parameters' => [
        'v-formaciones-academicas' => 'v-formaciones-academicas'
    ]
]);
// Routes for esc.V_MantenimientoEducacionProgramasProfesionales
Route::match(['GET', 'POST'], 'escalafon/v-mantenimiento-educacion-programas-profesionales/listar-paginado', [
    App\Http\Controllers\Escalafon\VMantenimientoEducacionProgramaProfesionalController::class, 
    'listarPaginado'
])->name('v-mantenimiento-educacion-programas-profesionales.listar-paginado');

Route::apiResource('escalafon/v-mantenimiento-educacion-programas-profesionales', App\Http\Controllers\Escalafon\VMantenimientoEducacionProgramaProfesionalController::class, [
    'parameters' => [
        'v-mantenimiento-educacion-programas-profesionales' => 'v-mantenimiento-educacion-progra'
    ]
]);
// Routes for grl.paises
Route::match(['GET', 'POST'], 'escalafon/paises/listar-paginado', [
    App\Http\Controllers\Escalafon\PaisController::class, 
    'listarPaginado'
])->name('paises.listar-paginado');

Route::apiResource('escalafon/paises', App\Http\Controllers\Escalafon\PaisController::class, [
    'parameters' => [
        'paises' => 'paises'
    ]
]);
// Routes for grl.departamentos
Route::match(['GET', 'POST'], 'escalafon/departamentos/listar-paginado', [
    App\Http\Controllers\Escalafon\DepartamentoController::class, 
    'listarPaginado'
])->name('departamentos.listar-paginado');

Route::apiResource('escalafon/departamentos', App\Http\Controllers\Escalafon\DepartamentoController::class, [
    'parameters' => [
        'departamentos' => 'departamentos'
    ]
]);
// Routes for grl.personas
Route::match(['GET', 'POST'], 'escalafon/personas/listar-paginado', [
    App\Http\Controllers\Escalafon\PersonaController::class, 
    'listarPaginado'
])->name('personas.listar-paginado');

Route::apiResource('escalafon/personas', App\Http\Controllers\Escalafon\PersonaController::class, [
    'parameters' => [
        'personas' => 'personas'
    ]
]);
// Routes for grl.provincias
Route::match(['GET', 'POST'], 'escalafon/provincias/listar-paginado', [
    App\Http\Controllers\Escalafon\ProvinciaController::class, 
    'listarPaginado'
])->name('provincias.listar-paginado');

Route::apiResource('escalafon/provincias', App\Http\Controllers\Escalafon\ProvinciaController::class, [
    'parameters' => [
        'provincias' => 'provincias'
    ]
]);
// Routes for grl.distritos
Route::match(['GET', 'POST'], 'escalafon/distritos/listar-paginado', [
    App\Http\Controllers\Escalafon\DistritoController::class, 
    'listarPaginado'
])->name('distritos.listar-paginado');

Route::apiResource('escalafon/distritos', App\Http\Controllers\Escalafon\DistritoController::class, [
    'parameters' => [
        'distritos' => 'distritos'
    ]
]);
// Routes for grl.tipos_estados_civiles
Route::match(['GET', 'POST'], 'escalafon/tipos-estados-civiles/listar-paginado', [
    App\Http\Controllers\Escalafon\TipoEstadoCivilController::class, 
    'listarPaginado'
])->name('tipos-estados-civiles.listar-paginado');

Route::apiResource('escalafon/tipos-estados-civiles', App\Http\Controllers\Escalafon\TipoEstadoCivilController::class, [
    'parameters' => [
        'tipos-estados-civiles' => 'tipos-estados-civiles'
    ]
]);
