<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('iku', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->foreignId('unit_kerja_id')->constrained('unit_kerja')->onDelete('cascade');
            $table->string('formula')->nullable();
            $table->string('satuan');
            $table->decimal('baseline', 10, 2)->nullable();
            $table->decimal('target_tahunan', 10, 2);
            $table->decimal('target_bulanan', 10, 2)->nullable();
            $table->decimal('target_triwulan', 10, 2)->nullable();
            $table->decimal('target_semester', 10, 2)->nullable();
            $table->integer('bobot')->default(0);
            $table->boolean('is_active')->default(true);
            $table->integer('tahun');
            $table->timestamps();
            $table->softDeletes();
            $table->index(['kode', 'unit_kerja_id', 'tahun']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('iku');
    }
};
