<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.compensaciones_tipos_monedas
 */
class CompensacionTipoMoneda extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.compensaciones_tipos_monedas'; // Esquema y tabla especificados
    protected $primaryKey = 'iComTipMonId';

    protected $fillable = [
        'cComTipMonNombre'
    ];

    protected $casts = [
        'iComTipMonId' => 'integer',
        'cComTipMonNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}