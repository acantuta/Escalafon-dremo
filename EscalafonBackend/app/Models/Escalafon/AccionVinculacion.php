<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.acciones_vinculaciones
 */
class AccionVinculacion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.acciones_vinculaciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iAccVincId';

    protected $fillable = [
        'cAccVincNombre',
        'iRegLabId'
    ];

    protected $casts = [
        'iAccVincId' => 'integer',
        'cAccVincNombre' => 'string',
        'iRegLabId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}