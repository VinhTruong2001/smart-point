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
import LatesTemplates from './pages/LatesTemplates';
import PopularTemplates from './pages/PopularTemplates';
import DownloadedTemplates from './pages/DownloadedTemplates';
import FavoriteTemplates from './pages/FavoriteTemplates';
import ProfileTemplatesUploaded from './pages/ProfileTemplatesUploaded';

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
        path: '/profile/:uid/upload/:page',
        exact: true,
        main: ({match}) => <ProfileTemplatesUploaded match={match}/>
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
    {
        path: '/latest/:page',
        exact: true,
        main: ({match}) => <LatesTemplates match={match}/>
    },
    {
        path: '/popular/:page',
        exact: true,
        main: ({match}) => <PopularTemplates match={match}/>
    },
    {
        path: '/downloaded',
        exact: true,
        main: () => <DownloadedTemplates />
    },
    {
        path: '/favorite',
        exact: true,
        main: () => <FavoriteTemplates />
    },
];

export default routes;