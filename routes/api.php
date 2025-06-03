<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
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
    Route::post('/auth/register',   [AuthController::class, 'register'])->name('api.auth.register');
    Route::post('/auth/login',      [AuthController::class, 'login'])->name('api.auth.login');
});

Route::middleware('auth')->group(function () {
    Route::post('/auth/logout',     [AuthController::class, 'logout'])
        ->middleware('auth:api')
        ->name('api.auth.logout');
    Route::post('/auth/refresh',    [AuthController::class, 'refresh'])
        ->middleware('auth:api')
        ->name('api.auth.refresh');

    Route::patch('/users/me',       [ProfileController::class, 'update'])->name('api.profile.update');
    Route::delete('/users/me',      [ProfileController::class, 'destroy'])->name('api.profile.destroy');
});
