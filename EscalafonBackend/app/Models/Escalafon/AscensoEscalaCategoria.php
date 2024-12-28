<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;

/**
 * Modelo para la tabla: esc.ascensos_escalas_categorias
 */
class AscensoEscalaCategoria extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;

    protected $table = 'esc.ascensos_escalas_categorias'; // Esquema y tabla especificados
    protected $primaryKey = 'iAscEscCatId';

    protected $fillable = [
        'iRegLabId',
        'cAscEscCatNombre'
    ];

    protected $casts = [
        'iAscEscCatId' => 'integer',
        'iRegLabId' => 'integer',
        'cAscEscCatNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}