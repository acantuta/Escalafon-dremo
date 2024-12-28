<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.evaluaciones_desempenios
 */
class EvaluacionDesempenio extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.evaluaciones_desempenios'; // Esquema y tabla especificados
    protected $primaryKey = 'iEvalDesId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'cEvalDesNumeroDocumento',
        'dtEvalDesFechaDocumento',
        'iArchId',
        'iRegLabId',
        'iEvalDesAccId',
        'iEvalDescAccMotId',
        'cEvalDesAnotaciones'
    ];

    protected $casts = [
        'iEvalDesId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'cEvalDesNumeroDocumento' => 'string',
        'dtEvalDesFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iEvalDesAccId' => 'integer',
        'iEvalDescAccMotId' => 'integer',
        'cEvalDesAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}