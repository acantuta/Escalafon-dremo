<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.escalas_categorias
 */
class EscalaCategoria extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.escalas_categorias'; // Esquema y tabla especificados
    protected $primaryKey = 'iEscCatId';

    protected $fillable = [
        'iRegLabId',
        'cEscCatNombre'
    ];

    protected $casts = [
        'iEscCatId' => 'integer',
        'iRegLabId' => 'integer',
        'cEscCatNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}