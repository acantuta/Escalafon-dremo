<?php

namespace App\Http\Controllers\Escalafon;

use App\Http\Controllers\Escalafon\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MantenimientoDinamicoController extends Controller
{
    /**
     * Separa el esquema y la tabla/vista del parámetro.
     */
    private function parsearEsquemaObjeto($nombreCompleto)
    {
        $partes = explode('.', $nombreCompleto);
        if (count($partes) !== 2) {
            abort(400, "El nombre debe ser en formato esquema.objeto (por ejemplo: schema.tabla o schema.vista)");
        }
        return [$partes[0], $partes[1]];
    }

    private function validarTablaOVista($nombreCompleto) {
        list($schema, $objectName) = $this->parsearEsquemaObjeto($nombreCompleto);

        // Validar que exista la tabla o vista
        $existe = DB::table('INFORMATION_SCHEMA.TABLES')
            ->where('TABLE_SCHEMA', '=', $schema)
            ->where('TABLE_NAME', '=', $objectName)
            ->exists();

        if (!$existe) {
            abort(404, "La tabla o vista '$nombreCompleto' no existe.");
        }
    }

    public function metadatos(Request $request) {
        $tabla = $request->get('tabla');
        $vista = $request->get('vista');

        if (!$tabla && !$vista) {
            abort(400, "Se requiere el parámetro 'tabla' o 'vista'.");
        }

        $nombre = $vista ?: $tabla;

        $this->validarTablaOVista($nombre);

        list($schema, $tableName) = $this->parsearEsquemaObjeto($nombre);

        // Obtener columnas, tipos e identidad
        $columnasInfo = DB::select("
            SELECT 
                c.COLUMN_NAME, 
                c.DATA_TYPE,
                COLUMNPROPERTY(object_id('{$schema}.{$tableName}'), c.COLUMN_NAME, 'IsIdentity') AS IS_IDENTITY
            FROM INFORMATION_SCHEMA.COLUMNS c
            JOIN INFORMATION_SCHEMA.TABLES t 
                ON c.TABLE_NAME = t.TABLE_NAME 
                AND c.TABLE_SCHEMA = t.TABLE_SCHEMA
            WHERE c.TABLE_SCHEMA = ? AND c.TABLE_NAME = ?
            ORDER BY c.ORDINAL_POSITION
        ", [$schema, $tableName]);

        $columnas = [];
        $tipos = [];
        $identidades = [];

        foreach ($columnasInfo as $col) {
            $columnas[] = $col->COLUMN_NAME;
            $tipoCampo = 'text';
            if (in_array($col->DATA_TYPE, ['int','bigint','smallint','tinyint','numeric','decimal','float','real'])) {
                $tipoCampo = 'number';
            } elseif (in_array($col->DATA_TYPE, ['date','datetime','datetime2','smalldatetime','time'])) {
                $tipoCampo = 'date';
            }
            $tipos[$col->COLUMN_NAME] = $tipoCampo;
            $identidades[$col->COLUMN_NAME] = ($col->IS_IDENTITY == 1);
        }

        // Detectar la llave primaria real (solo si es tabla, si es vista podría no tener PK)
        $llavePrimaria = $this->obtenerLlavePrimaria($tabla ?: $vista);

        return response()->json([
            'columnas' => $columnas,
            'tipos' => $tipos,
            'llave_primaria' => $llavePrimaria,
            'identidades' => $identidades
        ]);
    }

    public function listar(Request $request) {
        $tabla = $request->get('tabla');
        $vista = $request->get('vista');

        if (!$tabla && !$vista) {
            abort(400, "Se requiere el parámetro 'tabla' o 'vista'.");
        }

        $nombre = $vista ?: $tabla;

        $this->validarTablaOVista($nombre);

        $page = (int)$request->get('page', 1);
        $pageSize = (int)$request->get('pageSize', 10);

        $query = DB::table($nombre);
        $total = $query->count();
        $data = $query->offset(($page-1)*$pageSize)->limit($pageSize)->get();

        return response()->json([
            'data' => $data,
            'total' => $total,
            'page' => $page,
            'pageSize' => $pageSize
        ]);
    }

    public function crear(Request $request) {
        $tabla = $request->get('tabla');
        if (!$tabla) {
            return response()->json(['error'=>'Debe especificar una tabla para crear registros.'],400);
        }

        $this->validarTablaOVista($tabla);

        $datos = $request->except('tabla','vista'); 
        try {
            $id = DB::table($tabla)->insertGetId($datos);
            return response()->json(['message'=>'Creado con éxito','id'=>$id], 201);
        } catch (\Exception $e) {
            Log::error("Error al crear en $tabla: ".$e->getMessage(), ['datos'=>$datos]);
            return response()->json(['error'=>'Error interno del servidor.'],500);
        }
    }

    public function actualizar(Request $request, $id) {
        $tabla = $request->get('tabla');
        if (!$tabla) {
            return response()->json(['error'=>'Debe especificar una tabla para actualizar registros.'],400);
        }

        $this->validarTablaOVista($tabla);
        $pk = $this->obtenerLlavePrimaria($tabla);
        $registro = DB::table($tabla)->where($pk, $id)->first();
        if (!$registro) {
            return response()->json(['error'=>'No encontrado'],404);
        }

        $datos = $request->except('tabla','vista');
        try {
            DB::table($tabla)->where($pk, $id)->update($datos);
            return response()->json(['message'=>'Actualizado con éxito'],200);
        } catch (\Exception $e) {
            Log::error("Error al actualizar en $tabla: ".$e->getMessage(), ['id'=>$id,'datos'=>$datos]);
            return response()->json(['error'=>'Error interno del servidor.'],500);
        }
    }

    public function eliminar(Request $request, $id) {
        $tabla = $request->get('tabla');
        if (!$tabla) {
            return response()->json(['error'=>'Debe especificar una tabla para eliminar registros.'],400);
        }

        $this->validarTablaOVista($tabla);
        $pk = $this->obtenerLlavePrimaria($tabla);
        $registro = DB::table($tabla)->where($pk, $id)->first();
        if (!$registro) {
            return response()->json(['error'=>'No encontrado'],404);
        }

        try {
            DB::table($tabla)->where($pk, $id)->delete();
            return response()->json(['message'=>'Eliminado con éxito'],200);
        } catch (\Exception $e) {
            Log::error("Error al eliminar en $tabla: ".$e->getMessage(), ['id'=>$id]);
            return response()->json(['error'=>'Error interno del servidor.'],500);
        }
    }

    public function visualizar(Request $request, $id) {
        $tabla = $request->get('tabla');
        $vista = $request->get('vista');

        if (!$tabla && !$vista) {
            abort(400, "Se requiere el parámetro 'tabla' o 'vista'.");
        }

        $nombre = $vista ?: $tabla;
        $this->validarTablaOVista($nombre);

        $pk = $this->obtenerLlavePrimaria($nombre);
        $registro = DB::table($nombre)->where($pk, $id)->first();
        if (!$registro) {
            return response()->json(['error'=>'No encontrado'],404);
        }
        return response()->json($registro);
    }

    public function dependencias(Request $request) {
        // Para dependencias siempre se espera una tabla
        $tabla = $request->get('tabla');
        if (!$tabla) {
            return response()->json(['error'=>'Debe especificar una tabla para cargar dependencias.'],400);
        }

        $this->validarTablaOVista($tabla);

        $campoDependencia = $request->get('campoDependencia');
        $valorDependencia = $request->get('valorDependencia');

        $query = DB::table($tabla);
        if ($campoDependencia && $valorDependencia) {
            $query->where($campoDependencia, $valorDependencia);
        }

        $data = $query->get();

        return response()->json(['data'=>$data]);
    }

    /**
     * Método auxiliar para obtener la llave primaria real de la tabla o vista
     * Si es vista, podría no tener PK, retornará 'id' por defecto.
     */
    private function obtenerLlavePrimaria($nombreCompleto) {
        if (!$nombreCompleto) return 'id';
        list($schema, $tableName) = $this->parsearEsquemaObjeto($nombreCompleto);

        $pkColumn = DB::selectOne("
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE OBJECTPROPERTY(OBJECT_ID(CONSTRAINT_SCHEMA+'.'+CONSTRAINT_NAME), 'IsPrimaryKey') = 1
            AND TABLE_SCHEMA = ?
            AND TABLE_NAME = ?
        ", [$schema, $tableName]);

        return $pkColumn ? $pkColumn->COLUMN_NAME : 'id';
    }
}
