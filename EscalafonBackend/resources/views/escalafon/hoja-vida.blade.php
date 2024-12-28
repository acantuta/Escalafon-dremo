<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Hoja de Vida</title>
    <style>
        @page {
            size: A4;
            margin: 2.54cm;
        }
        body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            margin: 0;
            font-size: 9pt;
        }
        .section-title {
            font-weight: bold;
            background-color: #0072bc;
            color: white;
            padding: 3px 8px;
            margin-bottom: 8px;
            text-transform: uppercase;
            font-size: 9pt;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
        }
        td {
            vertical-align: top;
            padding: 1px 0;
            font-size: 8pt;
            line-height: 1.2;
        }
        .label-column {
            width: 250px;
            font-weight: bold;
            font-size: 8pt;
        }
        .colon-column {
            width: 15px;
            text-align: center;
            font-size: 8pt;
        }
        .value-column {
            word-wrap: break-word;
            font-weight: normal;
            font-size: 8pt;
        }
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .section-title {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
        .table-data {
            border: 1px solid #ccc;
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 8pt;
        }

        .table-data th {
            background-color: #dce6f1;
            border: 1px solid #ccc;
            padding: 3px 2px;
            font-weight: bold;
            text-align: center;
            font-size: 7pt;
            color: #000;
            text-transform: uppercase;
            line-height: 1.1;
        }

        .table-data td {
            border: 1px solid #ccc;
            padding: 2px;
            vertical-align: middle;
            font-size: 8pt;
            line-height: 1.2;
        }

        .table-data tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .table-data .item-column, 
        .table-data td:first-child {
            width: 5%;
            text-align: center;
            font-weight: bold;
            color: #000;
        }

        .table-data .tipo-direccion-column {
            width: 12%;
        }

        .table-data .zona-column {
            width: 15%;
        }

        .table-data .tipo-via-column {
            width: 10%;
        }

        .table-data .ubicacion-column {
            width: 25%;
        }

        .table-data .direccion-column {
            width: 23%;
        }

        .table-data .referencia-column {
            width: 10%;
        }

        /* Estilos adicionales para mejorar la presentación */
        .table-data td:first-child {
            font-weight: bold;
            color: #000;
        }

        .table-data th, .table-data td {
            white-space: normal;
            word-wrap: break-word;
            max-width: 0;
        }

        /* Ajuste para el mensaje de no registra */
        .no-data {
            text-align: center;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <div class="informe-titulo">
        <h1>REPORTE DE HOJA DE VIDA</h1>
        <h2>DIRECCIÓN REGIONAL DE EDUCACIÓN MOQUEGUA</h2>
    </div>

    <div class="section">
        <div class="section-title">SITUACIÓN LABORAL</div>
        <table>
            <tr>
                <td class="label-column">Apellidos y nombres</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $legajo->cLegPrimerApellido ?? '' }} {{ $legajo->cLegSegundoApellido ?? '' }}, {{ $legajo->cLegNombres ?? '' }}</td>
            </tr>
            <tr>
                <td class="label-column">Tipo y número de documento</td>
                <td class="colon-column">:</td>
                <td class="value-column">D.N.I. - {{ $legajo->cLegNumeroDocumentoIdentida ?? '' }}</td>
            </tr>
            <tr>
                <td class="label-column">Sexo</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ 
                    ($legajo->cLegSexo ?? '') === 'M' ? 'MASCULINO' : 
                    (($legajo->cLegSexo ?? '') === 'F' ? 'FEMENINO' : 
                    (($legajo->cLegSexo ?? '') === 'O' ? 'OTROS' : 'DESCONOCIDO'))
                }}</td>
            </tr>
            <tr>
                <td class="label-column">Régimen laboral</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $legajo->cRegLabNombre ?? '' }}</td>
            </tr>
            <tr>
                <td class="label-column">Modalidad/Nivel educativo</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $legajo->cModEduNombre ?? '' }} {{ $legajo->iNivEduNombre ? '/ '.$legajo->iNivEduNombre : '' }}</td>
            </tr>
            <tr>
                <td class="label-column">Institución educativa</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $legajo->cInstGeEduNombre ?? '' }} {{ $legajo->cCentLabCodigoModular ? '/ '.$legajo->cCentLabCodigoModular : '' }}</td>
            </tr>
            <tr>
                <td class="label-column">Código de plaza</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $legajo->cLegCodigoPlaza ?? '' }}</td>
            </tr>
            <tr>
                <td class="label-column">Cargo actual</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $legajo->cLegCargo ?? '' }}</td>
            </tr>
            <tr>
                <td class="label-column">Jornada laboral</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $legajo->cJorLabNombre ?? '' }}</td>
            </tr>

            <tr>
                <td class="label-column">Situación laboral</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $legajo->cSitLabNombre ?? '' }}</td>
            </tr>

            <tr>
                <td class="label-column">Tiempo de servicio</td>
                <td class="colon-column">:</td>
                <td class="value-column">{{ $hojaVida['tiempoServicio'] }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">INFORMACIÓN DETALLADA DE LA HOJA DE VIDA</div>
        
        <div class="section-title" style="background-color: #666666;">SECCIÓN 1: FILIACIÓN E IDENTIFICACIÓN</div>
        
        <div class="section-title" style="background-color: #0072bc;">1.1 DATOS GENERALES</div>
        
        <div class="section-title" style="background-color: #cccccc; color: black;">1.1.1. DATOS DE LICENCIADO DE FUERZAS ARMADAS</div>
        <table>
            @if($legajo->bLegLicenciadoFaa)
                <tr>
                    <td class="label-column">Constancia FAA</td>
                    <td class="colon-column">:</td>
                    <td class="value-column">{{ $legajo->cLegConstanciaFaa ?? 'No registra' }}</td>
                </tr>
            @else
                <tr>
                    <td colspan="3">No registra datos de licenciado de las fuerzas armadas.</td>
                </tr>
            @endif
        </table>

        <div class="section-title" style="background-color: #cccccc; color: black;">1.1.2. DATOS DE DISCAPACIDAD</div>
        <table>
            @if($legajo->bLegTieneDiscapacidad)
                <tr>
                    <td class="label-column">Entidad emisora</td>
                    <td class="colon-column">:</td>
                    <td class="value-column">{{ $legajo->cLegEntidadEmisoraDiscapacidad ?? 'No registra' }}</td>
                </tr>
                <tr>
                    <td class="label-column">Número de documento</td>
                    <td class="colon-column">:</td>
                    <td class="value-column">{{ $legajo->cLegNumeroDocumentoDiscapacidad ?? 'No registra' }}</td>
                </tr>
                <tr>
                    <td class="label-column">Fecha de emisión</td>
                    <td class="colon-column">:</td>
                    <td class="value-column">{{ $legajo->dLegFechaEmisionDocumentoDiscapacidad ? \Carbon\Carbon::parse($legajo->dLegFechaEmisionDocumentoDiscapacidad)->format('d/m/Y') : 'No registra' }}</td>
                </tr>
                <tr>
                    <td class="label-column">Nombre de discapacidad</td>
                    <td class="colon-column">:</td>
                    <td class="value-column">{{ $legajo->cLegNombreDiscapacidad ?? 'No registra' }}</td>
                </tr>
                <tr>
                    <td class="label-column">Grado de discapacidad</td>
                    <td class="colon-column">:</td>
                    <td class="value-column">{{ $legajo->cLegGradoDiscapacidad ?? 'No registra' }}</td>
                </tr>
            @else
                <tr>
                    <td colspan="3">No registra datos de discapacidad</td>
                </tr>
            @endif
        </table>

        <div class="section-title" style="background-color: #cccccc; color: black;">1.1.3. DATOS DOMICILIARIOS</div>
        @if(count($legajo->domicilios) > 0)
            <table class="table-data">
                <tr>
                    <th class="item-column">#</th>
                    <th class="tipo-direccion-column">TIPO DE DIRECCIÓN</th>
                    <th class="zona-column">ZONA</th>
                    <th class="tipo-via-column">TIPO DE VÍA</th>
                    <th class="ubicacion-column">DEPARTAMENTO - PROVINCIA - DISTRITO</th>
                    <th class="direccion-column">DIRECCIÓN</th>
                    <th class="referencia-column">REFERENCIA</th>
                </tr>
                @foreach($legajo->domicilios as $index => $domicilio)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $domicilio->cTipDirNombre ?? 'No registra' }}</td>
                        <td>{{ $domicilio->cZonaNombre ?? 'No registra' }}</td>
                        <td>{{ $domicilio->cTipViaNombre ?? 'No registra' }}</td>
                        <td>{{ $domicilio->cDptoNombre ?? '' }} - {{ $domicilio->cPrvnNombre ?? '' }} - {{ $domicilio->cDsttNombre ?? '' }}</td>
                        <td>{{ $domicilio->cInfoPeFamDireccion ?? 'No registra' }}</td>
                        <td>{{ $domicilio->cInfoPeFamReferencia ?? 'No registra' }}</td>
                    </tr>
                @endforeach
            </table>
        @else
            <div class="no-data">
                No registra datos domiciliarios
            </div>
        @endif

        <div class="section-title" style="background-color: #cccccc; color: black;">1.1.4. DATOS FAMILIARES</div>
        @if(count($legajo->familiares) > 0)
            <table class="table-data">
                <tr>
                    <th class="item-column">#</th>
                    <th style="width: 25%;">APELLIDOS Y NOMBRES</th>
                    <th style="width: 12%;">TIPO DOCUMENTO</th>
                    <th style="width: 10%;">NRO DOCUMENTO</th>
                    <th style="width: 8%;">SEXO</th>
                    <th style="width: 10%;">F. NACIMIENTO</th>
                    <th style="width: 15%;">PARENTESCO</th>
                    <th style="width: 10%;">DERECHOHABIENTE</th>
                    <th style="width: 10%;">SITUACIÓN</th>
                </tr>
                @foreach($legajo->familiares as $index => $familiar)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $familiar->cInfoPeFamFamiPrimerApellido }} {{ $familiar->cInfoPeFamFamiSegundoApellido }} {{ $familiar->cInfoPeFamFamiNombres }}</td>
                        <td>{{ $familiar->cTipoIdentNombre }}</td>
                        <td>{{ $familiar->cInfoPeFamFamiNumeroDocumento }}</td>
                        <td>{{ $familiar->cInfoPeFamFamiSexo === 'M' ? 'MASCULINO' : 'FEMENINO' }}</td>
                        <td>{{ $familiar->dInfoPeFamFamiFechaNacimiento ? \Carbon\Carbon::parse($familiar->dInfoPeFamFamiFechaNacimiento)->format('d/m/Y') : '' }}</td>
                        <td>{{ $familiar->cInfoPeFamParentNombre }}</td>
                        <td>{{ $familiar->bInfoPeFamFamiEsDerechohabiente ? 'SÍ' : 'NO' }}</td>
                        <td>{{ $familiar->bInfoPeFamFamiEsFallecido ? 'FALLECIDO' : 'VIVO' }}</td>
                    </tr>
                @endforeach
            </table>
        @else
            <div class="no-data">
                No registra datos familiares
            </div>
        @endif

        <div class="section-title" style="background-color: #cccccc; color: black;">1.1.5. DECLARACIÓN JURADA, CERTIFICADOS Y OTROS</div>
        @if(count($legajo->declaraciones) > 0)
            <table class="table-data">
                <tr>
                    <th class="item-column">#</th>
                    <th style="width: 35%;">TIPO DE DOCUMENTO</th>
                    <th style="width: 25%;">FECHA DE EMISIÓN</th>
                    <th style="width: 40%;">ANOTACIONES</th>
                </tr>
                @foreach($legajo->declaraciones as $index => $declaracion)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $declaracion->cInfoPeFamDecTipNombre }}</td>
                        <td>{{ $declaracion->dtInfoPeFamDecFechaEmision ? \Carbon\Carbon::parse($declaracion->dtInfoPeFamDecFechaEmision)->format('d/m/Y') : '' }}</td>
                        <td>{{ $declaracion->cInfoPeFamDecAnotaciones }}</td>
                    </tr>
                @endforeach
            </table>
        @else
            <div class="no-data">
                No registra declaraciones juradas
            </div>
        @endif
    </div>

    <div class="section-title" style="background-color: #666666;">SECCIÓN 2: INCORPORACIÓN</div>

    <div class="section-title" style="background-color: #0072bc;">2.1 FORMALIZACIÓN DEL VÍNCULO</div>

    @if(isset($legajo->vinculaciones) && count($legajo->vinculaciones) > 0)
        <table class="table-data">
            <tr>
                <th class="item-column">#</th>
                <th style="width: 15%;">ACCIÓN</th>
                <th style="width: 15%;">MOTIVO</th>
                <th style="width: 15%;">RÉGIMEN</th>
                <th style="width: 10%;">F. INICIO</th>
                <th style="width: 10%;">F. FIN</th>
                <th style="width: 20%;">CENTRO LABORAL</th>
                <th style="width: 15%;">CARGO</th>
            </tr>
            @foreach($legajo->vinculaciones as $index => $vinculacion)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $vinculacion->cAccVincNombre }}</td>
                    <td>{{ $vinculacion->cMotAccVincNombre }}</td>
                    <td>{{ $vinculacion->cRegLabNombre }}</td>
                    <td>{{ $vinculacion->dtVincLabFechaInicio ? \Carbon\Carbon::parse($vinculacion->dtVincLabFechaInicio)->format('d/m/Y') : '' }}</td>
                    <td>{{ $vinculacion->dtVincLabFechaFin ? \Carbon\Carbon::parse($vinculacion->dtVincLabFechaFin)->format('d/m/Y') : '' }}</td>
                    <td>{{ $vinculacion->cCentLabNombre }}</td>
                    <td>{{ $vinculacion->cCargLabNombre }}</td>
                </tr>
                @if($vinculacion->cVincLabAnotaciones)
                    <tr>
                        <td colspan="8" style="background-color: #f5f5f5;">
                            Anotaciones: {{ $vinculacion->cVincLabAnotaciones }}
                        </td>
                    </tr>
                @endif
            @endforeach
        </table>
    @else
        <div class="no-data">
            No registra datos de vinculación laboral
        </div>
    @endif

    <div class="section-title" style="background-color: #0072bc;">2.2 DOCUMENTACIÓN DEL PROCESO, INDUCCIÓN, PRUEBA Y OTROS</div>

    @if(isset($legajo->documentosIncorporacion) && count($legajo->documentosIncorporacion) > 0)
        <table class="table-data">
            <tr>
                <th class="item-column">#</th>
                <th style="width: 35%;">TIPO DE DOCUMENTO</th>
                <th style="width: 20%;">FECHA DE EMISIÓN</th>
                <th style="width: 45%;">ANOTACIONES</th>
            </tr>
            @foreach($legajo->documentosIncorporacion as $index => $documento)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $documento->cIncorTipDocNombre }}</td>
                    <td>{{ $documento->dIncorDocFechEmision ? \Carbon\Carbon::parse($documento->dIncorDocFechEmision)->format('d/m/Y') : '' }}</td>
                    <td>{{ $documento->cIncorDocAnotaciones }}</td>
                </tr>
            @endforeach
        </table>
    @else
        <div class="no-data">
            No registra documentos del proceso de incorporación
        </div>
    @endif

    <div class="section-title" style="background-color: #666666;">SECCIÓN 3: FORMACIÓN ACADÉMICA Y CAPACITACIÓN</div>

    <div class="section-title" style="background-color: #0072bc;">3.1 FORMACIÓN ACADÉMICA Y TÍTULOS</div>

    @if(isset($legajo->formacionAcademica) && count($legajo->formacionAcademica) > 0)
        <table class="table-data">
            <tr>
                <th class="item-column">#</th>
                <th style="width: 15%;">NIVEL EDUCATIVO</th>
                <th style="width: 25%;">CENTRO DE ESTUDIOS</th>
                <th style="width: 15%;">SITUACIÓN ACADÉMICA</th>
                <th style="width: 15%;">GRADO/TÍTULO</th>
                <th style="width: 20%;">ESPECIALIDAD</th>
                <th style="width: 10%;">PERIODO</th>
            </tr>
            @foreach($legajo->formacionAcademica as $index => $formacion)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $formacion->cEduNivEdNombre }}</td>
                    <td>{{ $formacion->cFormAcadCentroEstudios }}</td>
                    <td>{{ $formacion->cEduSitAcadNombre }}</td>
                    <td>{{ $formacion->cEduGradAlcNombre }}</td>
                    <td>{{ $formacion->cFormAcadEspecialidad }}</td>
                    <td>{{ $formacion->iEduSitAcadAnioInicio }} - {{ $formacion->iEduSitAcadAnioFin ?: 'Actual' }}</td>
                </tr>
                @if($formacion->cFormAcadTitulo || $formacion->cFormAcadNumeroRegistro)
                    <tr>
                        <td colspan="7" style="background-color: #f5f5f5;">
                            @if($formacion->cFormAcadTitulo)
                                Título: {{ $formacion->cFormAcadTitulo }}
                            @endif
                            @if($formacion->cFormAcadNumeroRegistro)
                                @if($formacion->cFormAcadTitulo) | @endif
                                Registro: {{ $formacion->cFormAcadNumeroRegistro }}
                                @if($formacion->dtFormAcadFechaRegistro)
                                    ({{ \Carbon\Carbon::parse($formacion->dtFormAcadFechaRegistro)->format('d/m/Y') }})
                                @endif
                            @endif
                        </td>
                    </tr>
                @endif
            @endforeach
        </table>
    @else
        <div class="no-data">
            No registra datos de formación académica
        </div>
    @endif
    <!-- Después de la sección 3.1 -->

