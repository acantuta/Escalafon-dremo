<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.seguridad_salud_bienestares
 */
class SeguridadSaludBienestar extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.seguridad_salud_bienestares'; // Esquema y tabla especificados
    protected $primaryKey = 'iSegSalBieId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'iArchId',
        'dtSegSalBieFechaEmision',
        'cSegSalBieAnotaciones'
    ];

    protected $casts = [
        'iSegSalBieId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'iArchId' => 'integer',
        'dtSegSalBieFechaEmision' => 'date',
        'cSegSalBieAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}