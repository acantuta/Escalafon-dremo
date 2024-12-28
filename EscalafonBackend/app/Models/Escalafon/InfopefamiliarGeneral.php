<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;

/**
 * Modelo para la tabla: esc.infopefamiliar_generales
 */
class InfopefamiliarGeneral extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;

    protected $table = 'esc.infopefamiliar_generales'; // Esquema y tabla especificados

    protected $fillable = [
        'iInfoPeFamGenId'
    ];

    protected $casts = [
        'iInfoPeFamGenId' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}