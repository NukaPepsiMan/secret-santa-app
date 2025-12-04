<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Event;
use App\Models\Participant;
use App\Models\User;
use App\Models\Wishlistitem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->count(7)
            ->create();
        
        Event::factory()->count(3)
            ->create()
            ->each(
                function (Event $event) use ($users) {
                    
                    $participants = new Collection();

                    foreach($users as $user) {
                        $participants->push(
                            Participant::factory()->create([
                                'event_id' => $event->id,
                                'user_id' => $user->id,
                            ])
                        );
                    }

                    $participants->each(function (Participant $participant) {
                        $itemsCount = fake()->numberBetween(1,3);

                        if($itemsCount > 0){
                            Wishlistitem::factory()
                                ->count($itemsCount)
                                ->create([
                                    'participant_id' => $participant->id,
                                ]);
                        }
                    });

                    $acceptedParticipants = $participants
                        ->where('status', 'accepted')
                        ->values();
                    
                    if($acceptedParticipants->count() >= 3){
                        $givers = $acceptedParticipants->pluck('id')->shuffle()->values();
                        $receivers = $givers->slice(1)->push($givers[0])->values();

                        //dd($receivers->all(), $givers->all());
                        
                        foreach ($givers as $index => $giverId) {
                            Assignment::create([
                                'event_id' => $event->id,
                                'giver_participant_id' => $giverId,
                                'receiver_participant_id' => $receivers[$index],
                                'viewed_at' => null,
                            ]);
                        }
                    }
                    
                }
            );
    }
}
