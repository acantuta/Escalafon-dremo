<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.otros
 */
class Otro extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.otros'; // Esquema y tabla especificados
    protected $primaryKey = 'iOtrosId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'iArchId',
        'dtOtrosFechaEmision',
        'cOtrosAnotaciones'
    ];

    protected $casts = [
        'iOtrosId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'iArchId' => 'integer',
        'dtOtrosFechaEmision' => 'date',
        'cOtrosAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}