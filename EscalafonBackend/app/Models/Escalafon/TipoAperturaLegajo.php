<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.tipos_apertura_legajos
 */
class TipoAperturaLegajo extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.tipos_apertura_legajos'; // Esquema y tabla especificados
    protected $primaryKey = 'iTipoAperLegId';

    protected $fillable = [
        'cTipoAperLegNombre'
    ];

    protected $casts = [
        'iTipoAperLegId' => 'integer',
        'cTipoAperLegNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}