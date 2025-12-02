<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Participant;
use App\Models\User;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $events = Event::query()
            ->orderBy('exchange_date')
            ->get();
        
        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render(('Events/Create'));
    }
    
    public function myEvents() {
            $user = Auth::user();
    
            $participants = Participant::with('event')
                ->where('user_id', $user->id)
                ->get();

            //dd($participants->all());
    
            return Inertia::render('Participants/Index', [
                'userEvents' => $participants->map(function ($p) {
                    return [
                        'id' => $p->id,
                        'status' => $p->status,
                        'event' => [
                            'id' => $p->event->id,
                            'name' => $p->event->name,
                            'exchange_date' => $p->event->exchange_date,
                            'budget' => $p->event->budget,
                        ]
                    ];
                }),
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {

        //dd($request->all());
        $event = Event::create([
            'organizer_id' => 1,
            'name' => $request->input('name'),
            'exchange_date' => $request->input('exchange_date'),
            'budget' => $request->input('budget'),
        ]);

        $users = User::all();

        foreach($users as $user) {
            Participant::create([
                'event_id' => $event->id,
                'user_id' => $user->id,
            ]);
        }

        return redirect()->route('events.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $event->load([
            'participants.user',
            'participants.givenAssignment',
        ]);

        $pendingCount = $event->participants()
            ->where('status', 'pending')
            ->count();

        $acceptedCount = $event->participants()
            ->where('status', 'accepted')
            ->count();

        $canDraw = $event->drawn_at === null
            && $pendingCount === 0
            && $acceptedCount >= 3;

        return Inertia::render('Events/Show', [
            'event' => $event,
            'participants' => $event->participants->map(function($participant) {
                return [
                    'id' => $participant->id,
                    'name' => $participant->user->name,
                    'email' => $participant->user->email,
                    'status' => $participant->status
                ];
            }),
            'canDraw' => $canDraw,
            'pendingCount' => $pendingCount,
            'acceptedCount' => $acceptedCount,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event) {
        $event->delete();

        //dd($event->All());

        return redirect()
            ->route('events.index')
            ->with('success', 'Evento eliminato con successo');
    }
}
