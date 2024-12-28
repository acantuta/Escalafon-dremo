<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_InfopefamiliarFamiliares
 */
class VInfopefamiliarFamiliar extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_InfopefamiliarFamiliares'; // Esquema y tabla especificados

    protected $fillable = [
        'iInfoPeFamFamiId',
        'iLegId',
        'iTipoIdentId',
        'cInfoPeFamFamiNumeroDocumento',
        'iPersId',
        'iInfoPeFamParentId',
        'bInfoPeFamFamiEsDerechohabiente',
        'cInfoPeFamFamiPrimerApellido',
        'cInfoPeFamFamiSegundoApellido',
        'cInfoPeFamFamiNombres',
        'dInfoPeFamFamiFechaNacimiento',
        'cInfoPeFamFamiSexo',
        'cInfoPeFamFamiNumeroActaNacimiento',
        'iArchId',
        'bInfoPeFamFamiEsDiscapacitado',
        'dInfoPeFamFamiFechaEmision',
        'cInfoPeFamParentNombre',
        'cTipoIdentNombre',
        'bInfoPeFamFamiEsFallecido'
    ];

    protected $casts = [
        'iInfoPeFamFamiId' => 'integer',
        'iLegId' => 'integer',
        'iTipoIdentId' => 'integer',
        'cInfoPeFamFamiNumeroDocumento' => 'string',
        'iPersId' => 'integer',
        'iInfoPeFamParentId' => 'integer',
        'bInfoPeFamFamiEsDerechohabiente' => 'boolean',
        'cInfoPeFamFamiPrimerApellido' => 'string',
        'cInfoPeFamFamiSegundoApellido' => 'string',
        'cInfoPeFamFamiNombres' => 'string',
        'dInfoPeFamFamiFechaNacimiento' => 'date',
        'cInfoPeFamFamiSexo' => 'string',
        'cInfoPeFamFamiNumeroActaNacimiento' => 'string',
        'iArchId' => 'integer',
        'bInfoPeFamFamiEsDiscapacitado' => 'boolean',
        'dInfoPeFamFamiFechaEmision' => 'date',
        'cInfoPeFamParentNombre' => 'string',
        'cTipoIdentNombre' => 'string',
        'bInfoPeFamFamiEsFallecido' => 'boolean'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}