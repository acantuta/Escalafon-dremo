<?php

namespace App\Traits\Escalafon;

use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;

/**
 * Trait HasStoredProcedures
 * 
 * Este trait proporciona funcionalidad para interactuar con procedimientos almacenados en la base de datos.
 * Implementa operaciones CRUD básicas (Crear, Leer, Actualizar, Eliminar) utilizando stored procedures.
 */
trait HasStoredProcedures
{
    /**
     * Obtiene el nombre del esquema de la base de datos para la tabla
     * 
     * @return string Nombre del esquema, por defecto 'esc'
     */
    public function getSchemaName(): string
    {
        return $this->schema ?? 'esc';  // Por defecto usa el esquema 'esc'
    }

    /**
     * Obtiene el nombre de la tabla sin el prefijo del esquema
     * 
     * @return string Nombre de la tabla sin el esquema
     */
    protected function getTableWithoutSchema(): string
    {
        $table = $this->getTable();
        if (str_contains($table, '.')) {
            return substr($table, strpos($table, '.') + 1);
        }
        return $table;
    }

    /**
     * Query Scope que ejecuta el procedimiento almacenado de selección
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query Query builder
     * @param array $filters Filtros a aplicar en formato array
     * @param string|null $searchTerm Término de búsqueda
     * @param int|null $page Número de página para paginación
     * @param int|null $pageSize Tamaño de página para paginación
     * @param string|null $sortColumn Columna por la cual ordenar
     * @param string $sortOrder Dirección del ordenamiento (ASC/DESC)
     * @return \Illuminate\Pagination\LengthAwarePaginator|Collection Resultados paginados o colección
     * @throws Exception
     */
    public function scopeFromStoredProcedure($query, array $filters = [], ?int $page = 1, ?int $pageSize = null, ?string $sortColumn = null, string $sortOrder = 'ASC')
    {
        try {
            $schema = $this->getSchemaName();
            $table = $this->getTableWithoutSchema();
            
            $filterJson = !empty($filters) ? json_encode($filters) : null;

            $statement = DB::connection()->getPdo()->prepare("
                EXEC [{$schema}].[SP_SEL_{$table}Xcomodin]
                    @FilterJSON = ?,
                    @PageNumber = ?,
                    @PageSize = ?,
                    @SortColumn = ?,
                    @SortOrder = ?
            ");

            $statement->execute([$filterJson, $page, $pageSize, $sortColumn, $sortOrder]);
            
            // Obtener los resultados del primer select
            $results = $statement->fetchAll(\PDO::FETCH_OBJ);
            
            // Obtener el total del segundo select
            $statement->nextRowset();
            $totalRow = $statement->fetch(\PDO::FETCH_OBJ);
            $total = $totalRow ? (int)$totalRow->TotalRows : 0;

            if (empty($results)) {
                return $pageSize ? new LengthAwarePaginator([], 0, $pageSize, $page) : collect([]);
            }

            // Convertir los resultados a modelos
            $items = collect($results)->map(function ($item) {
                return (new static)->forceFill((array)$item);
            });

            // Retornar el paginador o la colección
            return $pageSize ? new LengthAwarePaginator($items, $total, $pageSize, $page) : $items;

        } catch (Exception $e) {
            throw new Exception("Error en SP_SEL_{$table}Xcomodin: " . $e->getMessage());
        }
    }

    /**
     * Guarda el modelo usando el procedimiento almacenado correspondiente
     * 
     * @param array $options Opciones adicionales para el guardado
     * @return bool Resultado de la operación
     * @throws Exception
     */
    public function save(array $options = []): bool
    {
        try {
            if ($this->exists) {
                return $this->performUpdate($this->newQuery());
            }
            return $this->performInsert($this->newQuery());
        } catch (Exception $e) {
            throw new Exception("Error al guardar el modelo: " . $e->getMessage());
        }
    }



    /**
     * Realiza la inserción de un nuevo registro usando procedimiento almacenado
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query Query builder
     * @return bool Resultado de la operación
     * @throws Exception
     */
    protected function performInsert(\Illuminate\Database\Eloquent\Builder $query): bool
    {
        try {
            $schema = $this->getSchemaName();
            $table = $this->getTableWithoutSchema();
            
            // Crear el JSON con los campos fillable que tienen valor
            $jsonData = [];
            foreach ($this->fillable as $field) {
                $value = $this->getAttribute($field);
                if ($value !== null) {
                    $jsonData[$field] = $value;
                }
            }
            
            // Si no hay datos para insertar, retornar false
            if (empty($jsonData)) {
                return false;
            }

            $statement = DB::connection()->getPdo()->prepare("
                EXEC [{$schema}].[SP_INS_{$table}Xcomodin]
                    @JsonData = ?
            ");
            
            $success = $statement->execute([json_encode($jsonData)]);
            
            if ($success) {
                if ($statement->columnCount() > 0) {
                    $result = $statement->fetch(\PDO::FETCH_OBJ);
                    if ($result) {
                        $this->forceFill((array)$result);
                    }
                }
                
                $this->exists = true;
                $this->wasRecentlyCreated = true;
                $this->fireModelEvent('created', false);
                return true;
            }

            return false;
        } catch (Exception $e) {
            throw new Exception("Error en SP_INS_{$table}Xcomodin: " . $e->getMessage());
        }
    }

    /**
     * Realiza la actualización de un registro existente usando procedimiento almacenado
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query Query builder
     * @return bool Resultado de la operación
     * @throws Exception
     */
    protected function performUpdate(\Illuminate\Database\Eloquent\Builder $query): bool
    {
        try {
            $schema = $this->getSchemaName();
            $table = $this->getTableWithoutSchema();
            
            if (!$this->isDirty()) {
                return true;
            }

            // Crear el JSON con los campos modificados y la clave primaria
            $jsonData = [];
            
            // Agregar la clave primaria al JSON
            $keyName = $this->getKeyName();
            if (is_array($keyName)) {
                foreach ($keyName as $key) {
                    $jsonData[$key] = $this->getAttribute($key);
                }
            } else {
                $jsonData[$keyName] = $this->getAttribute($keyName);
            }

            // Agregar campos modificados al JSON
            foreach ($this->getDirty() as $field => $value) {
                if (in_array($field, $this->fillable)) {
                    $jsonData[$field] = $value;
                }
            }

            $statement = DB::connection()->getPdo()->prepare("
                EXEC [{$schema}].[SP_UPD_{$table}Xcomodin]
                    @JsonData = ?
            ");
            
            $success = $statement->execute([json_encode($jsonData)]);
            
            if ($success) {
                if ($statement->columnCount() > 0) {
                    $result = $statement->fetch(\PDO::FETCH_OBJ);
                    if ($result) {
                        $this->forceFill((array)$result);
                    }
                }
                
                $this->fireModelEvent('updated', false);
                return true;
            }

            return false;
        } catch (Exception $e) {
            throw new Exception("Error en SP_UPD_{$table}Xcomodin: " . $e->getMessage());
        }
    }

    /**
     * Elimina un registro usando procedimiento almacenado
     * 
     * @return bool|null Resultado de la operación
     * @throws Exception
     */
    public function delete(): ?bool
    {
        try {
            if (!$this->exists) {
                return false;
            }

            $schema = $this->getSchemaName();
            $table = $this->getTableWithoutSchema();
            
            $keys = array_intersect_key(
                $this->attributesToArray(),
                array_flip((array)$this->getKeyName())
            );
            
            // Construir la consulta dinámicamente con los parámetros
            $paramsList = [];
            $paramsValues = [];
            foreach ($keys as $key => $value) {
                $paramsList[] = "@{$key} = ?";
                $paramsValues[] = $value === null ? null : (string)$value;
            }
            
            $paramsString = implode(",\n                    ", $paramsList);
            
            // Use statement directly instead of DB::select
            $pdo = DB::connection()->getPdo();
            $statement = $pdo->prepare("
                EXEC [{$schema}].[SP_DEL_{$table}Xcomodin]
                    {$paramsString}
            ");
            
            $success = $statement->execute($paramsValues);
            
            if ($success) {
                $this->exists = false;
                $this->fireModelEvent('deleted', false);
                return true;
            }

            return false;
        } catch (Exception $e) {
            throw new Exception("Error en SP_DEL_{$table}Xcomodin: " . $e->getMessage());
        }
    }

    /**
     * Query Scope para aplicar filtros comunes a la consulta
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query Query builder
     * @param array $conditions Condiciones de filtrado
     * @return Collection|\Illuminate\Pagination\LengthAwarePaginator Resultados filtrados
     */
    public function scopeWhereConditions($query, array $conditions)
    {
        $filters = collect($conditions)->map(function ($value, $column) {
            return [
                'column_name' => $column,
                'operator' => is_array($value) ? ($value['operator'] ?? '=') : '=',
                'value' => is_array($value) ? $value['value'] : $value
            ];
        })->values()->all();

        return $this->scopeFromStoredProcedure($query, $filters);
    }

    /**
     * Convierte las condiciones where de Eloquent a filtros para el SP
     */
    protected function buildFiltersFromQuery(Builder $query): array
    {
        $filters = [];
        
        if (!empty($query->getQuery()->wheres)) {
            foreach ($query->getQuery()->wheres as $where) {
                switch ($where['type']) {
                    case 'Basic':
                        $filters[] = [
                            'column_name' => $where['column'],
                            'operator' => $this->convertOperator($where['operator']),
                            'value' => $where['value']
                        ];
                        break;
                        
                    case 'like':
                        $filters[] = [
                            'column_name' => $where['column'],
                            'operator' => 'like',
                            'value' => trim($where['value'], '%')
                        ];
                        break;
                }
            }
        }
        
        return $filters;
    }

    /**
     * Convierte operadores de Eloquent al formato del SP
     */
    protected function convertOperator(string $operator): string
    {
        return match ($operator) {
            '=' => 'equals',
            '>' => 'greater',
            '<' => 'less',
            'LIKE' => 'like',
            default => 'equals'
        };
    }

    /**
     * Obtiene registros usando el SP con soporte para where clauses de Eloquent
     */
    public function scopeGetWithStoredProcedure($query, ?int $page = 1, ?int $pageSize = 10, ?string $sortColumn = null, string $sortOrder = 'ASC')
    {
        $filters = $this->buildFiltersFromQuery($query);
        return $this->scopeFromStoredProcedure($query, $filters, null, $page, $pageSize, $sortColumn, $sortOrder);
    }
}