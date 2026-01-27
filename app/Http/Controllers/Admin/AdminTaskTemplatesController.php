<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTaskTemplatesController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $search = $request->get('search', '');
        $type = $request->get('type', 'all');
        $priority = $request->get('priority', 'all');
        $perPage = (int) $request->get('perPage', 10);
        $page = (int) $request->get('page', 1);

        $supabase = app(SupabaseService::class);

        $filters = [
            'type' => $type,
            'priority' => $priority,
            'search' => $search,
        ];

        $totalTaskTemplates = $supabase->countTaskTemplates();

        if ($perPage === 0) {
            // Show all
            $taskTemplates = $supabase->getTaskTemplates($filters, $totalTaskTemplates, 0);
        } else {
            $taskTemplates = $supabase->getTaskTemplates($filters, $perPage, ($page - 1) * $perPage);
        }

        $totals = $totalTaskTemplates;

        return Inertia::render('Admin/TaskTemplates/Index', compact('taskTemplates', 'totals', 'search', 'type', 'priority', 'perPage', 'page'));
    }
}