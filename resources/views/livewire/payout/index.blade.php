<div>
    <div class="py-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 shadow-xl sm:rounded-2xl overflow-hidden">
                <!-- Tab Navigation -->
                <div class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <nav class="flex space-x-8 px-6" aria-label="Tabs">
                        <button type="button"
                                onclick="showTab('overview')"
                                id="overview-tab"
                                class="tab-button active py-4 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600 dark:text-blue-400 transition-colors duration-200">
                            <div class="flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                                <span>Overview</span>
                            </div>
                        </button>

                        <button type="button"
                                onclick="showTab('transactions')"
                                id="transactions-tab"
                                class="tab-button py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                            <div class="flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <span>Transactions</span>
                            </div>
                        </button>

                        <button type="button"
                                onclick="showTab('withdrawals')"
                                id="withdrawals-tab"
                                class="tab-button py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                            <div class="flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                <span>Withdrawal Requests</span>
                            </div>
                        </button>
                    </nav>
                </div>

                <!-- Tab Content -->
                <div class="p-6 sm:p-8">
                    <!-- Overview Tab -->
                    <div id="overview-content" class="tab-content">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <!-- Current Balance -->
                            <div class="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg">
                                <div class="p-6">
                                    <div class="flex items-center mb-4">
                                        <div class="flex-shrink-0">
                                            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <h4 class="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Current Balance</h4>
                                    </div>

                                    @if($loading)
                                        <div class="animate-pulse">
                                            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                        </div>
                                    @elseif($workerBalance)
                                        <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                                            ${{ number_format($workerBalance['current_balance'] ?? 0, 2) }}
                                        </div>
                                    @else
                                        <p class="text-sm text-gray-600 dark:text-gray-400">N/A</p>
                                    @endif
                                </div>
                            </div>

                            <!-- Total Earned -->
                            <div class="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg">
                                <div class="p-6">
                                    <div class="flex items-center mb-4">
                                        <div class="flex-shrink-0">
                                            <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <h4 class="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Total Earned</h4>
                                    </div>

                                    @if($loading)
                                        <div class="animate-pulse">
                                            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                        </div>
                                    @elseif($workerBalance)
                                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            ${{ number_format($workerBalance['total_earned'] ?? 0, 2) }}
                                        </div>
                                    @else
                                        <p class="text-sm text-gray-600 dark:text-gray-400">N/A</p>
                                    @endif
                                </div>
                            </div>

                            <!-- Total Paid Out -->
                            <div class="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg">
                                <div class="p-6">
                                    <div class="flex items-center mb-4">
                                        <div class="flex-shrink-0">
                                            <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </div>
                                        <h4 class="ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Total Paid Out</h4>
                                    </div>

                                    @if($loading)
                                        <div class="animate-pulse">
                                            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                        </div>
                                    @elseif($workerBalance)
                                        <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                                            ${{ number_format($workerBalance['total_paid_out'] ?? 0, 2) }}
                                        </div>
                                    @else
                                        <p class="text-sm text-gray-600 dark:text-gray-400">N/A</p>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Transactions Tab -->
                    <div id="transactions-content" class="tab-content hidden">
                        <div class="text-center py-12">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Transactions</h3>
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Transaction data will be displayed here.</p>
                        </div>
                    </div>

                    <!-- Withdrawal Requests Tab -->
                    <div id="withdrawals-content" class="tab-content hidden">
                        @if($loading)
                            <div class="text-center py-12">
                                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading withdrawal requests...</p>
                            </div>
                        @else
                            @if(count($payoutRequests) > 0)
                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead class="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Requested At
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            @foreach($payoutRequests as $request)
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        ${{ number_format($request['amount'], 2) }}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $this->getStatusBadgeClass($request['status']) }}">
                                                            {{ ucfirst($request['status']) }}
                                                        </span>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                        {{ \Carbon\Carbon::parse($request['requested_at'])->format('M j, Y g:i A') }}
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            @else
                                <div class="text-center py-12">
                                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No withdrawal requests</h3>
                                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">You haven't submitted any withdrawal requests yet.</p>
                                </div>
                            @endif
                        @endif
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
            showTab('overview');
        });
    </script>
</div>