<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Compensaciones
 */
class VCompensacion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Compensaciones'; // Esquema y tabla especificados

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'iArchId',
        'iRegLabId',
        'iCompAccId',
        'iCompMotAccId',
        'iComTipFallId',
        'iComTipMonId',
        'cAsigIncNumeroDocumento',
        'dtAsigIncFechaDocumento',
        'cAsigIncDerechoHabienteFallecido',
        'cAsigIncDerechoSubsidiado',
        'iCompTipPagId',
        'nAsigIncMonto',
        'cAsigIncAnotaciones',
        'cCompAccNombre',
        'cCompMotAccNombre',
        'cRegLabNombre',
        'cAsigIncMotivoPago',
        'IAsigIncId',
        'cAsigIncFallecido'
    ];

    protected $casts = [
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iCompAccId' => 'integer',
        'iCompMotAccId' => 'integer',
        'iComTipFallId' => 'integer',
        'iComTipMonId' => 'integer',
        'cAsigIncNumeroDocumento' => 'string',
        'dtAsigIncFechaDocumento' => 'date',
        'cAsigIncDerechoHabienteFallecido' => 'string',
        'cAsigIncDerechoSubsidiado' => 'string',
        'iCompTipPagId' => 'integer',
        'nAsigIncMonto' => 'string',
        'cAsigIncAnotaciones' => 'string',
        'cCompAccNombre' => 'string',
        'cCompMotAccNombre' => 'string',
        'cRegLabNombre' => 'string',
        'cAsigIncMotivoPago' => 'string',
        'IAsigIncId' => 'integer',
        'cAsigIncFallecido' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}