import React from 'react';
import Navbar from '../Components/Navbar';
import Billcontext from '../Context/Data/BillState'
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
        <Billcontext>
        <Navbar type="User"></Navbar>
        <div className='User'>
        <Outlet />
        </div>
        </Billcontext>
    </>
  )
}

export default App
