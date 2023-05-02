import React , { useContext , useState , useEffect } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox , Select } from 'antd';
import BillContext from '../Context/Data/BillContext'
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function Login(props) {

    let navigate = useNavigate();
    
    useEffect(() => {

        if(localStorage.getItem('token') && localStorage.getItem('type')){
            var type = "/".concat(localStorage.getItem('type'));
            navigate(type)
        }

    }, [ navigate ]);
    
    const Contextdata = useContext(BillContext);
    const { AlertData , LoginFn } = Contextdata ;
    const [api, contextHolder] =  AlertData ;
    
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
    };

    const onLoginFinish = (values) => {
        LoginFn(values , "success")
    };
    const onLoginFinishFailed = (values) => {
        LoginFn(values , "error")
    };

  return (
    <>

        <div className="bg-red-100 w-screen h-screen flex items-center justify-center">

            <div className='flex items-center justify-center'>
                
                <div className='w-0 bg-red-900 loginside md:w-72' style={{"boxShadow" : "0px 0px 50px #000000" , "height":"28rem"}}></div>
        
                <div className='border-2 w-72 border-808080 flex flex-col items-center justify-center bg-white' style={{"boxShadow" : "0px 0px 50px #000000" , "height":"28rem"}}>

                    <h1 className='font-bold mb-12 mt-2 font-mono'>Welcome Back</h1>
                
                    <Form className='w-68 h-68 overflow-hidden' form={form} layout="vertical" initialValues={{ requiredMarkValue: requiredMark , remember: true , }}
                        onValuesChange={onRequiredTypeChange} requiredMark={requiredMark} onFinish={onLoginFinish} onFinishFailed={onLoginFinishFailed} autoComplete="off">
                        
                        <Form.Item label="Username" name="Username" required tooltip="This is a required field"  rules={[ { required: true, message: 'Please select your Username!' , }, ]}>
                            <Input placeholder="input Your Username" />
                        </Form.Item>

                        <Form.Item label="Password" name="Password" required tooltip={{ title: 'Secure password' , icon: <InfoCircleOutlined />,}}  rules={[ { required: true, message: 'Please select your Password!' , }, ]}>
                            <Input.Password placeholder="input Your Password" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='bg-sky-800 h-8 text-slate-50' onClick={props.oncloseLoginDrawer} >Login</Button>
                        </Form.Item>

                    </Form>

                    <h1 className='mt-6 mb-2'>New user <a className=' text-blue-600'>signup</a></h1>

                </div>

            </div>

            {contextHolder}

        </div>

    </>
  )
}

export default Login