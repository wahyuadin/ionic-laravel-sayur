<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\Self_;

class Session extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function produk() {
        return $this->belongsTo(Product::class, 'products_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'users_id');
    }

    public static function show($data) {
        return Self::with('produk')->where(['users_id' => $data, 'show' => '1'])->latest()->get();
    }

    public static function showRiwayat($data) {
        return Self::with('produk')->where(['users_id' => $data, 'show' => '0'])->latest()->get();
    }

    public static function tambah($data) {
        return Session::create($data);
    }

    public static function hapus($data) {
        return Session::where('users_id',$data)->update(['show' => '0']);
    }

    // admin

    public static function ShowDataAdmin() {
        return Self::with('produk','user')->latest()->get();
    }

    public static function status($id, $data) {
        return Session::find($id)->update($data);
    }

}
