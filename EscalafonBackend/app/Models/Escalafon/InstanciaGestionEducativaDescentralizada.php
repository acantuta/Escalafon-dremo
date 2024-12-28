<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.instancias_gestion_educativa_descentralizadas
 */
class InstanciaGestionEducativaDescentralizada extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.instancias_gestion_educativa_descentralizadas'; // Esquema y tabla especificados
    protected $primaryKey = 'iInstGeEduId';

    protected $fillable = [
        'iDirRegId',
        'cInstGeEduNombre'
    ];

    protected $casts = [
        'iInstGeEduId' => 'integer',
        'iDirRegId' => 'integer',
        'cInstGeEduNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}