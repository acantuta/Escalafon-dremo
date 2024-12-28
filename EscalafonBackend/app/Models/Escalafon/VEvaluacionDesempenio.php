<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_EvaluacionesDesempenios
 */
class VEvaluacionDesempenio extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_EvaluacionesDesempenios'; // Esquema y tabla especificados

    protected $fillable = [
        'iTipoDocId',
        'cEvalDesNumeroDocumento',
        'dtEvalDesFechaDocumento',
        'iArchId',
        'iRegLabId',
        'iEvalDesAccId',
        'iEvalDescAccMotId',
        'cEvalDesAnotaciones',
        'cEvalDesAccNombre',
        'cEvalDescAccMotNombre',
        'cRegLabNombre',
        'iEvalDesId',
        'iLegId'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'cEvalDesNumeroDocumento' => 'string',
        'dtEvalDesFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iEvalDesAccId' => 'integer',
        'iEvalDescAccMotId' => 'integer',
        'cEvalDesAnotaciones' => 'string',
        'cEvalDesAccNombre' => 'string',
        'cEvalDescAccMotNombre' => 'string',
        'cRegLabNombre' => 'string',
        'iEvalDesId' => 'integer',
        'iLegId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}