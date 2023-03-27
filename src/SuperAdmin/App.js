import React from 'react'
import Billcontext from '../Context/Data/BillState'
import { Outlet } from "react-router-dom";
import Navbar from '../Components/Navbar';

function App() {

  return (
    <>
        <Billcontext>
        <Navbar type="Admin"></Navbar>
        <Outlet />
        </Billcontext>
    </>
  )
}

export default App