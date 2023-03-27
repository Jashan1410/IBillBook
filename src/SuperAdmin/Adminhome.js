import React ,{ useState , useContext } from 'react'
import BillContext from '../Context/Data/BillContext'
import { useNavigate } from "react-router-dom";
import { Button , Modal , Form , Input , Select , Row , Col , InputNumber , DatePicker } from 'antd'
import { EyeTwoTone , EyeInvisibleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Option } = Select;

function Adminhome() {

    let navigate = useNavigate();
    const Contextdata = useContext(BillContext);
    const { RegisterFn , Gethistory } = Contextdata ;
    const [FormType, setFormType] = useState(null);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const [colsize, setcolsize] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = (type) => {

        setFormType(type)

        if(window.innerWidth >= 769 ){
            setcolsize(12)
        } else {
            setcolsize(24)
        }

        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = (values) => {
        if(FormType === "New Account"){
            RegisterFn(values , 'success')
        } else {
            BillContext.gethistory = values ;
            Gethistory(BillContext.gethistory.from.$d.toLocaleDateString(undefined, options) , BillContext.gethistory.to.$d.toLocaleDateString(undefined, options))
            navigate('/Admin/History')
        }
    };
    const onFinishFailed = (values) => {
        if(FormType === "New Account"){
            RegisterFn(values , 'error')
        } else {
            alert("Selet Date")
        }
    };

    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const [form] = Form.useForm();
    const TypeValue = Form.useWatch('Type', form); 


  return (
    <>

        <Modal open={open} title={FormType} onOk={handleOk} onCancel={handleCancel} footer={[  ]} >

                <Form form={form} layout="vertical"  onValuesChange={onRequiredTypeChange} initialValues={{
                   requiredMarkValue: requiredMark, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            
            {    

               FormType == "New Account"  ? 

               <>


                  <Row gutter={[16, 8]}>

                <Col span={colsize} >
                    <Form.Item name="Name" label="Name" rules={[{ required: true, message: 'Please enter Lead name' }]}>
                        <Input placeholder="Please enter Lead name" />
                    </Form.Item>
                </Col>

                <Col span={colsize} >
                <Form.Item name="Branch" label="Branch" rules={[{ required: true, message: 'Please enter Branch name' }]}>
                    <Input placeholder="Please enter Branch name" />
                </Form.Item>
                </Col>

                <Col span={colsize} >
                <Form.Item name="Phone" label="Moblie Number" rules={[{ required: true, message: 'Please enter Phone Number' }]}>
                    <InputNumber style={{ width: '100%' }} type="number" placeholder="Please enter Phone Number" />
                </Form.Item>
                </Col>

                <Col span={colsize} >
                <Form.Item name="Email" label="Email" rules={[{ required: true, message: 'Please enter Email' }]}>
                    <Input style={{ width: '100%' }} type="email" addonAfter=".com" placeholder="Please enter Email" />
                </Form.Item>
                </Col>

                <Col span={colsize} >
                <Form.Item name="Type" label="Type" rules={[{ required: true, message: 'Please choose the approver' }]}>
                    <Select placeholder="Please choose the approver">
                        <Option value="Admin">Admin</Option>
                        <Option value="Bill-Generator">Bill-Generator</Option>
                        <Option value="User">Branch-User</Option>
                    </Select>
                </Form.Item>
                </Col>

                <Col span={colsize} >
                <Form.Item name="Password" label="password" rules={[{ required: true, message: 'Please enter password' }]}>
                    <Input.Password placeholder="input password" iconRender={(visible)=> (visible ? <EyeTwoTone /> :  <EyeInvisibleOutlined />)} />
                </Form.Item>
                </Col>

            {  TypeValue === "User" ?  <>

                <Col span={colsize} >
                <Form.Item name="Load" label="Load" rules={[{ required: true, message: 'Please enter Load' }]}>
                    <InputNumber style={{ width: '100%' }} type="number" placeholder="input Load" />
                </Form.Item>
                </Col>

                <Col span={colsize} >
                <Form.Item name="Age" label="Age" rules={[{ required: true, message: 'Please enter Age' }]}>
                    <InputNumber style={{ width: '100%' }} type="number" placeholder="input Age "  addonAfter="%" />
                </Form.Item>
                </Col>
          
                </>
                :
                <></>
            }

                <Col span={24} >
                <Form.Item>
                        <Button className='bg-sky-800 text-slate-50' key="submit" htmlType='submit' type="primary" loading={loading} onClick={handleOk}>Submit</Button>
                        <Button className='ml-5' key="back" onClick={handleCancel}>Return</Button>
                </Form.Item>
                </Col>

                </Row>

                </>

                :

                <>

                <Row gutter={16}>
                        <Col span={12}>
                        <Form.Item name="from" label="From" required rules={[{ required: true, message: 'Please Selet date' }]} >
                                <DatePicker />
                        </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item name="to" label="To" required rules={[{ required: true, message: 'Please Selet date' }]} >
                                <DatePicker />
                        </Form.Item>
                        </Col>
                    </Row>
            
                <Form.Item >
                        <Button htmlType='submit' key="submit" className="bg-sky-800 h-8 text-slate-50 w-24 mt-2" type="primary" loading={loading} > Submit </Button>
                        <Button key="back" className="h-8 w-24 ml-6 mt-2" onClick={handleCancel}> Return </Button>
                </Form.Item>

                </>


            }


            </Form>
        </Modal>
        
        <div className='bg-slate-100 w-full h-96 flex flex-col items-center justify-center'>
        <h1 className='font-black text-2xl md:text-4xl'>Welecome to ibillbook</h1>
        <div className='mt-10 flex flex-col items-center justify-center md:flex-row'>
           <Link to={'/Admin/Departments'}><Button type="primary" className="bg-sky-800 h-8 mt-8 text-slate-50 md:ml-8">View Departments</Button></Link>
           <Button type="primary" onClick={()=>showModal("New Account")} className="bg-sky-800 h-8 mt-8 text-slate-50 md:ml-8">Add Department</Button>
           <Button onClick={()=>showModal("Search History")} type="primary" className="bg-sky-800 h-8 mt-8 text-slate-50 md:ml-8">View History</Button>
        </div>
        </div>
    </>
  )
}

export default Adminhome
