<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.legajos
 */
class Legajo extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.legajos'; // Esquema y tabla especificados
    protected $primaryKey = 'iLegId';

    protected $fillable = [
        'iTipoDocId',
        'iTipoAperLegId',
        'iPersId',
        'iRegLabId',
        'iAccVincId',
        'iMotAccVincId',
        'iEscCatId',
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
        'bVincLabMandatoJudicial',
        'cLegAnotaciones',
        'cLegSegundoApellido',
        'cLegNombres',
        'dtLegFechaNacimiento',
        'iDptoIdDireccion',
        'iPrvnIdDireccion',
        'iDsttIdDireccion',
        'cLegDireccion',
        'cLegTelefonoPrincipal',
        'cLegTelefonoMovil',
        'cLegCorreoElectronicoPersonal',
        'cLegCorreoElectronicoLaboral',
        'cLegContactoEmergenciaNombre',
        'cLegContactoEmergenciaTelefonoFijo',
        'cLegContactoEmergenciaTelefonoMovil',
        'bLegLicenciadoFaa',
        'cLegConstanciaFaa',
        'iArchIdFaa',
        'bLegTieneDiscapacidad',
        'cLegEntidadEmisoraDiscapacidad',
        'cLegNumeroDocumentoDiscapacidad',
        'dLegFechaEmisionDocumentoDiscapacidad',
        'cLegNombreDiscapacidad',
        'cLegGradoDiscapacidad',
        'iArchIdDiscapacidad',
        'iTipoEstCivId',
        'iTipoIdentId',
        'cLegNumeroDocumentoIdentida',
        'cLegSexo',
        'dtLegFechaFallecido',
        'iPaisIdNacimiento',
        'iDptoIdNacimiento',
        'iPrvnIdNacimiento',
        'iDsttIdNacimiento',
        'iArchIdFoto'
    ];

    protected $casts = [
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'iTipoAperLegId' => 'integer',
        'iPersId' => 'integer',
        'iRegLabId' => 'integer',
        'iAccVincId' => 'integer',
        'iMotAccVincId' => 'integer',
        'iEscCatId' => 'integer',
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
        'bVincLabMandatoJudicial' => 'boolean',
        'cLegAnotaciones' => 'string',
        'cLegSegundoApellido' => 'string',
        'cLegNombres' => 'string',
        'dtLegFechaNacimiento' => 'date',
        'iDptoIdDireccion' => 'integer',
        'iPrvnIdDireccion' => 'integer',
        'iDsttIdDireccion' => 'integer',
        'cLegDireccion' => 'string',
        'cLegTelefonoPrincipal' => 'string',
        'cLegTelefonoMovil' => 'string',
        'cLegCorreoElectronicoPersonal' => 'string',
        'cLegCorreoElectronicoLaboral' => 'string',
        'cLegContactoEmergenciaNombre' => 'string',
        'cLegContactoEmergenciaTelefonoFijo' => 'string',
        'cLegContactoEmergenciaTelefonoMovil' => 'string',
        'bLegLicenciadoFaa' => 'boolean',
        'cLegConstanciaFaa' => 'string',
        'iArchIdFaa' => 'integer',
        'bLegTieneDiscapacidad' => 'boolean',
        'cLegEntidadEmisoraDiscapacidad' => 'string',
        'cLegNumeroDocumentoDiscapacidad' => 'string',
        'dLegFechaEmisionDocumentoDiscapacidad' => 'date',
        'cLegNombreDiscapacidad' => 'string',
        'cLegGradoDiscapacidad' => 'string',
        'iArchIdDiscapacidad' => 'integer',
        'iTipoEstCivId' => 'integer',
        'iTipoIdentId' => 'integer',
        'cLegNumeroDocumentoIdentida' => 'string',
        'cLegSexo' => 'string',
        'dtLegFechaFallecido' => 'date',
        'iPaisIdNacimiento' => 'integer',
        'iDptoIdNacimiento' => 'integer',
        'iPrvnIdNacimiento' => 'integer',
        'iDsttIdNacimiento' => 'integer',
        'iArchIdFoto' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}