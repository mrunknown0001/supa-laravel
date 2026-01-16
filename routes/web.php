<?php

use App\Http\Controllers\ProfileController;
use App\Livewire\Auth\Login;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', Login::class)->name('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/logout', function () {
        // Handle logout via Supabase
        $token = session('supabase_access_token');
        if ($token) {
            app(\App\Services\SupabaseAuthService::class)->signOut($token);
        }
        auth()->logout();
        session()->invalidate();
        session()->regenerateToken();
        return redirect('/');
    })->name('logout');
});
