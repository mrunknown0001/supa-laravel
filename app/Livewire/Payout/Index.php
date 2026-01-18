<?php

namespace App\Livewire\Payout;

use App\Services\SupabaseService;
use Livewire\Component;

class Index extends Component
{
    public $payoutRequests = [];
    public $workerBalance;
    public $loading = true;

    public function mount()
    {
        $this->loadData();
    }

    public function loadData()
    {
        $this->loading = true;

        try {
            $user = auth()->user();
            if ($user && $user->supabase_id) {
                $supabaseService = app(SupabaseService::class);
                $this->payoutRequests = $supabaseService->getPayoutRequests($user->supabase_id);
                $this->workerBalance = $supabaseService->getWorkerBalance($user->supabase_id);
            }
        } catch (\Exception $e) {
            $this->payoutRequests = [];
            $this->workerBalance = null;
        } finally {
            $this->loading = false;
        }
    }

    public function getStatusBadgeClass($status)
    {
        return match (strtolower($status)) {
            'approved' => 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            'pending' => 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            'rejected' => 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            default => 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        };
    }

    public function render()
    {
        return view('livewire.payout.index')->layout('layouts.app');
    }
}