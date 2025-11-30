<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function create()
    {
        return Inertia::render(('Events/Create'));
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

        return redirect()->route('events.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
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
