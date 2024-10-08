<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        
        User::firstOrCreate([
            'email' => 'admin@example.com',
        ],[
            'name' => 'admin',
            'password' => bcrypt('admin'),
            'role' => User::ROLE_ADMIN,
        ]);
        
        User::firstOrCreate([
            'email' => 'user@example.com',
        ],[
            'name' => 'user',
            'password' => bcrypt('user'),
        ]);

        $this->call(CategoryTableSeeder::class);
        $this->call(PostTableSeeder::class);

    }
}
