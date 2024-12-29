<?php

namespace App\Http\Controllers\Escalafon;

use App\Http\Controllers\Escalafon\Controller;
use App\Models\Escalafon\Credencial;
use App\Models\Escalafon\CredencialEntidadPerfil;
use App\Models\Escalafon\Persona;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use UnexpectedValueException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            // Buscar usuario usando el modelo Credencial
            $user = Credencial::where('cCredUsuario', $request->username)
                ->where('password', sha1($request->password))
                ->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuario o contraseña incorrectos',
                    'errors' => ['credentials' => ['Las credenciales proporcionadas son inválidas']]
                ], 401);
            }

            $necesitaVerificar = $this->validarDosFactores($user);
            if ($necesitaVerificar != null)
            {
                return $necesitaVerificar;
            }

            // Verificando permisos
            $esAdministradorEscalafon = CredencialEntidadPerfil::where('iCredSesionId', $user->iCredSesionId)
                ->where('iPerfilId', 211)
                ->exists();

            $esUsuarioEscalafon = CredencialEntidadPerfil::where('iCredSesionId', $user->iCredSesionId)
                ->where('iPerfilId', 212)
                ->exists();

            $persona = Persona::where('iPersId', $user->iPersId)->first();
            
            if (!$persona) {
                throw new UnexpectedValueException("La persona con ID {$user->iPersId} no existe en el sistema");
            }

            $permisos = [];

            // Add logic to check user permissions
            if ($esAdministradorEscalafon) {
                $permisos[] = 'mantenimiento';
            }

            if ($esUsuarioEscalafon) {
                $permisos[] = 'area-usuaria';
            }

            if (count($permisos) == 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'El usuario no tiene ningún perfil en el sistema de escalafón.',
                    'errors' => ['credentials' => ['El usuario no tiene ningún perfil en el sistema de escalafón. Por favor, contactar con el administrador.']]
                ], 401);
            }

            // Crear token JWT con claims personalizados
            $token = JWTAuth::claims([
                'nombres' => $persona->cPersNombre,
                'apellidos' =>  "{$persona->cPersPaterno} {$persona->cPersMaterno}", 
                'permisos' => $permisos,
                'iPersId' => $user->iPersId
            ])->fromUser($user);

            return response()->json([
                'status' => 'success',
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60,
                'user' => [
                    'id' => $user->nCredId,
                    'usuario' => $user->cCredUsuario,
                    'nombres' => $user->cPersNombre,
                    'apellidos' => $user->cPersApellido
                ]
            ]);

        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo crear el token de acceso',
                'errors' => ['token' => ['Error al generar el token de autenticación']]
            ], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error de autenticación: ' . $e->getMessage(), [
                'stack_trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Error en el servidor',
                'errors' => ['server' => ['Ocurrió un error inesperado']]
            ], 500);
        }
    }

    private function validarDosFactores(Credencial $user)
    {
        if ($user->bCredVerificado != 1) {
            try {
                // Generar nuevo código de verificación
                $codigo = $user->generarCodigoVerificacion();
                
                // Obtener el email de las variables de entorno
                $twoFactorEmail = env('2F_EMAIL');
                
                if (empty($twoFactorEmail)) {
                    throw new \Exception('La variable de entorno 2F_EMAIL no está definida');
                }

                // Enviar el código por correo usando la nueva rutina
                $this->enviarCodigoVerificacion($user, $codigo, $twoFactorEmail);
                
                return response()->json([
                    'status' => 'pending_verification',
                    'message' => 'Se requiere verificación de dos factores. Se ha enviado un código a su correo electrónico.',
                    'data' => [
                        'username' => $user->cCredUsuario
                    ]
                ], 200);
                
            } catch (\Exception $e) {
                Log::error('Error en validación de dos factores: ' . $e->getMessage(), [
                    'user' => $user->cCredUsuario,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Error al procesar la verificación de dos factores',
                    'errors' => ['server' => ['No se pudo enviar el código de verificación. Por favor, contacte al administrador.']]
                ], 500);
            }
        }
        return null;
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'status' => 'success',
                'message' => 'Sesión cerrada correctamente'
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo cerrar la sesión',
                'errors' => ['token' => ['Error al invalidar el token']]
            ], 500);
        }
    }

    public function refresh()
    {
        try {
            $token = JWTAuth::getToken();
            $newToken = JWTAuth::refresh($token);
            
            return response()->json([
                'status' => 'success',
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo refrescar el token',
                'errors' => ['token' => ['Error al refrescar el token']]
            ], 500);
        }
    }

    public function verificarCodigo(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string',
                'codigo' => 'required|string'
            ]);

            $user = Credencial::where('cCredUsuario', $request->username)
                ->where('cCredCodigoVerif', $request->codigo)
                ->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Código de verificación inválido',
                    'errors' => ['codigo' => ['El código ingresado no es válido']]
                ], 401);
            }

            try {
                // Actualizar usando Eloquent
                $user->bCredVerificado = 1;
                $user->cCredCodigoVerif = null;
                $user->timestamps = false;
                $saved = $user->save(['timestamps' => false]);

                if (!$saved) {
                    throw new \Exception('No se pudo actualizar el estado de verificación');
                }

                // Obtener la información de la persona
                $persona = Persona::where('iPersId', $user->iPersId)->first();
                if (!$persona) {
                    throw new \Exception('No se encontró la información de la persona');
                }

                // Obtener los permisos del usuario
                $permisos = $this->obtenerPermisos($user);
                
                if (count($permisos) == 0) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'El usuario no tiene ningún perfil en el sistema de escalafón.',
                        'errors' => ['credentials' => ['El usuario no tiene ningún perfil en el sistema de escalafón. Por favor, contactar con el administrador.']]
                    ], 401);
                }

                // Crear token JWT con claims personalizados
                $token = JWTAuth::claims([
                    'nombres' => $persona->cPersNombre,
                    'apellidos' =>  "{$persona->cPersPaterno} {$persona->cPersMaterno}", 
                    'permisos' => $permisos,
                    'iPersId' => $user->iPersId
                ])->fromUser($user);

                return response()->json([
                    'status' => 'success',
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => config('jwt.ttl') * 60,
                    'user' => [
                        'id' => $user->nCredId,
                        'usuario' => $user->cCredUsuario,
                        'nombres' => $persona->cPersNombre,
                        'apellidos' => "{$persona->cPersPaterno} {$persona->cPersMaterno}"
                    ]
                ]);

            } catch (\Exception $e) {
                Log::error('Error al actualizar verificación: ' . $e->getMessage());
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error('Error en verificación: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error al verificar el código',
                'errors' => ['server' => ['Ocurrió un error inesperado']]
            ], 500);
        }
    }

    private function obtenerPermisos(Credencial $user): array
    {
        $permisos = [];
        
        $esAdministradorEscalafon = CredencialEntidadPerfil::where('iCredSesionId', $user->iCredSesionId)
            ->where('iPerfilId', 211)
            ->exists();

        $esUsuarioEscalafon = CredencialEntidadPerfil::where('iCredSesionId', $user->iCredSesionId)
            ->where('iPerfilId', 212)
            ->exists();

        if ($esAdministradorEscalafon) {
            $permisos[] = 'mantenimiento';
        }

        if ($esUsuarioEscalafon) {
            $permisos[] = 'area-usuaria';
        }

        return $permisos;
    }

    private function enviarCodigoVerificacion(Credencial $user, string $codigo, string $email): void
    {
        $mensaje = "SISTEMA DE ESCALAFÓN DREMO\n\n" .
                   "Usuario: {$user->cCredUsuario}\n" .
                   "Código de verificación: {$codigo}\n\n" .
                   "Este código es válido por un tiempo limitado.\n" .
                   "Si no ha solicitado este código, por favor ignore este mensaje.\n\n" .
                   "No comparta este código con nadie.\n" .
                   "Este es un mensaje automático, por favor no responda a este correo.";

        try {
            Mail::raw($mensaje, function($message) use ($email) {
                $message->to($email)
                    ->subject('Código de Verificación - Sistema de Escalafón DREMO')
                    ->from(config('mail.from.address'), config('mail.from.name'));
            });

            Log::info('Correo de verificación enviado exitosamente', [
                'email' => $email
            ]);
        } catch (\Exception $e) {
            Log::error('Error al enviar correo de verificación', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw new \Exception('Error al enviar el correo de verificación: ' . $e->getMessage());
        }
    }
} 