<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(AdminSeeder::class);

        User::create(
            [
                'username' => 'user',
                'email' => 'user@example.com',
                'password' => bcrypt('123'),
                'is_admin' => false,
            ]);
    }
}
