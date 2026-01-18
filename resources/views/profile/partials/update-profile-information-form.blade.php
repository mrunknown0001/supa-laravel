<section>
    <div class="flex items-center space-x-3 mb-6">
        <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
            </div>
        </div>
        <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {{ __('Profile Information') }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ __("Update your account's profile information and email address.") }}
            </p>
        </div>
    </div>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-8">
        @csrf
        @method('patch')

        <!-- Basic Information -->
        <div class="space-y-6">
            <div class="flex items-center space-x-2">
                <div class="flex-shrink-0 w-5 h-5 rounded bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Information</h3>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="md:col-span-2">
                        <x-input-label for="name" :value="__('Name')" />
                        <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', auth()->user()->name)" required autofocus autocomplete="name" />
                        <x-input-error class="mt-2" :messages="$errors->get('name')" />
                    </div>

                    <div class="md:col-span-2">
                        <x-input-label for="email" :value="__('Email')" />
                        <x-text-input id="email" name="email" type="email" class="mt-1 block w-full" :value="old('email', auth()->user()->email)" required autocomplete="username" />
                        <x-input-error class="mt-2" :messages="$errors->get('email')" />

                        @if (auth()->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! auth()->user()->hasVerifiedEmail())
                            <div>
                                <p class="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                    {{ __('Your email address is unverified.') }}

                                    <button form="send-verification" class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                                        {{ __('Click here to re-send the verification email.') }}
                                    </button>
                                </p>

                                @if (session('status') === 'verification-link-sent')
                                    <p class="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                        {{ __('A new verification link has been sent to your email address.') }}
                                    </p>
                                @endif
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <!-- Profile Information -->
        <div class="space-y-6">
            <div class="flex items-center space-x-2">
                <div class="flex-shrink-0 w-5 h-5 rounded bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Personal Information</h3>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <x-input-label for="first_name" :value="__('First Name')" />
                    <x-text-input id="first_name" name="first_name" type="text" class="mt-1 block w-full" :value="old('first_name', auth()->user()->first_name)" autocomplete="given-name" />
                    <x-input-error class="mt-2" :messages="$errors->get('first_name')" />
                </div>

                <div>
                    <x-input-label for="last_name" :value="__('Last Name')" />
                    <x-text-input id="last_name" name="last_name" type="text" class="mt-1 block w-full" :value="old('last_name', auth()->user()->last_name)" autocomplete="family-name" />
                    <x-input-error class="mt-2" :messages="$errors->get('last_name')" />
                </div>

                <div>
                    <x-input-label for="date_of_birth" :value="__('Date of Birth')" />
                    <x-text-input id="date_of_birth" name="date_of_birth" type="date" class="mt-1 block w-full" :value="old('date_of_birth', auth()->user()->date_of_birth?->format('Y-m-d'))" />
                    <x-input-error class="mt-2" :messages="$errors->get('date_of_birth')" />
                </div>

                <div>
                    <x-input-label for="nationality" :value="__('Nationality')" />
                    <x-text-input id="nationality" name="nationality" type="text" class="mt-1 block w-full" :value="old('nationality', auth()->user()->nationality)" />
                    <x-input-error class="mt-2" :messages="$errors->get('nationality')" />
                </div>
            </div>
        </div>

        <!-- Address -->
        <div class="space-y-6">
            <div class="flex items-center space-x-2">
                <div class="flex-shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Address</h3>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                    <x-input-label for="street" :value="__('Street')" />
                    <x-text-input id="street" name="street" type="text" class="mt-1 block w-full" :value="old('street', auth()->user()->street)" autocomplete="address-line1" />
                    <x-input-error class="mt-2" :messages="$errors->get('street')" />
                </div>

                <div>
                    <x-input-label for="postal_code" :value="__('Postal Code')" />
                    <x-text-input id="postal_code" name="postal_code" type="text" class="mt-1 block w-full" :value="old('postal_code', auth()->user()->postal_code)" autocomplete="postal-code" />
                    <x-input-error class="mt-2" :messages="$errors->get('postal_code')" />
                </div>

                <div>
                    <x-input-label for="city" :value="__('City')" />
                    <x-text-input id="city" name="city" type="text" class="mt-1 block w-full" :value="old('city', auth()->user()->city)" autocomplete="address-level2" />
                    <x-input-error class="mt-2" :messages="$errors->get('city')" />
                </div>
            </div>
        </div>

        <!-- Financial Data -->
        @if(auth()->user()->role !== 'admin')
        <div class="space-y-6">
            <div class="flex items-center space-x-2">
                <div class="flex-shrink-0 w-5 h-5 rounded bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Financial Data</h3>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                    <x-input-label for="recipient_name" :value="__('Recipient Name')" />
                    <x-text-input id="recipient_name" name="recipient_name" type="text" class="mt-1 block w-full" :value="old('recipient_name', auth()->user()->recipient_name)" />
                    <x-input-error class="mt-2" :messages="$errors->get('recipient_name')" />
                </div>

                <div>
                    <x-input-label for="iban" :value="__('IBAN')" />
                    <x-text-input id="iban" name="iban" type="text" class="mt-1 block w-full" :value="old('iban', auth()->user()->iban)" />
                    <x-input-error class="mt-2" :messages="$errors->get('iban')" />
                </div>

                <div>
                    <x-input-label for="bic" :value="__('BIC')" />
                    <x-text-input id="bic" name="bic" type="text" class="mt-1 block w-full" :value="old('bic', auth()->user()->bic)" />
                    <x-input-error class="mt-2" :messages="$errors->get('bic')" />
                </div>
            </div>
        </div>
        @endif

        <!-- Payroll -->
        @if(auth()->user()->role !== 'admin')
        <div class="space-y-6">
            <div class="flex items-center space-x-2">
                <div class="flex-shrink-0 w-5 h-5 rounded bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Payroll</h3>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <x-input-label for="tax_number" :value="__('Tax Number')" />
                    <x-text-input id="tax_number" name="tax_number" type="text" class="mt-1 block w-full" :value="old('tax_number', auth()->user()->tax_number)" />
                    <x-input-error class="mt-2" :messages="$errors->get('tax_number')" />
                </div>

                <div>
                    <x-input-label for="social_security_number" :value="__('Social Security Number')" />
                    <x-text-input id="social_security_number" name="social_security_number" type="text" class="mt-1 block w-full" :value="old('social_security_number', auth()->user()->social_security_number)" />
                    <x-input-error class="mt-2" :messages="$errors->get('social_security_number')" />
                </div>

                <div class="md:col-span-2">
                    <x-input-label for="health_insurance" :value="__('Health Insurance')" />
                    <x-text-input id="health_insurance" name="health_insurance" type="text" class="mt-1 block w-full" :value="old('health_insurance', auth()->user()->health_insurance)" />
                    <x-input-error class="mt-2" :messages="$errors->get('health_insurance')" />
                </div>
            </div>
            </div>
        </div>
        @endif

        <div class="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <x-primary-button>{{ __('Save') }}</x-primary-button>

            @if (session('status') === 'profile-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400"
                >{{ __('Saved.') }}</p>
            @endif
        </div>
    </form>
</section>
