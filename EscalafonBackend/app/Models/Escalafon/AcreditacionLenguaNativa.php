<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.acreditaciones_lenguas_nativas
 */
class AcreditacionLenguaNativa extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.acreditaciones_lenguas_nativas'; // Esquema y tabla especificados
    protected $primaryKey = 'iAcredId';

    protected $fillable = [
        'iLegId',
        'cAcredIdioma',
        'cAcredDominioEscritura',
        'cAcredDominioOral',
        'iAcredAnioIngreso',
        'iAcredAnioEvaluacion',
        'iAcredAnioVencimiento'
    ];

    protected $casts = [
        'iAcredId' => 'integer',
        'iLegId' => 'integer',
        'cAcredIdioma' => 'string',
        'cAcredDominioEscritura' => 'string',
        'cAcredDominioOral' => 'string',
        'iAcredAnioIngreso' => 'integer',
        'iAcredAnioEvaluacion' => 'integer',
        'iAcredAnioVencimiento' => 'integer'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}