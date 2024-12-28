<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.hojas_vida
 */
class HojaVida extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.hojas_vida'; // Esquema y tabla especificados
    protected $primaryKey = 'iHojVidId';

    protected $fillable = [
        'iLegId',
        'cHojVidAnotaciones',
        'cHojVidNumeroExpediente',
        'cHojVidNombreSolicitante',
        'dHojVidFechaExpediente',
        'dHojVidFechaGeneracion',
        'cHojVidUuid',
        'cHojVidNombreArchivo'
    ];

    protected $casts = [
        'iHojVidId' => 'integer',
        'iLegId' => 'integer',
        'cHojVidAnotaciones' => 'string',
        'cHojVidNumeroExpediente' => 'string',
        'cHojVidNombreSolicitante' => 'string',
        'dHojVidFechaExpediente' => 'date',
        'dHojVidFechaGeneracion' => 'date',
        'cHojVidUuid' => 'string',
        'cHojVidNombreArchivo' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}