<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.sistemas_pensonarios
 */
class SistemaPensionario extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.sistemas_pensonarios'; // Esquema y tabla especificados
    protected $primaryKey = 'iSisPenId';

    protected $fillable = [
        'iLegId',
        'iRegPenId',
        'iAdmFonPenId',
        'iTipComPenId',
        'iArchId',
        'dtSisPenFechaVigencia',
        'dtSisPenFechaAfiliacion',
        'dtSisPenFechaDevengue',
        'cSisPenNumeroCuspp',
        'cSisPenAnotaciones'
    ];

    protected $casts = [
        'iSisPenId' => 'integer',
        'iLegId' => 'integer',
        'iRegPenId' => 'integer',
        'iAdmFonPenId' => 'integer',
        'iTipComPenId' => 'integer',
        'iArchId' => 'integer',
        'dtSisPenFechaVigencia' => 'date',
        'dtSisPenFechaAfiliacion' => 'date',
        'dtSisPenFechaDevengue' => 'date',
        'cSisPenNumeroCuspp' => 'string',
        'cSisPenAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}