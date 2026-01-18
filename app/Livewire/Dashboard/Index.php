<?php

namespace App\Livewire\Dashboard;

use App\Services\SupabaseAuthService;
use App\Services\SupabaseService;
use Livewire\Component;

class Index extends Component
{
    public $user;
    public $userDetails;
    public $workerBalance;
    public $loading = true;

    public function mount()
    {
        $this->loadUserData();
    }

    public function loadUserData()
    {
        $this->loading = true;

        try {
            $this->user = auth()->user();

            // Get detailed user info from Supabase
            $accessToken = session('supabase_access_token');
            if ($accessToken) {
                $supabaseAuth = app(SupabaseAuthService::class);
                $this->userDetails = $supabaseAuth->getUser($accessToken);
            }

            // Get worker balance from Supabase
            if ($this->user && $this->user->supabase_id) {
                $supabaseService = app(SupabaseService::class);
                $this->workerBalance = $supabaseService->getWorkerBalance($this->user->supabase_id);
            }
        } catch (\Exception $e) {
            $this->userDetails = null;
            $this->workerBalance = null;
        } finally {
            $this->loading = false;
        }
    }

    public function refreshUserData()
    {
        $this->loadUserData();
        $this->dispatch('user-data-refreshed');
    }

    public function render()
    {
        return view('livewire.dashboard.index')->layout('layouts.app');
    }
}