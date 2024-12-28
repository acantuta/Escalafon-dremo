<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MovimientosPersonales
 */
class VMovimientoPersonal extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MovimientosPersonales'; // Esquema y tabla especificados

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'cVacLicNumeroDocumento',
        'dtVacLicFechaDocumento',
        'iArchId',
        'iRegLabId',
        'iMovAccId',
        'iMovMotId',
        'dtVacLicFechaInicio',
        'dtVacLicFechaFin',
        'cVacLicAnotaciones',
        'cMovAccNombre',
        'cMovMotNombre',
        'cRegLabNombre',
        'iVacLicId'
    ];

    protected $casts = [
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'cVacLicNumeroDocumento' => 'string',
        'dtVacLicFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iMovAccId' => 'integer',
        'iMovMotId' => 'integer',
        'dtVacLicFechaInicio' => 'date',
        'dtVacLicFechaFin' => 'date',
        'cVacLicAnotaciones' => 'string',
        'cMovAccNombre' => 'string',
        'cMovMotNombre' => 'string',
        'cRegLabNombre' => 'string',
        'iVacLicId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}