<?php

namespace App\Models\Escalafon;

use Illuminate\Database\Eloquent\Model;

class Auditoria extends Model
{
    protected $table = 'esc.auditoria';
    public $timestamps = false;

    protected $fillable = [
        'tabla',
        'accion',
        'valores_anteriores',
        'valores_nuevos',
        'usuario_id',
        'usuario_nombre',
        'fecha_hora',
        'ip_address',
        'user_agent'
    ];

    protected $casts = [
        'valores_anteriores' => 'array',
        'valores_nuevos' => 'array',
        'fecha_hora' => 'datetime',
        'usuario_id' => 'integer'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function scopeRecientes($query)
    {
        return $query->orderBy('fecha_hora', 'desc');
    }

    public function scopePorTabla($query, string $tabla)
    {
        return $query->where('tabla', $tabla);
    }

    public function scopePorAccion($query, string $accion)
    {
        return $query->where('accion', $accion);
    }
} 