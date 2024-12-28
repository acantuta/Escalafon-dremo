<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: grl.personas
 */
class Persona extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'grl.personas'; // Esquema y tabla especificados
    protected $primaryKey = 'iPersId';

    protected $fillable = [
        'iTipoPersId',
        'iTipoIdentId',
        'cPersDocumento',
        'cPersPaterno',
        'cPersMaterno',
        'cPersNombre',
        'cPersSexo',
        'dPersNacimiento',
        'iTipoEstCivId',
        'iNacionId',
        'cPersFotografia',
        'cPersRazonSocialNombre',
        'cPersRazonSocialCorto',
        'cPersRazonSocialSigla',
        'iPersRepresentanteLegalId',
        'cPersDomicilio',
        'iTipoSectorId',
        'iPaisId',
        'iDptoId',
        'iPrvnId',
        'iDsttId',
        'iPersEstado',
        'cPersCodigoVerificacion',
        'cPersObs',
        'iCredSesionId',
        'dtPersCreado',
        'dtPersActualizado'
    ];

    protected $casts = [
        'iPersId' => 'integer',
        'iTipoPersId' => 'integer',
        'iTipoIdentId' => 'integer',
        'cPersDocumento' => 'string',
        'cPersPaterno' => 'string',
        'cPersMaterno' => 'string',
        'cPersNombre' => 'string',
        'cPersSexo' => 'string',
        'dPersNacimiento' => 'date',
        'iTipoEstCivId' => 'integer',
        'iNacionId' => 'integer',
        'cPersFotografia' => 'string',
        'cPersRazonSocialNombre' => 'string',
        'cPersRazonSocialCorto' => 'string',
        'cPersRazonSocialSigla' => 'string',
        'iPersRepresentanteLegalId' => 'integer',
        'cPersDomicilio' => 'string',
        'iTipoSectorId' => 'integer',
        'iPaisId' => 'integer',
        'iDptoId' => 'integer',
        'iPrvnId' => 'integer',
        'iDsttId' => 'integer',
        'iPersEstado' => 'string',
        'cPersCodigoVerificacion' => 'string',
        'cPersObs' => 'string',
        'iCredSesionId' => 'integer',
        'dtPersCreado' => 'datetime',
        'dtPersActualizado' => 'datetime'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}