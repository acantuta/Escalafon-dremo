<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoCentrosLaborales
 */
class VMantenimientoCentroLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoCentrosLaborales'; // Esquema y tabla especificados

    protected $fillable = [
        'iCentLabId',
        'iDirRegId',
        'iInstGeEduId',
        'iModEduId',
        'iNivEduId',
        'cCentLabCodigoModular',
        'cCentLabNombre',
        'bCentLabEsVigente',
        'cDirRegNombre',
        'cInstGeEduNombre',
        'cModEduNombre',
        'iNivEduNombre'
    ];

    protected $casts = [
        'iCentLabId' => 'integer',
        'iDirRegId' => 'integer',
        'iInstGeEduId' => 'integer',
        'iModEduId' => 'integer',
        'iNivEduId' => 'integer',
        'cCentLabCodigoModular' => 'string',
        'cCentLabNombre' => 'string',
        'bCentLabEsVigente' => 'boolean',
        'cDirRegNombre' => 'string',
        'cInstGeEduNombre' => 'string',
        'cModEduNombre' => 'string',
        'iNivEduNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}