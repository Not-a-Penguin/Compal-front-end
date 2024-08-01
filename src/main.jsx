import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'

import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom';

//Importar paginas
//import MainPage from './pages/file-page.jsx'
//import LoadingScreen from './loading-screen/loading-screen.jsx';
import InitialLogin from './login/login-screen.jsx';

const router = createBrowserRouter([
    {
        element:<App/>,
        children:[
            /*{
                path:"/",
                element:<MainPage/>,     
            },
            {
                path:"/loading-screen",
                element:<LoadingScreen/>,
            },*/
            {
                path:"/",
                element:<InitialLogin/>,
            }

        ],
    }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
);
