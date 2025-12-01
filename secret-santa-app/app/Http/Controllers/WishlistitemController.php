<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistitemController extends Controller
{
    public function index(Participant $participant) {

        $participant->load('event','wishlistItems');

        return Inertia::render('Participants/Wishlist', [
            'participantId' => $participant->id,
            'event' => [
                'id' => $participant->event->id,
                'name' => $participant->event->name,
                'exchange_date' => $participant->event->exchange_date,
                'budget' => $participant->event->budget,
            ],
            'wishlistItems' => $participant->wishlistItems->map(function($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                ];
            }),
        ]);
    }
}
