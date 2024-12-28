<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.incorporacion_tipos_documentos
 */
class IncorporacionTipoDocumento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.incorporacion_tipos_documentos'; // Esquema y tabla especificados
    protected $primaryKey = 'iIncorTipDocId';

    protected $fillable = [
        'cIncorTipDocNombre'
    ];

    protected $casts = [
        'iIncorTipDocId' => 'integer',
        'cIncorTipDocNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}