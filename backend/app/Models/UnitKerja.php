<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnitKerja extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'unit_kerja';

    protected $fillable = [
        'kode',
        'nama',
        'deskripsi',
        'parent_id',
        'kepala_unit',
        'email',
        'telepon',
        'alamat',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function parent()
    {
        return $this->belongsTo(UnitKerja::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(UnitKerja::class, 'parent_id');
    }

    public function pegawai()
    {
        return $this->hasMany(Pegawai::class);
    }

    public function renstra()
    {
        return $this->hasMany(Renstra::class);
    }
}
