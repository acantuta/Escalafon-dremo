<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.retenciones
 */
class Retencion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.retenciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iRetenId';

    protected $fillable = [
        'iLegId',
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
        'iTipBenRetenId',
        'cRetenEntidadNombre',
        'cRetenNombreBeneficiario',
        'cRetenAnotaciones'
    ];

    protected $casts = [
        'iRetenId' => 'integer',
        'iLegId' => 'integer',
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
        'iTipBenRetenId' => 'integer',
        'cRetenEntidadNombre' => 'string',
        'cRetenNombreBeneficiario' => 'string',
        'cRetenAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}