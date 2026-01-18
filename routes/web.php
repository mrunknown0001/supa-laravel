<?php

use App\Http\Controllers\ProfileController;
use App\Livewire\Auth\Login;
use App\Livewire\Payout\Index as PayoutIndex;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', Login::class)->name('login');

    // Password Reset Routes
    Route::get('/forgot-password', [\App\Http\Controllers\Auth\PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('/forgot-password', [\App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('/reset-password/{token}', [\App\Http\Controllers\Auth\NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('/reset-password', [\App\Http\Controllers\Auth\NewPasswordController::class, 'store'])
        ->name('password.store');

    // Registration Routes (if needed)
    Route::get('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->middleware('role.redirect')->name('dashboard');

    Route::get('/admin', function () {
        return view('admin.dashboard');
    })->middleware('role.redirect')->name('admin.dashboard');

    Route::get('/payout', function () {
        return view('payout');
    })->name('payout');

    Route::get('/profile', function () {
        $user = auth()->user();
        $user->loadProfileFromSupabase();
        return view('profile.edit', ['user' => $user]);
    })->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::put('/password', [\App\Http\Controllers\Auth\PasswordController::class, 'update'])->name('password.update');

    Route::get('/confirm-password', [\App\Http\Controllers\Auth\ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('/confirm-password', [\App\Http\Controllers\Auth\ConfirmablePasswordController::class, 'store']);

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

Route::get('/settings', function () {
    return response()->json([
        'data' => Supabase::getSettings(),
    ]);
});

Route::get('/get-profile', function () {
    return response()->json([
        'data' => Supabase::getUserProfile(auth()->user()->supabase_id),
        'supabase_id' => auth()->user()->supabase_id
    ]);
});

// Email Verification Routes
Route::middleware('auth')->group(function () {
    Route::get('/email/verify', [\App\Http\Controllers\Auth\EmailVerificationPromptController::class, '__invoke'])
        ->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', [\App\Http\Controllers\Auth\VerifyEmailController::class, '__invoke'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/email/verification-notification', [\App\Http\Controllers\Auth\EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
});
