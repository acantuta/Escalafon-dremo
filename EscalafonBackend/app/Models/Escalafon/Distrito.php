<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: grl.distritos
 */
class Distrito extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'grl.distritos'; // Esquema y tabla especificados
    protected $primaryKey = 'iDsttId';

    protected $fillable = [
        'iPrvnId',
        'cDsttCodigo',
        'cDsttNombre',
        'cDsttAbreviatura',
        'iDsttEstado',
        'cDsttGentilicio'
    ];

    protected $casts = [
        'iDsttId' => 'integer',
        'iPrvnId' => 'integer',
        'cDsttCodigo' => 'string',
        'cDsttNombre' => 'string',
        'cDsttAbreviatura' => 'string',
        'iDsttEstado' => 'string',
        'cDsttGentilicio' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}