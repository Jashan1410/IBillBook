import React , { useEffect , useState } from 'react';
import { Result , Progress } from 'antd';
import { useNavigate , useLocation } from "react-router-dom";

function Error() {

  let navigate = useNavigate();
  let location = useLocation();
  const [Count, setCount] = useState(100);

  useEffect(() => {
    setCount(100);
    setTimeout(() => {
      navigate("/");
    }, 5000);  
  }, [ location.pathname , navigate ]);

  setInterval(() => {
    setCount(Count-20);
  }, 1000);

  return (
    <>
       <Result title="Your operation has Not executed" extra={ 
        <Progress type="circle" percent={Count} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}  format={() => `Redirect in`} />
        }/>
    </>
  )
}

export default Error
