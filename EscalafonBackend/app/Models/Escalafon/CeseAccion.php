<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.ceses_acciones
 */
class CeseAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.ceses_acciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iCesAccId';

    protected $fillable = [
        'iRegLabId',
        'cCesAccNombre'
    ];

    protected $casts = [
        'iCesAccId' => 'integer',
        'iRegLabId' => 'integer',
        'cCesAccNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}