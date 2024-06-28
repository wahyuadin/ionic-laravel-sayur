<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;


// Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('homepage');
Route::get('/', function () {
    if (auth::user()) {
        if (Auth::user()->is_admin == 0) {
            return response()->json(['error' => true, 'data' => 'user tidak dapat di akses di web']);
        } else {
            return redirect('/admin/dashboard');
        }
    } else {
        return redirect('/login');
    }
});
Route::get('/shop/{slug?}', [\App\Http\Controllers\ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/tag/{slug?}', [\App\Http\Controllers\ShopController::class, 'tag'])->name('shop.tag');
Route::get('/product/{product:slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('product.show');

// react route
Route::get('products/{slug?}', [\App\Http\Controllers\ShopController::class, 'getProducts']);
Route::get('products', [\App\Http\Controllers\HomeController::class, 'getProducts']);
Route::get('product-detail/{product:slug}', [\App\Http\Controllers\ProductController::class, 'getProductDetail']);
Route::post('carts', [\App\Http\Controllers\CartController::class, 'store']);
Route::get('carts', [\App\Http\Controllers\CartController::class, 'showCart']);
// ongkir
Route::get('api/provinces', [\App\Http\Controllers\OngkirController::class, 'getProvinces']);
Route::get('api/cities', [\App\Http\Controllers\OngkirController::class, 'cities']);
Route::get('api/shipping-cost', [\App\Http\Controllers\OngkirController::class, 'shippingCost']);
Route::post('api/set-shipping', [\App\Http\Controllers\OngkirController::class, 'setShipping']);
Route::post('api/checkout', [\App\Http\Controllers\OrderController::class, 'checkout']);
// get user login
Route::get('api/users', [\App\Http\Controllers\UserController::class, 'index']);
// ==========


Route::group(['middleware' => 'auth'], function() {

    Route::get('/order/checkout', [\App\Http\Controllers\OrderController::class, 'process'])->name('checkout.process');
    Route::resource('/cart', \App\Http\Controllers\CartController::class)->except(['store', 'show']);

    Route::group(['middleware' => ['isAdmin'],'prefix' => 'admin', 'as' => 'admin.'], function() {
        Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

        // categories
        Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
        Route::post('categories/images', [\App\Http\Controllers\Admin\CategoryController::class,'storeImage'])->name('categories.storeImage');

        // tags
        Route::resource('tags', \App\Http\Controllers\Admin\TagController::class);

        // products
        Route::resource('products', \App\Http\Controllers\Admin\ProductController::class);
        Route::post('products/images', [\App\Http\Controllers\Admin\ProductController::class,'storeImage'])->name('products.storeImage');
        Route::prefix('order')->group(function () {
            Route::get('/', [OrderController::class, 'show']);
            Route::put('/accept/{id}', [OrderController::class,'accept']);
            Route::delete('/reject/{id}', [OrderController::class,'reject']);
        });
    });
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
