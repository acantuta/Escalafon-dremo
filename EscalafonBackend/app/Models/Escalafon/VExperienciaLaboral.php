<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_ExperienciasLaborales
 */
class VExperienciaLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_ExperienciasLaborales'; // Esquema y tabla especificados

    protected $fillable = [
        'iLegId',
        'iExpLabSecId',
        'cExpLabEntidad',
        'cExpLabCargo',
        'cExpLabNumeroDocumento',
        'dtExpLabFechaDocumento',
        'dtExpLabFechaInicio',
        'dtExpLabFechaFin',
        'cExpLabAnotaciones',
        'iArchId',
        'cExpLabSecNombre',
        'cExpLabFuncionesDesempenadas',
        'iExpLabId'
    ];

    protected $casts = [
        'iLegId' => 'integer',
        'iExpLabSecId' => 'integer',
        'cExpLabEntidad' => 'string',
        'cExpLabCargo' => 'string',
        'cExpLabNumeroDocumento' => 'string',
        'dtExpLabFechaDocumento' => 'date',
        'dtExpLabFechaInicio' => 'date',
        'dtExpLabFechaFin' => 'date',
        'cExpLabAnotaciones' => 'string',
        'iArchId' => 'integer',
        'cExpLabSecNombre' => 'string',
        'cExpLabFuncionesDesempenadas' => 'string',
        'iExpLabId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}