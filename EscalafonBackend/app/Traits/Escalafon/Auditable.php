<?php

namespace App\Traits\Escalafon;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

trait Auditable
{
    protected static function bootAuditable(): void
    {
        static::created(function ($model) {
            static::logAudit($model, 'created');
        });

        static::updated(function ($model) {
            static::logAudit($model, 'updated');
        });

        static::deleted(function ($model) {
            static::logAudit($model, 'deleted');
        });
    }

    protected static function logAudit($model, string $action): void
    {
        try {
            $user = Auth::user();
            $userId = $user?->id;
            $userName = $user?->name ?? 'Sistema';

            $oldValues = match ($action) {
                'updated' => array_intersect_key($model->getOriginal(), $model->getDirty()),
                'deleted' => $model->getOriginal(),
                default => null,
            };

            $newValues = match ($action) {
                'created' => $model->getAttributes(),
                'updated' => array_intersect_key($model->getAttributes(), $model->getDirty()),
                default => null,
            };

            DB::table('esc.auditoria')->insert([
                'tabla' => $model->getTable(),
                'accion' => $action,
                'valores_anteriores' => $oldValues ? json_encode($oldValues) : null,
                'valores_nuevos' => $newValues ? json_encode($newValues) : null,
                'usuario_id' => $userId,
                'usuario_nombre' => $userName,
                'fecha_hora' => now(),
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent()
            ]);

        } catch (\Exception $e) {
            Log::error("Error al registrar auditoría: " . $e->getMessage(), [
                'model' => get_class($model),
                'action' => $action,
                'exception' => $e
            ]);
        }
    }
} 