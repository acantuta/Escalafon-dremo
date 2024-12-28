<?php

namespace App\Http\Controllers\Escalafon;

use App\Models\Escalafon\VEvaluacionDesempenio;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class VEvaluacionDesempenioController extends Controller
{

    public function index(Request $request)
    {
        try {    
            $query = VEvaluacionDesempenio::query();
            
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
            $result = VEvaluacionDesempenio::fromStoredProcedure(
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
            'cEvalDesNumeroDocumento' => 'required|string|max:150',
            'dtEvalDesFechaDocumento' => 'required|date',
            'iArchId' => 'required|integer',
            'iRegLabId' => 'required|integer',
            'iEvalDesAccId' => 'required|integer',
            'iEvalDescAccMotId' => 'required|integer',
            'cEvalDesAnotaciones' => 'nullable|string',
            'cEvalDesAccNombre' => 'nullable|string|max:150',
            'cEvalDescAccMotNombre' => 'nullable|string|max:150',
            'cRegLabNombre' => 'nullable|string|max:300',
            'iEvalDesId' => 'required|integer',
            'iLegId' => 'required|integer',

            ]);

            DB::beginTransaction();
            $resource = VEvaluacionDesempenio::create($validatedData);
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
            $resource = VEvaluacionDesempenio::findOrFail($id);
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
            'cEvalDesNumeroDocumento' => 'required|string|max:150',
            'dtEvalDesFechaDocumento' => 'required|date',
            'iArchId' => 'required|integer',
            'iRegLabId' => 'required|integer',
            'iEvalDesAccId' => 'required|integer',
            'iEvalDescAccMotId' => 'required|integer',
            'cEvalDesAnotaciones' => 'nullable|string',
            'cEvalDesAccNombre' => 'nullable|string|max:150',
            'cEvalDescAccMotNombre' => 'nullable|string|max:150',
            'cRegLabNombre' => 'nullable|string|max:300',
            'iEvalDesId' => 'required|integer',
            'iLegId' => 'required|integer',

            ]);

            DB::beginTransaction();
            $resource = VEvaluacionDesempenio::findOrFail($id);
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
            $resource = VEvaluacionDesempenio::findOrFail($id);
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