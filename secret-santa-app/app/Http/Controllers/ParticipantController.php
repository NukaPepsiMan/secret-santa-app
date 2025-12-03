<?php

namespace App\Http\Controllers;

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

        return back()->with('message', 'Partecipante aggiornato con successo');
    }

    public function destroy(Participant $participant) {
        $participant->delete();
        return back()->with('message', 'Partecipante rimosso.');
    }
    
}
