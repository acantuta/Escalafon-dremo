<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.asignaciones_incentivos
 */
class AsignacionIncentivo extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.asignaciones_incentivos'; // Esquema y tabla especificados
    protected $primaryKey = 'IAsigIncId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'iArchId',
        'iRegLabId',
        'iCompAccId',
        'iCompMotAccId',
        'iComTipFallId',
        'iComTipMonId',
        'cAsigIncFallecido',
        'cAsigIncNumeroDocumento',
        'dtAsigIncFechaDocumento',
        'cAsigIncDerechoHabienteFallecido',
        'cAsigIncDerechoSubsidiado',
        'iCompTipPagId',
        'nAsigIncMonto',
        'cAsigIncAnotaciones',
        'cAsigIncMotivoPago'
    ];

    protected $casts = [
        'IAsigIncId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iCompAccId' => 'integer',
        'iCompMotAccId' => 'integer',
        'iComTipFallId' => 'integer',
        'iComTipMonId' => 'integer',
        'cAsigIncFallecido' => 'string',
        'cAsigIncNumeroDocumento' => 'string',
        'dtAsigIncFechaDocumento' => 'date',
        'cAsigIncDerechoHabienteFallecido' => 'string',
        'cAsigIncDerechoSubsidiado' => 'string',
        'iCompTipPagId' => 'integer',
        'nAsigIncMonto' => 'string',
        'cAsigIncAnotaciones' => 'string',
        'cAsigIncMotivoPago' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}