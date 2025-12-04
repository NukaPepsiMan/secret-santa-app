<?php

namespace Database\Factories;

use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wishlistitem>
 */
class WishlistitemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'participant_id' => Participant::factory(),
            'name' => fake()->sentence(3),
            'description' => fake()->optional()->sentence(8),
        ];
    }
    
}
