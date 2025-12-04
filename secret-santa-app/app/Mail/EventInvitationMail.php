<?php

namespace App\Mail;

use App\Models\Event;
use App\Models\Participant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public Event $event;
    public Participant $participant;

    public function __construct(Event $event, Participant $participant)
    {
        $this->event = $event;
        $this->participant = $participant;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invito evento: '.$this->event->name,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.event-invitation',
            with: [
                'event' => $this->event,
                'participant' => $this->participant,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}