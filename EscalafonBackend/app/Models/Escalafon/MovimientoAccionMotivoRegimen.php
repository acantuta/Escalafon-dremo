<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.movimientos_acciones_motivos_regimenes
 */
class MovimientoAccionMotivoRegimen extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.movimientos_acciones_motivos_regimenes'; // Esquema y tabla especificados
    protected $primaryKey = 'iMovAccMotRegId';

    protected $fillable = [
        'iMovMotId',
        'iMovAccId',
        'iRegLabId'
    ];

    protected $casts = [
        'iMovAccMotRegId' => 'integer',
        'iMovMotId' => 'integer',
        'iMovAccId' => 'integer',
        'iRegLabId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}