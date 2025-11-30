import { Head } from '@inertiajs/react';
import { Button } from "@heroui/react"; 

export default function Welcome() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <Head title="Welcome" />
            
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    TEST
                </h1>
                
                <Button color="primary" size="lg" variant="shadow">
                    Cliccami!
                </Button>
            </div>
        </div>
    );
}