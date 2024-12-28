<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoEscalasCategorias
 */
class VMantenimientoEscalaCategoria extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoEscalasCategorias'; // Esquema y tabla especificados

    protected $fillable = [
        'iEscCatId',
        'cRegLabNombre',
        'cEscCatNombre',
        'iRegLabId'
    ];

    protected $casts = [
        'iEscCatId' => 'integer',
        'cRegLabNombre' => 'string',
        'cEscCatNombre' => 'string',
        'iRegLabId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}