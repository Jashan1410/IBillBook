import Navbar from './Components/Navbar';
import Result from './Components/Result'
import Dashboard from './Components/Dashboard';
import DataSaveForm from './Components/DataSaveForm';
import Error from './Components/Error';
import About from './Components/About';
import Succes from './Components/Succes';
import Billcontext from './Context/Data/BillState'
import Login from './Components/Login';
import SuperAdminApp from './SuperAdmin/App';
import UserApp from './User/App';
import React from 'react';
import { createBrowserRouter, Outlet } from "react-router-dom";
import UserDashboard from './User/UserDashboard'
import History from './User/History';
import Adminhome from './SuperAdmin/Adminhome';
import Departments from './SuperAdmin/Departments';

function App() {

  return (
    <>
    <Billcontext>
    <Navbar type="Bill-Generator"></Navbar>
    <Outlet />
    </Billcontext>
    </>
  );
}

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Billcontext><Login/></Billcontext>,
        errorElement: <Error />
    },
    {
        path: '/Admin',
        element: <SuperAdminApp/>,
        errorElement: <Error />,
        children: [
            {
                path: '',
                element: <Adminhome />
            },
            {
                path: 'Departments',
                element: <Departments />
            },
            {
                path: 'History',
                element: <History />
            },
            {
                path: 'About',
                element: <About />
            },
            {
                path: 'Succes',
                element: <Succes />
            }
        ]
    },
    {
        path: '/User',
        element: <UserApp/>,
        errorElement: <Error />,
        children: [
            {
                path: '',
                element: <UserDashboard />
            },
            {
                path: 'About',
                element: <About />
            },
            {
                path: 'Succes',
                element: <Succes />
            },
            {
                path: 'History',
                element: <History />
            }
        ]
    },
    {
        path: '/Bill-Generator',
        element: <App/>,
        errorElement: <Error />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'Result',
                element: <Result />
            },
            {
                path: 'DataSaveForm',
                element: <DataSaveForm />
            },
            {
                path: 'About',
                element: <About />
            },
            {
                path: 'Succes',
                element: <Succes />
            },
            {
                path: 'Login',
                element: <Login />
            }
        ]
    }
]);

export default appRouter;