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
        Schema::create('user_product', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('product_id');
            $table->timestamps();

            // Composite key setup
            $table->primary(['user_id', 'product_id']);

            // Reference constraint on user
            $table->foreign('user_id')
                ->references('user_id')
                ->on('user')
                ->onDelete('cascade');

            // Reference constraint on product
            $table->foreign('product_id')
                ->references('product_id')
                ->on('product')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_product');
    }
};
