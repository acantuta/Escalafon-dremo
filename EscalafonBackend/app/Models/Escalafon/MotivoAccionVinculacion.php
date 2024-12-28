<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.motivos_acciones_vinculaciones
 */
class MotivoAccionVinculacion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.motivos_acciones_vinculaciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iMotAccVincId';

    protected $fillable = [
        'iAccVincId',
        'cMotAccVincNombre'
    ];

    protected $casts = [
        'iMotAccVincId' => 'integer',
        'iAccVincId' => 'integer',
        'cMotAccVincNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}