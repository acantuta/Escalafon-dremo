<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.educacion_tipos_centros
 */
class EducacionTipoCentro extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.educacion_tipos_centros'; // Esquema y tabla especificados
    protected $primaryKey = 'iEduTipCentId';

    protected $fillable = [
        'cEduTipCentNombre'
    ];

    protected $casts = [
        'iEduTipCentId' => 'integer',
        'cEduTipCentNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}