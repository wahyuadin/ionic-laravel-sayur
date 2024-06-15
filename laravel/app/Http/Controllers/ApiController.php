<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Session as Sesi;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function __construct()
    {
        $this->middleware('custom.auth', ['except' => config('app.kecuali')]);
    }

    public function homepage() {
        return Product::all();
    }

    public function cart_post(Request $request) {
        try {
            $this->validate($request, [
                'users_id'          => 'required',
                'products_id'       => 'required',
            ]);

            Sesi::tambah($request->all());
            return response()->json([
                'error' => null,
                'data'  => "data berhasil diinput!"
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => true, 'message' => $e->validator->errors()->all()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], 500);
        }
    }

    public function cart_show($id) {
        $data = Sesi::show($id);
        if ($data->isEmpty()) {
            return response()->json(['error' => true, 'data' => "data tidak ada"], 422);
        }

        $response = [];
        $priceCount = [];

        foreach ($data as $d) {
            $price = $d->produk->price;

            if (!isset($priceCount[$price])) {
                $priceCount[$price] = 0;
            }

            $priceCount[$price]++;
        }
        $response['price_counts'] = $priceCount;
        foreach ($response['price_counts'] as $price => $count) {
            return response()->json([
                'error'             => false,
                'data'              => $data,
                'total_keranjang'   => $count,
                'total_jumlah'      => $price
            ], 200);
        }
    }

    public function cart_delete_all($id_user) {
        if (Sesi::hapus($id_user)) {
            return response()->json(['error' => false, 'data' => 'Data Berhasil di hapus!'], 200);
        }
        return response()->json(['error' => true, 'data' => null], 422);
    }

    public function cart_delete_id($id_sesi) {
        if (Sesi::where('id', $id_sesi)->delete()) {
            return response()->json(['error' => false, 'data' => 'Data Berhasil di hapus!'], 200);
        }
        return response()->json(['error' => true, 'data' => null], 422);
    }

    public function cekout($id) {
        return response()->json(['error' => false, 'data' => $id], 422);
    }
}
