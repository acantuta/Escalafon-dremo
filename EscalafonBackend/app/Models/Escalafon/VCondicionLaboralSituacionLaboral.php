<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_CondicionesLaboralesSituacionesLaborales
 */
class VCondicionLaboralSituacionLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_CondicionesLaboralesSituacionesLaborales'; // Esquema y tabla especificados

    protected $fillable = [
        'iCondSitId',
        'iCondLabId',
        'iSitLabId',
        'cSitLabNombre',
        'cCondLabNombre',
        'Expr1'
    ];

    protected $casts = [
        'iCondSitId' => 'integer',
        'iCondLabId' => 'integer',
        'iSitLabId' => 'integer',
        'cSitLabNombre' => 'string',
        'cCondLabNombre' => 'string',
        'Expr1' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}