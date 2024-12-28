<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.compensaciones_motivos_acciones
 */
class CompensacionMotivoAccion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.compensaciones_motivos_acciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iCompMotAccId';

    protected $fillable = [
        'iCompAccId',
        'cCompMotAccNombre'
    ];

    protected $casts = [
        'iCompMotAccId' => 'integer',
        'iCompAccId' => 'integer',
        'cCompMotAccNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}