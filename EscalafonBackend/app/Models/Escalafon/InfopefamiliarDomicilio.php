<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.infopefamiliar_domicilios
 */
class InfopefamiliarDomicilio extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.infopefamiliar_domicilios'; // Esquema y tabla especificados
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
        'iArchId'
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
        'iArchId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}