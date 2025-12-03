<?php

use App\Models\Event;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WishlistItemController;
use App\Http\Controllers\AssignmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $events = Event::All();
    
    return Inertia::render('Events/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'events' => $events,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    Route::patch('/participants/{participant}/respond', [ParticipantController::class, 'respond'])
        ->name('participants.respond');

    Route::patch('/participants/{participant}', [ParticipantController::class, 'update'])
        ->name('participants.update');

    Route::delete('/participants/{participant}', [ParticipantController::class, 'destroy'])
        ->name('participants.destroy');

    Route::get('/assignments/{assignment}', [AssignmentController::class, 'show'])
        ->name('assignments.show');
    
    Route::get('/participants/{participant}/wishlist', [WishlistItemController::class, 'index'])
        ->name('wishlist.index');
    
    Route::post('/participants/{participant}/wishlist', [WishlistItemController::class, 'store'])
        ->name('wishlist.store');

    Route::patch('/wishlist-items/{wishlistItem}', [WishlistItemController::class, 'update'])
        ->name('wishlist.update');

    Route::delete('/wishlist-items/{wishlistItem}', [WishlistItemController::class, 'destroy'])
        ->name('wishlist.destroy');

    Route::get('/my-events', [EventController::class, 'myEvents'])
        ->name('events.my-events');

    Route::post('/events/{event}/draw', [EventController::class, 'draw'])
        ->name('events.draw');
});

Route::resource('events', EventController::class)->only([
    'index',
    'create',
    'store',
    'show',
    'destroy',
]);



require __DIR__.'/auth.php';
