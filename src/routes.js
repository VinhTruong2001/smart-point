import React from 'react';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import TemplatePage from './pages/TemplatePage';
import RegisterPage from './pages/RegisterPage';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Homepage />
    },
    {
        path: '/template',
        exact: true,
        main: () => <TemplatePage />
    },
    {
        path: '/login',
        exact: true,
        main: () => <LoginPage />
    },
    {
        path: '/register',
        exact: true,
        main: () => <RegisterPage />
    },
];

export default routes;