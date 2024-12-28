<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.ascensos_motivos
 */
class AscensoMotivo extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.ascensos_motivos'; // Esquema y tabla especificados
    protected $primaryKey = 'iAscMotId';

    protected $fillable = [
        'iAscAccId',
        'cAscMotNombre'
    ];

    protected $casts = [
        'iAscMotId' => 'integer',
        'iAscAccId' => 'integer',
        'cAscMotNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}