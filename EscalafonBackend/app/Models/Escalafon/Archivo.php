<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Escalafon\HasStoredProcedures;
use App\Traits\Escalafon\DateHandlerTrait;
use App\Traits\Escalafon\Auditable;

/**
 * Modelo para la tabla: esc.archivos
 */
class Archivo extends Model
{
    use HasFactory;
    use HasStoredProcedures;
    use DateHandlerTrait;
    use Auditable;

    protected $table = 'esc.archivos'; // Esquema y tabla especificados
    protected $primaryKey = 'iArchId';

    protected $fillable = [
        'iArchFolios',
        'cArchExtension',
        'cArchUuid'
    ];

    protected $casts = [
        'iArchId' => 'integer',
        'iArchFolios' => 'integer',
        'cArchExtension' => 'string',
        'cArchUuid' => 'string'
    ];
    
    public $timestamps = false; // Desactivar la gestión de timestamps

    public function __construct(array $data = [])
    {
        parent::__construct($data);
    }
}