<x-mail::message>
# Invito a partecipare a "{{ $event->name }}"

Ciao {{ $participant->user->name }},

sei stato invitato a partecipare all'evento **"{{ $event->name }}"**.

- Data scambio regali: **{{ $event->exchange_date->format('d/m/Y') }}**
- Budget massimo: **€ {{ $event->budget }}**

Per gestire la partecipazione e la tua wishlist, accedi all'app e vai nella sezione **"I miei eventi"**.

Grazie,<br>
{{ config('app.name') }}
</x-mail::message>
