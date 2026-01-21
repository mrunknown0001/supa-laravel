<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    protected SupabaseService $supabase;

    public function __construct(SupabaseService $supabase)
    {
        $this->supabase = $supabase;
    }

    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $data = [
            'applications' => $this->supabase->countJobApplications(),
            'employees' => $this->supabase->countEmployees(),
            'video_requests' => 0,
            'active_orders' => $this->supabase->countTaskTemplates(),
            'kyc_checks' => $this->supabase->countKycUnderReview(),
            'total_balance' => $this->supabase->sumWorkerBalances(),
            'outstanding_payments' => 0,
        ];

        return view('admin.dashboard', $data);
    }
}