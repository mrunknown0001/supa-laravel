import './bootstrap.js';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

import { route } from 'ziggy-js';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {

        // ✅ correct Ziggy location
        const ziggy = props.initialPage.props.ziggy;

        // ✅ provide Ziggy object (optional)
        window.Ziggy = ziggy;

        // ✅ this is the important one:
        window.route = (name, params = {}, absolute = true) =>
            route(name, params, absolute, ziggy);

        createRoot(el).render(<App {...props} />);
    },
});
