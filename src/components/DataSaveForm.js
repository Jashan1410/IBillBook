import React , { useState , useContext } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input , DatePicker , InputNumber } from 'antd';
import BillContext from '../Context/Data/BillContext'

function Save() {
    
    const Contextdata = useContext(BillContext);
    const { Savefn , Amount } = Contextdata ;
    
    const onFinish = (values) => {
        let billAmount = prompt("Please confirm your amount", Amount.RS );
        if(billAmount){
            Savefn(values , "success" , billAmount)
        }
    };
    const onFinishFailed = (values) => {
        Savefn(values , "error" , "error")
    };

    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    return (
        <>

        <div className="container  mx-auto p-12">

        <Form name="basic" layout="vertical" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }}  onValuesChange={onRequiredTypeChange} initialValues={{
             requiredMarkValue: requiredMark, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">

            <Form.Item label="Name" name="Name" required  rules={[ { required: true, message: 'Please enter your Name!' , }, ]} tooltip={{ title: 'This is a required field' , icon: <InfoCircleOutlined />, }}>
                <Input  placeholder="Name" />
            </Form.Item>

            <Form.Item  label="Bill Amount" required name="Amount" >
                <InputNumber min={1} max={9999999} initialValues={Amount.RS} />
            </Form.Item>


            <Form.Item label="Bill generate data" name="generate" required rules={[ { required: true, message: 'Please select your Bill due data!' , }, ]} >
                <DatePicker required />
            </Form.Item>

            <Form.Item label="Bill due data" name="due" required rules={[ { required: true, message: 'Please select your Bill due data!' , }, ]} >
                <DatePicker required />
            </Form.Item>

            <Form.Item >
               <Button type="primary" htmlType="submit" className="bg-sky-800 border-4 h-10 text-slate-50 w-28 m-4">
                    Submit
                </Button>
            </Form.Item>
        </Form>

        </div>

        </>
    );
    
};

export default Save;
