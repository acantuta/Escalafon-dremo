<?php

namespace App\Traits\Escalafon;
use Carbon\Carbon;

trait DateHandlerTrait
{
    /**
     * Personaliza la serialización de fechas según el tipo de campo
     */
    protected function serializeDate(\DateTimeInterface $date)
    {
        // Si el campo es solo fecha (sin componente de tiempo)
        if ($date->format('H:i:s') === '00:00:00') {
            return $date->format('Y-m-d');
        }
        
        // Si tiene componente de tiempo
        return $date->format('Y-m-d H:i:s');
    }
} 