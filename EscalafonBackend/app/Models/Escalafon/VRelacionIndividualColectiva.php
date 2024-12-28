<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_RelacionesIndividualesColectivas
 */
class VRelacionIndividualColectiva extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_RelacionesIndividualesColectivas'; // Esquema y tabla especificados

    protected $fillable = [
        'iTipoDocId',
        'iLegId',
        'dtRelaIndColecFechaEmision',
        'cRelaIndColecAnotaciones',
        'iRelaIndColecId',
        'iArchId'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'iLegId' => 'integer',
        'dtRelaIndColecFechaEmision' => 'date',
        'cRelaIndColecAnotaciones' => 'string',
        'iRelaIndColecId' => 'integer',
        'iArchId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}