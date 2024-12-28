export interface SistemaPensionario {
    /**
     * @type { number } - iSisPenId
     */
    iSisPenId?: number;

    /**
     * @type { number } - iLegId
     */
    iLegId?: number;

    /**
     * @type { number } - iRegPenId
     */
    iRegPenId?: number;

    /**
     * @type { number } - iAdmFonPenId
     */
    iAdmFonPenId?: number;

    /**
     * @type { number } - iTipComPenId
     */
    iTipComPenId?: number;

    /**
     * @type { number } - iArchId
     */
    iArchId?: number;

    /**
     * @type { Date } - dtSisPenFechaVigencia
     */
    dtSisPenFechaVigencia?: Date;

    /**
     * @type { Date } - dtSisPenFechaAfiliacion
     */
    dtSisPenFechaAfiliacion?: Date;

    /**
     * @type { Date } - dtSisPenFechaDevengue
     */
    dtSisPenFechaDevengue?: Date;

    /**
     * @type { string } - cSisPenNumeroCuspp
     */
    cSisPenNumeroCuspp?: string;

    /**
     * @type { string } - cSisPenAnotaciones
     */
    cSisPenAnotaciones?: string;

}