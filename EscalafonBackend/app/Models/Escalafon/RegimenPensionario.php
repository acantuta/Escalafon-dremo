<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.regimenes_pensionarios
 */
class RegimenPensionario extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.regimenes_pensionarios'; // Esquema y tabla especificados
    protected $primaryKey = 'iRegPenId';

    protected $fillable = [
        'cRegPenNombre'
    ];

    protected $casts = [
        'iRegPenId' => 'integer',
        'cRegPenNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}