import React , { useContext , useEffect } from 'react';
import BillContext from '../Context/Data/BillContext'
import { useNavigate  } from "react-router-dom";
import './User.css';

function History() {

    let navigate = useNavigate();
    const Contextdata = useContext(BillContext);
    const { history , Gethistory , UserData } = Contextdata ;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
      if(localStorage.getItem('token') && BillContext.gethistory){
         Gethistory(BillContext.gethistory.from.$d.toLocaleDateString(undefined, options) , BillContext.gethistory.to.$d.toLocaleDateString(undefined, options))
       } else {
        navigate('/')
       }
    }, [ navigate ]);

    function dis(text , ) {
      if(localStorage.getItem('type') === "Admin"){
        var rtext = "Rs. ".concat(text);
        return rtext
      } else {
        var amo = UserData.age/100*text
        var rtext = "Rs. ".concat(amo);
        return rtext
      }
    }

  return (
    <>    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <h1 className='Historyt'>History - Financial year</h1>
      </div>
            
          {history.msg === "" &&  history.data.map(data => 
              <div key={data._id} className='Billdata'>
              <div className='flex w-full h-full items-center justify-evenly' >
                  <div className='Item billItem'><strong>Amount</strong>   <strong className=' text-red-600'>{dis(data.amount)}</strong></div>
                  <div className='Item billItem'><strong>Due on</strong>   <strong>{new Date(data.due)?.toLocaleDateString(undefined, options)}</strong></div>
                  <div className='Item billItem'><strong>Generate</strong>   <strong>{new Date(data.generate)?.toLocaleDateString(undefined, options)}</strong></div>
              </div>
              </div>

              ||

              <div className="flex items-center justify-center">
              <h1 className='Historyt'>{history.msg}</h1>
            </div>

            )}
         
         </div>
    </>
  )
}

export default History
