<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Participant;

class ParticipantController extends Controller
{
    public function update(Request $request, Participant $participant) {

        $validated = $request->validate([
            'status' => ['required','in:pending,accepted,rejected'],
        ]);

        $participant->update([
            'status' => $validated['status']
        ]);

        return back()->with('success','Partecipante aggiornato con successo');
    }

    public function destroy(Participant $participant) {
        $participant->delete();

        return back()->with('success','Partecipante rimosso.');
    }

    public function respond(Request $request, Participant $participant) {
        if ($participant->user_id !== Auth::id()) {
            abort(403);
        }

        if ($participant->event->drawn_at) {
            return back()->with('error', 'Non puoi cambiare risposta dopo l\'estrazione.');
        }

        $data = $request->validate([
            'status' => ['required', 'in:accepted,rejected'],
        ]);

        $participant->update($data);

        return back()->with('success', 'Risposta aggiornata.');
    }
    
}
