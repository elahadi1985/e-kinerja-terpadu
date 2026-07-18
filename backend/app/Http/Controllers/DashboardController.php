<?php

namespace App\Http\Controllers;

use App\Models\IKU;
use App\Models\UnitKerja;
use App\Models\SAKIP;
use App\Models\Monitoring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function overview(Request $request)
    {
        $tahun = $request->query('tahun', now()->year);
        $unitKerjaId = $request->query('unit_kerja_id');

        $query = SAKIP::where('tahun', $tahun);
        if ($unitKerjaId) {
            $query->where('unit_kerja_id', $unitKerjaId);
        }

        $sakipValue = $query->avg('nilai') ?? 0;

        $unitKerjaCount = UnitKerja::count();
        $userCount = DB::table('users')->count();
        $documentPercentage = 92; // Mock

        return response()->json([
            'success' => true,
            'data' => [
                'nilai_sakip' => round($sakipValue, 2),
                'nilai_zi' => 82,
                'maturity_rating' => 3.5,
                'nilai_iku' => 85,
                'nilai_rb' => 78,
                'persentase_dokumen' => $documentPercentage,
                'jumlah_unit_kerja' => $unitKerjaCount,
                'total_user' => $userCount,
                'progress_pengisian' => 87,
            ],
        ]);
    }

    public function charts(Request $request)
    {
        $tahun = $request->query('tahun', now()->year);
        $unitKerjaId = $request->query('unit_kerja_id');

        // Trend SAKIP
        $trendQuery = SAKIP::where('tahun', $tahun)
            ->select(DB::raw('MONTH(created_at) as month, AVG(nilai) as value'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month');
        
        if ($unitKerjaId) {
            $trendQuery->where('unit_kerja_id', $unitKerjaId);
        }
        
        $trendData = $trendQuery->get();

        // Capaian IKU
        $ikuData = IKU::where('tahun', $tahun)
            ->when($unitKerjaId, function ($q) use ($unitKerjaId) {
                return $q->where('unit_kerja_id', $unitKerjaId);
            })
            ->select('nama', DB::raw('target_tahunan as target'))
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'trend_sakip' => $trendData,
                'capaian_iku' => $ikuData,
            ],
        ]);
    }
}
