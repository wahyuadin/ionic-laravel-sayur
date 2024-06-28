<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_id')->constrained()->cascadeOnDelete();
            $table->foreignId('products_id')->constrained()->cascadeOnDelete();
            $table->string('nama')->nullable();
            $table->string('harga')->nullable();
            $table->string('quantiti')->default('1');
            $table->string('jumlah')->nullable();
            $table->enum('status', [0,1,2])->default(2);
            $table->string('show')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
};
