import React from 'react';
import Navbar from './components/Navbar';
import Result from './components/Result'
import Dashboard from './components/Dashboard';
import DataSaveForm from './components/DataSaveForm';
import Error from './components/Error';
import About from './components/About';
import Succes from './components/Succes';
import Demo from './components/Drawer';
import Billcontext from './Context/Data/BillState'
import {
  createBrowserRouter,
  Outlet
} from "react-router-dom";

function App() {

  return (
    <>
    <Billcontext>
    <Navbar></Navbar>
    <Outlet />
    </Billcontext>
    </>
  );
}

const appRouter = createBrowserRouter([
  {
      path: '/',
      element: <App/>,
      errorElement: <Error />,
      children: [
          {
              path: '/',
              element: <Dashboard />
          },
          {
              path: '/Result',
              element: <Result />
          },
          {
              path: '/DataSaveForm',
              element: <DataSaveForm />
          },
          {
              path: '/About',
              element: <About />
          },
          {
              path: '/Succes',
              element: <Succes />
          },
          {
              path: '/demo',
              element: <Demo />
          }
      ]
    }
]);

export default appRouter;