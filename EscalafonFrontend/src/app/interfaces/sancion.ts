export interface Sancion {
    /**
     * @type { number } - iSancId
     */
    iSancId?: number;

    /**
     * @type { number } - iLegId
     */
    iLegId?: number;

    /**
     * @type { number } - iTipoDocId
     */
    iTipoDocId?: number;

    /**
     * @type { string } - cSancNumeroDocumento
     */
    cSancNumeroDocumento?: string;

    /**
     * @type { Date } - dtSancFechaDocumento
     */
    dtSancFechaDocumento?: Date;

    /**
     * @type { string } - cSancInstitucionEmiteDocumento
     */
    cSancInstitucionEmiteDocumento?: string;

    /**
     * @type { number } - iArchId
     */
    iArchId?: number;

    /**
     * @type { number } - iTipSancId
     */
    iTipSancId?: number;

    /**
     * @type { string } - cSancCausaMotivo
     */
    cSancCausaMotivo?: string;

    /**
     * @type { Date } - dtSancFechaNotificacion
     */
    dtSancFechaNotificacion?: Date;

    /**
     * @type { Date } - dtSancFechaInicio
     */
    dtSancFechaInicio?: Date;

    /**
     * @type { Date } - dtSancFechaFin
     */
    dtSancFechaFin?: Date;

    /**
     * @type { string } - cSancAnotaciones
     */
    cSancAnotaciones?: string;

}