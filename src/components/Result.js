import React , { useState , useContext } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal , Form, Input , Row , InputNumber } from 'antd';
import BillContext from '../Context/Data/BillContext'
import ListDepts from './ListDepts';


function Result() {

    const Contextdata = useContext(BillContext);
    const { DepartmentData , Amount , AddDeptFn } = Contextdata ;

    const onFinish = (values) => {
        AddDeptFn(values , "success");
    };
    const onFinishFailed = (values) => {
        AddDeptFn(values , "error");
    };
    

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

 
    return (
        <>

        {/*  modal form add new departments */}

        <Modal open={open} title="Add new Department" onOk={handleOk} onCancel={handleCancel} footer={[ <Button key="back"
        onClick={handleCancel}>
        Return
        </Button>,
        <Button key="link" href="https://google.com" type="primary" loading={loading} onClick={handleOk}>
            Search on Google
        </Button>,
        ]}
        >
        
        <Form className='mt-4' name="basic" layout="vertical" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{
        remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">

        <Form.Item label="Name" name="Name" required rules={[ { required: true, message: 'Please enter your name!' , }, ]}>
            <Input placeholder='Gurpreet Singh' />
        </Form.Item>

        <Form.Item label="Load" name="Load" required rules={[ { required: true, message: 'Please enter your Load!' , }, ]}>
            <InputNumber type="number" placeholder='Enter Load in percentage' />
        </Form.Item>

        <Form.Item >
            <Button key="submit" type="primary" htmlType="submit" loading={loading} onClick={handleOk} className="bg-sky-800 h-8 text-slate-50 w-28">
            Submit
            </Button>
        </Form.Item>

        </Form>

        </Modal>


        {/* List all departments */}

        <div className="container mx-auto p-12">

        <Row gutter={[48, 48]} >

       {DepartmentData.map((Data)=>(<ListDepts key={Data.id} Data={Data} Amount={Amount.RS}></ListDepts>))}

        </Row>

        </div>

        {/*  button to save or open modal */}
        
        <Link to={"/DataSaveForm"}><Button type="primary" className="bg-sky-800 h-8 text-slate-50 w-28 m-4">SAVE IT</Button></Link>
        <Button key="button" type="primary" className="bg-sky-800 h-8 text-slate-50 w-28 m-4" onClick={showModal}>
        Add Dep
        </Button>

        </>
    );
  
}

export default Result