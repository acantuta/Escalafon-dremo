<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.educacion_niveles_educativos
 */
class EducacionNivelEducativo extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.educacion_niveles_educativos'; // Esquema y tabla especificados
    protected $primaryKey = 'iEduNivEdId';

    protected $fillable = [
        'cEduNivEdNombre'
    ];

    protected $casts = [
        'iEduNivEdId' => 'integer',
        'cEduNivEdNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}