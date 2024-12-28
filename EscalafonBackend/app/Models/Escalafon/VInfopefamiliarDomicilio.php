<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_InfopefamiliarDomicilios
 */
class VInfopefamiliarDomicilio extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_InfopefamiliarDomicilios'; // Esquema y tabla especificados
    protected $primaryKey = 'iSecInfoPeFamDomiId';

    protected $fillable = [
        'iLegId',
        'iTipDirId',
        'iZonaId',
        'iTipViaId',
        'iDptoId',
        'iPrvnId',
        'iDsttId',
        'cInfoPeFamDireccion',
        'cInfoPeFamReferencia',
        'iArchId',
        'cTipViaNombre',
        'cZonaNombre',
        'cTipDirNombre'
    ];

    protected $casts = [
        'iSecInfoPeFamDomiId' => 'integer',
        'iLegId' => 'integer',
        'iTipDirId' => 'integer',
        'iZonaId' => 'integer',
        'iTipViaId' => 'integer',
        'iDptoId' => 'integer',
        'iPrvnId' => 'integer',
        'iDsttId' => 'integer',
        'cInfoPeFamDireccion' => 'string',
        'cInfoPeFamReferencia' => 'string',
        'iArchId' => 'integer',
        'cTipViaNombre' => 'string',
        'cZonaNombre' => 'string',
        'cTipDirNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}