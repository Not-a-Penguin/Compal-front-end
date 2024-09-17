import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginScreen from "./login-screen/login-screen.jsx";
// import LoadingScreen from "./loading-screen/loading-screen.jsx";
import RegisterScreen from "./register-screen/register-screen.jsx";
import ApplicationMain from "./application-main/application-main.jsx";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginScreen/>,
    },
    {
        path: "/login",
        element: <LoginScreen />,
    },
    {
        path: "/register",
        element: <RegisterScreen/>
    },
    {
        path: "/main",
        element: <ApplicationMain/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
