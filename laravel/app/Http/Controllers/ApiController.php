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

    public function homepageDetail($id) {
        return Product::where('id', $id)->get();
    }


    public function cart_post(Request $request) {
        try {
            $this->validate($request, [
                'users_id'          => 'required',
                'products_id'       => 'required',
                'quantiti'          => 'required',
            ]);

            $nama   = Product::where('id', $request->products_id)->value('name');
            $harga  = Product::where('id', $request->products_id)->value('price');
            $jumlah = $request->quantiti * $harga;

            $save           = new Sesi();
            $save->users_id = $request->users_id;
            $save->products_id = $request->products_id;
            $save->nama     = $nama;
            $save->harga    = $harga;
            $save->quantiti = $request->quantiti;
            $save->jumlah   = $jumlah;
            if ($save->save()) {
                return response()->json([
                    'error' => null,
                    'data'  => "data berhasil diinput!"
                ], 200);
            }

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
        return $data;
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
