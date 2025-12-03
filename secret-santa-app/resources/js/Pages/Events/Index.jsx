import { Head, Link, router } from '@inertiajs/react';

export default function Index({ events }) {
    const handleDelete = (id) => {
        router.delete(route('events.destroy', id), {
            onSuccess: (page) => {
                if (page.props) {
                    console.log(page.props.flash);
                }
            },
        });
    };

    return (
        <>
            <Head title="Lista Eventi" />
            <div className="min-h-screen bg-background p-4 sm:p-8">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">
                                I tuoi eventi
                            </h1>
                            <p className="mt-1 text-sm text-default-500">
                                Crea e gestisci gli eventi Secret Santa.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('events.my-events')}
                                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                            >
                                Miei Eventi
                            </Link>

                            <Link
                                href={route('events.create')}
                                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                            >
                                Crea evento
                            </Link>
                        </div>
                    </div>

                    {events.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-divider bg-content1 py-10 px-4 text-center space-y-2">
                            <p className="text-base font-medium text-foreground">
                                Nessun evento presente.
                            </p>
                            <p className="text-sm text-default-500">
                                Crea il tuo primo evento per iniziare.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex flex-col gap-3 rounded-lg border border-divider bg-content1 px-4 py-4 md:px-6 md:py-5 md:flex-row md:items-center md:justify-between"
                                >
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-foreground">
                                            {event.name}
                                        </h2>
                                        <div className="flex flex-wrap gap-2 text-sm">
                                            <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                                                Budget: €{event.budget}
                                            </span>
                                            <span className="inline-flex rounded-full">
                                                Scambio: {event.exchange_date}
                                            </span>
                                            {event.drawn_at && (
                                                <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-400">
                                                    Estrazione completata
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route('events.show', event.id)}
                                            className="text-sm font-medium text-emerald-500 hover:text-emerald-400"
                                        >
                                            Dettagli
                                        </Link>
                                        {!event.drawn_at && (
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(event.id)}
                                                className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                                            >
                                                Elimina
                                            </button>
                                        )}
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


