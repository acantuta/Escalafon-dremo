export interface Reconocimiento {
    /**
     * @type { number } - iRecoId
     */
    iRecoId?: number;

    /**
     * @type { number } - iLegId
     */
    iLegId?: number;

    /**
     * @type { number } - iTipoDocId
     */
    iTipoDocId?: number;

    /**
     * @type { string } - cRecoNumeroDocumento
     */
    cRecoNumeroDocumento?: string;

    /**
     * @type { Date } - dtRecoFechaDocumento
     */
    dtRecoFechaDocumento?: Date;

    /**
     * @type { Date } - dtRecoFechaInicio
     */
    dtRecoFechaInicio?: Date;

    /**
     * @type { number } - iArchId
     */
    iArchId?: number;

    /**
     * @type { number } - iRecoTipMerId
     */
    iRecoTipMerId?: number;

    /**
     * @type { number } - iRecoMerId
     */
    iRecoMerId?: number;

    /**
     * @type { string } - cRecoEntidadEmisora
     */
    cRecoEntidadEmisora?: string;

    /**
     * @type { string } - cRecoAnotaciones
     */
    cRecoAnotaciones?: string;

}