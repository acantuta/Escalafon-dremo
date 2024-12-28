<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.evaluaciones_desempenios_motivos_acciones
 */
class EvaluacionDesempenioMotivoAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.evaluaciones_desempenios_motivos_acciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iEvalDescAccMotId';

    protected $fillable = [
        'iEvalDesAccId',
        'cEvalDescAccMotNombre'
    ];

    protected $casts = [
        'iEvalDescAccMotId' => 'integer',
        'iEvalDesAccId' => 'integer',
        'cEvalDescAccMotNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}