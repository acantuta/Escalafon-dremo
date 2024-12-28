<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.sanciones
 */
class Sancion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.sanciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iSancId';

    protected $fillable = [
        'iLegId',
        'iTipoDocId',
        'cSancNumeroDocumento',
        'dtSancFechaDocumento',
        'cSancInstitucionEmiteDocumento',
        'iArchId',
        'iTipSancId',
        'cSancCausaMotivo',
        'dtSancFechaNotificacion',
        'dtSancFechaInicio',
        'dtSancFechaFin',
        'cSancAnotaciones'
    ];

    protected $casts = [
        'iSancId' => 'integer',
        'iLegId' => 'integer',
        'iTipoDocId' => 'integer',
        'cSancNumeroDocumento' => 'string',
        'dtSancFechaDocumento' => 'date',
        'cSancInstitucionEmiteDocumento' => 'string',
        'iArchId' => 'integer',
        'iTipSancId' => 'integer',
        'cSancCausaMotivo' => 'string',
        'dtSancFechaNotificacion' => 'date',
        'dtSancFechaInicio' => 'date',
        'dtSancFechaFin' => 'date',
        'cSancAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}