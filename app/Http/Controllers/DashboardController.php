<?php

namespace App\Http\Controllers;

use App\Services\SupabaseAuthService;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        Log::info('Dashboard controller called');
        $user = auth()->user();
        Log::info('User authenticated', ['user_id' => $user ? $user->id : null]);

        $userDetails = null;
        $workerBalance = null;

        try {
            // Get detailed user info from Supabase
            $accessToken = session('supabase_access_token');
            Log::info('Access token present', ['has_token' => !is_null($accessToken)]);
            if ($accessToken) {
                $supabaseAuth = app(SupabaseAuthService::class);
                $userDetails = $supabaseAuth->getUser($accessToken);
                Log::info('User details fetched', ['user_details' => $userDetails]);
            }

            // Get worker balance from Supabase
            if ($user && $user->supabase_id) {
                $supabaseService = app(SupabaseService::class);
                $workerBalance = $supabaseService->getWorkerBalance($user->supabase_id);
                Log::info('Worker balance fetched', ['balance' => $workerBalance]);
            }
        } catch (\Exception $e) {
            Log::error('Exception in dashboard data fetch', ['error' => $e->getMessage()]);
            // Handle exceptions gracefully
            $userDetails = null;
            $workerBalance = null;
        }

        Log::info('Dashboard data prepared', compact('user', 'userDetails', 'workerBalance'));
        Log::info('Rendering Inertia view Dashboard/Index');
        return Inertia::render('Dashboard/Index', ['dashboard' => compact('user', 'userDetails', 'workerBalance')]);
    }
}