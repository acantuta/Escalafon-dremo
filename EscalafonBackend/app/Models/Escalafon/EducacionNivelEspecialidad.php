<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.educacion_niveles_especialidad
 */
class EducacionNivelEspecialidad extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.educacion_niveles_especialidad'; // Esquema y tabla especificados
    protected $primaryKey = 'iEduNivEspId';

    protected $fillable = [
        'iEduNivEdId',
        'iEduTipSupId',
        'iEduGradAlcId',
        'cEduNivEspNombre'
    ];

    protected $casts = [
        'iEduNivEspId' => 'integer',
        'iEduNivEdId' => 'integer',
        'iEduTipSupId' => 'integer',
        'iEduGradAlcId' => 'integer',
        'cEduNivEspNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}