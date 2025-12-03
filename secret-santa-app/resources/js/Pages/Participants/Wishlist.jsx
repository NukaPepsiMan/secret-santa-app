import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Wishlist({ participantId, event, wishlistItems }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('wishlist.store', participantId));
    };
    
    const handleDelete = (deleteItem) => {
        router.delete(route('wishlist.destroy', deleteItem.id));
    };

    const [editingItem, setEditingItem] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', description: '' });
    const canEdit = editForm.name.trim().length > 0;

    const handleEditSave = () => {
        router.patch(route('wishlist.update', editingItem.id), editForm, {
            onFinish: () => setEditingItem(null),
        });
    };

    return (
        <>
            <Head title={`Wishlist - ${event.name}`} />
            <div className="min-h-screen bg-background p-4 sm:p-8">
                <div className="mx-auto w-full max-w-4xl space-y-8">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                La mia wishlist
                            </h1>
                            <p className="text-default-500">
                                Evento: {' '}
                                <span className="font-semibold text-foreground">
                                    {event.name}
                                </span>{' '}
                                • Budget: {' '}
                                <span className="font-semibold text-success">
                                    €{event.budget}
                                </span>
                            </p>
                        </div>
                        <Link
                            href={route('events.my-events')}
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Torna ai miei eventi
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
                        <div className="md:col-span-1 rounded-lg border border-divider bg-content1">
                            <div className="px-6 pt-6 pb-0">
                                <h3 className="text-xl font-bold text-foreground">
                                    Aggiungi desiderio
                                </h3>
                            </div>
                            <div className="flex flex-col gap-4 p-6">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex flex-col gap-1 text-sm">
                                        <label
                                            htmlFor="wishlist-name"
                                            className="font-medium text-foreground"
                                        >
                                            Oggetto
                                        </label>
                                        <input
                                            id="wishlist-name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Cosa ti piacerebbe ricevere?"
                                            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-default-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                                                errors.name
                                                    ? 'border-red-500 text-red-200'
                                                    : 'border-divider'
                                            }`}
                                        />
                                        {errors.name && (
                                            <p className="text-xs text-red-400">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1 text-sm">
                                        <label
                                            htmlFor="wishlist-description"
                                            className="font-medium text-foreground"
                                        >
                                            Note / Link
                                        </label>
                                        <textarea
                                            id="wishlist-description"
                                            rows={3}
                                            value={data.description}
                                            onChange={(e) =>
                                                setData('description', e.target.value)
                                            }
                                            placeholder="Descrizione, link al prodotto..."
                                            className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-default-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                                                errors.description
                                                    ? 'border-red-500 text-red-200'
                                                    : 'border-divider'
                                            }`}
                                        />
                                        {errors.description && (
                                            <p className="text-xs text-red-400">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="rounded-full px-4 py-2 text-sm font-semibold
                                             text-white bg-emerald-600 hover:bg-emerald-700"      
                                    >
                                        {processing ? 'Salvataggio...' : 'Aggiungi alla lista'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                            {wishlistItems.length === 0 ? (
                                <div className="rounded-lg border-2 border-dashed border-divider py-12 text-center space-y-2 px-4">
                                    <p className="text-lg font-semibold text-foreground">
                                        La tua lista è vuota
                                    </p>
                                    <p className="text-default-500">
                                        Aggiungi qualche idea per aiutare chi dovrà farti il
                                        regalo.
                                    </p>
                                </div>
                            ) : (
                                wishlistItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-row items-start justify-between gap-4 rounded-lg border border-divider bg-content1 p-5 shadow-sm"
                                    >
                                        <div className="flex w-full flex-col gap-2">
                                            <h4 className="text-lg font-bold text-foreground">
                                                {item.name}
                                            </h4>
                                            {item.description && (
                                                <p className="rounded-md bg-content3/30 p-2 text-sm text-default-600">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingItem(item)}
                                                className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                                            >
                                                Modifica
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item)}
                                                className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                                            >
                                                Elimina
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {editingItem && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-xl">
                                <h2 className="mb-2 text-lg font-semibold text-foreground">
                                    Modifica Regalo
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1 text-sm">
                                        <label
                                            htmlFor="edit-name"
                                            className="font-medium text-foreground"
                                        >
                                            Oggetto
                                        </label>
                                        <input
                                            id="edit-name"
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                }))
                                            }
                                            className="w-full rounded-md border border-divider bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-default-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 text-sm">
                                        <label
                                            htmlFor="edit-description"
                                            className="font-medium text-foreground"
                                        >
                                            Note / Link
                                        </label>
                                        <textarea
                                            id="edit-description"
                                            rows={3}
                                            value={editForm.description}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            className="w-full rounded-md border border-divider bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-default-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditingItem(null)}
                                        className="rounded-full px-4 py-2 text-sm font-medium text-default-200 hover:bg-zinc-800"
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleEditSave}
                                        className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                                            canEdit
                                                ? 'bg-emerald-600 hover:bg-emerald-700'
                                                : 'bg-emerald-800/40 cursor-not-allowed'
                                        }`}
                                    >
                                        Salva modifiche
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    </div>
                </div>
            </div>
        </>
    );
}


