<?php

namespace App\Http\Controllers;

use App\Models\Monitoring;
use Illuminate\Http\Request;

class MonitoringController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $query = Monitoring::with('iku', 'unitKerja');

        if ($request->has('tahun')) {
            $query->where('tahun', $request->tahun);
        }

        if ($request->has('bulan')) {
            $query->where('bulan', $request->bulan);
        }

        if ($request->has('unit_kerja_id')) {
            $query->where('unit_kerja_id', $request->unit_kerja_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $monitoring = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $monitoring,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_kerja_id' => 'required|exists:unit_kerja,id',
            'bulan' => 'required|integer|min:1|max:12',
            'tahun' => 'required|integer',
            'iku_id' => 'required|exists:iku,id',
            'target' => 'required|numeric',
            'realisasi' => 'required|numeric',
        ]);

        $validated['persentase'] = ($validated['realisasi'] / $validated['target']) * 100;
        
        $persentase = $validated['persentase'];
        if ($persentase >= 90) {
            $validated['status'] = 'on_track';
        } elseif ($persentase >= 75) {
            $validated['status'] = 'at_risk';
        } else {
            $validated['status'] = 'off_track';
        }

        $monitoring = Monitoring::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data monitoring berhasil dibuat',
            'data' => $monitoring,
        ], 201);
    }

    public function update(Request $request, Monitoring $monitoring)
    {
        $validated = $request->validate([
            'realisasi' => 'sometimes|numeric',
            'catatan' => 'sometimes|string',
        ]);

        if (isset($validated['realisasi'])) {
            $validated['persentase'] = ($validated['realisasi'] / $monitoring->target) * 100;
            
            $persentase = $validated['persentase'];
            if ($persentase >= 90) {
                $validated['status'] = 'on_track';
            } elseif ($persentase >= 75) {
                $validated['status'] = 'at_risk';
            } else {
                $validated['status'] = 'off_track';
            }
        }

        $monitoring->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data monitoring berhasil diupdate',
            'data' => $monitoring,
        ]);
    }
}
