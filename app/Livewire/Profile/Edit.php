<?php

namespace App\Livewire\Profile;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Livewire\Component;

class Edit extends Component
{
    public $user;

    public function mount()
    {
        $this->user = auth()->user();

        // Load profile data from Supabase to ensure we have the latest data
        $this->user->loadProfileFromSupabase();
    }

    public function updateProfile()
    {
        // This will be handled by the form submission to the controller
        // For Livewire, we can redirect or handle here
    }

    public function deleteUser()
    {
        // Similar
    }

    public function render()
    {
        return view('profile.edit', [
            'user' => $this->user,
        ])->layout('layouts.app');
    }
}