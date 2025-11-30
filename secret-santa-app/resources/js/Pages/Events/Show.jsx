import { Link, Head, router } from '@inertiajs/react';
import { Card, CardHeader, CardBody, Button, Divider, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, card } from "@heroui/react"; 

export default function Show({ event, participants }) {
    return (
        <>
            <Head title={`Partecipanti - ${event.name}`} />
            <div className="text-foreground sm:p-8 min-h-screen mx-auto w-full max-w-4xl space-y-8">
                <Card>
                    <CardHeader className="justify-between">
                        <div className="text-3xl">
                            <h1 className="font-bold ">{event.name}</h1>
                        </div>
                        
                        <Link
                            href={route('events.index')}
                            className='text-lg font-semibold text-emerald-500 hover:text-emerald-300'
                        >
                            Torna alla lista
                        </Link>
                    </CardHeader>

                    <Divider />
                </Card>
            </div>
        </>
        
    );
}