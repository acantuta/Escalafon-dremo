<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoCesesAcciones
 */
class VMantenimientoCeseAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoCesesAcciones'; // Esquema y tabla especificados

    protected $fillable = [
        'iCesAccId',
        'iRegLabId',
        'cCesAccNombre',
        'cRegLabNombre'
    ];

    protected $casts = [
        'iCesAccId' => 'integer',
        'iRegLabId' => 'integer',
        'cCesAccNombre' => 'string',
        'cRegLabNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}