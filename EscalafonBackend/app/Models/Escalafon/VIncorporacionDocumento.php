<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_IncorporacionesDocumentos
 */
class VIncorporacionDocumento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_IncorporacionesDocumentos'; // Esquema y tabla especificados

    protected $fillable = [
        'cIncorTipDocNombre',
        'iIncorDocId',
        'iArchId',
        'iLegId',
        'iIncorTipDocId',
        'cIncorDocAnotaciones',
        'dIncorDocFechEmision'
    ];

    protected $casts = [
        'cIncorTipDocNombre' => 'string',
        'iIncorDocId' => 'integer',
        'iArchId' => 'integer',
        'iLegId' => 'integer',
        'iIncorTipDocId' => 'integer',
        'cIncorDocAnotaciones' => 'string',
        'dIncorDocFechEmision' => 'date'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}