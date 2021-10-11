import React from 'react';
import Homepage from './pages/Homepage';
import Template from './pages/Template';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Homepage />
    },
    {
        path: '/template',
        exact: true,
        main: () => <Template />
    }
];

export default routes;