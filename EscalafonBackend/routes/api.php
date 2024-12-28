<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\Escalafon\ArchivoController;
use App\Http\Controllers\Escalafon\ArchivoHandlerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::post('register', [JWTAuthController::class, 'register']);
//Route::post('login', [JWTAuthController::class, 'login']);

// Route::middleware([JwtMiddleware::class])->group(function () {
//     Route::get('user', [JWTAuthController::class, 'getUser']);
//     Route::post('logout', [JWTAuthController::class, 'logout']);
// });

