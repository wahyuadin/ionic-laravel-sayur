<?php

namespace App\Http\Controllers;

use App\Models\DataOrder;
use App\Models\Product;
use App\Models\Session as Sesi;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Contracts\Session\Session;
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

    public function cart_delete_id($id_sesi) {
        if (Sesi::where('id', $id_sesi)->delete()) {
            return response()->json(['error' => false, 'data' => 'Data Berhasil di hapus!'], 200);
        }
        return response()->json(['error' => true, 'data' => null], 422);
    }

    public function cekout(Request $request) {
        try {
            $this->validate($request, [
                'user_id'       => 'required',
            ]);

            if (Sesi::hapus($request->user_id)) {
                return response()->json(['error' => false, 'data' => 'Data Berhasil di tambah!'], 200);
            } else {
                return response()->json(['error' => true, 'message' => 'Hapus Session Tidak Berhasil!']);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => true, 'message' => $e->validator->errors()->all()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], 500);
        }
    }

    public function profile_show($id) {
        return response()->json(['error' => false, 'data' => User::where('id',$id)->get()]);
    }

    public function profile_edit(Request $request, $id) {
        try {
            $this->validate($request, [
                'nama'          => 'required',
                'username'      => 'required',
                'email'         => 'required|email',
                'password'      => 'nullable',
                'address'       => 'required',
                'phone'         => 'required',
            ]);

            $data = $request->all();

            if (filled($request->password)) {
                $password = bcrypt($request->password);
                $data['password'] = $password;
            }

            if (User::find($id)->update($data)) {
                return response()->json(['error' => false, 'data' => 'Data Berhasil di Update'], 200);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => true, 'message' => $e->validator->errors()->all()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], 500);
        }
    }

    public function riwayat($id) {
        $a = Sesi::showRiwayat(['user_id' => $id, 'show' => '0']);
        $b = [];
        foreach ($a as $data) {
            $b = $data;
        }

        $formattedCreatedAt = Carbon::createFromFormat('Y-m-d H:i:s', $b['created_at'])->format('Y-m-d');
        return response()->json([
            'error' => false,
            'data'  => Sesi::showRiwayat(['user_id' => $id, 'show' => '0']),
            'date'  => $formattedCreatedAt
        ]);
    }

    public function wa($phone) {
        $data = [
            'apiKey' => 'd08882dc5e21a37670ca1d28948d55e6',
            'phone' => $phone,
            'message' => "Terimakasih telah order di kami! Mohon ditunggu, kami akan segera ke alamat anda.",
        ];

        // URL API yang akan dituju
        $apiUrl = 'http://98.142.245.14:41243/api/sendMessage';

        // Menggunakan Guzzle untuk membuat permintaan POST
        $client = new Client();
        try {
            $response = $client->request('POST', $apiUrl, [
                'form_params' => $data,
            ]);

            // Mendapatkan status code dari response
            $statusCode = $response->getStatusCode();

            // Mendapatkan body response
            $body = $response->getBody()->getContents();

            return response()->json(['error' => false, 'data' => $body], $statusCode);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to send message: ' . $e->getMessage(),
            ], 500);
        }
    }
}

