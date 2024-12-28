<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.relaciones_individuales_colectivas
 */
class RelacionIndividualColectiva extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.relaciones_individuales_colectivas'; // Esquema y tabla especificados
    protected $primaryKey = 'iRelaIndColecId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'iArchId',
        'dtRelaIndColecFechaEmision',
        'cRelaIndColecAnotaciones'
    ];

    protected $casts = [
        'iRelaIndColecId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'iArchId' => 'integer',
        'dtRelaIndColecFechaEmision' => 'date',
        'cRelaIndColecAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}