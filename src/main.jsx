import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Classes from './components/Classes';
import ClassDetail from './components/ClassDetails';
import Weapons from './components/Weapons.jsx';
import WeaponInformation from './components/WeaponInformation.jsx';
import WeaponDetail from './components/WeaponDetails.jsx';
import Perks from './components/Perks.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'classes',
                element: <Classes />,
                children: [
                    {
                        path: ':className',
                        element: <ClassDetail />,
                    },
                ],
            },
            {
                path: 'weapons',
                element: <Weapons />,
                children: [
                    {
                        index: true,
                        element: <WeaponInformation />,
                    },
                    {
                        path: ':weaponName',
                        element: <WeaponDetail />,
                    },
                ],
            },
            {
                path: 'perks',
                element: <Perks />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
