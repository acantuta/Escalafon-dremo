<?php

namespace App\Http\Controllers\Escalafon;

use App\Http\Controllers\Escalafon\Controller;
use App\Models\Escalafon\HojaVida;
use App\Models\Escalafon\VLegajo;
use App\Models\Escalafon\VInfopefamiliarDomicilio;
use App\Models\Escalafon\VInfopefamiliarFamiliar;
use App\Models\Escalafon\VInfopefamiliarDeclaracionJurada;
use App\Models\Escalafon\VVinculacionLaboral;
use App\Models\Escalafon\VIncorporacionDocumento;
use App\Models\Escalafon\VFormacionAcademica;
use App\Models\Escalafon\VCapacitacion;
use App\Models\Escalafon\VExperienciaLaboral;
use App\Models\Escalafon\VMovimientoPersonal;
use App\Models\Escalafon\VCompensacion;
use App\Models\Escalafon\VRetencion;
use App\Models\Escalafon\VDesplazamiento;
use App\Models\Escalafon\VAscenso;
use App\Models\Escalafon\VEvaluacionDesempenio;
use App\Models\Escalafon\VReconocimiento;
use App\Models\Escalafon\VSancion;
use App\Models\Escalafon\VRelacionIndividualColectiva;
use App\Models\Escalafon\VSeguridadSaludBienestar;
use App\Models\Escalafon\VSistemaPensionario;
use App\Models\Escalafon\VCese;
use App\Models\Escalafon\VOtro;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf as DomPDF;
use Carbon\Carbon;

class HojaVidaController extends Controller
{

