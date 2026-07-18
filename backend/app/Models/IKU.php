<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IKU extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'iku';

    protected $fillable = [
        'kode',
        'nama',
        'deskripsi',
        'unit_kerja_id',
        'formula',
        'satuan',
        'baseline',
        'target_tahunan',
        'target_bulanan',
        'target_triwulan',
        'target_semester',
        'bobot',
        'is_active',
        'tahun',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'baseline' => 'decimal:2',
        'target_tahunan' => 'decimal:2',
        'target_bulanan' => 'decimal:2',
        'target_triwulan' => 'decimal:2',
        'target_semester' => 'decimal:2',
    ];

    public function unitKerja()
    {
        return $this->belongsTo(UnitKerja::class);
    }

    public function monitoring()
    {
        return $this->hasMany(Monitoring::class);
    }
}
