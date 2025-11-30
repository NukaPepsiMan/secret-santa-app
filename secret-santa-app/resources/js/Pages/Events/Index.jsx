import { Link, Head, router } from '@inertiajs/react';
import { Card, CardHeader, CardBody, Button, Divider, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, card } from "@heroui/react"; 

export default function Index({ events }) {
    const handleDelete = (id) => {
        router.delete(route('events.destroy', id));
    };
    return (
        <div className="text-foreground sm:p-8 min-h-screen mx-auto w-full max-w-4xl space-y-8">
            <Head title="Secret Santa" />
            
            <Card>
                <CardHeader className="justify-between">
                    <div className="text-3xl">
                        <h1 className="font-bold ">Lista Eventi</h1>
                    </div>
                    
                    <Link
                        href={route('events.create')}
                        className='text-lg font-semibold text-emerald-500 hover:text-emerald-300'
                    >
                        Crea Evento
                    </Link>
                </CardHeader>

                <Divider />

                {events.length === 0 ? (
                    <Card className='border-none bg-content-1' radius='lg'>
                        <CardBody className='py-12 text center'>
                            <p className='text-default-500 text-lg'>Nessun evento presente</p>
    
                        </CardBody>
                    </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {events.map((event) => (
                                <Card
                                    key={event.id}
                                    className="border-none hover:bg-content2 transition-colors"
                                    radius="lg"
                                >
                                    <CardBody className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-xl font-bold text-foreground">
                                                {event.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    color="success"
                                                    radius="full"
                                                >
                                                    Budget: € {event.budget}
                                                </Chip>
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    color="default"
                                                    radius="full"
                                                >
                                                    Scambio: {event.exchange_date}
                                                </Chip>
                                                {event.drawn_at && (
                                                    <Chip
                                                        size="sm"
                                                        variant="flat"
                                                        color="primary"
                                                        radius="full"
                                                    >
                                                        Estrazione completata
                                                    </Chip>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <Link
                                                //href={route('events.show', events.id)}
                                                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                                            >
                                                Dettagli
                                            </Link>
                                            <Button
                                                size="sm"
                                                color="danger"
                                                variant="solid"
                                                radius="full"
                                                className="font-medium"
                                                onPress={() => handleDelete(event.id)}
                                            >
                                                Elimina
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )}
            </Card>
        </div>
    );
}