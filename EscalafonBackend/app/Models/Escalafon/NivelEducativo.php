<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.niveles_educativos
 */
class NivelEducativo extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.niveles_educativos'; // Esquema y tabla especificados
    protected $primaryKey = 'iNivEduId';

    protected $fillable = [
        'iModEduId',
        'iNivEduNombre'
    ];

    protected $casts = [
        'iNivEduId' => 'integer',
        'iModEduId' => 'integer',
        'iNivEduNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}