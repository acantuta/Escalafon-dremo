export interface VSancion {
    /**
     * @type { number } - iTipoDocId
     */
    iTipoDocId?: number;

    /**
     * @type { string } - cSancNumeroDocumento
     */
    cSancNumeroDocumento?: string;

    /**
     * @type { string } - cSancInstitucionEmiteDocumento
     */
    cSancInstitucionEmiteDocumento?: string;

    /**
     * @type { Date } - dtSancFechaDocumento
     */
    dtSancFechaDocumento?: Date;

    /**
     * @type { string } - cSancAnotaciones
     */
    cSancAnotaciones?: string;

    /**
     * @type { Date } - dtSancFechaFin
     */
    dtSancFechaFin?: Date;

    /**
     * @type { Date } - dtSancFechaInicio
     */
    dtSancFechaInicio?: Date;

    /**
     * @type { Date } - dtSancFechaNotificacion
     */
    dtSancFechaNotificacion?: Date;

    /**
     * @type { string } - cSancCausaMotivo
     */
    cSancCausaMotivo?: string;

    /**
     * @type { number } - iTipSancId
     */
    iTipSancId?: number;

    /**
     * @type { number } - iArchId
     */
    iArchId?: number;

    /**
     * @type { string } - cTipoDocNombre
     */
    cTipoDocNombre?: string;

    /**
     * @type { number } - iSancId
     */
    iSancId?: number;

    /**
     * @type { number } - iLegId
     */
    iLegId?: number;

}