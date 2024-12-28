<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoEducacionProgramasProfesionales
 */
class VMantenimientoEducacionProgramaProfesional extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoEducacionProgramasProfesionales'; // Esquema y tabla especificados

    protected $fillable = [
        'iEduProProfId',
        'cEduProGenNombre',
        'cEduProProfNombre',
        'iEduProGenId'
    ];

    protected $casts = [
        'iEduProProfId' => 'integer',
        'cEduProGenNombre' => 'string',
        'cEduProProfNombre' => 'string',
        'iEduProGenId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}