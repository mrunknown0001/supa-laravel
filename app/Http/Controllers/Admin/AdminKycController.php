<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminKycController extends Controller
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

        $totalUsers = $supabase->countUsersByKycStatus($status === 'all' ? null : $status);

        if ($perPage === 0) {
            // Show all
            $users = $supabase->getUsersWithKyc($filters, $totalUsers, 0);
        } else {
            $users = $supabase->getUsersWithKyc($filters, $perPage, ($page - 1) * $perPage);
        }

        $statusCounts = [
            'total' => $supabase->countUsers(),
            'pending' => $supabase->countUsersByKycStatus('pending'),
            'approved' => $supabase->countUsersByKycStatus('approved'),
            'rejected' => $supabase->countUsersByKycStatus('rejected'),
        ];

        $totals = $totalUsers;

        \Log::info('KYC Index Data', [
            'totalUsers' => $totalUsers,
            'usersCount' => count($users),
            'statusCounts' => $statusCounts,
            'filters' => $filters,
            'perPage' => $perPage,
            'page' => $page,
        ]);

        return Inertia::render('Admin/Kyc/Index', compact('users', 'statusCounts', 'totals', 'search', 'status', 'perPage', 'page'));
    }

    public function updateKycStatus(Request $request, $userId)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $supabase = app(SupabaseService::class);
        $supabase->updateKycStatus($userId, $request->status);

        return response()->json(['message' => 'KYC status updated successfully']);
    }
}