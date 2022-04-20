import React from 'react';
import {render} from "react-dom";
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './scss/main.scss'

// boilerplate template of the app
import App from './App';

// A page component that renders within the app
import Contacts from './components/contacts';

/**
 * Define the routes (pages).
 */
const routes =
    <Routes>
        <Route path="/contacts" exact element={<Contacts/>} />
        <Route path="/" element={<Navigate replace to="/contacts" />} />
    </Routes>;

const router = (
    <HashRouter>
        <App routes={routes} />
    </HashRouter>
);

render(router, document.getElementById('root'));

registerServiceWorker();
