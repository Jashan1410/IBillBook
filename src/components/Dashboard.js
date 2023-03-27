import React, { useContext } from 'react'
import { Button, InputNumber } from 'antd';
import BillContext from '../Context/Data/BillContext'

function Dashboard() {

  const Contextdata = useContext(BillContext);
  const { Amount , setAmount , GetResultFn } = Contextdata ;

  function onChange(value) {
    setAmount({ ...Amount , RS : value })
  }

    return (
      <>
      <div className='bg-slate-100 w-full h-96 flex flex-col items-center justify-center'>
      <h1 className='m-4 font-black text-2xl md:text-4xl'>Welecome to ibillbook</h1>
      <h1 className='m-4 font-black text-2xl md:text-3xl'>Enter the amount</h1>
      <div className='mt-4 flex items-center justify-center'>
        <InputNumber required type="number" min={1} max={9999999} value={Amount.RS} onChange={onChange} className='mr-4 h-8 w-32' />
        <Button type="primary" htmlType="submit" onClick={() => GetResultFn(Amount.RS)} className="bg-sky-800 h-8 text-slate-50">Check Result</Button>
      </div>
      </div>
      </>
    )
  
}

export default Dashboard

