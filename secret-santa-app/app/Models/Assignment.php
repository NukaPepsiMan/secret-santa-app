<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    /** @use HasFactory<\Database\Factories\AssignmentFactory> */
    use HasFactory;

    protected $fillable = [
        'event_id',
        'giver_participant_id',
        'receiver_participant_id',
        'viewed_at',
    ];

    public function event() {
        return $this->belongsTo(Event::class);
    }

    public function giver() {
        return $this->belongsTo(Participant::class, 'giver_participant_id');
    }

    public function receiver() {
        return $this->belongsTo(Participant::class, 'receiver_participant_id');
    }
}
