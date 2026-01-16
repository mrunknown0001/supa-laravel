<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('supabase.auth');

// Auth routes for Supabase
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('supabase.auth');
Route::post('/auth/refresh', [AuthController::class, 'refresh']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);