    public function index(Request $request)
    {
        try {    
            $query = HojaVida::query();
            
            // Filtro simple campo=valor
            if ($request->has('campo') && $request->has('valor')) {
                $campo = $request->input('campo');
                $valor = $request->input('valor');
                
                if ($valor !== null && $valor !== '') {
                    $query->where($campo, $valor);
                }
            }
           
            // Respuesta
            return response()->json([
                'success' => true,
                'data' => $query->get()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Error al obtener los datos',
                'errores' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Muestra un listado de los recursos.
     */
    public function listarPaginado(Request $request)
    {
        try {    
            // Obtener parámetros
            $sortColumn = $request->input('sortColumn', null);
            $sortOrder = $request->input('sortOrder', 'ASC');
            $page = $request->input('page', 1);
            $pageSize = $request->input('pageSize', 10);
            
            // Procesar los filtros del formato JSON a array de filtros
            $filtersJson = $request->input('filters', []);
            $filters = [];
            
            foreach ($filtersJson as $column => $condition) {
                $filters[] = [
                    'column_name' => $column,
                    'operator' => $condition['operator'] ?? 'equals',
                    'value' => $condition['value']
                ];
            }
            
            // Usar el scope del trait HasStoredProcedures
            $result = HojaVida::fromStoredProcedure(
                $filters,
                $page,
                $pageSize,
                $sortColumn,
                $sortOrder
            );

            // Respuesta
            return response()->json([
                'success' => true,
                'data' => $result->items(),
                'meta' => [
                    'current_page' => $result->currentPage(),
                    'per_page' => $result->perPage(),
                    'total' => $result->total(),
                    'last_page' => $result->lastPage(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Error al obtener los datos',
                'errores' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacena un recurso recién creado en la base de datos.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'iLegId' => 'required|integer',
                'cHojVidAnotaciones' => 'nullable|string',
                'cHojVidNumeroExpediente' => 'required|string|max:300',
                'cHojVidNombreSolicitante' => 'required|string|max:300',
                'dHojVidFechaExpediente' => 'required|date',
                'dHojVidFechaGeneracion' => 'nullable|date'
            ]);

            DB::beginTransaction();

            // Generar UUID para el archivo
            $uuid = Str::uuid()->toString();
            $nombreArchivo = $uuid . '.pdf';

            // Obtener datos del legajo
            $legajo = VLegajo::find($validatedData['iLegId']);
            if (!$legajo) {
                throw new \Exception('Legajo no encontrado');
            }

            // Cargar todos los datos relacionados
            $this->cargarDatosRelacionados($legajo);

            // Preparar datos para el PDF
            $datosPDF = [
                'numeroExpediente' => $validatedData['cHojVidNumeroExpediente'],
                'solicitante' => $validatedData['cHojVidNombreSolicitante'],
                'fechaExpediente' => Carbon::parse($validatedData['dHojVidFechaExpediente'])->format('Y-m-d'),
                'anotaciones' => $validatedData['cHojVidAnotaciones'] ?? '',
                'fechaGeneracion' => Carbon::now()->format('Y-m-d'),
                'uuid' => $uuid,
                'tiempoServicio' => $this->getTiempoServicio($legajo)
            ];

            // Generar PDF usando el método reutilizable
            $pdf = $this->generarPDF($legajo, $datosPDF);

            // Guardar el PDF en el disco
            Storage::disk('escalafon_hojas_vida')->put($nombreArchivo, $pdf->output());

            // Crear el registro en la base de datos
            $hojaVida = HojaVida::create([
                'iLegId' => $validatedData['iLegId'],
                'cHojVidAnotaciones' => $validatedData['cHojVidAnotaciones'],
                'cHojVidNumeroExpediente' => $validatedData['cHojVidNumeroExpediente'],
                'cHojVidNombreSolicitante' => $validatedData['cHojVidNombreSolicitante'],
                'dHojVidFechaExpediente' => $datosPDF['fechaExpediente'],
                'dHojVidFechaGeneracion' => $datosPDF['fechaGeneracion'],
                'cHojVidUuid' => $uuid,
                'cHojViNombreArchivo' => $nombreArchivo
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $hojaVida,
                'metadata' => [
                    'uuid' => $uuid,
                    'nombreArchivo' => $nombreArchivo,
                    'pdf' => base64_encode($pdf->output())
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($nombreArchivo)) {
                Storage::disk('escalafon_hojas_vida')->delete($nombreArchivo);
            }
            throw $e;
        }
    }

    /**
     * Carga todos los datos relacionados al legajo
     */
    private function cargarDatosRelacionados($legajo)
    {
        // Cargar los datos domiciliarios
        $legajo->domicilios = VInfopefamiliarDomicilio::where('iLegId', $legajo->iLegId)->get();

        // Cargar los datos familiares
        $legajo->familiares = VInfopefamiliarFamiliar::where('iLegId', $legajo->iLegId)->get();

        // Cargar las declaraciones juradas
        $legajo->declaraciones = VInfopefamiliarDeclaracionJurada::where('iLegId', $legajo->iLegId)->get();

        // Cargar las vinculaciones laborales
        $legajo->vinculaciones = VVinculacionLaboral::where('iLegId', $legajo->iLegId)
            ->orderBy('dtVincLabFechaInicio', 'desc')
            ->get();

        // Cargar los documentos de incorporación
        $legajo->documentosIncorporacion = VIncorporacionDocumento::where('iLegId', $legajo->iLegId)
            ->orderBy('dIncorDocFechEmision', 'desc')
            ->get();

        // Cargar la formación académica
        $legajo->formacionAcademica = VFormacionAcademica::where('iLegId', $legajo->iLegId)
            ->orderBy('iEduNivEdId', 'asc')
            ->orderBy('iEduSitAcadAnioInicio', 'desc')
            ->get();

        // Cargar las capacitaciones
        $legajo->capacitaciones = VCapacitacion::where('iLegId', $legajo->iLegId)
            ->orderBy('dtFechaInicio', 'desc')
            ->get();

        // Cargar las experiencias laborales
        $legajo->experienciasLaborales = VExperienciaLaboral::where('iLegId', $legajo->iLegId)
            ->orderBy('dtExpLabFechaInicio', 'desc')
            ->get();

        // Cargar los movimientos de personal
        $legajo->movimientosPersonal = VMovimientoPersonal::where('iLegId', $legajo->iLegId)
            ->orderBy('dtVacLicFechaInicio', 'desc')
            ->get();

        // Cargar las compensaciones
        $legajo->compensaciones = VCompensacion::where('iLegId', $legajo->iLegId)
            ->orderBy('dtAsigIncFechaDocumento', 'desc')
            ->get();

        // Cargar las retenciones
        $legajo->retenciones = VRetencion::where('iLegId', $legajo->iLegId)
            ->orderBy('dtRetenFechaDocumento', 'desc')
            ->get();

        // Cargar los desplazamientos
        $legajo->desplazamientos = VDesplazamiento::where('iLegId', $legajo->iLegId)
            ->orderBy('dtFechaInicio', 'desc')
            ->get();

        // Cargar los ascensos
        $legajo->ascensos = VAscenso::where('iLegId', $legajo->iLegId)
            ->orderBy('dtAscFechaInicio', 'desc')
            ->get();

        // Cargar las evaluaciones de desempeño
        $legajo->evaluacionesDesempenio = VEvaluacionDesempenio::where('iLegId', $legajo->iLegId)
            ->orderBy('dtEvalDesFechaDocumento', 'desc')
            ->get();

        // Cargar los reconocimientos
        $legajo->reconocimientos = VReconocimiento::where('iLegId', $legajo->iLegId)
            ->orderBy('dtRecoFechaInicio', 'desc')
            ->get();

        // Cargar las sanciones
        $legajo->sanciones = VSancion::where('iLegId', $legajo->iLegId)
            ->orderBy('dtSancFechaInicio', 'desc')
            ->get();

        // Cargar las relaciones laborales individuales y colectivas
        $legajo->relacionesIndividualesColectivas = VRelacionIndividualColectiva::where('iLegId', $legajo->iLegId)
            ->orderBy('dtRelaIndColecFechaEmision', 'desc')
            ->get();

        // Cargar los registros de seguridad y salud en el trabajo
        $legajo->seguridadSaludBienestar = VSeguridadSaludBienestar::where('iLegId', $legajo->iLegId)
            ->orderBy('dtSegSalBieFechaEmision', 'desc')
            ->get();

        // Cargar los sistemas pensionarios con log de depuración
        $sistemasPensionarios = VSistemaPensionario::where('iLegId', $legajo->iLegId)
            ->orderBy('dtSisPenFechaAfiliacion', 'desc')
            ->get();
        
        \Log::info('Sistemas Pensionarios:', [
            'legajo_id' => $legajo->iLegId,
            'cantidad' => $sistemasPensionarios->count(),
            'datos' => $sistemasPensionarios->toArray()
        ]);
        
        $legajo->sistemasPensionarios = $sistemasPensionarios;

        // Cargar los ceses con log de depuración
        $ceses = VCese::where('iLegId', $legajo->iLegId)
            ->orderBy('dtCesesFechaCese', 'desc')
            ->get();
        
        \Log::info('Ceses:', [
            'legajo_id' => $legajo->iLegId,
            'cantidad' => $ceses->count(),
            'datos' => $ceses->toArray()
        ]);
        
        $legajo->ceses = $ceses;

        // Cargar otros documentos con log de depuración
        $otros = VOtro::where('iLegId', $legajo->iLegId)
            ->orderBy('dtOtrosFechaEmision', 'desc')
            ->get();

        \Log::info('Otros documentos:', [
            'legajo_id' => $legajo->iLegId,
            'cantidad' => $otros->count(),
            'datos' => $otros->toArray()
        ]);

        $legajo->otros = $otros;
    }

    /**
     * Muestra el recurso especificado.
     */
    public function show($id)
    {
        try {
            $resource = HojaVida::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $resource
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Error al obtener el recurso',
                'errores' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Actualiza el recurso especificado en la base de datos.
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'iLegId' => 'required|integer',
            'cHojVidAnotaciones' => 'nullable|string',
            'cHojVidNumeroExpediente' => 'nullable|string|max:300',
            'cHojVidNombreSolicitante' => 'nullable|string|max:300',
            'dHojVidFechaExpediente' => 'nullable|date',
            'dHojVidFechaGeneracion' => 'nullable|date',
            'cHojVidUuid' => 'nullable|string|max:36',
            'cHojViNombreArchivo' => 'nullable|string|max:800',

            ]);

            DB::beginTransaction();
            $resource = HojaVida::findOrFail($id);
            $resource->update($validatedData);
            DB::commit();

            return response()->json($resource);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'mensaje' => 'Error de validación',
                'errores' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'mensaje' => 'Error al actualizar el recurso',
                'errores' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Elimina el recurso especificado de la base de datos.
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $resource = HojaVida::findOrFail($id);
            $resource->delete();
            DB::commit();

            return response()->json(['mensaje' => 'Eliminado exitosamente'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'mensaje' => 'Error al eliminar el recurso',
                'errores' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Genera una vista previa del PDF de la hoja de vida.
     */
    public function vistaPrevia(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'iLegId' => 'required|integer',
                'cHojVidAnotaciones' => 'nullable|string',
                'cHojVidNumeroExpediente' => 'required|string|max:300',
                'cHojVidNombreSolicitante' => 'required|string|max:300',
                'dHojVidFechaExpediente' => 'required|date'
            ]);

            // Obtener datos del legajo
            $legajo = VLegajo::find($validatedData['iLegId']);
            if (!$legajo) {
                return response()->json([
                    'success' => false,
                    'mensaje' => 'Legajo no encontrado'
                ], 404);
            }

            // Cargar todos los datos relacionados
            $this->cargarDatosRelacionados($legajo);

            // Generar UUID temporal para la vista previa
            $uuid = Str::uuid()->toString();
            $nombreArchivo = "preview_{$uuid}.pdf";

            // Preparar datos para el PDF
            $datosPDF = [
                'numeroExpediente' => $validatedData['cHojVidNumeroExpediente'],
                'solicitante' => $validatedData['cHojVidNombreSolicitante'],
                'fechaExpediente' => Carbon::parse($validatedData['dHojVidFechaExpediente'])->format('Y-m-d'),
                'anotaciones' => $validatedData['cHojVidAnotaciones'] ?? '',
                'fechaGeneracion' => Carbon::now()->format('Y-m-d H:i:s'),
                'uuid' => $uuid,
                'tiempoServicio' => $this->getTiempoServicio($legajo)
            ];

            // Generar PDF usando el método reutilizable
            $pdf = $this->generarPDF($legajo, $datosPDF);

            return response()->json([
                'success' => true,
                'data' => base64_encode($pdf->output()),
                'metadata' => [
                    'uuid' => $uuid,
                    'nombreArchivo' => $nombreArchivo
                ]
            ]);

        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Descarga el PDF de la hoja de vida.
     */
    public function descargar($uuid)
    {
        try {
            // Buscar la hoja de vida por UUID
            $hojaVida = HojaVida::where('cHojVidUuid', $uuid)->firstOrFail();
            
            // Verificar si existe el archivo
            $nombreArchivo = $hojaVida->cHojVidUuid . '.pdf';
            if (!Storage::disk('escalafon_hojas_vida')->exists($nombreArchivo)) {
                throw new \Exception('El archivo no existe');
            }

            // Obtener el contenido del archivo
            $contenido = Storage::disk('escalafon_hojas_vida')->get($nombreArchivo);
            
            // Retornar el contenido en base64 como JSON
            return response()->json([
                'success' => true,
                'data' => base64_encode($contenido),
                'metadata' => [
                    'uuid' => $hojaVida->cHojVidUuid,
                    'nombreArchivo' => $nombreArchivo,
                    'mimeType' => 'application/pdf'
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Error al descargar el archivo',
                'errores' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Calcula el tiempo de servicio de un legajo
     * 
     * @param VLegajo|null $legajo
     * @return string
     */
    private function getTiempoServicio($legajo)
    {
        if (!$legajo || !$legajo->dtVincLabFechaInicio) {
            return '';
        }

        $fechaInicio = \Carbon\Carbon::parse($legajo->dtVincLabFechaInicio);
        $fechaFin = \Carbon\Carbon::now();

        // Si la fecha de inicio es mayor que la fecha actual, retornamos vacío
        if ($fechaInicio->gt($fechaFin)) {
            return '';
        }

        $diff = $fechaInicio->diff($fechaFin);

        $resultado = '';
        if ($diff->y > 0) {
            $resultado .= $diff->y . ' año(s) ';
        }
        if ($diff->m > 0) {
            $resultado .= $diff->m . ' mes(es) ';
        }
        if ($diff->d > 0) {
            $resultado .= $diff->d . ' día(s)';
        }

        return trim($resultado) ?: '0 día(s)';
    }

    /**
     * Genera el PDF de la hoja de vida
     */
    private function generarPDF($legajo, $datos)
    {
        // Generar PDF
        $pdf = DomPDF::loadView('escalafon.hoja-vida', [
            'legajo' => $legajo,
            'hojaVida' => $datos
        ]);

        // Configurar opciones del PDF
        $pdf->setPaper('A4', 'portrait');
        $pdf->set_option('isHtml5ParserEnabled', true);
        $pdf->set_option('isRemoteEnabled', true);

        return $pdf;
    }
}