<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.educacion_programas
 */
class EducacionPrograma extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.educacion_programas'; // Esquema y tabla especificados
    protected $primaryKey = 'iEduProId';

    protected $fillable = [
        'iEduProProfId',
        'cEduProNombre'
    ];

    protected $casts = [
        'iEduProId' => 'integer',
        'iEduProProfId' => 'integer',
        'cEduProNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}