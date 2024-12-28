<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.ascensos_acciones
 */
class AscensoAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.ascensos_acciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iAscAccId';

    protected $fillable = [
        'iRegLabId',
        'cAscAccNombre'
    ];

    protected $casts = [
        'iAscAccId' => 'integer',
        'iRegLabId' => 'integer',
        'cAscAccNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}