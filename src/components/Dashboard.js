import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Button, InputNumber } from 'antd';
import BillContext from '../Context/Data/BillContext'

function Dashboard() {

  const Contextdata = useContext(BillContext);
  const { Amount , setAmount } = Contextdata ;

  function onChange(value) {
    setAmount({ ...Amount , RS : value })
  }

    return (
      <>
      <div className='bg-slate-100'>
      <h1 className='m-4 font-black text-2xl'>Welecome to bill Generator</h1>
      <h1 className='m-4 font-black text-2xl'>Enter the amount</h1>
      <div className='flex'>
        <InputNumber required type="number" min={1} max={9999999} value={Amount.RS} onChange={onChange} className='mx-4 mb-6' />
        <Link to={"/Result"}><Button key="button" type="primary" className="bg-sky-800 h-8 text-slate-50">Check Result</Button></Link>
      </div>
      </div>
      </>
    )
  
}

export default Dashboard

