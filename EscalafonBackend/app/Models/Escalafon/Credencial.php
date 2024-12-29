<?php

namespace App\Models\Escalafon;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
class Credencial extends Authenticatable implements JWTSubject
{
    protected $table = 'seg.credenciales';
    protected $primaryKey = 'iCredId';
    public $timestamps = false;
    protected $fillable = [
        'cCredUsuario',
        'password',
        'nCredVerificado',
        'cCredCodigoVerif'
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return (string) $this->getKey(); // Forzamos la conversión a string
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'usuario' => $this->cCredUsuario,
            'id' => (string) $this->iCredId // Aseguramos que el ID sea string
        ];
    }

    /**
     * Aseguramos que el ID siempre se retorne como string
     */
    public function getKey()
    {
        return (string) $this->nCredId;
    }

    /**
     * Aseguramos que el ID se cargue correctamente
     */
    protected function getKeyForJWT()
    {
        return (string) $this->nCredId;
    }


    public function generarCodigoVerificacion() {
        try {
            $codigo = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            
            // Usar Eloquent directamente
            $this->cCredCodigoVerif = $codigo;
            $this->timestamps = false; // Asegurarnos que no intente actualizar timestamps
            $saved = $this->save(['timestamps' => false]); // Guardar sin timestamps
            
            if ($saved) {
                return $codigo;
            }
            
            throw new \Exception('No se pudo actualizar el código de verificación');
            
        } catch (\Exception $e) {
            \Log::error('Error al generar código de verificación: ' . $e->getMessage());
            throw $e;
        }
    }
}