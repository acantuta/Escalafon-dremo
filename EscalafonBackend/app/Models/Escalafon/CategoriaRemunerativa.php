<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.categorias_remunerativas
 */
class CategoriaRemunerativa extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.categorias_remunerativas'; // Esquema y tabla especificados
    protected $primaryKey = 'iCatRemuId';

    protected $fillable = [
        'cCatRemuNombre',
        'iGrupOcupId'
    ];

    protected $casts = [
        'iCatRemuId' => 'integer',
        'cCatRemuNombre' => 'string',
        'iGrupOcupId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}