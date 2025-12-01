<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWishlistitemRequest;
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
    
    public function store(StoreWishlistitemRequest $request, Participant $participant) {

        $validated = $request->validated();
        $participant->wishlistItems()->create($validated);

        return back()->with('success','Oggetto aggiunto alla wishlist.');
    }

    public function destroy(WishlistItem $wishlistItem) {

        $wishlistItem->delete();
        
        return back()->with('success','Oggetto rimosso dalla wishlist.');
    }
}
