<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Retenciones
 */
class VRetencion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Retenciones'; // Esquema y tabla especificados

    protected $fillable = [
        'iTipoDocId',
        'cRetenNumeroDocumento',
        'dtRetenFechaDocumento',
        'iArchId',
        'iTipRetenId',
        'iComTipMonId',
        'nRetenMontoTotal',
        'nRetenNumeroCuotas',
        'nRetenMontoFijoMensual',
        'nRetenPorcentajeFijoMensual',
        'cRetenEntidadNombre',
        'iTipBenRetenId',
        'cRetenNombreBeneficiario',
        'cRetenAnotaciones',
        'cTipRetenNombre',
        'iRetenId',
        'iLegId'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'cRetenNumeroDocumento' => 'string',
        'dtRetenFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iTipRetenId' => 'integer',
        'iComTipMonId' => 'integer',
        'nRetenMontoTotal' => 'string',
        'nRetenNumeroCuotas' => 'string',
        'nRetenMontoFijoMensual' => 'string',
        'nRetenPorcentajeFijoMensual' => 'string',
        'cRetenEntidadNombre' => 'string',
        'iTipBenRetenId' => 'integer',
        'cRetenNombreBeneficiario' => 'string',
        'cRetenAnotaciones' => 'string',
        'cTipRetenNombre' => 'string',
        'iRetenId' => 'integer',
        'iLegId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}