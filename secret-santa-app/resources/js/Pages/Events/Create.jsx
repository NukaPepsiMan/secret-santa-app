import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardBody, Form, Input, Button, Link, Spacer } from "@heroui/react"; 

export default function Create({ events }) {
    return (
        <>
            <Head title='Crea Evento'/>
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-lg" shadow="lg" radius="lg">
                    <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-divider">
                        <div>
                            <h1 className="text-xl font-bold text-foreground">
                                Crea nuovo evento
                            </h1>
                            <p className="text-xs text-default-500 mt-1">
                                Imposta nome, data dello scambio e budget.
                            </p>
                        </div>
                        <Link
                            
                            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Torna alla lista
                        </Link>
                    </CardHeader>
                    <CardBody className="px-6 py-8">
                        <form  className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="event-name"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Nome evento
                                </label>
                                <Input
                                    id="event-name"
                                    placeholder='nome'
                                    isRequired
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="exchange-date"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Data scambio regali
                                    </label>
                                    <Input
                                        id="exchange-date"
                                        type="date"
                                        isRequired
                                    />
                            </div>

                            <div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="budget"
                                        className="text-sm font-medium text-foreground "
                                    >
                                        Budget massimo (€)
                                    </label>
                                    <Input
                                        id="budget"
                                        type="number"
                                        min="1"
                                        isRequired
                                    />
                                </div>
                            </div>

                            <Spacer y={2} />

                            <Button
                                type="submit"
                                color="success"
                                radius="full"
                                fullWidth
                                className="font-bold shadow-lg"
                            >
                                Crea evento
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}