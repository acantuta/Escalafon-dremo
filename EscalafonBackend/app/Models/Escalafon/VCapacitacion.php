<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_Capacitaciones
 */
class VCapacitacion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_Capacitaciones'; // Esquema y tabla especificados

    protected $fillable = [
        'iLegId',
        'iEduTipEstId',
        'dtFechaInicio',
        'dtFechaFin',
        'iEduTipPartId',
        'iEduDocAcredId',
        'iPaisId',
        'cCapaCiudad',
        'cCapaNumeroRegistro',
        'dtCapaFechaEmision',
        'iCapaDuracionHoras',
        'iEduSemId',
        'nCapaCreditos',
        'iEduModaId',
        'cCapaAnotaciones',
        'iArchId',
        'cEduTipEstNombre',
        'cCapaTema',
        'cEduDocAcredNombre',
        'cCapaInstitucion',
        'iCapaId'
    ];

    protected $casts = [
        'iLegId' => 'integer',
        'iEduTipEstId' => 'integer',
        'dtFechaInicio' => 'date',
        'dtFechaFin' => 'date',
        'iEduTipPartId' => 'integer',
        'iEduDocAcredId' => 'integer',
        'iPaisId' => 'integer',
        'cCapaCiudad' => 'string',
        'cCapaNumeroRegistro' => 'string',
        'dtCapaFechaEmision' => 'date',
        'iCapaDuracionHoras' => 'integer',
        'iEduSemId' => 'integer',
        'nCapaCreditos' => 'string',
        'iEduModaId' => 'integer',
        'cCapaAnotaciones' => 'string',
        'iArchId' => 'integer',
        'cEduTipEstNombre' => 'string',
        'cCapaTema' => 'string',
        'cEduDocAcredNombre' => 'string',
        'cCapaInstitucion' => 'string',
        'iCapaId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}