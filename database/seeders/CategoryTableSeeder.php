<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            'php' => 'PHP',
            'javascript' => 'JavaScript',
            'java' => 'JAVA',
            'python' => 'Python',
            'c' => 'C',
            'c-plus-plus' => 'C++',
            'c-sharp' => 'C#',
            'html' => 'HTML',
            'css' => 'CSS',
        ];

        foreach ($items as $key => $value) {
            Category::firstOrCreate([
                'slug' => $key,
            ], [
                'name' => $value,
                'description' => $value . ' Topic. ' . fake()->paragraph(),
            ]);
        }
    }
}
