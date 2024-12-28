<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_CentrosLaborales
 */
class VCentroLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_CentrosLaborales'; // Esquema y tabla especificados
    protected $primaryKey = 'iCentLabId';

    protected $fillable = [
        'iDirRegId',
        'iInstGeEduId',
        'iModEduId',
        'bCentLabEsVigente',
        'cCentLabNombre',
        'cCentLabCodigoModular',
        'iNivEduId',
        'iNivEduNombre',
        'cDirRegNombre',
        'cInstGeEduNombre',
        'cModEduNombre'
    ];

    protected $casts = [
        'iCentLabId' => 'integer',
        'iDirRegId' => 'integer',
        'iInstGeEduId' => 'integer',
        'iModEduId' => 'integer',
        'bCentLabEsVigente' => 'boolean',
        'cCentLabNombre' => 'string',
        'cCentLabCodigoModular' => 'string',
        'iNivEduId' => 'integer',
        'iNivEduNombre' => 'string',
        'cDirRegNombre' => 'string',
        'cInstGeEduNombre' => 'string',
        'cModEduNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}