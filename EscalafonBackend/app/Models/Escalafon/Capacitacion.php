<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.capacitaciones
 */
class Capacitacion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.capacitaciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iCapaId';

    protected $fillable = [
        'iLegId',
        'iEduTipEstId',
        'dtFechaInicio',
        'dtFechaFin',
        'iEduTipPartId',
        'cCapaInstitucion',
        'iPaisId',
        'cCapaCiudad',
        'cCapaTema',
        'iEduDocAcredId',
        'cCapaNumeroRegistro',
        'dtCapaFechaEmision',
        'iCapaDuracionHoras',
        'nCapaCreditos',
        'iEduSemId',
        'iEduModaId',
        'cCapaAnotaciones',
        'iArchId'
    ];

    protected $casts = [
        'iCapaId' => 'integer',
        'iLegId' => 'integer',
        'iEduTipEstId' => 'integer',
        'dtFechaInicio' => 'date',
        'dtFechaFin' => 'date',
        'iEduTipPartId' => 'integer',
        'cCapaInstitucion' => 'string',
        'iPaisId' => 'integer',
        'cCapaCiudad' => 'string',
        'cCapaTema' => 'string',
        'iEduDocAcredId' => 'integer',
        'cCapaNumeroRegistro' => 'string',
        'dtCapaFechaEmision' => 'date',
        'iCapaDuracionHoras' => 'integer',
        'nCapaCreditos' => 'string',
        'iEduSemId' => 'integer',
        'iEduModaId' => 'integer',
        'cCapaAnotaciones' => 'string',
        'iArchId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}