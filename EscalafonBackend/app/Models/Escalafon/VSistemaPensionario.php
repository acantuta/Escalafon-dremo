<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_SistemasPensionarios
 */
class VSistemaPensionario extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_SistemasPensionarios'; // Esquema y tabla especificados

    protected $fillable = [
        'iAdmFonPenId',
        'iTipComPenId',
        'iArchId',
        'dtSisPenFechaVigencia',
        'dtSisPenFechaAfiliacion',
        'dtSisPenFechaDevengue',
        'cSisPenNumeroCuspp',
        'cSisPenAnotaciones',
        'iRegPenId',
        'cRegPenNombre',
        'cAdmFonPenNombre',
        'iSisPenId',
        'iLegId'
    ];

    protected $casts = [
        'iAdmFonPenId' => 'integer',
        'iTipComPenId' => 'integer',
        'iArchId' => 'integer',
        'dtSisPenFechaVigencia' => 'date',
        'dtSisPenFechaAfiliacion' => 'date',
        'dtSisPenFechaDevengue' => 'date',
        'cSisPenNumeroCuspp' => 'string',
        'cSisPenAnotaciones' => 'string',
        'iRegPenId' => 'integer',
        'cRegPenNombre' => 'string',
        'cAdmFonPenNombre' => 'string',
        'iSisPenId' => 'integer',
        'iLegId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}