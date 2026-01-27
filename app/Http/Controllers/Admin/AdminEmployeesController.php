<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminEmployeesController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $search = $request->get('search', '');
        $role = $request->get('role', 'all');
        $status = $request->get('status', 'all');
        $perPage = (int) $request->get('perPage', 10);
        $page = (int) $request->get('page', 1);

        $supabase = app(SupabaseService::class);

        $filters = [
            'role' => $role,
            'status' => $status,
            'search' => $search,
        ];

        $totalEmployees = $supabase->countProfiles($filters);

        if ($perPage === 0) {
            // Show all
            $profiles = $supabase->getProfiles($filters, $totalEmployees, 0);
        } else {
            $profiles = $supabase->getProfiles($filters, $perPage, ($page - 1) * $perPage);
        }

        // Get worker ids
        $workerIds = array_column($profiles, 'id');

        // Get balances for these workers
        $balances = [];
        if (!empty($workerIds)) {
            $balances = $supabase->getWorkerBalances($workerIds);
        }

        // Map balances by worker_id
        $balanceMap = [];
        foreach ($balances as $balance) {
            $balanceMap[$balance['worker_id']] = $balance;
        }

        // Add balance and email to profiles
        foreach ($profiles as &$profile) {
            $profile['credit'] = $balanceMap[$profile['id']]['current_balance'] ?? 0;
            // Determine status
            $profile['status'] = empty($profile['banned_until']) ? 'active' : 'inactive';
            // Get email from auth
            $profile['email'] = $supabase->getUserEmail($profile['id']) ?? $profile['email'];
        }

        return Inertia::render('Admin/Employees/Index', compact('profiles', 'totalEmployees', 'search', 'role', 'status', 'perPage', 'page'));
    }
}