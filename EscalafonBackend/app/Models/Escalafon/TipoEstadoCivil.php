<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: grl.tipos_estados_civiles
 */
class TipoEstadoCivil extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'grl.tipos_estados_civiles'; // Esquema y tabla especificados
    protected $primaryKey = 'iTipoEstCivId';

    protected $fillable = [
        'cTipoEstCivilNombre',
        'cTipoEstCivilReniec'
    ];

    protected $casts = [
        'iTipoEstCivId' => 'integer',
        'cTipoEstCivilNombre' => 'string',
        'cTipoEstCivilReniec' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}