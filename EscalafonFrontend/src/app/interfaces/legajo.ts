export interface Legajo {
    /**
     * @type { number } - iLegId
     */
    iLegId?: number;

    /**
     * @type { number } - iTipoDocId
     */
    iTipoDocId?: number;

    /**
     * @type { number } - iTipoAperLegId
     */
    iTipoAperLegId?: number;

    /**
     * @type { number } - iPersId
     */
    iPersId?: number;

    /**
     * @type { number } - iRegLabId
     */
    iRegLabId?: number;

    /**
     * @type { number } - iAccVincId
     */
    iAccVincId?: number;

    /**
     * @type { number } - iMotAccVincId
     */
    iMotAccVincId?: number;

    /**
     * @type { number } - iEscCatId
     */
    iEscCatId?: number;

    /**
     * @type { number } - iCondLabId
     */
    iCondLabId?: number;

    /**
     * @type { number } - iCentLabId
     */
    iCentLabId?: number;

    /**
     * @type { number } - iSitLabId
     */
    iSitLabId?: number;

    /**
     * @type { number } - iTipoSerId
     */
    iTipoSerId?: number;

    /**
     * @type { string } - cLegCodigoPlaza
     */
    cLegCodigoPlaza?: string;

    /**
     * @type { string } - cUseZonaSubRegion
     */
    cUseZonaSubRegion?: string;

    /**
     * @type { string } - cLegPrimerApellido
     */
    cLegPrimerApellido?: string;

    /**
     * @type { number } - iCargLabId
     */
    iCargLabId?: number;

    /**
     * @type { string } - cVincLabNumeroDocumento
     */
    cVincLabNumeroDocumento?: string;

    /**
     * @type { Date } - dtVincLabFechaDocumento
     */
    dtVincLabFechaDocumento?: Date;

    /**
     * @type { number } - iArchId
     */
    iArchId?: number;

    /**
     * @type { string } - cLegCargo
     */
    cLegCargo?: string;

    /**
     * @type { number } - iJorLabId
     */
    iJorLabId?: number;

    /**
     * @type { Date } - dtVincLabFechaInicio
     */
    dtVincLabFechaInicio?: Date;

    /**
     * @type { Date } - dtVincLabFechaFin
     */
    dtVincLabFechaFin?: Date;

    /**
     * @type { boolean } - bVincLabMandatoJudicial
     */
    bVincLabMandatoJudicial?: boolean;

    /**
     * @type { string } - cLegAnotaciones
     */
    cLegAnotaciones?: string;

    /**
     * @type { string } - cLegSegundoApellido
     */
    cLegSegundoApellido?: string;

    /**
     * @type { string } - cLegNombres
     */
    cLegNombres?: string;

    /**
     * @type { Date } - dtLegFechaNacimiento
     */
    dtLegFechaNacimiento?: Date;

    /**
     * @type { number } - iDptoIdDireccion
     */
    iDptoIdDireccion?: number;

    /**
     * @type { number } - iPrvnIdDireccion
     */
    iPrvnIdDireccion?: number;

    /**
     * @type { number } - iDsttIdDireccion
     */
    iDsttIdDireccion?: number;

    /**
     * @type { string } - cLegDireccion
     */
    cLegDireccion?: string;

    /**
     * @type { string } - cLegTelefonoPrincipal
     */
    cLegTelefonoPrincipal?: string;

    /**
     * @type { string } - cLegTelefonoMovil
     */
    cLegTelefonoMovil?: string;

    /**
     * @type { string } - cLegCorreoElectronicoPersonal
     */
    cLegCorreoElectronicoPersonal?: string;

    /**
     * @type { string } - cLegCorreoElectronicoLaboral
     */
    cLegCorreoElectronicoLaboral?: string;

    /**
     * @type { string } - cLegContactoEmergenciaNombre
     */
    cLegContactoEmergenciaNombre?: string;

    /**
     * @type { string } - cLegContactoEmergenciaTelefonoFijo
     */
    cLegContactoEmergenciaTelefonoFijo?: string;

    /**
     * @type { string } - cLegContactoEmergenciaTelefonoMovil
     */
    cLegContactoEmergenciaTelefonoMovil?: string;

    /**
     * @type { boolean } - bLegLicenciadoFaa
     */
    bLegLicenciadoFaa?: boolean;

    /**
     * @type { string } - cLegConstanciaFaa
     */
    cLegConstanciaFaa?: string;

    /**
     * @type { number } - iArchIdFaa
     */
    iArchIdFaa?: number;

    /**
     * @type { boolean } - bLegTieneDiscapacidad
     */
    bLegTieneDiscapacidad?: boolean;

    /**
     * @type { string } - cLegEntidadEmisoraDiscapacidad
     */
    cLegEntidadEmisoraDiscapacidad?: string;

    /**
     * @type { string } - cLegNumeroDocumentoDiscapacidad
     */
    cLegNumeroDocumentoDiscapacidad?: string;

    /**
     * @type { Date } - dLegFechaEmisionDocumentoDiscapacidad
     */
    dLegFechaEmisionDocumentoDiscapacidad?: Date;

    /**
     * @type { string } - cLegNombreDiscapacidad
     */
    cLegNombreDiscapacidad?: string;

    /**
     * @type { string } - cLegGradoDiscapacidad
     */
    cLegGradoDiscapacidad?: string;

    /**
     * @type { number } - iArchIdDiscapacidad
     */
    iArchIdDiscapacidad?: number;

    /**
     * @type { number } - iTipoEstCivId
     */
    iTipoEstCivId?: number;

    /**
     * @type { number } - iTipoIdentId
     */
    iTipoIdentId?: number;

    /**
     * @type { string } - cLegNumeroDocumentoIdentida
     */
    cLegNumeroDocumentoIdentida?: string;

    /**
     * @type { string } - cLegSexo
     */
    cLegSexo?: string;

    /**
     * @type { Date } - dtLegFechaFallecido
     */
    dtLegFechaFallecido?: Date;

    /**
     * @type { number } - iPaisIdNacimiento
     */
    iPaisIdNacimiento?: number;

    /**
     * @type { number } - iDptoIdNacimiento
     */
    iDptoIdNacimiento?: number;

    /**
     * @type { number } - iPrvnIdNacimiento
     */
    iPrvnIdNacimiento?: number;

    /**
     * @type { number } - iDsttIdNacimiento
     */
    iDsttIdNacimiento?: number;

    /**
     * @type { number } - iArchIdFoto
     */
    iArchIdFoto?: number;

}