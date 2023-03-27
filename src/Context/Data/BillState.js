import React , { useState , useEffect } from "react";
import BillContext from "./BillContext";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import axios from "axios";

function Billcontext(props) {

    let navigate = useNavigate();
    const [Amount, setAmount] = useState({ RS : "" });
    const [api, contextHolder] = notification.useNotification();
    const AlertData = [api, contextHolder];
    const host = "http://localhost:5000";
    useEffect(() => {
        FetchUserFn();
    }, [ navigate ]);
    
    //  openNotificationWithIcon take four types success info warning error
    
    const openNotificationWithIcon = (type,Title,des,placement) => {
        api[type]({
            message: Title,
            description: des,
            placement,
        });
    };
    const [UserData, setUserData] = useState({});
    const [DepartmentData, setDepartmentData] = useState({"msg":"null","data":[]});
    const [history, sethistory] = useState({"msg":"null","data":[]});


    async function GetResultFn(Amt) {

        if (localStorage.getItem('token')) {
            
            if( Amt > 99 ){
                navigate("/Bill-Generator/Result")
            }
            else{
                openNotificationWithIcon('error','Amount','invaild Amount','bottomLeft');
            };

        } else {
            openNotificationWithIcon('error','Login','login required','bottomLeft');
        };
    };

    async function RegisterFn(values , bool) {
       
        try{

            if(bool === "success"){

                var data = { 

                "name": values.Name,
                "phone": values.Phone,
                "password": values.Password,
                "email": values.Email + ".com",
                "type": values.Type,
                "load": values.Load ? values.Load : "0",
                "age": values.Age ? values.Age : "0",
                "branch": values.Branch,
        
                };
        
                const customConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
                };
                     
                const respose = await axios.post(`${host}/api/authentication/Register`,data, customConfig);
                const json = await respose.data;
                
                if (json.error === "false") {
                    // localStorage.setItem('token', json.token);
                    openNotificationWithIcon(bool,'Register','Register succesfully','bottomLeft');
                    setTimeout(() => {
                        FetchUserFn();
                        navigate("/Admin/Departments");
                    }, 1000);
                
                };
           
            }
            else{
                openNotificationWithIcon('error','Register','Register failed','bottomLeft');
            };
            
        } catch (error) {
            openNotificationWithIcon('error','Register',error.response.data.msg,'bottomLeft');
        };
    

    };

    async function LoginFn(values , bool) {         
        
        try {

            if(bool === "success"){

                var data = { 
                'email': values.Username,
                'password': values.Password
                };
        
                const customConfig = {
                    headers: { 'Content-Type': 'application/json', }
                };

                const respose = await axios.post(`${host}/api/authentication/Login`,data, customConfig);
                const json = await respose.data;

                if (json.error === "false") {

                    localStorage.setItem('token', json.token);
                    localStorage.setItem('type', json.type);

                    if(json.type === "Admin"){
                        navigate("/Admin");
                    }
                    else if(json.type === "User"){
                        navigate("/User");
                    }
                    else if(json.type === "Bill-Generator"){
                        navigate("/Bill-Generator");
                    }
                    openNotificationWithIcon(bool,'Login','Login succesfull','bottomLeft');
                    FetchUserFn();
                };

            } else{
                openNotificationWithIcon('error','Login','Login failed','bottomLeft');
            };
  
        } catch (error) {
            openNotificationWithIcon('error','Login',error.response.data.msg,'bottomLeft');
        };

    };
    
    async function LogoutFn() {
        try {       
          localStorage.clear();
          navigate("/");
          openNotificationWithIcon('success','LogOut','LogOut Succesfully','bottomLeft');
        } catch (error) {
          openNotificationWithIcon('error','LogOut','error in LogOut','bottomLeft');         
        }
    };

    async function FetchDepartments() {        
        try{

            if ( localStorage.getItem('token')) {

                    const respose = await axios.get(`${host}/api/Users/fetchDepartments`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token')
                        }
                    });
                    const json = await respose.data

                    if (json.msg) {
                        setDepartmentData({"msg":json.msg,"data":null})
                    } else {
                        setDepartmentData({"msg":"","data":json})
                    };

            } else{
                setDepartmentData({"msg":"Please Login to view your Data","data":null})
            };

        } catch (error) {
        setDepartmentData({"msg":"ERROR","data":[]})
        };
    };

    async function DeletFn(id) {
        try{

            if ( localStorage.getItem('token')) {
            const respose = await axios.delete(`${host}/api/Users/deleteDepartments/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    }
                })
                const json = await respose.data;
                openNotificationWithIcon('success','Deleted',json.msg,"bottomLeft")
                FetchDepartments();
            } else{
                openNotificationWithIcon('error','error','Login reqiured','bottomLeft');
            };

        } catch (error) {
            openNotificationWithIcon('error','Delet Data',error.response.data.msg,"bottomLeft")
        };
    };

    async function EditFn(values ,bool ,id) {
        
        try{

            if ( localStorage.getItem('token')) {

                if(bool === "success"){
            
                    const usersName = JSON.stringify({ 
                        "name": values.Name,
                        "branch": values.Branch,
                        "phone": values.Phone,
                        "password": values.Password,
                        "email": values.Email + ".com",
                        "type": values.Type,
                        "load": values.Load ? values.Load : "0",
                        "age": values.Age ? values.Age : "0",
                        });
            
                    const customConfig = {
            
                        headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                        }
                        };
            
                    const respose = await axios.put(`${host}/api/Users/UpdateDepartment/${id}`, usersName, customConfig  );
            
                    const json = await respose.data;
    
                    openNotificationWithIcon('success','Updated',json.msg,"bottomLeft");
                    FetchDepartments();

                } else{
                    openNotificationWithIcon(bool,'error','Syntax Error','bottomLeft');
                };

            } else{
                openNotificationWithIcon('error','error','Login reqiured','bottomLeft');
            };
    
        } catch (error) {
        openNotificationWithIcon('warning' , 'Update Error' , error.response.data.msg,"bottomLeft")
        };
        
    };

    async function Savefn(values , bool , billAmount) {

        try{

            if ( localStorage.getItem('token') && Amount.RS == billAmount) {

                if(bool === "success"){

                    var data = { 

                        "name": values.Name,
                        "amount": billAmount,
                        "generate": values.generate.$d,
                        "due": values.due.$d,              
                        };
                        
                
                        const customConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token'),
                        }
                        };
                            

                    const respose = await axios.post(`${host}/api/History/SaveHistory`,data, customConfig);
                    const json = respose.data;

                    if(json.error === "false"){
                        navigate("/Bill-Generator/Succes")
                        openNotificationWithIcon(bool,'Saved',json.msg,'bottomLeft');
                    }

                }
                else{
                    navigate("/Bill-Generator/Error");
                    openNotificationWithIcon(bool,'error','Thanks for using our site','bottomLeft');
                }

            } else{
                openNotificationWithIcon('error','Amount','Invail Amount','bottomLeft');
            };
  
        } catch (error) {
            openNotificationWithIcon('error','Login',error.response.data.msg,'bottomLeft');
        };


    };

    async function Gethistory(start , end) {
        try{

            if ( localStorage.getItem('token') && start && end) {

                    var data = { 
                        "start": start,
                        "end": end,           
                        }; 
                
                        const customConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': localStorage.getItem('token'),
                        }
                        };
                            

                    const respose = await axios.post(`${host}/api/History/GetHistory`, data , customConfig);
                    
                    if(respose.data.error === "false"){
                        sethistory({"msg":respose.data.msg
                        ,"data":respose.data.response});
                    } else {
                        sethistory({"msg":respose.data.msg,"data":null});
                    }
                }
  
        } catch (error) {
        };

        
    }

    async function FetchUserFn() {

        try {
            
            if(localStorage.getItem('token')){

                const customConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token') ,
                    }
                    };

                const respose = await axios.get(`${host}/api/authentication/Authication` , customConfig);
                const json = await respose.data;

                if (json.error === "false") {
                    setUserData(json.user)
                };
            }

        } catch (error) {
            setUserData({});
            localStorage.clear();
            navigate("/");
        };
        
    };

  return (
        <BillContext.Provider
        value={{ AlertData, DepartmentData , history ,  Gethistory, DeletFn , EditFn , openNotificationWithIcon , setDepartmentData , Amount , setAmount , Savefn  , LoginFn , RegisterFn , LogoutFn , GetResultFn , UserData , FetchDepartments , FetchUserFn }}>
        {props.children}
        </BillContext.Provider>   
  )
}

export default Billcontext