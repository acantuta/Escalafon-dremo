<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoEducacionProgramasGenerales
 */
class VMantenimientoEducacionProgramaGeneral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoEducacionProgramasGenerales'; // Esquema y tabla especificados

    protected $fillable = [
        'iEduProGenId',
        'cEduCarrNombre',
        'cEduProGenNombre',
        'iEduCarrId'
    ];

    protected $casts = [
        'iEduProGenId' => 'integer',
        'cEduCarrNombre' => 'string',
        'cEduProGenNombre' => 'string',
        'iEduCarrId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}