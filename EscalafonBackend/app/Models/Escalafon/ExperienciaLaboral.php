<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.experiencias_laborales
 */
class ExperienciaLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.experiencias_laborales'; // Esquema y tabla especificados
    protected $primaryKey = 'iExpLabId';

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
        'cExpLabFuncionesDesempenadas'
    ];

    protected $casts = [
        'iExpLabId' => 'integer',
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
        'cExpLabFuncionesDesempenadas' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}