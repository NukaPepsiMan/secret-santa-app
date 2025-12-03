import { Head, Link, router } from '@inertiajs/react';

export default function Index({ userEvents }) {

    const handleRespond = (participantId, status) => {
        router.patch(route('participants.update', participantId), { status }, {
            onSuccess: (page) => {
                if (page.props) {
                    console.log(page.props.flash);
                }
            },
        });
    };

    const handleLeave = (participantId) => {
        router.delete(route('participants.destroy', participantId), {
            onSuccess: (page) => {
                if (page.props) {
                    console.log(page.props.flash);
                }
            },
        });
    };

    return (
        <>
            <Head title="I miei eventi" />
            <div className="min-h-screen bg-background p-4 sm:p-8">
                <div className="mx-auto w-full max-w-4xl space-y-6">

                    <div className="flex userEvents-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold text-foreground">
                            I miei eventi
                        </h1>
                        <Link
                            href={route('events.index')}
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Vai agli eventi
                        </Link>
                    </div>

                    {userEvents.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-divider bg-content1 py-10 text-center space-y-2 px-4">
                            <p className="text-base font-medium text-foreground">
                                Non stai partecipando a nessun evento.
                            </p>
                            <p className="text-sm text-default-500">
                                Chiedi a un organizzatore di invitarti o crea un evento.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {userEvents.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-lg border border-divider bg-content1 px-4 py-4 md:px-6 md:py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                                >
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-foreground">
                                            {item.event.name}
                                        </h2>
                                        <div className="flex flex-wrap gap-2 text-sm">
                                            <span className="inline-flex rounded-full px-3 py-1 text-xs text-grey-200">
                                                Scambio: {item.event.exchange_date}
                                            </span>
                                            <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                                                Budget: €{item.event.budget}
                                            </span>
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex flex-wrap justify-end gap-2 text-xs py-2">
                                            <Link
                                                href={route('events.show', item.event.id)}
                                                className="font-medium text-emerald-500 hover:text-emerald-400"
                                            >
                                                Dettagli evento
                                            </Link>
                                            <Link
                                                href={route('wishlist.index', item.id)}
                                                className="font-medium text-emerald-500 hover:text-emerald-400"
                                            >
                                                Gestisci wishlist
                                            </Link>
                                            {item.can_view_assignment && (
                                                <Link
                                                    href={route(
                                                        'assignments.show',
                                                        item.can_view_assignment.id,
                                                    )}
                                                    className="font-medium text-emerald-500 hover:text-emerald-400"
                                                >
                                                    Vedi assegnazione
                                                </Link>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap justify-end gap-2">
                                            {item.status === 'pending' && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRespond(item.id, 'accepted')}
                                                        className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                                                    >
                                                        Accetta
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRespond(item.id, 'rejected')}
                                                        className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/30"
                                                    >
                                                        Rifiuta
                                                    </button>
                                                </>
                                            )}
                                            {item.status !== 'pending' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleLeave(item.id)}
                                                    className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                                                >
                                                    Abbandona evento
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


