<?php

namespace App\Http\Controllers\Escalafon;

use App\Models\Escalafon\InfopefamiliarFamiliar;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class InfopefamiliarFamiliarController extends Controller
{

    public function index(Request $request)
    {
        try {    
            $query = InfopefamiliarFamiliar::query();
            
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
            $result = InfopefamiliarFamiliar::fromStoredProcedure(
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
            'iTipoIdentId' => 'nullable|integer',
            'cInfoPeFamFamiNumeroDocumento' => 'nullable|string|max:20',
            'iPersId' => 'nullable|integer',
            'iInfoPeFamParentId' => 'nullable|integer',
            'bInfoPeFamFamiEsDerechohabiente' => 'nullable',
            'bInfoPeFamFamiEsFallecido' => 'nullable',
            'cInfoPeFamFamiPrimerApellido' => 'nullable|string|max:50',
            'cInfoPeFamFamiSegundoApellido' => 'nullable|string|max:50',
            'cInfoPeFamFamiNombres' => 'nullable|string|max:50',
            'dInfoPeFamFamiFechaNacimiento' => 'nullable|date',
            'cInfoPeFamFamiSexo' => 'nullable|string|max:1',
            'cInfoPeFamFamiNumeroActaNacimiento' => 'nullable|string|max:100',
            'dInfoPeFamFamiFechaEmision' => 'nullable|date',
            'iArchId' => 'nullable|integer',
            'bInfoPeFamFamiEsDiscapacitado' => 'nullable',

            ]);

            DB::beginTransaction();
            $resource = InfopefamiliarFamiliar::create($validatedData);
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
            $resource = InfopefamiliarFamiliar::findOrFail($id);
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
            'iTipoIdentId' => 'nullable|integer',
            'cInfoPeFamFamiNumeroDocumento' => 'nullable|string|max:20',
            'iPersId' => 'nullable|integer',
            'iInfoPeFamParentId' => 'nullable|integer',
            'bInfoPeFamFamiEsDerechohabiente' => 'nullable',
            'bInfoPeFamFamiEsFallecido' => 'nullable',
            'cInfoPeFamFamiPrimerApellido' => 'nullable|string|max:50',
            'cInfoPeFamFamiSegundoApellido' => 'nullable|string|max:50',
            'cInfoPeFamFamiNombres' => 'nullable|string|max:50',
            'dInfoPeFamFamiFechaNacimiento' => 'nullable|date',
            'cInfoPeFamFamiSexo' => 'nullable|string|max:1',
            'cInfoPeFamFamiNumeroActaNacimiento' => 'nullable|string|max:100',
            'dInfoPeFamFamiFechaEmision' => 'nullable|date',
            'iArchId' => 'nullable|integer',
            'bInfoPeFamFamiEsDiscapacitado' => 'nullable',

            ]);

            DB::beginTransaction();
            $resource = InfopefamiliarFamiliar::findOrFail($id);
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
            $resource = InfopefamiliarFamiliar::findOrFail($id);
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