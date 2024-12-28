<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.ceses_motivos_acciones
 */
class CeseMotivoAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.ceses_motivos_acciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iCesMotAccId';

    protected $fillable = [
        'iCesAccId',
        'iRegLabId',
        'cCesMotAccNombre'
    ];

    protected $casts = [
        'iCesMotAccId' => 'integer',
        'iCesAccId' => 'integer',
        'iRegLabId' => 'integer',
        'cCesMotAccNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}