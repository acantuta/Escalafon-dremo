<?php

namespace App\Http\Controllers\Escalafon;

use App\Models\Escalafon\Legajo;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class LegajoController extends Controller
{

    public function index(Request $request)
    {
        try {    
            $query = Legajo::query();
            
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
            $result = Legajo::fromStoredProcedure(
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
                'iTipoDocId' => 'required|integer',
            'iTipoAperLegId' => 'required|integer',
            'iPersId' => 'nullable|integer',
            'iRegLabId' => 'nullable|integer',
            'iAccVincId' => 'nullable|integer',
            'iMotAccVincId' => 'nullable|integer',
            'iEscCatId' => 'nullable|integer',
            'iCondLabId' => 'nullable|integer',
            'iCentLabId' => 'nullable|integer',
            'iSitLabId' => 'nullable|integer',
            'iTipoSerId' => 'nullable|integer',
            'cLegCodigoPlaza' => 'nullable|string|max:100',
            'cUseZonaSubRegion' => 'nullable|string|max:100',
            'cLegPrimerApellido' => 'nullable|string|max:100',
            'iCargLabId' => 'nullable|integer',
            'cVincLabNumeroDocumento' => 'nullable|string|max:200',
            'dtVincLabFechaDocumento' => 'nullable|date',
            'iArchId' => 'nullable|integer',
            'cLegCargo' => 'nullable|string|max:250',
            'iJorLabId' => 'nullable|integer',
            'dtVincLabFechaInicio' => 'nullable|date',
            'dtVincLabFechaFin' => 'nullable|date',
            'bVincLabMandatoJudicial' => 'nullable',
            'cLegAnotaciones' => 'nullable|string',
            'cLegSegundoApellido' => 'nullable|string|max:100',
            'cLegNombres' => 'nullable|string|max:100',
            'dtLegFechaNacimiento' => 'nullable|date',
            'iDptoIdDireccion' => 'nullable|integer',
            'iPrvnIdDireccion' => 'nullable|integer',
            'iDsttIdDireccion' => 'nullable|integer',
            'cLegDireccion' => 'nullable|string|max:300',
            'cLegTelefonoPrincipal' => 'nullable|string|max:20',
            'cLegTelefonoMovil' => 'nullable|string|max:20',
            'cLegCorreoElectronicoPersonal' => 'nullable|string|max:100',
            'cLegCorreoElectronicoLaboral' => 'nullable|string|max:150',
            'cLegContactoEmergenciaNombre' => 'nullable|string|max:100',
            'cLegContactoEmergenciaTelefonoFijo' => 'nullable|string|max:20',
            'cLegContactoEmergenciaTelefonoMovil' => 'nullable|string|max:20',
            'bLegLicenciadoFaa' => 'nullable',
            'cLegConstanciaFaa' => 'nullable|string|max:300',
            'iArchIdFaa' => 'nullable|integer',
            'bLegTieneDiscapacidad' => 'nullable',
            'cLegEntidadEmisoraDiscapacidad' => 'nullable|string|max:300',
            'cLegNumeroDocumentoDiscapacidad' => 'nullable|string|max:300',
            'dLegFechaEmisionDocumentoDiscapacidad' => 'nullable|date',
            'cLegNombreDiscapacidad' => 'nullable|string|max:500',
            'cLegGradoDiscapacidad' => 'nullable|string|max:250',
            'iArchIdDiscapacidad' => 'nullable|integer',
            'iTipoEstCivId' => 'nullable|integer',
            'iTipoIdentId' => 'nullable|integer',
            'cLegNumeroDocumentoIdentida' => 'nullable|string|max:10',
            'cLegSexo' => 'nullable|string|max:1',
            'dtLegFechaFallecido' => 'nullable|date',
            'iPaisIdNacimiento' => 'nullable|integer',
            'iDptoIdNacimiento' => 'nullable|integer',
            'iPrvnIdNacimiento' => 'nullable|integer',
            'iDsttIdNacimiento' => 'nullable|integer',
            'iArchIdFoto' => 'nullable|integer',

            ]);

            DB::beginTransaction();
            $resource = Legajo::create($validatedData);
            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $resource
            ], 201);

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
                'mensaje' => 'Error al crear el recurso',
                'errores' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Muestra el recurso especificado.
     */
    public function show($id)
    {
        try {
            $resource = Legajo::findOrFail($id);
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
                'iTipoDocId' => 'required|integer',
            'iTipoAperLegId' => 'required|integer',
            'iPersId' => 'nullable|integer',
            'iRegLabId' => 'nullable|integer',
            'iAccVincId' => 'nullable|integer',
            'iMotAccVincId' => 'nullable|integer',
            'iEscCatId' => 'nullable|integer',
            'iCondLabId' => 'nullable|integer',
            'iCentLabId' => 'nullable|integer',
            'iSitLabId' => 'nullable|integer',
            'iTipoSerId' => 'nullable|integer',
            'cLegCodigoPlaza' => 'nullable|string|max:100',
            'cUseZonaSubRegion' => 'nullable|string|max:100',
            'cLegPrimerApellido' => 'nullable|string|max:100',
            'iCargLabId' => 'nullable|integer',
            'cVincLabNumeroDocumento' => 'nullable|string|max:200',
            'dtVincLabFechaDocumento' => 'nullable|date',
            'iArchId' => 'nullable|integer',
            'cLegCargo' => 'nullable|string|max:250',
            'iJorLabId' => 'nullable|integer',
            'dtVincLabFechaInicio' => 'nullable|date',
            'dtVincLabFechaFin' => 'nullable|date',
            'bVincLabMandatoJudicial' => 'nullable',
            'cLegAnotaciones' => 'nullable|string',
            'cLegSegundoApellido' => 'nullable|string|max:100',
            'cLegNombres' => 'nullable|string|max:100',
            'dtLegFechaNacimiento' => 'nullable|date',
            'iDptoIdDireccion' => 'nullable|integer',
            'iPrvnIdDireccion' => 'nullable|integer',
            'iDsttIdDireccion' => 'nullable|integer',
            'cLegDireccion' => 'nullable|string|max:300',
            'cLegTelefonoPrincipal' => 'nullable|string|max:20',
            'cLegTelefonoMovil' => 'nullable|string|max:20',
            'cLegCorreoElectronicoPersonal' => 'nullable|string|max:100',
            'cLegCorreoElectronicoLaboral' => 'nullable|string|max:150',
            'cLegContactoEmergenciaNombre' => 'nullable|string|max:100',
            'cLegContactoEmergenciaTelefonoFijo' => 'nullable|string|max:20',
            'cLegContactoEmergenciaTelefonoMovil' => 'nullable|string|max:20',
            'bLegLicenciadoFaa' => 'nullable',
            'cLegConstanciaFaa' => 'nullable|string|max:300',
            'iArchIdFaa' => 'nullable|integer',
            'bLegTieneDiscapacidad' => 'nullable',
            'cLegEntidadEmisoraDiscapacidad' => 'nullable|string|max:300',
            'cLegNumeroDocumentoDiscapacidad' => 'nullable|string|max:300',
            'dLegFechaEmisionDocumentoDiscapacidad' => 'nullable|date',
            'cLegNombreDiscapacidad' => 'nullable|string|max:500',
            'cLegGradoDiscapacidad' => 'nullable|string|max:250',
            'iArchIdDiscapacidad' => 'nullable|integer',
            'iTipoEstCivId' => 'nullable|integer',
            'iTipoIdentId' => 'nullable|integer',
            'cLegNumeroDocumentoIdentida' => 'nullable|string|max:10',
            'cLegSexo' => 'nullable|string|max:1',
            'dtLegFechaFallecido' => 'nullable|date',
            'iPaisIdNacimiento' => 'nullable|integer',
            'iDptoIdNacimiento' => 'nullable|integer',
            'iPrvnIdNacimiento' => 'nullable|integer',
            'iDsttIdNacimiento' => 'nullable|integer',
            'iArchIdFoto' => 'nullable|integer',

            ]);

            DB::beginTransaction();
            $resource = Legajo::findOrFail($id);
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
            $resource = Legajo::findOrFail($id);
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
}