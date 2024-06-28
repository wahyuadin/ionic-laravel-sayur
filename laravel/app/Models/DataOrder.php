<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataOrder extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function DataKeranjang() {
        return $this->belongsTo(Session::class, 'session_id');
    }

    public static function showData() {
        return self::with('DataKeranjang.user','DataKeranjang.produk')->latest()->get();
    }

    public static function status($id, $data) {
        return DataOrder::find($id)->update($data);
    }

    public static function hapus($id) {
        return DataOrder::find($id)->delete();
    }

    public static function tambah_data($data) {
        return DataOrder::create($data);
    }

}
