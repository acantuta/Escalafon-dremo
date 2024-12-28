<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoReconocimientosMeritos
 */
class VMantenimientoReconocimientoMerito extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoReconocimientosMeritos'; // Esquema y tabla especificados

    protected $fillable = [
        'iRecoMerId',
        'cRecoTipMerNombre',
        'cRecoMerNombre',
        'iRecoTipMerId'
    ];

    protected $casts = [
        'iRecoMerId' => 'integer',
        'cRecoTipMerNombre' => 'string',
        'cRecoMerNombre' => 'string',
        'iRecoTipMerId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}