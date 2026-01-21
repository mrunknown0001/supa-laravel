<?php

namespace App\Livewire\Admin;

use App\Services\SupabaseService;
use Livewire\Component;
use Livewire\WithPagination;

class Applications extends Component
{
    use WithPagination;

    public $search = '';
    public $status = 'all';
    public $perPage = 10;

    protected $queryString = [
        'search' => ['except' => ''],
        'status' => ['except' => 'all'],
        'perPage' => ['except' => 10],
    ];

    public function mount()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
    }

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function updatingStatus()
    {
        $this->resetPage();
    }

    public function updatingPerPage()
    {
        $this->resetPage();
    }

    public function render()
    {
        $supabase = app(SupabaseService::class);

        $filters = [
            'status' => $this->status,
            'search' => $this->search,
        ];

        $totalApplications = $supabase->countJobApplicationsByStatus($this->status === 'all' ? null : $this->status);

        if ($this->perPage === 0) {
            // Show all
            $applications = $supabase->getJobApplications($filters, $totalApplications, 0);
        } else {
            $applications = $supabase->getJobApplications($filters, $this->perPage, ($this->getPage() - 1) * $this->perPage);
        }

        return view('livewire.admin.applications', [
            'applications' => $applications,
            'total_count' => $supabase->countJobApplications(),
            'pending_count' => $supabase->countJobApplicationsByStatus('pending'),
            'approved_count' => $supabase->countJobApplicationsByStatus('approved'),
            'rejected_count' => $supabase->countJobApplicationsByStatus('rejected'),
            'total' => $totalApplications,
        ]);
    }
}