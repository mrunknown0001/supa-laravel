<div>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <!-- Welcome Section -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold">Welcome back!</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                You're logged in as {{ $user->name ?? $user->email }}
                            </p>
                        </div>
                        <button
                            wire:click="refreshUserData"
                            class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            wire:loading.attr="disabled"
                        >
                            <span wire:loading.remove>
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                Refresh
                            </span>
                            <span wire:loading>
                                <svg class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Refreshing...
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- User Details Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Laravel User Info -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Laravel User Information</h4>

                        @if($loading)
                            <div class="animate-pulse">
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                            </div>
                        @else
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Name:</span>
                                    <span class="text-sm text-gray-900 dark:text-gray-100">{{ $user->name ?? 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Email:</span>
                                    <span class="text-sm text-gray-900 dark:text-gray-100">{{ $user->email }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Supabase ID:</span>
                                    <span class="text-sm text-gray-900 dark:text-gray-100 font-mono">{{ $user->supabase_id ?? 'N/A' }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Joined:</span>
                                    <span class="text-sm text-gray-900 dark:text-gray-100">{{ $user->created_at->format('M j, Y') }}</span>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Supabase User Details -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Supabase User Details</h4>

                        @if($loading)
                            <div class="animate-pulse">
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                            </div>
                        @elseif($userDetails)
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">User ID:</span>
                                    <span class="text-sm text-gray-900 dark:text-gray-100 font-mono">{{ substr($userDetails['id'], 0, 8) }}...</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Email Confirmed:</span>
                                    <span class="text-sm text-gray-900 dark:text-gray-100">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {{ $userDetails['email_confirmed_at'] ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }}">
                                            {{ $userDetails['email_confirmed_at'] ? 'Yes' : 'No' }}
                                        </span>
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Last Sign In:</span>
                                    <span class="text-sm text-gray-900 dark:text-gray-100">
                                        {{ $userDetails['last_sign_in_at'] ? \Carbon\Carbon::parse($userDetails['last_sign_in_at'])->format('M j, Y H:i') : 'N/A' }}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Created:</span>
                                    <span class="text-sm text-gray-900 dark:text-gray-100">
                                        {{ \Carbon\Carbon::parse($userDetails['created_at'])->format('M j, Y') }}
                                    </span>
                                </div>
                            </div>
                        @else
                            <p class="text-sm text-gray-600 dark:text-gray-400">Unable to load Supabase user details</p>
                        @endif
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h4>
                    <div class="flex flex-wrap gap-3">
                        <a href="{{ route('profile.edit') }}"
                           class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                            Edit Profile
                        </a>
                        <a href="{{ route('logout') }}"
                           onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                           class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                            Logout
                        </a>
                    </div>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
                        @csrf
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Alpine.js powered notification -->
    <div x-data="{ show: false }"
         x-show="show"
         x-transition
         @user-data-refreshed.window="show = true; setTimeout(() => show = false, 3000)"
         class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
        User data refreshed successfully!
    </div>
</div>