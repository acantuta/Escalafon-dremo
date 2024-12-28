<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Legajos
 */
class VLegajo extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Legajos'; // Esquema y tabla especificados
    protected $primaryKey = 'iLegId';

    protected $fillable = [
        'iTipoDocId',
        'iTipoAperLegId',
        'iPersId',
        'iRegLabId',
        'iAccVincId',
        'iEscCatId',
        'iMotAccVincId',
        'iCondLabId',
        'iCentLabId',
        'iSitLabId',
        'iTipoSerId',
        'cLegCodigoPlaza',
        'cUseZonaSubRegion',
        'cLegPrimerApellido',
        'iCargLabId',
        'cVincLabNumeroDocumento',
        'dtVincLabFechaDocumento',
        'iArchId',
        'cLegCargo',
        'iJorLabId',
        'dtVincLabFechaInicio',
        'dtVincLabFechaFin',
        'cLegAnotaciones',
        'bVincLabMandatoJudicial',
        'cLegSegundoApellido',
        'cLegNombres',
        'dtLegFechaNacimiento',
        'cLegTelefonoPrincipal',
        'cLegTelefonoMovil',
        'cLegCorreoElectronicoPersonal',
        'cLegCorreoElectronicoLaboral',
        'cLegContactoEmergenciaNombre',
        'cLegContactoEmergenciaTelefonoFijo',
        'cLegContactoEmergenciaTelefonoMovil',
        'bLegLicenciadoFaa',
        'iTipoEstCivId',
        'iTipoIdentId',
        'cLegNumeroDocumentoIdentida',
        'cLegSexo',
        'dtLegFechaFallecido',
        'cRegLabNombre',
        'cCentLabNombre',
        'cCondLabNombre',
        'cSitLabNombre',
        'iDptoIdNacimiento',
        'iPrvnIdNacimiento',
        'iDsttIdNacimiento',
        'cLegDireccion',
        'iDptoIdDireccion',
        'iPrvnIdDireccion',
        'iDsttIdDireccion',
        'iPaisIdNacimiento',
        'cLegConstanciaFaa',
        'iArchIdFaa',
        'bLegTieneDiscapacidad',
        'cLegEntidadEmisoraDiscapacidad',
        'cLegNumeroDocumentoDiscapacidad',
        'dLegFechaEmisionDocumentoDiscapacidad',
        'cLegNombreDiscapacidad',
        'cLegGradoDiscapacidad',
        'iArchIdDiscapacidad',
        'cInstGeEduNombre',
        'iArchIdFoto',
        'cCentLabCodigoModular',
        'cTipoEstCivilNombre',
        'cModEduNombre',
        'iNivEduNombre',
        'cJorLabNombre'
    ];

    protected $casts = [
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'iTipoAperLegId' => 'integer',
        'iPersId' => 'integer',
        'iRegLabId' => 'integer',
        'iAccVincId' => 'integer',
        'iEscCatId' => 'integer',
        'iMotAccVincId' => 'integer',
        'iCondLabId' => 'integer',
        'iCentLabId' => 'integer',
        'iSitLabId' => 'integer',
        'iTipoSerId' => 'integer',
        'cLegCodigoPlaza' => 'string',
        'cUseZonaSubRegion' => 'string',
        'cLegPrimerApellido' => 'string',
        'iCargLabId' => 'integer',
        'cVincLabNumeroDocumento' => 'string',
        'dtVincLabFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'cLegCargo' => 'string',
        'iJorLabId' => 'integer',
        'dtVincLabFechaInicio' => 'date',
        'dtVincLabFechaFin' => 'date',
        'cLegAnotaciones' => 'string',
        'bVincLabMandatoJudicial' => 'boolean',
        'cLegSegundoApellido' => 'string',
        'cLegNombres' => 'string',
        'dtLegFechaNacimiento' => 'date',
        'cLegTelefonoPrincipal' => 'string',
        'cLegTelefonoMovil' => 'string',
        'cLegCorreoElectronicoPersonal' => 'string',
        'cLegCorreoElectronicoLaboral' => 'string',
        'cLegContactoEmergenciaNombre' => 'string',
        'cLegContactoEmergenciaTelefonoFijo' => 'string',
        'cLegContactoEmergenciaTelefonoMovil' => 'string',
        'bLegLicenciadoFaa' => 'boolean',
        'iTipoEstCivId' => 'integer',
        'iTipoIdentId' => 'integer',
        'cLegNumeroDocumentoIdentida' => 'string',
        'cLegSexo' => 'string',
        'dtLegFechaFallecido' => 'date',
        'cRegLabNombre' => 'string',
        'cCentLabNombre' => 'string',
        'cCondLabNombre' => 'string',
        'cSitLabNombre' => 'string',
        'iDptoIdNacimiento' => 'integer',
        'iPrvnIdNacimiento' => 'integer',
        'iDsttIdNacimiento' => 'integer',
        'cLegDireccion' => 'string',
        'iDptoIdDireccion' => 'integer',
        'iPrvnIdDireccion' => 'integer',
        'iDsttIdDireccion' => 'integer',
        'iPaisIdNacimiento' => 'integer',
        'cLegConstanciaFaa' => 'string',
        'iArchIdFaa' => 'integer',
        'bLegTieneDiscapacidad' => 'boolean',
        'cLegEntidadEmisoraDiscapacidad' => 'string',
        'cLegNumeroDocumentoDiscapacidad' => 'string',
        'dLegFechaEmisionDocumentoDiscapacidad' => 'date',
        'cLegNombreDiscapacidad' => 'string',
        'cLegGradoDiscapacidad' => 'string',
        'iArchIdDiscapacidad' => 'integer',
        'cInstGeEduNombre' => 'string',
        'iArchIdFoto' => 'integer',
        'cCentLabCodigoModular' => 'string',
        'cTipoEstCivilNombre' => 'string',
        'cModEduNombre' => 'string',
        'iNivEduNombre' => 'string',
        'cJorLabNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}