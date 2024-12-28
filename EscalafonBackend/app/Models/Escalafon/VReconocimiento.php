<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Reconocimientos
 */
class VReconocimiento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Reconocimientos'; // Esquema y tabla especificados

    protected $fillable = [
        'iTipoDocId',
        'cRecoNumeroDocumento',
        'dtRecoFechaDocumento',
        'iRecoTipMerId',
        'iArchId',
        'iRecoMerId',
        'cRecoEntidadEmisora',
        'cRecoAnotaciones',
        'cRecoTipMerNombre',
        'cRecoMerNombre',
        'dtRecoFechaInicio',
        'cTipoDocNombre',
        'iRecoId',
        'iLegId'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'cRecoNumeroDocumento' => 'string',
        'dtRecoFechaDocumento' => 'date',
        'iRecoTipMerId' => 'integer',
        'iArchId' => 'integer',
        'iRecoMerId' => 'integer',
        'cRecoEntidadEmisora' => 'string',
        'cRecoAnotaciones' => 'string',
        'cRecoTipMerNombre' => 'string',
        'cRecoMerNombre' => 'string',
        'dtRecoFechaInicio' => 'date',
        'cTipoDocNombre' => 'string',
        'iRecoId' => 'integer',
        'iLegId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}