<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;

/**
 * Modelo para la tabla: esc.hojas_vidas
 */
class HojasVida extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;

    protected $table = 'esc.hojas_vidas'; // Esquema y tabla especificados
    protected $primaryKey = 'iHojVidId';

    protected $fillable = [
        'cHojVidAnotaciones',
        'cHojVidNumeroExpediente',
        'cHojVidNombreSolicitante',
        'dHojVidFechaExpediente',
        'dHojVidFechaGeneracion',
        'dHojaVidFechaGeneracionSistema',
        'cHojVidUuid',
        'cHojViNombreArchivo'
    ];

    protected $casts = [
        'iHojVidId' => 'integer',
        'cHojVidAnotaciones' => 'string',
        'cHojVidNumeroExpediente' => 'string',
        'cHojVidNombreSolicitante' => 'string',
        'dHojVidFechaExpediente' => 'date',
        'dHojVidFechaGeneracion' => 'date',
        'dHojaVidFechaGeneracionSistema' => 'datetime',
        'cHojVidUuid' => 'string',
        'cHojViNombreArchivo' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}