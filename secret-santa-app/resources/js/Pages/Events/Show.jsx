import { Link, Head, router, usePage} from '@inertiajs/react';

export default function Show({ event, 
    participants,
    pendingCount, 
    acceptedCount,
    drawnAt
 }) {
    
    const handleRemoveParticipant = (id) => {
        router.delete(route('participants.destroy', id), {
            onSuccess: (page) => {
                if (page.props) {
                    console.log(page.props.flash);
                }
            },
        });
    };

    const handleDrawParticipant = (id) => {
        router.post(route('events.draw', id), {
            onSuccess: (page) => {
                if (page.props) {
                    console.log(page.props.flash);
                }
            },
        });
    };

    const handleUpdateStatus = (participantId, status) => {
        router.patch(route('participants.update', participantId), { status } , {
            onSuccess: (page) => {
                if (page.props) {
                    console.log(page.props.flash);
                }
            },
        });
    };

    const canDraw = acceptedCount >= 3 && pendingCount === 0;

    return (
        <>
            <Head title={`Partecipanti - ${event.name}`} />
            <div className="min-h-screen bg-background p-4 sm:p-8">
                <div className="mx-auto w-full max-w-5xl space-y-8">

                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-bold text-foreground py-2">
                                {event.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-default-500">
                                <h1 className="inline-flex items-center text-gray-400">
                                    Budget: €{event.budget}
                                </h1>
                                <h1 className="inline-flex items-center font-medium text-gray-400">
                                    Data scambio: {event.exchange_date}
                                </h1>
                            </div>
                        </div>
                        <Link
                            href={route('events.index')}
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Torna agli eventi
                        </Link>
                    </div>

                    <div className="rounded-lg border border-divider bg-content1 p-6 flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex w-full justify-around gap-6 md:w-auto md:justify-start">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-2xl font-bold text-emerald-400">
                                    {acceptedCount}
                                </span>
                                <span className="text-xs uppercase tracking-wider text-default-500">
                                    Accettati
                                </span>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-2xl font-bold text-amber-400">
                                    {pendingCount}
                                </span>
                                <span className="text-xs uppercase tracking-wider text-default-500">
                                    In attesa
                                </span>
                            </div>
                            {drawnAt && (
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-2xl font-bold text-sky-400">
                                        Estratto
                                    </span>
                                    <span className="text-xs uppercase tracking-wider text-default-500">
                                        Stato
                                    </span>
                                </div>
                            )}
                        </div>
                    
                        {!drawnAt ? (
                            <div className="flex w-full flex-col items-end gap-2 md:w-auto">
                                <button
                                    type="button"
                                    onClick={() => handleDrawParticipant(event.id)}
                                    className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white ${
                                        canDraw
                                            ? 'bg-emerald-600 hover:bg-emerald-700'
                                            : 'bg-emerald-800/40 cursor-not-allowed'
                                    }`}
                                >
                                    Avvia estrazione
                                </button>
                                {!canDraw && (
                                    <p className="max-w-xs text-center text-[11px] text-red-400 md:text-right">
                                        Tutti i partecipanti devono rispondere, almeno 3 partecipanti
                                    </p>
                                )}
                            </div>
                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                                Estrazione completata
                            </span>
                        )}
                    </div>

                    <div className="rounded-lg border border-divider bg-content1">
                        <div className="border-b border-divider px-6 py-4">
                            <h2 className="text-lg font-bold text-foreground">
                                Partecipanti
                            </h2>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full table-fixed text-left text-sm">
                                <thead className="bg-black/10 text-xs uppercase text-default-500">
                                    <tr>
                                        <th className="w-1/4 px-6 py-3 font-medium">
                                            Partecipante
                                        </th>
                                        <th className="w-1/4 px-6 py-3 font-medium">
                                            Stato
                                        </th>
                                        <th className="w-1/4 px-6 py-3 font-medium">
                                            Visualizzato
                                        </th>
                                        <th className="w-1/4 px-6 py-3 text-center font-medium">
                                            Azioni
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {participants.map((participant) => (
                                        <tr
                                            key={participant.id}
                                            className="border-t border-divider last:border-b"
                                        >
                                            <td className="px-6 py-3 align-top">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-foreground">
                                                        {participant.name}
                                                    </span>
                                                    <span className="text-[11px] text-default-500">
                                                        {participant.email}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 align-top">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                                        participant.status === 'accepted'
                                                            ? 'bg-emerald-500/10 text-emerald-400'
                                                            : participant.status === 'rejected'
                                                            ? 'bg-red-500/10 text-red-400'
                                                            : 'bg-amber-500/10 text-amber-400'
                                                    }`}
                                                >
                                                    {participant.status}
                                                </span>
                                            </td>
                                            <td className="px-16 py-3 align-top">
                                                {drawnAt &&
                                                    participant.status === 'accepted' ? (
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                                                participant.has_viewed_assignment
                                                                    ? 'bg-emerald-500/10 text-emerald-400'
                                                                    : 'bg-zinc-700 text-default-500'
                                                            }`}
                                                        >
                                                            {participant.has_viewed_assignment
                                                                ? 'Sì'
                                                                : 'No'}
                                                        </span>
                                                    ) : (
                                                        <span className="text-default-300 ">-</span>
                                                    )}
                                            </td>
                                            <td className="px-6 py-3 align-middle">
                                                <div className="flex justify-center gap-2">
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveParticipant( participant.id,) }
                                                            className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                                                        >
                                                            Rimuovi
                                                        </button>
                                                        {participant.status ===
                                                            'pending' && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleUpdateStatus( participant.id, 'accepted',)}
                                                                    className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                                                                >
                                                                    Accetta
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleUpdateStatus( participant.id, 'rejected')}
                                                                    className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-500 hover:bg-amber-500/30"
                                                                >
                                                                    Rifiuta
                                                                </button>
                                                            </>
                                                        )}
                                                    </>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}