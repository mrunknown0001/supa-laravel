<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayoutController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $payoutRequests = [];
        $workerBalance = null;

        if ($user && $user->supabase_id) {
            $supabaseService = app(SupabaseService::class);
            $payoutRequests = $supabaseService->getPayoutRequests($user->supabase_id);
            $workerBalance = $supabaseService->getWorkerBalance($user->supabase_id);
        }

        return Inertia::render('Payout/Index', compact('payoutRequests', 'workerBalance'));
    }
}