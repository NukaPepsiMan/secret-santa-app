import { Head, Link } from '@inertiajs/react';

export default function Assignment({ event, receiver, wishlistItems }) {
    return (
        <>
            <Head title="La tua assegnazione" />
            <div className="min-h-screen bg-background p-4 sm:p-8">
                <div className="mx-auto w-full max-w-3xl space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold text-foreground">
                            La tua assegnazione
                        </h1>
                        <Link
                            href={route('events.my-events')}
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Torna ai miei eventi
                        </Link>
                    </div>

                    <div className="rounded-lg border border-divider bg-content1 p-6 space-y-2">
                        <p className="text-sm text-default-500">Evento</p>
                        <p className="text-lg font-semibold text-foreground">
                            {event.name}
                        </p>
                        <p className="text-sm text-default-500">
                            Data scambio: {event.exchange_date} • Budget: €{event.budget}
                        </p>
                    </div>

                    <div className="rounded-lg border border-divider bg-content1">
                        <div className="border-b border-divider px-6 py-4">
                            <h2 className="text-lg font-semibold text-foreground">
                                Dovrai fare il regalo a
                            </h2>
                        </div>
                        <div className="space-y-1 px-6 pb-6 pt-3">
                            <p className="text-base font-semibold text-foreground">
                                {receiver.name}
                            </p>
                            <p className="text-sm text-default-500">{receiver.email}</p>
                        </div>
                    </div>

                    <div className="rounded-lg border border-divider bg-content1">
                        <div className="border-b border-divider px-6 py-4">
                            <h2 className="text-lg font-semibold text-foreground">
                                Wishlist di {receiver.name}
                            </h2>
                        </div>
                        <div className="space-y-3 px-6 pb-6 pt-3">
                            {wishlistItems.length === 0 ? (
                                <p className="text-sm text-default-500">
                                    Nessun desiderio specificato per questo evento.
                                </p>
                            ) : (
                                wishlistItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="space-y-1 rounded-md border border-divider bg-content1/80 p-3"
                                    >
                                        <p className="text-sm font-semibold text-foreground">
                                            {item.name}
                                        </p>
                                        {item.description && (
                                            <p className="text-xs text-default-600">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

