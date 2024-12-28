<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MovimientosAccionesMotivosRegimenes
 */
class VMovimientoAccionMotivoRegimen extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MovimientosAccionesMotivosRegimenes'; // Esquema y tabla especificados

    protected $fillable = [
        'cMovMotNombre',
        'iMovAccMotRegId',
        'iMovMotId',
        'iMovAccId',
        'iRegLabId',
        'cMovAccNombre'
    ];

    protected $casts = [
        'cMovMotNombre' => 'string',
        'iMovAccMotRegId' => 'integer',
        'iMovMotId' => 'integer',
        'iMovAccId' => 'integer',
        'iRegLabId' => 'integer',
        'cMovAccNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}