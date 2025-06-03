<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Product\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',                 [LoginController::class, 'index'])->name('home');
Route::get('/auth/login',       [LoginController::class, 'index'])->name('auth.login');
Route::get('/auth/register',    [RegisterController::class, 'index'])->name('auth.register');
Route::get('/products',         [ProductController::class, 'index'])->name('product');
