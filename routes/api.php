<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Product\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('guest')->group(function () {
    // Authentication routes
    Route::post('/auth/login',      [AuthController::class, 'login'])->name('api.auth.login');
    Route::post('/auth/register',   [AuthController::class, 'register'])->name('api.auth.register');
});

Route::middleware('auth:api')->group(function () {
    // Authentication routes
    Route::get('/users/me',         [AuthController::class, 'me'])->name('api.auth.me');
    Route::post('/auth/logout',     [AuthController::class, 'logout'])->name('api.auth.logout');
    Route::post('/auth/refresh',    [AuthController::class, 'refresh'])->name('api.auth.refresh');

    // Product routes
    Route::get('/products',         [ProductController::class, 'list'])->name('api.product');
    Route::post('/products',        [ProductController::class, 'store'])->name('api.product.store');
    Route::get('/products/{id}',    [ProductController::class, 'find'])->name('api.product.find');
    Route::put('/products/{id}',    [ProductController::class, 'update'])->name('api.product.update');
    Route::delete('/products/{id}', [ProductController::class, 'delete'])->name('api.product.delete');
});
