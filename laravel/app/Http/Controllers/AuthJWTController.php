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
        return response()->json(Auth::guard('api')->user());
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

    public function register(Request $request) {
        try {
            $this->validate($request,[
                'username' => 'required',
                'email' => 'required',
                'password' => 'required'
            ]);

            $data = $request->all();
            $data['password'] = bcrypt($request->password);
            $user = User::create($data);
            if ($user) {
                return response()->json(['error' => false, 'data' => 'Register Berhasil!']);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => true, 'message' => $e->validator->errors()->all()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], 500);
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
        ]);
    }

}
