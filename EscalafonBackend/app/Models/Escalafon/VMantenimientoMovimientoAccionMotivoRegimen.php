<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoMovimientosAccionesMotivosRegimenes
 */
class VMantenimientoMovimientoAccionMotivoRegimen extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoMovimientosAccionesMotivosRegimenes'; // Esquema y tabla especificados

    protected $fillable = [
        'iMovAccMotRegId',
        'cMovMotNombre',
        'cMovAccNombre',
        'cRegLabNombre',
        'iMovMotId',
        'iMovAccId',
        'iRegLabId'
    ];

    protected $casts = [
        'iMovAccMotRegId' => 'integer',
        'cMovMotNombre' => 'string',
        'cMovAccNombre' => 'string',
        'cRegLabNombre' => 'string',
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