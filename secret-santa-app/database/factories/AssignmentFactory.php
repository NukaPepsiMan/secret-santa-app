<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'event_id' => Event::factory(),
            'giver_participant_id' => Participant::factory(),
            'reciver_participant_id' => Participant::factory(),
            'viewed_at' => null,
        ];
    }
}
