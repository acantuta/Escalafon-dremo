<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoDesplazamientosMotivosAcciones
 */
class VMantenimientoDesplazamientoMotivoAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoDesplazamientosMotivosAcciones'; // Esquema y tabla especificados

    protected $fillable = [
        'iDespMotAccId',
        'cDespNombre',
        'cDespAccNombre',
        'iDespAccId'
    ];

    protected $casts = [
        'iDespMotAccId' => 'integer',
        'cDespNombre' => 'string',
        'cDespAccNombre' => 'string',
        'iDespAccId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}