<?php

namespace App\Http\Controllers;

use App\Models\IKU;
use Illuminate\Http\Request;

class IKUController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $query = IKU::with('unitKerja');

        if ($request->has('tahun')) {
            $query->where('tahun', $request->tahun);
        }

        if ($request->has('unit_kerja_id')) {
            $query->where('unit_kerja_id', $request->unit_kerja_id);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        $ikus = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $ikus,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode' => 'required|unique:iku',
            'nama' => 'required|string',
            'unit_kerja_id' => 'required|exists:unit_kerja,id',
            'satuan' => 'required|string',
            'target_tahunan' => 'required|numeric',
            'tahun' => 'required|integer',
        ]);

        $iku = IKU::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'IKU berhasil dibuat',
            'data' => $iku,
        ], 201);
    }

    public function show(IKU $iku)
    {
        $iku->load('unitKerja', 'monitoring');

        return response()->json([
            'success' => true,
            'data' => $iku,
        ]);
    }

    public function update(Request $request, IKU $iku)
    {
        $validated = $request->validate([
            'nama' => 'sometimes|string',
            'satuan' => 'sometimes|string',
            'target_tahunan' => 'sometimes|numeric',
        ]);

        $iku->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'IKU berhasil diupdate',
            'data' => $iku,
        ]);
    }

    public function destroy(IKU $iku)
    {
        $iku->delete();

        return response()->json([
            'success' => true,
            'message' => 'IKU berhasil dihapus',
        ]);
    }
}
