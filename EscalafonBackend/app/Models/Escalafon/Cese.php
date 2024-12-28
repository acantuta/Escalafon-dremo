<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.ceses
 */
class Cese extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.ceses'; // Esquema y tabla especificados
    protected $primaryKey = 'iCesesId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'iCesAccId',
        'iCesMotAccId',
        'cCesesNumeroDocumento',
        'dtCesesFechaDocumento',
        'iArchId',
        'iRegLabId',
        'dtCesesFechaCese',
        'iCesesServicioAnios',
        'iCesesServicioMeses',
        'iCesesServicioDias',
        'cCesesAnotaciones'
    ];

    protected $casts = [
        'iCesesId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'iCesAccId' => 'integer',
        'iCesMotAccId' => 'integer',
        'cCesesNumeroDocumento' => 'string',
        'dtCesesFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'dtCesesFechaCese' => 'date',
        'iCesesServicioAnios' => 'integer',
        'iCesesServicioMeses' => 'integer',
        'iCesesServicioDias' => 'integer',
        'cCesesAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}