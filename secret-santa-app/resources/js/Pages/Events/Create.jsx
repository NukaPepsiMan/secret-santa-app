import { Link, Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardBody, Form, Input, Button, CardFooter } from "@heroui/react"; 

export default function Create({}) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        exchange_date: '',
        budget: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.store'));
    };

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
                            href={route('events.index')}
                            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Torna alla lista
                        </Link>
                    </CardHeader>
                    <CardBody className="px-6 py-8">
                        <Form className="grid grid-cols-[180px_1fr] gap-y-6 gap-x-4 items-center"
                                onSubmit={handleSubmit}>
                            <label
                                htmlFor="event-name"
                                className="text-sm font-medium text-foreground"
                            >
                                Nome evento
                            </label>
                            <Input 
                                id="event-name" 
                                placeholder='nome'
                                value={data.name}
                                onValueChange={(val) => setData('name', val)}
                                isInvalid={!!errors.name}
                                errorMessage={errors.name}
                                isRequired 
                            />

                            <label
                                htmlFor="exchange-date"
                                className="text-sm font-medium text-foreground"
                            >
                                Data scambio regali
                            </label>
                            <Input 
                                id="exchange-date" 
                                type="date"
                                value={data.exchange_date}
                                onValueChange={(val) => setData('exchange_date', val)}
                                isInvalid={!!errors.exchange_date}
                                errorMessage={errors.exchange_date}
                                isRequired 
                            />

                            <label
                                htmlFor="budget"
                                className="text-sm font-medium text-foreground"
                            >
                                Budget (€)
                            </label>
                            <Input 
                                id="budget"
                                type="number"
                                min="1"
                                placeholder='€' 
                                value={data.budget}
                                onValueChange={(val) => setData('budget', val)}
                                isInvalid={!!errors.budget}
                                errorMessage={errors.budget}
                                isRequired
                            />
                            <Button
                                type="submit"
                                color="success"
                                radius="full"
                                fullWidth
                                className="font-bold shadow-lg col-span-2"
                                isLoading={processing}
                            >
                                Crea evento
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}