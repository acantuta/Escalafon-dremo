<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtMiddleware
{
    protected $except = [
        'api/escalafon/login'
    ];

    public function handle($request, Closure $next)
    {
        if (in_array($request->path(), $this->except)) {
            return $next($request);
        }

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            \Log::error('JWT Authentication Error: ' . $e->getMessage() . "\nStack trace:\n" . $e->getTraceAsString());
            return response()->json(['error' => 'Token not valid'], 401);
        }

        return $next($request);
    }
}