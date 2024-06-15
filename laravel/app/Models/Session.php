<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function produk() {
        return $this->belongsTo(Product::class, 'products_id');
    }

    public static function show($data) {
        return Self::with('produk')->where('users_id', $data)->latest()->get();
    }

    public static function tambah($data) {
        return Session::create($data);
    }

    public static function hapus($data) {
        return Session::where('users_id',$data)->delete();
    }

}
