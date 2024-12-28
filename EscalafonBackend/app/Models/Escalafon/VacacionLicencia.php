<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.vacaciones_licencias
 */
class VacacionLicencia extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.vacaciones_licencias'; // Esquema y tabla especificados
    protected $primaryKey = 'iVacLicId';

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
        'cVacLicAnotaciones'
    ];

    protected $casts = [
        'iVacLicId' => 'integer',
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
        'cVacLicAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}