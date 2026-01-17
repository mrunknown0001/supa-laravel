<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Profile Information
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('nationality')->nullable();

            // Address
            $table->string('street')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('city')->nullable();

            // Financial Data
            $table->string('recipient_name')->nullable();
            $table->string('iban')->nullable();
            $table->string('bic')->nullable();

            // Payroll
            $table->string('tax_number')->nullable();
            $table->string('social_security_number')->nullable();
            $table->string('health_insurance')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Profile Information
            $table->dropColumn([
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
                'health_insurance'
            ]);
        });
    }
};
