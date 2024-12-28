<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: grl.provincias
 */
class Provincia extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'grl.provincias'; // Esquema y tabla especificados
    protected $primaryKey = 'iPrvnId';

    protected $fillable = [
        'iDptoId',
        'cPrvnCodigo',
        'cPrvnNombre',
        'cPrvnAbreviatura',
        'iPrvnEstado',
        'cPrvnGentilicio'
    ];

    protected $casts = [
        'iPrvnId' => 'integer',
        'iDptoId' => 'integer',
        'cPrvnCodigo' => 'string',
        'cPrvnNombre' => 'string',
        'cPrvnAbreviatura' => 'string',
        'iPrvnEstado' => 'string',
        'cPrvnGentilicio' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}