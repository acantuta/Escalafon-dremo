<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.tipos_comisiones_pensionarios
 */
class TipoComisionPensionario extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.tipos_comisiones_pensionarios'; // Esquema y tabla especificados
    protected $primaryKey = 'iTipComPenId';

    protected $fillable = [
        'TipComPenNombre'
    ];

    protected $casts = [
        'iTipComPenId' => 'integer',
        'TipComPenNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}