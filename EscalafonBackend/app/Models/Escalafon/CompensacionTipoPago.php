<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.compensaciones_tipos_pagos
 */
class CompensacionTipoPago extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.compensaciones_tipos_pagos'; // Esquema y tabla especificados
    protected $primaryKey = 'iCompTipPagId';

    protected $fillable = [
        'cCompTipPagNombre'
    ];

    protected $casts = [
        'iCompTipPagId' => 'integer',
        'cCompTipPagNombre' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}