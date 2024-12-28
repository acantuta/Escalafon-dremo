<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.tipos_documentos
 */
class TipoDocumento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.tipos_documentos'; // Esquema y tabla especificados
    protected $primaryKey = 'iTipoDocId';

    protected $fillable = [
        'cTipoDocNombre'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'cTipoDocNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}