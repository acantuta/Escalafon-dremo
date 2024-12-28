<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.infopefamiliar_declaraciones_juradas_tipos_documentos
 */
class InfopefamiliarDeclaracionJuradaTipoDocumento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.infopefamiliar_declaraciones_juradas_tipos_documentos'; // Esquema y tabla especificados
    protected $primaryKey = 'iInfoPeFamDecTipId';

    protected $fillable = [
        'cInfoPeFamDecTipNombre'
    ];

    protected $casts = [
        'iInfoPeFamDecTipId' => 'integer',
        'cInfoPeFamDecTipNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}