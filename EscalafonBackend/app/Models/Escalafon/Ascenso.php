<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.ascensos
 */
class Ascenso extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.ascensos'; // Esquema y tabla especificados
    protected $primaryKey = 'idAscId';

    protected $fillable = [
        'iLegId',
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
        'cAscAnotaciones'
    ];

    protected $casts = [
        'idAscId' => 'integer',
        'iLegId' => 'integer',
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
        'cAscAnotaciones' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}