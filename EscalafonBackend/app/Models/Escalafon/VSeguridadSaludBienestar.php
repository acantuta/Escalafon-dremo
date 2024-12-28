<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_SeguridadSaludBienestares
 */
class VSeguridadSaludBienestar extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_SeguridadSaludBienestares'; // Esquema y tabla especificados

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'dtSegSalBieFechaEmision',
        'cSegSalBieAnotaciones',
        'iSegSalBieId',
        'iArchId',
        'cTipoDocNombre'
    ];

    protected $casts = [
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'dtSegSalBieFechaEmision' => 'date',
        'cSegSalBieAnotaciones' => 'string',
        'iSegSalBieId' => 'integer',
        'iArchId' => 'integer',
        'cTipoDocNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}