<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.condiciones_laborales
 */
class CondicionLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.condiciones_laborales'; // Esquema y tabla especificados
    protected $primaryKey = 'iCondLabId';

    protected $fillable = [
        'iGrupoPrestadorId',
        'cCondLabNombre',
        'cCondLabCodigoSunat',
        'cCondLabCodigoAirshp'
    ];

    protected $casts = [
        'iCondLabId' => 'integer',
        'iGrupoPrestadorId' => 'integer',
        'cCondLabNombre' => 'string',
        'cCondLabCodigoSunat' => 'string',
        'cCondLabCodigoAirshp' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}