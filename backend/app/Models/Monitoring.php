<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Monitoring extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'monitoring';

    protected $fillable = [
        'unit_kerja_id',
        'bulan',
        'tahun',
        'iku_id',
        'target',
        'realisasi',
        'persentase',
        'status',
        'catatan',
        'updated_by',
    ];

    protected $casts = [
        'target' => 'decimal:2',
        'realisasi' => 'decimal:2',
        'persentase' => 'decimal:2',
    ];

    public function iku()
    {
        return $this->belongsTo(IKU::class);
    }

    public function unitKerja()
    {
        return $this->belongsTo(UnitKerja::class);
    }
}
