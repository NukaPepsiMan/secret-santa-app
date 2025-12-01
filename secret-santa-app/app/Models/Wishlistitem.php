<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlistitem extends Model
{
    /** @use HasFactory<\Database\Factories\WishlistitemFactory> */
    use HasFactory;

    protected $fillable = [
        'participant_id',
        'name',
        'description',
    ];

    public function participant() {
        return $this -> belongsTo(Participant::class);
    }
}
