<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoMovimientosAcciones
 */
class VMantenimientoMovimientoAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoMovimientosAcciones'; // Esquema y tabla especificados

    protected $fillable = [
        'iMovAccId',
        'cRegLabNombre',
        'cMovAccNombre',
        'iRegLabId'
    ];

    protected $casts = [
        'iMovAccId' => 'integer',
        'cRegLabNombre' => 'string',
        'cMovAccNombre' => 'string',
        'iRegLabId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}