<section>
    <div class="flex items-center space-x-3 mb-6">
        <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
            </div>
        </div>
        <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {{ __('Change Password') }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ __('Keep your account secure with a strong password.') }}
            </p>
        </div>
    </div>

    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
        <form method="post" action="{{ route('password.update') }}" class="space-y-6">
            @csrf
            @method('put')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <x-input-label for="update_password_password" :value="__('New Password')" />
                    <x-text-input id="update_password_password" name="password" type="password" class="mt-1 block w-full" autocomplete="new-password" />
                    <x-input-error :messages="$errors->updatePassword->get('password')" class="mt-2" />
                </div>

                <div>
                    <x-input-label for="update_password_password_confirmation" :value="__('Confirm New Password')" />
                    <x-text-input id="update_password_password_confirmation" name="password_confirmation" type="password" class="mt-1 block w-full" autocomplete="new-password" />
                    <x-input-error :messages="$errors->updatePassword->get('password_confirmation')" class="mt-2" />
                </div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ __('Password must be at least 8 characters long.') }}
                </p>

                <div class="flex items-center space-x-4">
                    <x-primary-button>{{ __('Update Password') }}</x-primary-button>

                    @if (session('status') === 'password-updated')
                        <div
                            x-data="{ show: true }"
                            x-show="show"
                            x-transition
                            x-init="setTimeout(() => show = false, 3000)"
                            class="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{{ __('Password updated successfully!') }}</span>
                        </div>
                    @endif
                </div>
            </div>
        </form>
    </div>
</section>
