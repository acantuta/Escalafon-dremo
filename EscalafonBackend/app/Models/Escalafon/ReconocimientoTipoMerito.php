<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.reconocimientos_tipos_meritos
 */
class ReconocimientoTipoMerito extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.reconocimientos_tipos_meritos'; // Esquema y tabla especificados
    protected $primaryKey = 'iRecoTipMerId';

    protected $fillable = [
        'cRecoTipMerNombre'
    ];

    protected $casts = [
        'iRecoTipMerId' => 'integer',
        'cRecoTipMerNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}