<?php

use App\Http\Controllers\Admin\AdminApplicationsController;
use App\Http\Controllers\Admin\AdminEmployeesController;
use App\Http\Controllers\Admin\AdminKycController;
use App\Http\Controllers\Admin\AdminSettingsController;
use App\Http\Controllers\Admin\AdminTaskTemplatesController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PayoutController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);

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
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/applications', [AdminApplicationsController::class, 'index'])->middleware(['auth'])->name('admin.applications');
    Route::get('/admin/employees', [AdminEmployeesController::class, 'index'])->middleware(['auth'])->name('admin.employees');
    Route::get('/admin/task-templates', [AdminTaskTemplatesController::class, 'index'])->middleware(['auth'])->name('admin.task-templates');
    Route::get('/admin/kyc', [AdminKycController::class, 'index'])->middleware(['auth'])->name('admin.kyc');
    Route::post('/admin/kyc/{userId}/update-status', [AdminKycController::class, 'updateKycStatus'])->middleware(['auth'])->name('admin.kyc.update-status');
    Route::get('/admin/settings', [AdminSettingsController::class, 'index'])->middleware(['auth'])->name('admin.settings');
    Route::post('/admin/settings', [AdminSettingsController::class, 'update'])->middleware(['auth'])->name('admin.settings.update');

    Route::get('/payout', [PayoutController::class, 'index'])->name('payout');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/password', [ProfileController::class, 'changePassword'])->name('password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

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
        return redirect('/login');
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
