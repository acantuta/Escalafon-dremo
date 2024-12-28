<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;

/**
 * Modelo para la tabla: grl.estados_civiles
 * Llave(s) Primaria(s): None
 * Llave(s) Foránea(s): None
 */
class EstadoCivil extends Model
{
    use HasFactory;
    use HasStoredProcedures;

    protected $table = 'grl.estados_civiles'; // Esquema y tabla especificados
    protected $schema = 'esc'; // Esquema especificado para los procedimientos almacenados

    protected $fillable = [
        
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps



    /**
     * Constructor para inicializar propiedades.
     * @param array $data Arreglo asociativo de valores de columnas.
     */
    public function __construct(array $data = [])
    {
        parent::__construct();
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }
}