<div class="section-title" style="background-color: #0072bc;">3.2 CAPACITACIONES</div>

@if(isset($legajo->capacitaciones) && count($legajo->capacitaciones) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">TIPO DE ESTUDIOS</th>
            <th style="width: 20%;">INSTITUCIÓN</th>
            <th style="width: 25%;">TEMA</th>
            <th style="width: 15%;">DOCUMENTO</th>
            <th style="width: 10%;">F. INICIO</th>
            <th style="width: 10%;">F. FIN</th>
            <th style="width: 5%;">HORAS</th>
        </tr>
        @foreach($legajo->capacitaciones as $index => $capacitacion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $capacitacion->cEduTipEstNombre }}</td>
                <td>{{ $capacitacion->cCapaInstitucion }}</td>
                <td>{{ $capacitacion->cCapaTema }}</td>
                <td>{{ $capacitacion->cEduDocAcredNombre }}</td>
                <td>{{ $capacitacion->dtFechaInicio ? \Carbon\Carbon::parse($capacitacion->dtFechaInicio)->format('d/m/Y') : '' }}</td>
                <td>{{ $capacitacion->dtFechaFin ? \Carbon\Carbon::parse($capacitacion->dtFechaFin)->format('d/m/Y') : '' }}</td>
                <td>{{ $capacitacion->iCapaDuracionHoras }}</td>
            </tr>
            @if($capacitacion->cCapaNumeroRegistro || $capacitacion->cCapaAnotaciones)
                <tr>
                    <td colspan="8" style="background-color: #f5f5f5;">
                        @if($capacitacion->cCapaAnotaciones)
                            @if($capacitacion->cCapaNumeroRegistro) | @endif
                            Observaciones: {{ $capacitacion->cCapaAnotaciones }}
                        @endif
                    </td>
                </tr>
            @endif
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra datos de capacitaciones
    </div>
