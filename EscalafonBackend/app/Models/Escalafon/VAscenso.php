<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Ascensos
 */
class VAscenso extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Ascensos'; // Esquema y tabla especificados

    protected $fillable = [
        'iTipoDocId',
        'cAscNumeroDocumento',
        'dtAscFechaDocumento',
        'iArchId',
        'iRegLabId',
        'iAscAccId',
        'iAscMotId',
        'dtAscFechaInicio',
        'iAscEscCatId',
        'iAscEscCatIdNueva',
        'cAscAnotaciones',
        'cAscAccNombre',
        'cAscMotNombre',
        'cRegLabNombre',
        'idAscId',
        'iLegId'
    ];

    protected $casts = [
        'iTipoDocId' => 'integer',
        'cAscNumeroDocumento' => 'string',
        'dtAscFechaDocumento' => 'date',
        'iArchId' => 'integer',
        'iRegLabId' => 'integer',
        'iAscAccId' => 'integer',
        'iAscMotId' => 'integer',
        'dtAscFechaInicio' => 'date',
        'iAscEscCatId' => 'integer',
        'iAscEscCatIdNueva' => 'integer',
        'cAscAnotaciones' => 'string',
        'cAscAccNombre' => 'string',
        'cAscMotNombre' => 'string',
        'cRegLabNombre' => 'string',
        'idAscId' => 'integer',
        'iLegId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}