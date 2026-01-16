<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'supabase_id',
        'name',
        'email',
        'email_verified_at',
        'first_name',
        'last_name',
        'date_of_birth',
        'nationality',
        'street',
        'postal_code',
        'city',
        'recipient_name',
        'iban',
        'bic',
        'tax_number',
        'social_security_number',
        'health_insurance',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'date_of_birth' => 'date',
        ];
    }

    /**
     * Load profile data from Supabase profiles table
     */
    public function loadProfileFromSupabase(): void
    {
        if ($this->supabase_id) {
            $supabaseService = app(\App\Services\SupabaseService::class);
            $profileData = $supabaseService->getUserProfile($this->supabase_id);

            if ($profileData) {
                // Map Supabase profile fields to user model attributes
                $this->fill([
                    'first_name' => $profileData['first_name'] ?? $this->first_name,
                    'last_name' => $profileData['last_name'] ?? $this->last_name,
                    'date_of_birth' => $profileData['date_of_birth'] ?? $this->date_of_birth,
                    'nationality' => $profileData['nationality'] ?? $this->nationality,
                    'street' => $profileData['street'] ?? $this->street,
                    'postal_code' => $profileData['postal_code'] ?? $this->postal_code,
                    'city' => $profileData['city'] ?? $this->city,
                    'recipient_name' => $profileData['recipient_name'] ?? $this->recipient_name,
                    'iban' => $profileData['iban'] ?? $this->iban,
                    'bic' => $profileData['bic'] ?? $this->bic,
                    'tax_number' => $profileData['tax_number'] ?? $this->tax_number,
                    'social_security_number' => $profileData['social_security_number'] ?? $this->social_security_number,
                    'health_insurance' => $profileData['health_insurance'] ?? $this->health_insurance,
                ]);
            }
        }
    }

    /**
     * Sync profile data to Supabase profiles table
     */
    public function syncProfileToSupabase(): bool
    {
        if ($this->supabase_id) {
            $supabaseService = app(\App\Services\SupabaseService::class);

            $profileData = [
                'id' => $this->supabase_id,
                'first_name' => $this->first_name,
                'last_name' => $this->last_name,
                'date_of_birth' => $this->date_of_birth,
                'nationality' => $this->nationality,
                'street' => $this->street,
                'postal_code' => $this->postal_code,
                'city' => $this->city,
                'recipient_name' => $this->recipient_name,
                'iban' => $this->iban,
                'bic' => $this->bic,
                'tax_number' => $this->tax_number,
                'social_security_number' => $this->social_security_number,
                'health_insurance' => $this->health_insurance,
                'updated_at' => now()->toISOString(),
            ];

            // Check if profile exists
            $existingProfile = $supabaseService->getUserProfile($this->supabase_id);

            if ($existingProfile) {
                return $supabaseService->updateUserProfile($this->supabase_id, $profileData);
            } else {
                return $supabaseService->createUserProfile($profileData);
            }
        }

        return false;
    }

    /**
     * Find or create a user from Supabase user data
     */
    public static function findOrCreateFromSupabase(array $supabaseUser): self
    {
        $user = self::where('supabase_id', $supabaseUser['id'])->first();

        if (!$user) {
            $user = self::create([
                'supabase_id' => $supabaseUser['id'],
                'name' => $supabaseUser['user_metadata']['name'] ?? $supabaseUser['email'] ?? '',
                'email' => $supabaseUser['email'],
                'email_verified_at' => $supabaseUser['email_confirmed_at'] ? now() : null,
            ]);
        } else {
            // Update user data if needed
            $user->update([
                'name' => $supabaseUser['user_metadata']['name'] ?? $user->name,
                'email' => $supabaseUser['email'],
                'email_verified_at' => $supabaseUser['email_confirmed_at'] ? now() : $user->email_verified_at,
            ]);
        }

        // Load profile data from Supabase
        $user->loadProfileFromSupabase();

        return $user;
    }
}
