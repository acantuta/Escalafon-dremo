<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: grl.departamentos
 */
class Departamento extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'grl.departamentos'; // Esquema y tabla especificados
    protected $primaryKey = 'iDptoId';

    protected $fillable = [
        'iPaisId',
        'cDptoCodigo',
        'cDptoNombre',
        'cDptoAbreviatura',
        'iDptoEstado',
        'cDptoGentilicio'
    ];

    protected $casts = [
        'iDptoId' => 'integer',
        'iPaisId' => 'integer',
        'cDptoCodigo' => 'string',
        'cDptoNombre' => 'string',
        'cDptoAbreviatura' => 'string',
        'iDptoEstado' => 'string',
        'cDptoGentilicio' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}