@endif 

<div class="section-title" style="background-color: #666666;">SECCIÓN 4: EXPERIENCIA LABORAL</div>

@if(isset($legajo->experienciasLaborales) && count($legajo->experienciasLaborales) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">SECTOR</th>
            <th style="width: 20%;">ENTIDAD</th>
            <th style="width: 15%;">CARGO</th>
            <th style="width: 10%;">F. INICIO</th>
            <th style="width: 10%;">F. FIN</th>
            <th style="width: 30%;">FUNCIONES</th>
        </tr>
        @foreach($legajo->experienciasLaborales as $index => $experiencia)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $experiencia->cExpLabSecNombre }}</td>
                <td>{{ $experiencia->cExpLabEntidad }}</td>
                <td>{{ $experiencia->cExpLabCargo }}</td>
                <td>{{ $experiencia->dtExpLabFechaInicio ? \Carbon\Carbon::parse($experiencia->dtExpLabFechaInicio)->format('d/m/Y') : '' }}</td>
                <td>{{ $experiencia->dtExpLabFechaFin ? \Carbon\Carbon::parse($experiencia->dtExpLabFechaFin)->format('d/m/Y') : '' }}</td>
                <td>{{ $experiencia->cExpLabFuncionesDesempenadas }}</td>
            </tr>
            @if($experiencia->cExpLabAnotaciones)
                <tr>
                    <td colspan="7" style="background-color: #f5f5f5;">
                        Anotaciones: {{ $experiencia->cExpLabAnotaciones }}
                    </td>
                </tr>
            @endif
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra experiencia laboral
    </div>
