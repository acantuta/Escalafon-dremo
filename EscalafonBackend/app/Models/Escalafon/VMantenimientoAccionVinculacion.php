<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoAccionesVinculaciones
 */
class VMantenimientoAccionVinculacion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoAccionesVinculaciones'; // Esquema y tabla especificados

    protected $fillable = [
        'cRegLabNombre',
        'iAccVincId',
        'cAccVincNombre',
        'iRegLabId'
    ];

    protected $casts = [
        'cRegLabNombre' => 'string',
        'iAccVincId' => 'integer',
        'cAccVincNombre' => 'string',
        'iRegLabId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}