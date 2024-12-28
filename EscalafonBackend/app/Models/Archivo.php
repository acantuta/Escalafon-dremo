<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $table = 'archivo';
    protected $primaryKey = 'iArchId';
    public $timestamps = false;

    protected $fillable = [
        'iArchFolios',
        'cArchExtension',
        'cArchUuid'
    ];
} 