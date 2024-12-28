<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.vinculaciones_laborales
 */
class VinculacionLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.vinculaciones_laborales'; // Esquema y tabla especificados
    protected $primaryKey = 'iVincLabId';

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
        'iEscCatId',
        'cVincLabUseZonaSubRegion',
        'cVincLabcargo',
        'iCatRemuId',
        'iGrupOcupId',
        'iCargLabId',
        'iJorLabId',
        'iVincLabHorasJornadaLaboral',
        'dtVincLabFechaInicio',
        'dtVincLabFechaFin',
        'bVincLabMandatoJudicial',
        'cVincLabAnotaciones'
    ];

    protected $casts = [
        'iVincLabId' => 'integer',
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
        'iEscCatId' => 'integer',
        'cVincLabUseZonaSubRegion' => 'string',
        'cVincLabcargo' => 'string',
        'iCatRemuId' => 'integer',
        'iGrupOcupId' => 'integer',
        'iCargLabId' => 'integer',
        'iJorLabId' => 'integer',
        'iVincLabHorasJornadaLaboral' => 'integer',
        'dtVincLabFechaInicio' => 'date',
        'dtVincLabFechaFin' => 'date',
        'bVincLabMandatoJudicial' => 'boolean',
        'cVincLabAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}