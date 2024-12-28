<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.administradoras_fondos_pensiones
 */
class AdministradoraFondoPension extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.administradoras_fondos_pensiones'; // Esquema y tabla especificados
    protected $primaryKey = 'iAdmFonPenId';

    protected $fillable = [
        'cAdmFonPenNombre'
    ];

    protected $casts = [
        'iAdmFonPenId' => 'integer',
        'cAdmFonPenNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}