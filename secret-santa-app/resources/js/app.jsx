import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot} from 'react-dom/client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { HeroUIProvider } from "@heroui/react";
import { router } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
       
        const root = createRoot(el);

        root.render(
            <HeroUIProvider navigate={router.visit}>
                 <NextThemesProvider attribute="class" defaultTheme='system'>
                    <App {...props} />
                 </NextThemesProvider>
            </HeroUIProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
