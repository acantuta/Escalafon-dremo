<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.incorporacion_documentos
 */
class IncorporacionDocumento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.incorporacion_documentos'; // Esquema y tabla especificados
    protected $primaryKey = 'iIncorDocId';

    protected $fillable = [
        'iLegId',
        'iArchId',
        'iIncorTipDocId',
        'cIncorDocAnotaciones',
        'dIncorDocFechEmision'
    ];

    protected $casts = [
        'iIncorDocId' => 'integer',
        'iLegId' => 'integer',
        'iArchId' => 'integer',
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