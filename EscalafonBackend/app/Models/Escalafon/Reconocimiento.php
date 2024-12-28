<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.reconocimientos
 */
class Reconocimiento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.reconocimientos'; // Esquema y tabla especificados
    protected $primaryKey = 'iRecoId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'cRecoNumeroDocumento',
        'dtRecoFechaDocumento',
        'dtRecoFechaInicio',
        'iArchId',
        'iRecoTipMerId',
        'iRecoMerId',
        'cRecoEntidadEmisora',
        'cRecoAnotaciones'
    ];

    protected $casts = [
        'iRecoId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'cRecoNumeroDocumento' => 'string',
        'dtRecoFechaDocumento' => 'date',
        'dtRecoFechaInicio' => 'date',
        'iArchId' => 'integer',
        'iRecoTipMerId' => 'integer',
        'iRecoMerId' => 'integer',
        'cRecoEntidadEmisora' => 'string',
        'cRecoAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}