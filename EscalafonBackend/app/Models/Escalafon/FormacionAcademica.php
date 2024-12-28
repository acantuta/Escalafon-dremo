<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.formaciones_academicas
 */
class FormacionAcademica extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.formaciones_academicas'; // Esquema y tabla especificados
    protected $primaryKey = 'iFormAcadId';

    protected $fillable = [
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
        'iEduNivEspId',
        'iEduCarrId',
        'iEduProGenId',
        'iEduProProfId',
        'iEduProId',
        'iEduGradAlcId',
        'iEduSitAcadAnioInicio',
        'iEduSitAcadAnioFin',
        'cEduSitAcadCentroEstudio',
        'cFormAcadTitulo',
        'cFormAcadEspecialidad',
        'dtFormAcadFechaExpedicion',
        'iEduTipCentId',
        'iEduCentRegId',
        'cFormAcadCentroRegistro',
        'cFormAcadNumeroRegistro',
        'dtFormAcadFechaRegistro',
        'dtFormAcadFechaDocumento',
        'cFormAcadNumeroDocumento',
        'cFormAcadCentroEstudios',
        'iArchId',
        'cFormAcadEspecialidadNivel'
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
        'iEduNivEspId' => 'integer',
        'iEduCarrId' => 'integer',
        'iEduProGenId' => 'integer',
        'iEduProProfId' => 'integer',
        'iEduProId' => 'integer',
        'iEduGradAlcId' => 'integer',
        'iEduSitAcadAnioInicio' => 'integer',
        'iEduSitAcadAnioFin' => 'integer',
        'cEduSitAcadCentroEstudio' => 'string',
        'cFormAcadTitulo' => 'string',
        'cFormAcadEspecialidad' => 'string',
        'dtFormAcadFechaExpedicion' => 'date',
        'iEduTipCentId' => 'integer',
        'iEduCentRegId' => 'integer',
        'cFormAcadCentroRegistro' => 'string',
        'cFormAcadNumeroRegistro' => 'string',
        'dtFormAcadFechaRegistro' => 'date',
        'dtFormAcadFechaDocumento' => 'date',
        'cFormAcadNumeroDocumento' => 'string',
        'cFormAcadCentroEstudios' => 'string',
        'iArchId' => 'integer',
        'cFormAcadEspecialidadNivel' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}