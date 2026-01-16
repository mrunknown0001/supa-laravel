<div class="w-full max-w-md mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ config('app.name', 'Laravel') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
            {{ __('Sign in to your account') }}
        </p>
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-6" :status="session('status')" />

    <!-- Login Form -->
    <form wire:submit.prevent="login" class="space-y-6">
        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email Address')" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" />
            <x-text-input
                wire:model="email"
                id="email"
                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                autofocus
                autocomplete="username"
            />
            <x-input-error :messages="$errors->get('email')" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>

        <!-- Password -->
        <div>
            <x-input-label for="password" :value="__('Password')" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" />
            <x-text-input
                wire:model="password"
                id="password"
                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
            />
            <x-input-error :messages="$errors->get('password')" class="mt-2 text-sm text-red-600 dark:text-red-400" />
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input
                    wire:model="remember"
                    id="remember_me"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                    name="remember"
                >
                <label for="remember_me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {{ __('Remember me') }}
                </label>
            </div>

            @if (Route::has('password.request'))
                <div class="text-sm">
                    <a href="{{ route('password.request') }}" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                        {{ __('Forgot your password?') }}
                    </a>
                </div>
            @endif
        </div>

        <!-- Login Error -->
        @if ($errors->has('login'))
            <div class="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <x-input-error :messages="$errors->get('login')" class="text-sm text-red-700 dark:text-red-300" />
                    </div>
                </div>
            </div>
        @endif

        <!-- Submit Button -->
        <div>
            <x-primary-button
                class="w-full flex items-center justify-center gap-2 py-2 px-4
                    rounded-md shadow-sm text-sm font-medium text-white
                    bg-indigo-600 hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    disabled:opacity-50 disabled:cursor-not-allowed transition"
                wire:loading.attr="disabled"
            >
                <span wire:loading.remove>
                    {{ __('Sign In') }}
                </span>

                <span wire:loading class="flex items-center gap-2">
                    <span>Signing in...</span>
                </span>
            </x-primary-button>
        </div>

    </form>

    <!-- Footer -->
    {{-- <div class="mt-8 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ __("Don't have an account?") }}
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                {{ __('Sign up') }}
            </a>
        </p>
    </div> --}}
</div>