<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.desplazamientos
 */
class Desplazamiento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.desplazamientos'; // Esquema y tabla especificados
    protected $primaryKey = 'iDespId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'cDespNumeroDocumento',
        'dtDespFechaDocumento',
        'iArchId',
        'iRegLabId',
        'iDespAccId',
        'iDespMotId',
        'dtFechaInicio',
        'dtFechaFin',
        'cDespCodigoModularOrigen',
        'iDirRegIdOrigen',
        'iInstGeEduIdOrigen',
        'iModEduIdOrigen',
        'iNivEduIdOrigen',
        'iCentLabIdOrigen',
        'iCondLabIdOrigen',
        'iGrupOcupIdOrigen',
        'iCatRemuIdOrigen',
        'iSitLabIdOrigen',
        'cDespCodigoPlazaOrigen',
        'cDespLabUseZonaSubRegionOrigen',
        'iEscCatIdOrigen',
        'iCargLabIdOrigen',
        'iJorLabIdOrigen',
        'cDespCodigoModularDestino',
        'iDirRegIdDestino',
        'iInstGeEduIdDestino',
        'iModEduIdDestino',
        'iNivEduIdDestino',
        'iCentLabIdDestino',
        'iCondLabIdDestino',
        'iGrupOcupIdDestino',
        'iCatRemuIdDestino',
        'iSitLabIdDestino',
        'cDespCodigoPlazaDestino',
        'cDespLabUseZonaSubRegionDestino',
        'iEscCatIdDestino',
        'iCargLabIdDestino',
        'iJorLabIdDestino',
        'bDespMandadoJudicial',
        'cDespAnotaciones'
    ];

    protected $casts = [
        'iDespId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'cDespNumeroDocumento' => 'string',
        'dtDespFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iDespAccId' => 'integer',
        'iDespMotId' => 'integer',
        'dtFechaInicio' => 'date',
        'dtFechaFin' => 'date',
        'cDespCodigoModularOrigen' => 'string',
        'iDirRegIdOrigen' => 'integer',
        'iInstGeEduIdOrigen' => 'integer',
        'iModEduIdOrigen' => 'integer',
        'iNivEduIdOrigen' => 'integer',
        'iCentLabIdOrigen' => 'integer',
        'iCondLabIdOrigen' => 'integer',
        'iGrupOcupIdOrigen' => 'integer',
        'iCatRemuIdOrigen' => 'integer',
        'iSitLabIdOrigen' => 'integer',
        'cDespCodigoPlazaOrigen' => 'string',
        'cDespLabUseZonaSubRegionOrigen' => 'string',
        'iEscCatIdOrigen' => 'integer',
        'iCargLabIdOrigen' => 'integer',
        'iJorLabIdOrigen' => 'integer',
        'cDespCodigoModularDestino' => 'string',
        'iDirRegIdDestino' => 'integer',
        'iInstGeEduIdDestino' => 'integer',
        'iModEduIdDestino' => 'integer',
        'iNivEduIdDestino' => 'integer',
        'iCentLabIdDestino' => 'integer',
        'iCondLabIdDestino' => 'integer',
        'iGrupOcupIdDestino' => 'integer',
        'iCatRemuIdDestino' => 'integer',
        'iSitLabIdDestino' => 'integer',
        'cDespCodigoPlazaDestino' => 'string',
        'cDespLabUseZonaSubRegionDestino' => 'string',
        'iEscCatIdDestino' => 'integer',
        'iCargLabIdDestino' => 'integer',
        'iJorLabIdDestino' => 'integer',
        'bDespMandadoJudicial' => 'boolean',
        'cDespAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}