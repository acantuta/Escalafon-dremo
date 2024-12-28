<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.desplazamientos_acciones
 */
class DesplazamientoAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.desplazamientos_acciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iDespAccId';

    protected $fillable = [
        'cDespNombre',
        'iRegLabId'
    ];

    protected $casts = [
        'iDespAccId' => 'integer',
        'cDespNombre' => 'string',
        'iRegLabId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}