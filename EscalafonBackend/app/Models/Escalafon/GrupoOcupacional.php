<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.grupos_ocupacionales
 */
class GrupoOcupacional extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.grupos_ocupacionales'; // Esquema y tabla especificados
    protected $primaryKey = 'iGrupOcupId';

    protected $fillable = [
        'cGrupOcupNombre'
    ];

    protected $casts = [
        'iGrupOcupId' => 'integer',
        'cGrupOcupNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}