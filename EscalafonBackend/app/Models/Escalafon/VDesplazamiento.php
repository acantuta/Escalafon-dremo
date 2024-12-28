<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Desplazamientos
 */
class VDesplazamiento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Desplazamientos'; // Esquema y tabla especificados

    protected $fillable = [
        'iTipoDocId',
        'cDespNumeroDocumento',
        'dtDespFechaDocumento',
        'iArchId',
        'iRegLabId',
        'iDespMotId',
        'iDespAccId',
        'dtFechaFin',
        'dtFechaInicio',
        'cDespCodigoModularOrigen',
        'iDirRegIdOrigen',
        'iInstGeEduIdOrigen',
        'iModEduIdOrigen',
        'iNivEduIdOrigen',
        'iCentLabIdOrigen',
        'iCondLabIdOrigen',
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
        'iSitLabIdDestino',
        'cDespCodigoPlazaDestino',
        'cDespLabUseZonaSubRegionDestino',
        'iEscCatIdDestino',
        'iCargLabIdDestino',
        'iJorLabIdDestino',
        'bDespMandadoJudicial',
        'cDespAnotaciones',
        'cDespNombre',
        'Expr1',
        'cRegLabNombre',
        'iDespId',
        'iLegId',
        'iGrupOcupIdOrigen',
        'iGrupOcupIdDestino',
        'iCatRemuIdOrigen',
        'iCatRemuIdDestino'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'cDespNumeroDocumento' => 'string',
        'dtDespFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iDespMotId' => 'integer',
        'iDespAccId' => 'integer',
        'dtFechaFin' => 'date',
        'dtFechaInicio' => 'date',
        'cDespCodigoModularOrigen' => 'string',
        'iDirRegIdOrigen' => 'integer',
        'iInstGeEduIdOrigen' => 'integer',
        'iModEduIdOrigen' => 'integer',
        'iNivEduIdOrigen' => 'integer',
        'iCentLabIdOrigen' => 'integer',
        'iCondLabIdOrigen' => 'integer',
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
        'iSitLabIdDestino' => 'integer',
        'cDespCodigoPlazaDestino' => 'string',
        'cDespLabUseZonaSubRegionDestino' => 'string',
        'iEscCatIdDestino' => 'integer',
        'iCargLabIdDestino' => 'integer',
        'iJorLabIdDestino' => 'integer',
        'bDespMandadoJudicial' => 'boolean',
        'cDespAnotaciones' => 'string',
        'cDespNombre' => 'string',
        'Expr1' => 'string',
        'cRegLabNombre' => 'string',
        'iDespId' => 'integer',
        'iLegId' => 'integer',
        'iGrupOcupIdOrigen' => 'integer',
        'iGrupOcupIdDestino' => 'integer',
        'iCatRemuIdOrigen' => 'integer',
        'iCatRemuIdDestino' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}