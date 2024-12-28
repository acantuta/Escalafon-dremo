export interface VacacionLicencia {
    /**
     * @type { number } - iVacLicId
     */
    iVacLicId?: number;

    /**
     * @type { number } - iLegId
     */
    iLegId?: number;

    /**
     * @type { number } - iTipoDocId
     */
    iTipoDocId?: number;

    /**
     * @type { string } - cVacLicNumeroDocumento
     */
    cVacLicNumeroDocumento?: string;

    /**
     * @type { Date } - dtVacLicFechaDocumento
     */
    dtVacLicFechaDocumento?: Date;

    /**
     * @type { number } - iArchId
     */
    iArchId?: number;

    /**
     * @type { number } - iRegLabId
     */
    iRegLabId?: number;

    /**
     * @type { number } - iMovAccId
     */
    iMovAccId?: number;

    /**
     * @type { number } - iMovMotId
     */
    iMovMotId?: number;

    /**
     * @type { Date } - dtVacLicFechaInicio
     */
    dtVacLicFechaInicio?: Date;

    /**
     * @type { Date } - dtVacLicFechaFin
     */
    dtVacLicFechaFin?: Date;

    /**
     * @type { string } - cVacLicAnotaciones
     */
    cVacLicAnotaciones?: string;

}