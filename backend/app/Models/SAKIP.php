<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SAKIP extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'sakip';

    protected $fillable = [
        'unit_kerja_id',
        'tahun',
        'komponen',
        'nilai',
        'bobot',
        'persentase',
        'status',
        'verifikasi_status',
        'approval_status',
        'eviden_file_id',
        'catatan',
        'created_by',
        'verified_by',
        'approved_by',
    ];

    protected $casts = [
        'nilai' => 'decimal:2',
        'persentase' => 'decimal:2',
    ];

    public function unitKerja()
    {
        return $this->belongsTo(UnitKerja::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
