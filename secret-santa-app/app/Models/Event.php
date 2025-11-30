<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'name',
        'exchange_date',
        'budget',
        'drawn_at',
    ];

    protected $casts = [
        'exchange_date' => 'date',
        'drawn_at' => 'datetime'
    ];

    public function organizer() {
        return $this->belongsTo(User::class, 'organizer_id');
    }
}
