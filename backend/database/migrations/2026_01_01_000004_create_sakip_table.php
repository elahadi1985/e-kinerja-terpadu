<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sakip', function (Blueprint $table) {
            $table->id();
            $table->foreignId('unit_kerja_id')->constrained('unit_kerja')->onDelete('cascade');
            $table->integer('tahun');
            $table->string('komponen');
            $table->decimal('nilai', 5, 2)->nullable();
            $table->integer('bobot')->default(0);
            $table->decimal('persentase', 5, 2)->default(0);
            $table->string('status')->default('draft');
            $table->string('verifikasi_status')->default('pending');
            $table->string('approval_status')->default('pending');
            $table->foreignId('eviden_file_id')->nullable()->constrained('dokumen')->onDelete('set null');
            $table->text('catatan')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['unit_kerja_id', 'tahun', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sakip');
    }
};
