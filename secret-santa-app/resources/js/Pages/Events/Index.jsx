import { Link, Head } from '@inertiajs/react';
import { Card, CardHeader, CardBody, Button, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, card } from "@heroui/react"; 

export default function Index({ events }) {
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

                <Card className='border-none bg-content-1' radius='lg'>
                    <CardBody className='py-12 text center'>
                        <p className='text-default-500 text-lg'>Nessun evento presente</p>

                    </CardBody>
                </Card>
            </Card>
        </div>
    );
}