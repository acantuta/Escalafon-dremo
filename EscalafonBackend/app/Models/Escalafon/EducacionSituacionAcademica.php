<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.educacion_situaciones_academicas
 */
class EducacionSituacionAcademica extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.educacion_situaciones_academicas'; // Esquema y tabla especificados
    protected $primaryKey = 'iEduSitAcadId';

    protected $fillable = [
        'iEduNivEdId',
        'iEduTipSupId',
        'cEduSitAcadNombre'
    ];

    protected $casts = [
        'iEduSitAcadId' => 'integer',
        'iEduNivEdId' => 'integer',
        'iEduTipSupId' => 'integer',
        'cEduSitAcadNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}