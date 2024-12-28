<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.legajos_ubicaciones
 */
class LegajoUbicacion extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.legajos_ubicaciones'; // Esquema y tabla especificados
    protected $primaryKey = 'iLegUbiId';

    protected $fillable = [
        'iLegId',
        'cLegUbiAmbiente',
        'cLegUbiEstante',
        'cLegUbiCaja',
        'cLegUbiSeccion1Folios',
        'cLegUbiSeccion2Folios',
        'cLegUbiSeccion3Folios',
        'cLegUbiSeccion4Folios',
        'cLegUbiSeccion5Folios',
        'cLegUbiSeccion6Folios',
        'cLegUbiSeccion7Folios',
        'cLegUbiSeccion8Folios',
        'cLegUbiSeccion9Folios',
        'cLegUbiSeccion10Folios',
        'cLegUbiSeccion11Folios',
        'cLegUbiSeccion12Folios'
    ];

    protected $casts = [
        'iLegUbiId' => 'integer',
        'iLegId' => 'integer',
        'cLegUbiAmbiente' => 'string',
        'cLegUbiEstante' => 'string',
        'cLegUbiCaja' => 'string',
        'cLegUbiSeccion1Folios' => 'integer',
        'cLegUbiSeccion2Folios' => 'integer',
        'cLegUbiSeccion3Folios' => 'integer',
        'cLegUbiSeccion4Folios' => 'integer',
        'cLegUbiSeccion5Folios' => 'integer',
        'cLegUbiSeccion6Folios' => 'integer',
        'cLegUbiSeccion7Folios' => 'integer',
        'cLegUbiSeccion8Folios' => 'integer',
        'cLegUbiSeccion9Folios' => 'integer',
        'cLegUbiSeccion10Folios' => 'integer',
        'cLegUbiSeccion11Folios' => 'integer',
        'cLegUbiSeccion12Folios' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}