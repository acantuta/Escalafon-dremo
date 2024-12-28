<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_FormacionesAcademicas
 */
class VFormacionAcademica extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_FormacionesAcademicas'; // Esquema y tabla especificados

    protected $fillable = [
        'iFormAcadId',
        'iLegId',
        'iEduNivEdId',
        'iEduTipoSecId',
        'iPaisId',
        'iEduTipSupId',
        'cFormAcadCiudad',
        'iDptoId',
        'iPrvnId',
        'iDsttId',
        'iEduSitAcadId',
        'iEduCarrId',
        'iEduGradAlcId',
        'iEduSitAcadAnioInicio',
        'iEduSitAcadAnioFin',
        'cFormAcadTitulo',
        'cFormAcadEspecialidad',
        'dtFormAcadFechaExpedicion',
        'iEduCentRegId',
        'cFormAcadNumeroRegistro',
        'dtFormAcadFechaRegistro',
        'dtFormAcadFechaDocumento',
        'cFormAcadNumeroDocumento',
        'iArchId',
        'cEduNivEdNombre',
        'cEduSitAcadNombre',
        'cEduGradAlcNombre',
        'cFormAcadCentroEstudios',
        'iEduNivEspId',
        'cEduSitAcadCentroEstudio',
        'cFormAcadEspecialidadNivel',
        'iEduProGenId',
        'iEduProProfId',
        'iEduProId',
        'iEduTipCentId',
        'cFormAcadCentroRegistro'
    ];

    protected $casts = [
        'iFormAcadId' => 'integer',
        'iLegId' => 'integer',
        'iEduNivEdId' => 'integer',
        'iEduTipoSecId' => 'integer',
        'iPaisId' => 'integer',
        'iEduTipSupId' => 'integer',
        'cFormAcadCiudad' => 'string',
        'iDptoId' => 'integer',
        'iPrvnId' => 'integer',
        'iDsttId' => 'integer',
        'iEduSitAcadId' => 'integer',
        'iEduCarrId' => 'integer',
        'iEduGradAlcId' => 'integer',
        'iEduSitAcadAnioInicio' => 'integer',
        'iEduSitAcadAnioFin' => 'integer',
        'cFormAcadTitulo' => 'string',
        'cFormAcadEspecialidad' => 'string',
        'dtFormAcadFechaExpedicion' => 'date',
        'iEduCentRegId' => 'integer',
        'cFormAcadNumeroRegistro' => 'string',
        'dtFormAcadFechaRegistro' => 'date',
        'dtFormAcadFechaDocumento' => 'date',
        'cFormAcadNumeroDocumento' => 'string',
        'iArchId' => 'integer',
        'cEduNivEdNombre' => 'string',
        'cEduSitAcadNombre' => 'string',
        'cEduGradAlcNombre' => 'string',
        'cFormAcadCentroEstudios' => 'string',
        'iEduNivEspId' => 'integer',
        'cEduSitAcadCentroEstudio' => 'string',
        'cFormAcadEspecialidadNivel' => 'string',
        'iEduProGenId' => 'integer',
        'iEduProProfId' => 'integer',
        'iEduProId' => 'integer',
        'iEduTipCentId' => 'integer',
        'cFormAcadCentroRegistro' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}