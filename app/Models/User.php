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
        ];
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

        return $user;
    }
}
