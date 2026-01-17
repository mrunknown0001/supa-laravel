<?php

namespace App\Livewire\Payout;

use App\Services\SupabaseService;
use Livewire\Component;

class Index extends Component
{
    public $user;
    public $workerBalance;
    public $payoutRequests = [];
    public $loading = true;
    public $activeTab = 'overview';

    public function mount()
    {
        $this->loadData();
    }

    public function loadData()
    {
        $this->loading = true;

        try {
            $this->user = auth()->user();

            // Get worker balance from Supabase
            if ($this->user && $this->user->supabase_id) {
                $supabaseService = app(SupabaseService::class);
                $this->workerBalance = $supabaseService->getWorkerBalance($this->user->supabase_id);
                $this->payoutRequests = $supabaseService->getPayoutRequests($this->user->supabase_id);
            }
        } catch (\Exception $e) {
            $this->workerBalance = null;
            $this->payoutRequests = [];
        } finally {
            $this->loading = false;
        }
    }

    public function setActiveTab($tab)
    {
        $this->activeTab = $tab;
    }

    public function refreshData()
    {
        $this->loadData();
        $this->dispatch('data-refreshed');
    }

    public function render()
    {
        return view('livewire.payout.index');
    }
}