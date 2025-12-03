<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    public function show(Assignment $assignment) {

        $assignment->load([
            'event',
            'receiver.user',
            'receiver.wishlistItems',
        ]);

        if ($assignment->viewed_at === null) {
            $assignment->update(['viewed_at' => now()]);
            $assignment->refresh();
        }

        $receiver = $assignment->receiver;

        return Inertia::render('Participants/Assignment', [
            'event' => [
                'id' => $assignment->event->id,
                'name' => $assignment->event->name,
                'exchange_date' => $assignment->event->exchange_date,
                'budget' => $assignment->event->budget,
            ],
            'receiver' => [
                'name' => $receiver->user->name,
                'email' => $receiver->user->email,
            ],
            'wishlistItems' => $receiver->wishlistItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                ];
            }),
        ]);
    }
}
