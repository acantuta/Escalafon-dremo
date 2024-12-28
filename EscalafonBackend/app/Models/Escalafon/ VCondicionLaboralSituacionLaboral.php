<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;

/**
 * Modelo para la tabla: esc.V_CondicionesLaboralesSituacionesLaborales
 * Llave(s) Primaria(s): None
 * Llave(s) Foránea(s): None
 */
class  VCondicionLaboralSituacionLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;

    protected $table = 'esc.V_CondicionesLaboralesSituacionesLaborales'; // Esquema y tabla especificados
    protected $schema = 'esc'; // Esquema especificado para los procedimientos almacenados

    protected $fillable = [
        'iCondSitId',
        'iCondLabId',
        'Expr1',
        'cSitLabNombre'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public $iCondSitId; // Type: int, Nullable: not null
    public $iCondLabId; // Type: int, Nullable: not null
    public $Expr1; // Type: int, Nullable: not null
    public $cSitLabNombre; // Type: varchar, Nullable: not null


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