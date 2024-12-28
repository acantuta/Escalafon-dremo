<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.centros_laborales
 */
class CentroLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.centros_laborales'; // Esquema y tabla especificados
    protected $primaryKey = 'iCentLabId';

    protected $fillable = [
        'iDirRegId',
        'iInstGeEduId',
        'iModEduId',
        'iNivEduId',
        'cCentLabCodigoModular',
        'cCentLabNombre',
        'bCentLabEsVigente'
    ];

    protected $casts = [
        'iCentLabId' => 'integer',
        'iDirRegId' => 'integer',
        'iInstGeEduId' => 'integer',
        'iModEduId' => 'integer',
        'iNivEduId' => 'integer',
        'cCentLabCodigoModular' => 'string',
        'cCentLabNombre' => 'string',
        'bCentLabEsVigente' => 'boolean'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}