<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.infopefamiliar_familiares
 */
class InfopefamiliarFamiliar extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.infopefamiliar_familiares'; // Esquema y tabla especificados
    protected $primaryKey = 'iInfoPeFamFamiId';

    protected $fillable = [
        'iLegId',
        'iTipoIdentId',
        'cInfoPeFamFamiNumeroDocumento',
        'iPersId',
        'iInfoPeFamParentId',
        'bInfoPeFamFamiEsDerechohabiente',
        'bInfoPeFamFamiEsFallecido',
        'cInfoPeFamFamiPrimerApellido',
        'cInfoPeFamFamiSegundoApellido',
        'cInfoPeFamFamiNombres',
        'dInfoPeFamFamiFechaNacimiento',
        'cInfoPeFamFamiSexo',
        'cInfoPeFamFamiNumeroActaNacimiento',
        'dInfoPeFamFamiFechaEmision',
        'iArchId',
        'bInfoPeFamFamiEsDiscapacitado'
    ];

    protected $casts = [
        'iInfoPeFamFamiId' => 'integer',
        'iLegId' => 'integer',
        'iTipoIdentId' => 'integer',
        'cInfoPeFamFamiNumeroDocumento' => 'string',
        'iPersId' => 'integer',
        'iInfoPeFamParentId' => 'integer',
        'bInfoPeFamFamiEsDerechohabiente' => 'boolean',
        'bInfoPeFamFamiEsFallecido' => 'boolean',
        'cInfoPeFamFamiPrimerApellido' => 'string',
        'cInfoPeFamFamiSegundoApellido' => 'string',
        'cInfoPeFamFamiNombres' => 'string',
        'dInfoPeFamFamiFechaNacimiento' => 'date',
        'cInfoPeFamFamiSexo' => 'string',
        'cInfoPeFamFamiNumeroActaNacimiento' => 'string',
        'dInfoPeFamFamiFechaEmision' => 'date',
        'iArchId' => 'integer',
        'bInfoPeFamFamiEsDiscapacitado' => 'boolean'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}