<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UnitKerja;
use App\Models\IKU;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Super Admin User
        $admin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@e-kinerja.test',
            'password' => Hash::make('password123'),
            'phone' => '081234567890',
            'is_active' => true,
        ]);

        // Create Unit Kerja
        $unitKerjaPusat = UnitKerja::create([
            'kode' => 'PUSAT',
            'nama' => 'Kantor Pusat',
            'deskripsi' => 'Kantor Pusat Organisasi',
            'kepala_unit' => 'Kepala Pusat',
            'email' => 'pusat@instansi.gov.id',
            'is_active' => true,
        ]);

        $unitKerjaRegional = UnitKerja::create([
            'kode' => 'REGIONAL-01',
            'nama' => 'Kantor Regional 1',
            'parent_id' => $unitKerjaPusat->id,
            'kepala_unit' => 'Kepala Regional 1',
            'email' => 'regional1@instansi.gov.id',
            'is_active' => true,
        ]);

        // Create Sample IKU
        IKU::create([
            'kode' => 'IKU-001',
            'nama' => 'Persentase Kepuasan Pelanggan',
            'unit_kerja_id' => $unitKerjaPusat->id,
            'satuan' => '%',
            'baseline' => 75,
            'target_tahunan' => 90,
            'target_bulanan' => 7.5,
            'bobot' => 20,
            'tahun' => now()->year,
            'is_active' => true,
        ]);

        IKU::create([
            'kode' => 'IKU-002',
            'nama' => 'Efisiensi Operasional',
            'unit_kerja_id' => $unitKerjaPusat->id,
            'satuan' => '%',
            'baseline' => 70,
            'target_tahunan' => 85,
            'target_bulanan' => 7.1,
            'bobot' => 25,
            'tahun' => now()->year,
            'is_active' => true,
        ]);

        $this->command->info('Database seeded successfully!');
    }
}
