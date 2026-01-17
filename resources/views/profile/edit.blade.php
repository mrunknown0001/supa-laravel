<x-app-layout>
    <div class="py-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 shadow-xl sm:rounded-2xl overflow-hidden">
                <!-- Tab Navigation -->
                <div class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <nav class="flex space-x-8 px-6" aria-label="Tabs">
                        <button type="button"
                                onclick="showTab('profile')"
                                id="profile-tab"
                                class="tab-button active py-4 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600 dark:text-blue-400 transition-colors duration-200">
                            <div class="flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span>Profile Information</span>
                            </div>
                        </button>

                        <button type="button"
                                onclick="showTab('security')"
                                id="security-tab"
                                class="tab-button py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                            <div class="flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                <span>Security</span>
                            </div>
                        </button>

                        <button type="button"
                                onclick="showTab('danger')"
                                id="danger-tab"
                                class="tab-button py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                            <div class="flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                <span>Danger Zone</span>
                            </div>
                        </button>
                    </nav>
                </div>

                <!-- Tab Content -->
                <div class="p-6 sm:p-8">
                    <!-- Profile Information Tab -->
                    <div id="profile-content" class="tab-content">
                        @include('profile.partials.update-profile-information-form')
                    </div>

                    <!-- Security Tab -->
                    <div id="security-content" class="tab-content hidden">
                        @include('profile.partials.update-password-form')
                    </div>

                    <!-- Danger Zone Tab -->
                    <div id="danger-content" class="tab-content hidden">
                        @include('profile.partials.delete-user-form')
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showTab(tabName) {
            // Hide all tab contents with fade effect
            document.querySelectorAll('.tab-content').forEach(content => {
                if (!content.classList.contains('hidden')) {
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.classList.add('hidden');
                        content.style.opacity = '1';
                    }, 150);
                }
            });

            // Remove active state from all tabs
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
                button.classList.add('border-transparent', 'text-gray-500', 'dark:text-gray-400');
            });

            // Show selected tab content with fade effect
            setTimeout(() => {
                document.getElementById(tabName + '-content').classList.remove('hidden');
            }, 150);

            // Activate selected tab
            document.getElementById(tabName + '-tab').classList.add('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
            document.getElementById(tabName + '-tab').classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
        }

        // Initialize first tab on page load
        document.addEventListener('DOMContentLoaded', function() {
            showTab('profile');
        });
    </script>
</x-app-layout>
