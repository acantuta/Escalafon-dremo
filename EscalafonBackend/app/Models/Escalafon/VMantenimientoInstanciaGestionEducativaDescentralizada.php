<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_MantenimientoInstanciasGestionEducativaDescentralizadas
 */
class VMantenimientoInstanciaGestionEducativaDescentralizada extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_MantenimientoInstanciasGestionEducativaDescentralizadas'; // Esquema y tabla especificados

    protected $fillable = [
        'iInstGeEduId',
        'cInstGeEduNombre',
        'cDirRegNombre',
        'iDirRegId'
    ];

    protected $casts = [
        'iInstGeEduId' => 'integer',
        'cInstGeEduNombre' => 'string',
        'cDirRegNombre' => 'string',
        'iDirRegId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}