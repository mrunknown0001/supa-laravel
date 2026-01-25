<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleBasedRedirect
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // public function handle(Request $request, Closure $next): Response
    // {
    //     if (Auth::check()) {
    //         $user = Auth::user();

    //         // Load profile if not already loaded
    //         if (!$user->role) {
    //             $user->loadProfileFromSupabase();
    //         }

    //         // Only enforce redirection for dashboard and admin routes
    //         if ($request->is('admin*')) {
    //             if ($user->role !== 'admin') {
    //                 return redirect('/dashboard');
    //             }
    //         } elseif ($request->is('dashboard*')) {
    //             if ($user->role === 'admin') {
    //                 return redirect('/admin');
    //             }
    //         }
    //     }

    //     return $next($request);
    // }
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();
            if (!$user->role) {
                $user->loadProfileFromSupabase();
            }

            $isAjax = $request->ajax() || $request->header('X-Livewire') || $request->header('X-Inertia');

            if ($request->is('admin*')) {
                if ($user->role !== 'admin') {
                    if ($isAjax) {
                        return response()->json(['error' => 'Unauthorized', 'redirect' => '/dashboard'], 403);
                    }
                    return redirect('/dashboard');
                }
            } elseif ($request->is('dashboard*')) {
                if ($user->role === 'admin') {
                    if ($isAjax) {
                        return response()->json(['error' => 'Unauthorized', 'redirect' => '/admin'], 403);
                    }
                    return redirect('/admin');
                }
            }
        }

        return $next($request);
    }

}