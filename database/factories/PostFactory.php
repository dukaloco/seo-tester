<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence();
        $content = fake()->paragraphs(rand(3, 9));

        $formatParagraph = function ($str) {
            return "<p>" . $str . "</p>";
        };

        // insert image in between content
        $imagePosition = rand(1, count($content) - 1);
        $firsthalf = array_slice($content, 0, $imagePosition);
        $secondhalf = array_slice($content, $imagePosition);

        $content = array_merge(
            array_map($formatParagraph, $firsthalf),
            [
                '<img src="' . fake()->imageUrl() . '" alt="' . $title . '"/>',
            ],
            array_map($formatParagraph, $secondhalf),
        );

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => implode(' ', $content),
            'featured_img' => fake()->imageUrl(),
            'published_at' => fake()->boolean(40) ? fake()->dateTimeBetween('-1 year', '-1 day') : null,
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }

}
