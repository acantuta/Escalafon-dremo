<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: grl.paises
 */
class Pais extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'grl.paises'; // Esquema y tabla especificados
    protected $primaryKey = 'iPaisId';

    protected $fillable = [
        'cPaisCodigo',
        'cPaisNombre',
        'cPaisAbreviatura1',
        'cPaisAbreviatura2',
        'cPaisCodigoSunat',
        'cPaisGentilicio'
    ];

    protected $casts = [
        'iPaisId' => 'integer',
        'cPaisCodigo' => 'string',
        'cPaisNombre' => 'string',
        'cPaisAbreviatura1' => 'string',
        'cPaisAbreviatura2' => 'string',
        'cPaisCodigoSunat' => 'string',
        'cPaisGentilicio' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}