<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Ceses
 */
class VCese extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Ceses'; // Esquema y tabla especificados

    protected $fillable = [
        'iTipoDocId',
        'iCesAccId',
        'iCesMotAccId',
        'cCesesNumeroDocumento',
        'dtCesesFechaDocumento',
        'iArchId',
        'iRegLabId',
        'dtCesesFechaCese',
        'iCesesServicioAnios',
        'iCesesServicioDias',
        'iCesesServicioMeses',
        'cCesesAnotaciones',
        'cCesAccNombre',
        'cCesMotAccNombre',
        'iCesesId',
        'cRegLabNombre',
        'iLegId'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'iCesAccId' => 'integer',
        'iCesMotAccId' => 'integer',
        'cCesesNumeroDocumento' => 'string',
        'dtCesesFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'dtCesesFechaCese' => 'date',
        'iCesesServicioAnios' => 'integer',
        'iCesesServicioDias' => 'integer',
        'iCesesServicioMeses' => 'integer',
        'cCesesAnotaciones' => 'string',
        'cCesAccNombre' => 'string',
        'cCesMotAccNombre' => 'string',
        'iCesesId' => 'integer',
        'cRegLabNombre' => 'string',
        'iLegId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}