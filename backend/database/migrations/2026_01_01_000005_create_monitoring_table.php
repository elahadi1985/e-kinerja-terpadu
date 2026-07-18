<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('monitoring', function (Blueprint $table) {
            $table->id();
            $table->foreignId('unit_kerja_id')->constrained('unit_kerja')->onDelete('cascade');
            $table->integer('bulan');
            $table->integer('tahun');
            $table->foreignId('iku_id')->constrained('iku')->onDelete('cascade');
            $table->decimal('target', 10, 2);
            $table->decimal('realisasi', 10, 2)->default(0);
            $table->decimal('persentase', 5, 2)->default(0);
            $table->string('status')->default('on_track');
            $table->text('catatan')->nullable();
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
            $table->index(['unit_kerja_id', 'bulan', 'tahun']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('monitoring');
    }
};
