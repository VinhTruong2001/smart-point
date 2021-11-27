import React from 'react';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import TemplatePage from './pages/TemplatePage';
import RegisterPage from './pages/RegisterPage';
import Upgrade from './pages/Upgrade';
import Profile from './pages/Profile';
import SearchResult from './pages/SearchResult';
import Upload from './pages/Upload';
import FilterResult from './pages/FilterResult';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Homepage />
    },
    {
        path: '/template/:id',
        exact: true,
        main: ({match}) => <TemplatePage match={match}/>
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
    {
        path: '/upgrade',
        exact: true,
        main: () => <Upgrade />
    },
    {
        path: '/profile/:uid',
        exact: true,
        main: ({match}) => <Profile match={match}/>
    },
    {
        path: '/search/:value/:page',
        exact: true,
        main: ({match}) => <SearchResult match={match}/>
    },
    {
        path: '/filter/:value/:page',
        exact: true,
        main: ({match}) => <FilterResult match={match}/>
    },
    {
        path: '/upload',
        exact: true,
        main: () => <Upload />
    },
];

export default routes;