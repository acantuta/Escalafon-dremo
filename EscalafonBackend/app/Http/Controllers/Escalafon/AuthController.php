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
                'nombres' => $persona->cPersNombre,     // Asumiendo que estos son los campos
                'apellidos' =>  "{$persona->cPersPaterno} {$persona->cPersMaterno}", // en tu tabla de credenciales
                'permisos' => $permisos  // Now includes both possible permissions
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
} 