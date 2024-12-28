<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.V_InfopefamiliarDeclaracionesJuradas
 */
class VInfopefamiliarDeclaracionJurada extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.V_InfopefamiliarDeclaracionesJuradas'; // Esquema y tabla especificados

    protected $fillable = [
        'iSecInfDecId',
        'iLegId',
        'iInfoPeFamDecTipId',
        'dtInfoPeFamDecFechaEmision',
        'cInfoPeFamDecAnotaciones',
        'iArchivoId',
        'cInfoPeFamDecTipNombre'
    ];

    protected $casts = [
        'iSecInfDecId' => 'integer',
        'iLegId' => 'integer',
        'iInfoPeFamDecTipId' => 'integer',
        'dtInfoPeFamDecFechaEmision' => 'date',
        'cInfoPeFamDecAnotaciones' => 'string',
        'iArchivoId' => 'integer',
        'cInfoPeFamDecTipNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}