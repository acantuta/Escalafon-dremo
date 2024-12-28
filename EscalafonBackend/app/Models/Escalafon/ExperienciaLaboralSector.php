<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.experencias_laborales_sectores
 */
class ExperienciaLaboralSector extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.experencias_laborales_sectores'; // Esquema y tabla especificados
    protected $primaryKey = 'iExpLabSecId';

    protected $fillable = [
        'cExpLabSecNombre'
    ];

    protected $casts = [
        'iExpLabSecId' => 'integer',
        'cExpLabSecNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}