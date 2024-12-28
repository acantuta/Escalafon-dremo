<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.infopefamiliar_familiares_parentescos
 */
class InfopefamiliarFamiliarParentesco extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.infopefamiliar_familiares_parentescos'; // Esquema y tabla especificados
    protected $primaryKey = 'iInfoPeFamParentId';

    protected $fillable = [
        'cInfoPeFamParentNombre'
    ];

    protected $casts = [
        'iInfoPeFamParentId' => 'integer',
        'cInfoPeFamParentNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}