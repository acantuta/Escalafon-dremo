<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_VinculacionesLaborales
 */
class VVinculacionLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_VinculacionesLaborales'; // Esquema y tabla especificados

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'cVincLabNumeroDocumento',
        'dtVincLabFechaDocumento',
        'iArchId',
        'iRegLabId',
        'iAccVincId',
        'iMotAccVincId',
        'iCentLabId',
        'cVincLabCodigoPlaza',
        'cVincLabcargo',
        'iCatRemuId',
        'iGrupOcupId',
        'iJorLabId',
        'iCargLabId',
        'iVincLabHorasJornadaLaboral',
        'dtVincLabFechaInicio',
        'bVincLabMandatoJudicial',
        'dtVincLabFechaFin',
        'cTipoDocNombre',
        'cRegLabNombre',
        'cAccVincNombre',
        'cMotAccVincNombre',
        'cCentLabNombre',
        'cCargLabNombre',
        'iVincLabId',
        'iEscCatId',
        'cVincLabUseZonaSubRegion',
        'cVincLabAnotaciones'
    ];

    protected $casts = [
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'cVincLabNumeroDocumento' => 'string',
        'dtVincLabFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iAccVincId' => 'integer',
        'iMotAccVincId' => 'integer',
        'iCentLabId' => 'integer',
        'cVincLabCodigoPlaza' => 'string',
        'cVincLabcargo' => 'string',
        'iCatRemuId' => 'integer',
        'iGrupOcupId' => 'integer',
        'iJorLabId' => 'integer',
        'iCargLabId' => 'integer',
        'iVincLabHorasJornadaLaboral' => 'integer',
        'dtVincLabFechaInicio' => 'date',
        'bVincLabMandatoJudicial' => 'boolean',
        'dtVincLabFechaFin' => 'date',
        'cTipoDocNombre' => 'string',
        'cRegLabNombre' => 'string',
        'cAccVincNombre' => 'string',
        'cMotAccVincNombre' => 'string',
        'cCentLabNombre' => 'string',
        'cCargLabNombre' => 'string',
        'iVincLabId' => 'integer',
        'iEscCatId' => 'integer',
        'cVincLabUseZonaSubRegion' => 'string',
        'cVincLabAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}