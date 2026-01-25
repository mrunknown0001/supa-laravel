<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class OptimizeApp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'optimize:app';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize the application by clearing compiled classes, routes, configuration, and views';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('optimize:clear');
        $this->call('optimize');
        // $this->call('route:cache');
        // $this->call('config:cache');
        // $this->call('view:cache');
        $this->info('Application optimized successfully!');
    }
}