@endif

<div class="section-title" style="background-color: #666666;">SECCIÓN 5: MOVIMIENTOS DE PERSONAL</div>

@if(isset($legajo->movimientosPersonal) && count($legajo->movimientosPersonal) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">ACCIÓN</th>
            <th style="width: 15%;">MOTIVO</th>
            <th style="width: 15%;">RÉGIMEN</th>
            <th style="width: 10%;">F. INICIO</th>
            <th style="width: 10%;">F. FIN</th>
            <th style="width: 15%;">DOCUMENTO</th>
            <th style="width: 20%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->movimientosPersonal as $index => $movimiento)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $movimiento->cMovAccNombre }}</td>
                <td>{{ $movimiento->cMovMotNombre }}</td>
                <td>{{ $movimiento->cRegLabNombre }}</td>
                <td>{{ $movimiento->dtVacLicFechaInicio ? \Carbon\Carbon::parse($movimiento->dtVacLicFechaInicio)->format('d/m/Y') : '' }}</td>
                <td>{{ $movimiento->dtVacLicFechaFin ? \Carbon\Carbon::parse($movimiento->dtVacLicFechaFin)->format('d/m/Y') : '' }}</td>
                <td>{{ $movimiento->cVacLicNumeroDocumento }}</td>
                <td>{{ $movimiento->cVacLicAnotaciones }}</td>
            </tr>
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra movimientos de personal
    </div>
@endif

<div class="section-title" style="background-color: #666666;">SECCIÓN 6: COMPENSACIONES</div>

<!-- Subsección 6.1: Compensaciones -->
<div class="section-title" style="background-color: #0072bc;">6.1 COMPENSACIONES</div>

@if(isset($legajo->compensaciones) && count($legajo->compensaciones) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">ACCIÓN</th>
            <th style="width: 15%;">MOTIVO</th>
            <th style="width: 15%;">RÉGIMEN</th>
            <th style="width: 10%;">DOCUMENTO</th>
            <th style="width: 10%;">FECHA</th>
            <th style="width: 10%;">IMPORTE</th>
            <th style="width: 25%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->compensaciones as $index => $compensacion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $compensacion->cCompAccNombre }}</td>
                <td>{{ $compensacion->cCompMotAccNombre }}</td>
                <td>{{ $compensacion->cRegLabNombre }}</td>
                <td>{{ $compensacion->cAsigIncNumeroDocumento }}</td>
                <td>{{ $compensacion->dtAsigIncFechaDocumento ? \Carbon\Carbon::parse($compensacion->dtAsigIncFechaDocumento)->format('d/m/Y') : '' }}</td>
                <td>S/. {{ number_format($compensacion->nAsigIncMonto, 2) }}</td>
                <td>{{ $compensacion->cAsigIncAnotaciones }}</td>
            </tr>
            @if($compensacion->cAsigIncFallecido)
                <tr>
                    <td colspan="8" style="background-color: #f5f5f5;">
                        Fallecido: {{ $compensacion->cAsigIncFallecido === 'familiar' ? 'FAMILIAR DIRECTO' : 'TITULAR' }}
                        @if($compensacion->cAsigIncFallecido === 'familiar')
                            | Derecho habiente: {{ $compensacion->cAsigIncDerechoHabienteFallecido }}
                            | Subsidiado: {{ $compensacion->cAsigIncDerechoSubsidiado }}
                        @endif
                    </td>
                </tr>
            @endif
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra compensaciones
    </div>
@endif

<!-- Subsección 6.2: Retenciones -->
<div class="section-title" style="background-color: #0072bc;">6.2 RETENCIONES</div>

@if(isset($legajo->retenciones) && count($legajo->retenciones) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">DOCUMENTO</th>
            <th style="width: 10%;">FECHA</th>
            <th style="width: 20%;">TIPO RETENCIÓN</th>
            <th style="width: 15%;">MONTO FIJO</th>
            <th style="width: 10%;">% MENSUAL</th>
            <th style="width: 30%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->retenciones as $index => $retencion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $retencion->cRetenNumeroDocumento }}</td>
                <td>{{ $retencion->dtRetenFechaDocumento ? \Carbon\Carbon::parse($retencion->dtRetenFechaDocumento)->format('d/m/Y') : '' }}</td>
                <td>{{ $retencion->cTipRetenNombre }}</td>
                <td>S/. {{ number_format($retencion->nRetenMontoFijoMensual, 2) }}</td>
                <td>{{ $retencion->nRetenPorcentajeFijoMensual }}%</td>
                <td>{{ $retencion->cRetenAnotaciones }}</td>
            </tr>
            @if($retencion->cRetenNombreBeneficiario)
                <tr>
                    <td colspan="7" style="background-color: #f5f5f5;">
                        Beneficiario: {{ $retencion->cRetenNombreBeneficiario }}
                    </td>
                </tr>
            @endif
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra retenciones
    </div>
@endif

<div class="section-title" style="background-color: #666666;">SECCIÓN 7: EVALUACIÓN DE DESEMPEÑO, PROGRESIÓN EN LA CARRERA Y DESPLAZAMIENTO</div>

<!-- Subsección 7.1: Desplazamientos -->
<div class="section-title" style="background-color: #0072bc;">7.1 DESPLAZAMIENTOS</div>

@if(isset($legajo->desplazamientos) && count($legajo->desplazamientos) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">ACCIÓN</th>
            <th style="width: 15%;">MOTIVO</th>
            <th style="width: 15%;">RÉGIMEN</th>
            <th style="width: 10%;">F. INICIO</th>
            <th style="width: 10%;">F. FIN</th>
            <th style="width: 15%;">ORIGEN</th>
            <th style="width: 20%;">DESTINO</th>
        </tr>
        @foreach($legajo->desplazamientos as $index => $desplazamiento)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $desplazamiento->cDespNombre }}</td>
                <td>{{ $desplazamiento->Expr1 }}</td>
                <td>{{ $desplazamiento->cRegLabNombre }}</td>
                <td>{{ $desplazamiento->dtFechaInicio ? \Carbon\Carbon::parse($desplazamiento->dtFechaInicio)->format('d/m/Y') : '' }}</td>
                <td>{{ $desplazamiento->dtFechaFin ? \Carbon\Carbon::parse($desplazamiento->dtFechaFin)->format('d/m/Y') : '' }}</td>
                <td>{{ $desplazamiento->cDespCodigoModularOrigen }}</td>
                <td>{{ $desplazamiento->cDespCodigoModularDestino }}</td>
            </tr>
            @if($desplazamiento->cDespAnotaciones)
                <tr>
                    <td colspan="8" style="background-color: #f5f5f5;">
                        Anotaciones: {{ $desplazamiento->cDespAnotaciones }}
                    </td>
                </tr>
            @endif
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra desplazamientos
    </div>
@endif

<!-- Subsección 7.2: Ascensos -->
<div class="section-title" style="background-color: #0072bc;">7.2 ASCENSOS</div>

@if(isset($legajo->ascensos) && count($legajo->ascensos) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">ACCIÓN</th>
            <th style="width: 15%;">MOTIVO</th>
            <th style="width: 15%;">RÉGIMEN</th>
            <th style="width: 10%;">F. INICIO</th>
            <th style="width: 15%;">DOCUMENTO</th>
            <th style="width: 30%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->ascensos as $index => $ascenso)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $ascenso->cAscAccNombre }}</td>
                <td>{{ $ascenso->cAscMotNombre }}</td>
                <td>{{ $ascenso->cRegLabNombre }}</td>
                <td>{{ $ascenso->dtAscFechaInicio ? \Carbon\Carbon::parse($ascenso->dtAscFechaInicio)->format('d/m/Y') : '' }}</td>
                <td>{{ $ascenso->cAscNumeroDocumento }}</td>
                <td>{{ $ascenso->cAscAnotaciones }}</td>
            </tr>
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra ascensos
    </div>
@endif

<!-- Subsección 7.3: Evaluaciones de Desempeño -->
<div class="section-title" style="background-color: #0072bc;">7.3 EVALUACIONES DE DESEMPEÑO</div>

@if(isset($legajo->evaluacionesDesempenio) && count($legajo->evaluacionesDesempenio) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">ACCIÓN</th>
            <th style="width: 15%;">MOTIVO</th>
            <th style="width: 15%;">RÉGIMEN</th>
            <th style="width: 15%;">DOCUMENTO</th>
            <th style="width: 10%;">FECHA</th>
            <th style="width: 30%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->evaluacionesDesempenio as $index => $evaluacion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $evaluacion->cEvalDesAccNombre }}</td>
                <td>{{ $evaluacion->cEvalDescAccMotNombre }}</td>
                <td>{{ $evaluacion->cRegLabNombre }}</td>
                <td>{{ $evaluacion->cEvalDesNumeroDocumento }}</td>
                <td>{{ $evaluacion->dtEvalDesFechaDocumento ? \Carbon\Carbon::parse($evaluacion->dtEvalDesFechaDocumento)->format('d/m/Y') : '' }}</td>
                <td>{{ $evaluacion->cEvalDesAnotaciones }}</td>
            </tr>
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra evaluaciones de desempeño
    </div>
@endif

<div class="section-title" style="background-color: #666666;">SECCIÓN 8: RECONOCIMIENTOS Y SANCIONES</div>

<!-- Subsección 8.1: Reconocimientos -->
<div class="section-title" style="background-color: #0072bc;">8.1 RECONOCIMIENTOS</div>

@if(isset($legajo->reconocimientos) && count($legajo->reconocimientos) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">TIPO DE MÉRITO</th>
            <th style="width: 15%;">MÉRITO</th>
            <th style="width: 20%;">ENTIDAD EMISORA</th>
            <th style="width: 10%;">F. INICIO</th>
            <th style="width: 15%;">DOCUMENTO</th>
            <th style="width: 25%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->reconocimientos as $index => $reconocimiento)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $reconocimiento->cRecoTipMerNombre }}</td>
                <td>{{ $reconocimiento->cRecoMerNombre }}</td>
                <td>{{ $reconocimiento->cRecoEntidadEmisora }}</td>
                <td>{{ $reconocimiento->dtRecoFechaInicio ? \Carbon\Carbon::parse($reconocimiento->dtRecoFechaInicio)->format('d/m/Y') : '' }}</td>
                <td>{{ $reconocimiento->cRecoNumeroDocumento }}</td>
                <td>{{ $reconocimiento->cRecoAnotaciones }}</td>
            </tr>
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra reconocimientos
    </div>
@endif

<!-- Subsección 8.2: Sanciones -->
<div class="section-title" style="background-color: #0072bc;">8.2 SANCIONES</div>

@if(isset($legajo->sanciones) && count($legajo->sanciones) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 20%;">CAUSA/MOTIVO</th>
            <th style="width: 15%;">DOCUMENTO</th>
            <th style="width: 10%;">F. NOTIFICACIÓN</th>
            <th style="width: 10%;">F. INICIO</th>
            <th style="width: 10%;">F. FIN</th>
            <th style="width: 25%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->sanciones as $index => $sancion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $sancion->cSancCausaMotivo }}</td>
                <td>{{ $sancion->cSancNumeroDocumento }}</td>
                <td>{{ $sancion->dtSancFechaNotificacion ? \Carbon\Carbon::parse($sancion->dtSancFechaNotificacion)->format('d/m/Y') : '' }}</td>
                <td>{{ $sancion->dtSancFechaInicio ? \Carbon\Carbon::parse($sancion->dtSancFechaInicio)->format('d/m/Y') : '' }}</td>
                <td>{{ $sancion->dtSancFechaFin ? \Carbon\Carbon::parse($sancion->dtSancFechaFin)->format('d/m/Y') : '' }}</td>
                <td>{{ $sancion->cSancAnotaciones }}</td>
            </tr>
            @if($sancion->cSancInstitucionEmiteDocumento)
                <tr>
                    <td colspan="7" style="background-color: #f5f5f5;">
                        Institución emisora: {{ $sancion->cSancInstitucionEmiteDocumento }}
                    </td>
                </tr>
            @endif
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra sanciones
    </div>
@endif

<div class="section-title" style="background-color: #666666;">SECCIÓN 9: RELACIONES LABORALES INDIVIDUALES Y COLECTIVAS</div>

@if(isset($legajo->relacionesIndividualesColectivas) && count($legajo->relacionesIndividualesColectivas) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 20%;">TIPO DE DOCUMENTO</th>
            <th style="width: 15%;">F. EMISIÓN</th>
            <th style="width: 65%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->relacionesIndividualesColectivas as $index => $relacion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $relacion->cTipoDocNombre }}</td>
                <td>{{ $relacion->dtRelaIndColecFechaEmision ? \Carbon\Carbon::parse($relacion->dtRelaIndColecFechaEmision)->format('d/m/Y') : '' }}</td>
                <td>{{ $relacion->cRelaIndColecAnotaciones }}</td>
            </tr>
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra relaciones laborales individuales y colectivas
    </div>
@endif

<div class="section-title" style="background-color: #666666;">SECCIÓN 10: SEGURIDAD Y SALUD EN EL TRABAJO. BIENESTAR SOCIAL</div>

@if(isset($legajo->seguridadSaludBienestar) && count($legajo->seguridadSaludBienestar) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 20%;">TIPO DE DOCUMENTO</th>
            <th style="width: 15%;">F. EMISIÓN</th>
            <th style="width: 65%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->seguridadSaludBienestar as $index => $registro)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $registro->cTipoDocNombre }}</td>
                <td>{{ $registro->dtSegSalBieFechaEmision ? \Carbon\Carbon::parse($registro->dtSegSalBieFechaEmision)->format('d/m/Y') : '' }}</td>
                <td>{{ $registro->cSegSalBieAnotaciones }}</td>
            </tr>
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra documentos de seguridad y salud en el trabajo
    </div>
@endif

<div class="section-title" style="background-color: #666666;">SECCIÓN 11: DESVINCULACIÓN</div>

<!-- Subsección 11.1: Sistema Pensionario -->
<div class="section-title" style="background-color: #0072bc;">11.1 SISTEMA PENSIONARIO</div>

@if(isset($legajo->sistemasPensionarios) && count($legajo->sistemasPensionarios) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">RÉGIMEN</th>
            <th style="width: 15%;">AFP</th>
            <th style="width: 15%;">CUSPP</th>
            <th style="width: 10%;">F. AFILIACIÓN</th>
            <th style="width: 10%;">F. VIGENCIA</th>
            <th style="width: 10%;">F. DEVENGUE</th>
            <th style="width: 25%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->sistemasPensionarios as $index => $sistema)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $sistema->cRegPenNombre }}</td>
                <td>{{ $sistema->cAdmFonPenNombre }}</td>
                <td>{{ $sistema->cSisPenNumeroCuspp }}</td>
                <td>{{ $sistema->dtSisPenFechaAfiliacion ? \Carbon\Carbon::parse($sistema->dtSisPenFechaAfiliacion)->format('d/m/Y') : '' }}</td>
                <td>{{ $sistema->dtSisPenFechaVigencia ? \Carbon\Carbon::parse($sistema->dtSisPenFechaVigencia)->format('d/m/Y') : '' }}</td>
                <td>{{ $sistema->dtSisPenFechaDevengue ? \Carbon\Carbon::parse($sistema->dtSisPenFechaDevengue)->format('d/m/Y') : '' }}</td>
                <td>{{ $sistema->cSisPenAnotaciones }}</td>
            </tr>
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra información del sistema pensionario
    </div>
@endif

<!-- Subsección 11.2: Ceses -->
<div class="section-title" style="background-color: #0072bc;">11.2 CESES</div>

@if(isset($legajo->ceses) && count($legajo->ceses) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 15%;">ACCIÓN</th>
            <th style="width: 15%;">MOTIVO</th>
            <th style="width: 15%;">RÉGIMEN</th>
            <th style="width: 15%;">DOCUMENTO</th>
            <th style="width: 10%;">F. CESE</th>
            <th style="width: 30%;">TIEMPO DE SERVICIO</th>
        </tr>
        @foreach($legajo->ceses as $index => $cese)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $cese->cCesAccNombre }}</td>
                <td>{{ $cese->cCesMotAccNombre }}</td>
                <td>{{ $cese->cRegLabNombre }}</td>
                <td>{{ $cese->cCesesNumeroDocumento }}</td>
                <td>{{ $cese->dtCesesFechaCese ? \Carbon\Carbon::parse($cese->dtCesesFechaCese)->format('d/m/Y') : '' }}</td>
                <td>{{ $cese->iCesesServicioAnios }} años, {{ $cese->iCesesServicioMeses }} meses, {{ $cese->iCesesServicioDias }} días</td>
            </tr>
            @if($cese->cCesesAnotaciones)
                <tr>
                    <td colspan="7" style="background-color: #f5f5f5;">
                        Anotaciones: {{ $cese->cCesesAnotaciones }}
                    </td>
                </tr>
            @endif
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra ceses
    </div>
@endif

@php
    \Log::info('Datos en la vista:', [
        'sistemas_pensionarios' => $legajo->sistemasPensionarios->count(),
        'ceses' => $legajo->ceses->count()
    ]);
@endphp

<div class="section-title" style="background-color: #666666;">SECCIÓN 12: OTROS</div>

@if(isset($legajo->otros) && count($legajo->otros) > 0)
    <table class="table-data">
        <tr>
            <th class="item-column">#</th>
            <th style="width: 20%;">TIPO DE DOCUMENTO</th>
            <th style="width: 15%;">F. EMISIÓN</th>
            <th style="width: 65%;">ANOTACIONES</th>
        </tr>
        @foreach($legajo->otros as $index => $otro)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $otro->cTipoDocNombre }}</td>
                <td>{{ $otro->dtOtrosFechaEmision ? \Carbon\Carbon::parse($otro->dtOtrosFechaEmision)->format('d/m/Y') : '' }}</td>
                <td>{{ $otro->cOtrosAnotaciones }}</td>
            </tr>
        @endforeach
    </table>
@else
    <div class="no-data">
        No registra otros documentos
    </div>
@endif
</body>
</html> 