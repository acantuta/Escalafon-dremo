<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoEvaluacionesDesempeniosMotivosAcciones
 */
class VMantenimientoEvaluacionDesempenioMotivoAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoEvaluacionesDesempeniosMotivosAcciones'; // Esquema y tabla especificados

    protected $fillable = [
        'iEvalDescAccMotId',
        'cEvalDesAccNombre',
        'cEvalDescAccMotNombre',
        'iEvalDesAccId',
        'cRegLabNombre'
    ];

    protected $casts = [
        'iEvalDescAccMotId' => 'integer',
        'cEvalDesAccNombre' => 'string',
        'cEvalDescAccMotNombre' => 'string',
        'iEvalDesAccId' => 'integer',
        'cRegLabNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}