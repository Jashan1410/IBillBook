import React , { useState } from "react";
import BillContext from "./BillContext";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
// import axios from "axios";

function Billcontext(props) {

    let navigate = useNavigate();
    const [Amount, setAmount] = useState({ RS : "" });
    const [api, contextHolder] = notification.useNotification();
    const AlertData = [api, contextHolder];

    //  openNotificationWithIcon take four types success info warning error

    const openNotificationWithIcon = (type,Title,des,placement) => {
        api[type]({
          message: Title,
          description: des,
          placement,
        });
      };

    const [DepartmentData, setDepartmentData] = useState([
        {
            "name": "gurpreet",
            "Load" : "50",
            "id" : "1ejbdsjbvkj"
        },
        {
            "name": "jashan",
            "Load" : "15",
            "id" : "2efjabhfkajbce"
        },
        {
            "name": "sahil",
            "Load" : "35",
            "id" : "3jaejcnjjc"
        }
    ]);

    function LoginFn(values , bool) {
        console.log( bool , values ); 
        if(bool === "success"){
            openNotificationWithIcon(bool,'Login','Login succesfull','bottomLeft');
            localStorage.setItem('token', bool);
            navigate("/")
        }
        else{
            openNotificationWithIcon(bool,'Login','Login failed','bottomLeft');
        }   
    };


    function RegisterFn(values , bool) {
        console.log( bool , values ); 
        if(bool === "success"){
            openNotificationWithIcon(bool,'Register','Register succesfull','bottomLeft');
            localStorage.setItem('token', bool);
            navigate("/")
        }
        else{
            openNotificationWithIcon(bool,'Register','Register failed','bottomLeft');
        }   
    };

    function Savefn(values , bool) {
        console.log( bool , values ); 
        if(bool === "success"){
            navigate("/Succes")
            openNotificationWithIcon(bool,'Saved','Thanks for using our site','bottomLeft');
        }
        else{
            navigate("/Error");
            openNotificationWithIcon(bool,'error','Thanks for using our site','bottomLeft');
        }
    };

    function AddDeptFn(values , bool) {
        console.log( bool , values ); 
        if(bool === "success"){
            navigate("/Succes")
            openNotificationWithIcon(bool,'Department Added','Thanks for using our site','bottomLeft');
        }
        else{
            navigate("/Error")
            openNotificationWithIcon(bool,'error','Thanks for using our site','bottomLeft');
        }
    };

  return (
        <BillContext.Provider
        value={{ AlertData, DepartmentData , openNotificationWithIcon , setDepartmentData , Amount , setAmount , Savefn , AddDeptFn , LoginFn , RegisterFn }}>
        {props.children}
        </BillContext.Provider>   
  )
}

export default Billcontext