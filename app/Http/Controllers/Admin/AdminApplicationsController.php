<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminApplicationsController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $search = $request->get('search', '');
        $status = $request->get('status', 'all');
        $perPage = (int) $request->get('perPage', 10);
        $page = (int) $request->get('page', 1);

        $supabase = app(SupabaseService::class);

        $filters = [
            'status' => $status,
            'search' => $search,
        ];

        $totalApplications = $supabase->countJobApplicationsByStatus($status === 'all' ? null : $status);

        if ($perPage === 0) {
            // Show all
            $applications = $supabase->getJobApplications($filters, $totalApplications, 0);
        } else {
            $applications = $supabase->getJobApplications($filters, $perPage, ($page - 1) * $perPage);
        }

        $statusCounts = [
            'total' => $supabase->countJobApplications(),
            'pending' => $supabase->countJobApplicationsByStatus('pending'),
            'approved' => $supabase->countJobApplicationsByStatus('approved'),
            'rejected' => $supabase->countJobApplicationsByStatus('rejected'),
        ];

        $totals = $totalApplications;

        return Inertia::render('Admin/Applications/Index', compact('applications', 'statusCounts', 'totals', 'search', 'status', 'perPage', 'page'));
    }
}