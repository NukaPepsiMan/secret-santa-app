import { Link, Head, router } from '@inertiajs/react';

export default function Show({ event, participants }) {
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
                                            <td className="px-6 py-3 align-top">
                                            </td>
                                            <td className="px-6 py-3 align-middle">
                                                <div className="flex justify-center gap-2">
                                                        <>
                                                            <button
                                                                type="button"
                                                                className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                                                            >
                                                                Rimuovi
                                                            </button>
                                                            {participant.status ===
                                                                'pending' && (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                                                                    >
                                                                        Accetta
                                                                    </button>
                                                                    <button
                                                                        type="button"
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