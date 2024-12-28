<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Sanciones
 */
class VSancion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Sanciones'; // Esquema y tabla especificados

    protected $fillable = [
        'iTipoDocId',
        'cSancNumeroDocumento',
        'cSancInstitucionEmiteDocumento',
        'dtSancFechaDocumento',
        'cSancAnotaciones',
        'dtSancFechaFin',
        'dtSancFechaInicio',
        'dtSancFechaNotificacion',
        'cSancCausaMotivo',
        'iTipSancId',
        'iArchId',
        'cTipoDocNombre',
        'iSancId',
        'iLegId'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'cSancNumeroDocumento' => 'string',
        'cSancInstitucionEmiteDocumento' => 'string',
        'dtSancFechaDocumento' => 'date',
        'cSancAnotaciones' => 'string',
        'dtSancFechaFin' => 'date',
        'dtSancFechaInicio' => 'date',
        'dtSancFechaNotificacion' => 'date',
        'cSancCausaMotivo' => 'string',
        'iTipSancId' => 'integer',
        'iArchId' => 'integer',
        'cTipoDocNombre' => 'string',
        'iSancId' => 'integer',
        'iLegId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}