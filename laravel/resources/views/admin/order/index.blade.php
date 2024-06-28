@extends('layouts.admin')
@section('order', 'active')

@section('content')
<div class="card">
    <div class="card-header">
        <h3>Data Order</h3>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama User</th>
                        <th>Produk</th>
                        <th>Harga</th>
                        <th>Quantiti</th>
                        <th>Jumlah</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {{-- @dd($data) --}}
                <tbody>
                    @php
                        $no = 1;
                    @endphp
                    @foreach ($data as $d)
                    <tr>
                        <td>{{ $no++ }}</td>
                        <td>{{ $d->user->nama }}</td>
                        <td>{{ $d->produk->name }}</td>
                        <td>{{ $d->harga }}</td>
                        <td>{{ $d->quantiti }}</td>
                        <td>{{ $d->jumlah }}</td>
                        <td>
                            @if ($d->status == 0)
                                <span class="badge badge-pill badge-danger">Reject</span>
                            @elseif ($d->status == 1)
                                <span class="badge badge-pill badge-primary">Accept</span>
                            @else
                                <span class="badge badge-pill badge-warning">Pending</span>
                            @endif
                        </td>
                        <td>
                            <a href="{{ url('/admin/order/accept/'.$d->id) }}" class="btn btn-warning accept-link">
                                <i class="fas fa-clipboard-check"></i>
                            </a>
                            <a href="{{ url('/admin/order/reject/'.$d->id) }}" class="btn btn-danger" data-confirm-delete="true"><i class="fas fa-window-close"></i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- JavaScript untuk menangani klik pada link -->
<script>
    $(document).ready(function() {
        $('.accept-link').click(function(e) {
            e.preventDefault(); // Mencegah perilaku bawaan dari <a> untuk mengarahkan ke halaman baru

            var url = $(this).attr('href'); // Ambil URL dari atribut href

            // Buat formulir secara dinamis
            var form = $('<form action="' + url + '" method="POST"></form>');
            form.append('<input type="hidden" name="_method" value="PUT">'); // Atur metode PUT di dalam input tersembunyi
            form.append('@csrf'); // Tambahkan token CSRF

            // Tambahkan formulir ke dalam dokumen dan langsung kirim
            $('body').append(form);
            form.submit();
        });
    });
</script>
@endsection
