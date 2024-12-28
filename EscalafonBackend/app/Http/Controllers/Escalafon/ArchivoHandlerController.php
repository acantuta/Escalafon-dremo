<?php

namespace App\Http\Controllers\Escalafon;

use App\Http\Controllers\Escalafon\Controller;
use App\Models\Escalafon\Archivo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ArchivoHandlerController extends Controller
{
    /**
     * Subir un archivo al servidor
     */
    public function upload(Request $request)
    {
        try {
            // Log detallado de la request en formato JSON
            Log::info('Request JSON:', [
                'request_all' => $request->all(),
                'request_input' => $request->input(),
                'content_type' => $request->header('Content-Type'),
                'tiene_archivo' => $request->hasFile('archivo'),
                'archivos' => array_keys($request->allFiles()),
                'post_max_size' => ini_get('post_max_size'),
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'max_file_uploads' => ini_get('max_file_uploads'),
            ]);

            if (!$request->hasFile('archivo')) {
                return response()->json([
                    'status' => false,
                    'message' => 'No se encontró ningún archivo',
                    'debug' => [
                        'recibido' => [
                            'campos' => array_keys($request->all()),
                            'archivos' => array_keys($request->allFiles()),
                            'content_type' => $request->header('Content-Type')
                        ],
                        'esperado' => [
                            'campo_archivo' => 'archivo',
                            'extension' => '.pdf',
                            'max_size' => '2MB'
                        ]
                    ]
                ], 400);
            }

            $file = $request->file('archivo');
            
            // Log del archivo recibido
            Log::info('Archivo recibido:', [
                'nombre' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'extension' => $file->getClientOriginalExtension(),
                'tamaño' => $file->getSize(),
                'error' => $file->getError(),
                'path' => $file->getPathname()
            ]);

            // Validación manual
            $extension = strtolower($file->getClientOriginalExtension());
            $size = $file->getSize();
            $maxSize = 20 * 1024 * 1024; // 20MB en bytes
            
            $errors = [];
            
            $allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png']; // Lista de extensiones permitidas
            
            if (!in_array($extension, $allowedExtensions)) {
                $errors['archivo'][] = 'Solo se permiten archivos: ' . implode(', ', $allowedExtensions);
            }
            
            if ($size > $maxSize) {
                $errors['archivo'][] = 'El archivo no debe superar 20MB';
            }
            
            if (!is_numeric($request->input('iFolios')) || $request->input('iFolios') < 1) {
                $errors['iFolios'][] = 'El número de folios debe ser mayor a 0';
            }

            if (!empty($errors)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $errors,
                    'debug' => [
                        'recibido' => [
                            'nombre' => $file->getClientOriginalName(),
                            'tipo' => $file->getMimeType(),
                            'tamaño' => $size,
                            'extension' => $extension,
                            'folios' => $request->input('iFolios')
                        ],
                        'esperado' => [
                            'extension' => 'pdf',
                            'max_size' => '2MB',
                            'folios' => 'número entero mayor a 0'
                        ]
                    ]
                ], 422);
            }

            DB::beginTransaction();

            $uuid = Str::uuid()->toString();
            
            // Guardar archivo con su extensión original
            $extension = strtolower($file->getClientOriginalExtension());
            $path = $file->storeAs('archivos', $uuid . '.' . $extension, 'public');

            if (!$path) {
                throw new Exception('Error al guardar el archivo en el sistema de archivos');
            }

            // Crear registro
            $archivo = Archivo::create([
                'iArchFolios' => $request->iFolios,
                'cArchExtension' => '.' . $extension,
                'cArchUuid' => $uuid
            ]);

            if (!$archivo) {
                throw new Exception('Error al crear el registro en la base de datos');
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Archivo subido correctamente',
                'data' => $archivo
            ], 201);

        } catch (Exception $e) {
            DB::rollBack();
            if (isset($path)) {
                Storage::delete($path);
            }
            
            Log::error('Error detallado:', [
                'mensaje' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all(),
                'files' => $request->allFiles(),
                'headers' => $request->headers->all()
            ]);
            
            return response()->json([
                'status' => false,
                'message' => 'Error al subir el archivo: ' . $e->getMessage(),
                'debug' => [
                    'recibido' => [
                        'request' => $request->all(),
                        'archivos' => $request->allFiles(),
                        'headers' => $request->headers->all()
                    ],
                    'error' => [
                        'mensaje' => $e->getMessage(),
                        'tipo' => get_class($e),
                        'linea' => $e->getLine(),
                        'archivo' => $e->getFile()
                    ]
                ]
            ], 500);
        }
    }

    /**
     * Descargar un archivo
     */
    public function download($uuid)
    {
        try {
            $archivo = Archivo::where('cArchUuid', $uuid)->firstOrFail();
            $filePath = storage_path('app/public/archivos/' . $archivo->cArchUuid . $archivo->cArchExtension);

            if (!file_exists($filePath)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Archivo no encontrado'
                ], 404);
            }

            // Retornar solo el archivo para descarga
            $mimeTypes = [
                'pdf' => 'application/pdf',
                'jpg' => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'png' => 'image/png'
            ];
            
            $extension = ltrim($archivo->cArchExtension, '.');
            $contentType = $mimeTypes[$extension] ?? 'application/octet-stream';

            return Response::download($filePath, 'archivo' . $archivo->cArchExtension, [
                'Content-Type' => $contentType,
                'Content-Disposition' => 'attachment; filename="archivo' . $archivo->cArchExtension . '"'
            ]);

        } catch (Exception $e) {
            Log::error('Error al descargar archivo', [
                'error' => $e->getMessage(),
                'uuid' => $uuid
            ]);
            
            return response()->json([
                'status' => false,
                'message' => 'Error al descargar el archivo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar un archivo
     */
    public function delete($uuid)
    {
        try {
            $archivo = Archivo::where('cArchUuid', $uuid)->firstOrFail();
            $filePath = "public/archivos/{$archivo->cArchUuid}{$archivo->cArchExtension}";

            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }

            if (!$archivo->delete()) {
                throw new Exception('Error al eliminar el registro de la base de datos');
            }

            return response()->json([
                'status' => true,
                'message' => 'Archivo eliminado correctamente'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error al eliminar el archivo: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getFileUrl($uuid)
    {
        $archivo = Archivo::where('cArchUuid', $uuid)->firstOrFail();
        $url = asset('storage/archivos/' . $archivo->cArchUuid . $archivo->cArchExtension);
        return response()->json([
            'status' => true,
            'url' => $url
        ]);
    }

    public function viewFile($uuid)
    {
        try {
            $archivo = Archivo::where('cArchUuid', $uuid)->firstOrFail();
            $filePath = storage_path('app/public/archivos/' . $archivo->cArchUuid . $archivo->cArchExtension);

            if (!file_exists($filePath)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Archivo no encontrado'
                ], 404);
            }

            // Retornar solo el archivo PDF sin ninguna otra respuesta
            $mimeTypes = [
                'pdf' => 'application/pdf',
                'jpg' => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'png' => 'image/png'
            ];
            
            $extension = ltrim($archivo->cArchExtension, '.');
            $contentType = $mimeTypes[$extension] ?? 'application/octet-stream';

            return Response::file($filePath, [
                'Content-Type' => $contentType,
                'Content-Disposition' => 'inline; filename="archivo' . $archivo->cArchExtension . '"',
                // Prevenir que el navegador cachee la respuesta
                'Cache-Control' => 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);

        } catch (Exception $e) {
            Log::error('Error al obtener archivo', [
                'error' => $e->getMessage(),
                'uuid' => $uuid
            ]);
            
            return response()->json([
                'status' => false,
                'message' => 'Error al obtener el archivo: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getArchivo($id)
    {
        try {
            // Agregar log para debug
            Log::info('Obteniendo archivo:', ['id' => $id]);

            $archivo = Archivo::select([
                'iArchId',
                'iArchFolios',
                'cArchExtension',
                'cArchUuid'
            ])->findOrFail($id);
            
            // Log del archivo encontrado con los folios
            Log::info('Archivo encontrado:', $archivo->toArray());

            // Asegurarnos que iArchFolios esté incluido en la respuesta
            return response()->json([
                'status' => true,
                'data' => [
                    'iArchId' => $archivo->iArchId,
                    'iArchFolios' => $archivo->iArchFolios ?? 1,  // Valor por defecto si es null
                    'cArchExtension' => $archivo->cArchExtension,
                    'cArchUuid' => $archivo->cArchUuid
                ]
            ]);

        } catch (Exception $e) {
            Log::error('Error al obtener archivo:', [
                'id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Error al obtener el archivo: ' . $e->getMessage()
            ], 404);
        }
    }

    public function update($id, Request $request)
    {
        try {
            $archivo = Archivo::findOrFail($id);
            
            $archivo->iArchFolios = $request->iArchFolios;
            $archivo->save();

            return response()->json([
                'status' => true,
                'message' => 'Folios actualizados correctamente',
                'data' => $archivo
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error al actualizar folios: ' . $e->getMessage()
            ], 500);
        }
    }
} 