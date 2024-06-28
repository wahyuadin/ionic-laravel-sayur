<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthJWTController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'cors'], function() {
    Route::middleware('api')->group(function () {
        Route::prefix('/')->group(function () {
            Route::get('/', [ApiController::class, 'homepage']);
            Route::get('detail/{id}', [ApiController::class,'homepageDetail']);
            Route::prefix('auth')->group(function () {
                Route::get('me',[AuthJWTController::class, 'me']);
                Route::post('login',[AuthJWTController::class, 'login']);
                Route::post('register',[AuthJWTController::class, 'register']);
                Route::get('keluar',[AuthJWTController::class, 'logout']);
                Route::post('refresh',[AuthJWTController::class, 'refresh']);
            });
            Route::prefix('cart')->group(function () {
                Route::post('/', [ApiController::class, 'cart_post']);
                Route::get('show/{id}', [ApiController::class, 'cart_show']);
                Route::delete('del-id/{id_sesi}', [ApiController::class, 'cart_delete_id']);
                Route::post('cekout', [ApiController::class, 'cekout']);
            });
            Route::prefix('profile')->group(function () {
                Route::put('/{id}', [ApiController::class, 'profile_edit']);
                Route::get('/{id}', [ApiController::class, 'profile_show']);
            });
            Route::get('riwayat/{id}', [ApiController::class,'riwayat']);
            Route::get('wa/{phone}', [ApiController::class, 'wa']);
        });
    });
});


