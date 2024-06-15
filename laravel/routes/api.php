<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthJWTController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/')->group(function () {
    Route::get('/', [ApiController::class, 'homepage']);
    Route::prefix('auth')->group(function () {
        Route::post('me',[AuthJWTController::class, 'me']);
        Route::post('login',[AuthJWTController::class, 'login']);
        Route::post('register',[AuthJWTController::class, 'register']);
        Route::post('logout',[AuthJWTController::class, 'logout']);
        Route::post('refresh',[AuthJWTController::class, 'refresh']);
    });
    Route::prefix('cart')->group(function () {
        Route::post('/', [ApiController::class, 'cart_post']);
        Route::get('show/{id}', [ApiController::class, 'cart_show']);
        Route::delete('del/{id_user}', [ApiController::class, 'cart_delete_all']);
        Route::delete('del-id/{id_sesi}', [ApiController::class, 'cart_delete_id']);
        Route::prefix('order')->group(function () {
            Route::get('cekout/{id}', [ApiController::class, 'cekout']);
        });
     });
});


