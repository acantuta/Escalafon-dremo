<?php

namespace App\Models\Escalafon;
use Illuminate\Database\Eloquent\Model;

use Tymon\JWTAuth\Contracts\JWTSubject;
class CredencialEntidadPerfil extends Model
{
    protected $table = 'seg.credenciales_entidades_perfiles';
    protected $primaryKey = 'iCredEntPerfId';
    public $timestamps = false;

}