<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthJWTController extends Controller
{
    public function __construct()
    {
        $this->middleware('custom.auth', ['except' => config('app.kecuali')]);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'true', 'data' => 'invalid token'], 401);
        }
        return response()->json([
            'error' => false,
            'data'  => User::where('email', $credentials['email'])->get(),
            'token' => $token
        ]);
        // return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth::guard('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
        ]);
    }
}
