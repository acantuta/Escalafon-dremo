<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.condiciones_situaciones_laborales
 */
class CondicionSituacionLaboral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.condiciones_situaciones_laborales'; // Esquema y tabla especificados
    protected $primaryKey = 'iCondSitId';

    protected $fillable = [
        'iCondLabId',
        'iSitLabId'
    ];

    protected $casts = [
        'iCondSitId' => 'integer',
        'iCondLabId' => 'integer',
        'iSitLabId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}