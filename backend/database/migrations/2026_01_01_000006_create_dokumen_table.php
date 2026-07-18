<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dokumen', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('kategori');
            $table->text('deskripsi')->nullable();
            $table->string('file_path');
            $table->string('file_name');
            $table->string('file_type');
            $table->bigInteger('file_size');
            $table->integer('versi')->default(1);
            $table->foreignId('unit_kerja_id')->nullable()->constrained('unit_kerja')->onDelete('set null');
            $table->string('modul');
            $table->bigInteger('reference_id')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->foreignId('uploaded_by')->constrained('users');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['kategori', 'modul']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dokumen');
    }
};
