import React , { useContext , useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Row } from 'antd';
import BillContext from '../Context/Data/BillContext'
import ListDepts from './ListDepts';
import { useNavigate } from "react-router-dom";


function Result() {

    const Contextdata = useContext(BillContext);
    const { FetchDepartments , DepartmentData } = Contextdata ;
    let navigate = useNavigate();

    useEffect(() => {
       if(localStorage.getItem('token')){
        FetchDepartments()
       }
    }, [ navigate ]);
 
    return (
        <>

        {/* List all departments */}

        <div className="container mx-auto p-12">
            <Row gutter={[48, 48]} >        
                <ListDepts  Data={DepartmentData}></ListDepts>
            </Row>
        </div>

        {/*  button to save or open modal */}
        
        <Link to={"/Bill-Generator/DataSaveForm"}><Button type="primary" className="bg-sky-800 h-8 text-slate-50 w-28 m-4">SAVE IT</Button></Link>

        </>
    );
  
}

export default Result