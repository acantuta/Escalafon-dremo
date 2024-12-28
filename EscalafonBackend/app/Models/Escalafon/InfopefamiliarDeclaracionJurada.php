<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.infopefamiliar_declaraciones_juradas
 */
class InfopefamiliarDeclaracionJurada extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.infopefamiliar_declaraciones_juradas'; // Esquema y tabla especificados
    protected $primaryKey = 'iSecInfDecId';

    protected $fillable = [
        'iLegId',
        'iInfoPeFamDecTipId',
        'dtInfoPeFamDecFechaEmision',
        'cInfoPeFamDecAnotaciones',
        'iArchivoId'
    ];

    protected $casts = [
        'iSecInfDecId' => 'integer',
        'iLegId' => 'integer',
        'iInfoPeFamDecTipId' => 'integer',
        'dtInfoPeFamDecFechaEmision' => 'date',
        'cInfoPeFamDecAnotaciones' => 'string',
        'iArchivoId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}