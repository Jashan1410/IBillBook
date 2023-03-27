import React , { useContext , useEffect , useState } from 'react'
import BillContext from '../Context/Data/BillContext'
import { useNavigate } from 'react-router-dom';
import { Button , Table , Modal , Form , Input , Select , Row , Col , InputNumber } from 'antd'
import { EyeTwoTone , EyeInvisibleOutlined } from '@ant-design/icons';
const { Option } = Select;

function Departments() {

    const ContextData = useContext(BillContext);
    const { FetchDepartments , DeletFn , EditFn , DepartmentData } = ContextData
    const [colsize, setcolsize] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [initialValues, setinitialValues] = useState();
    const [updateid, setupdateid] = useState();
    const data = []
    let navigate = useNavigate();
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        FetchDepartments()
    }, [ navigate ]);

    const columns = [
        {
          title: 'Branch Name',
          width: window.innerWidth >= 769 ? 100 : 50 ,
          dataIndex: 'branch',
          key: 'branch',
          fixed: 'left',
          render: (text) => <a>{text?.toUpperCase()}</a>,
        },
        {
          title: 'Lead Name',
          width : window.innerWidth >= 769 ? 150 : 100,
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text?.toUpperCase()}</a>,
        },
        {
          title: 'Age',
          width : window.innerWidth >= 769 ? 70 : 40,
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Load',
          width : window.innerWidth >= 769 ? 70 : 40,
          dataIndex: 'load',
          key: 'load',
        },
        {
          title: 'Phone',
          width : window.innerWidth >= 769 ? 120 : 70,
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email ID',
          width : window.innerWidth >= 769 ? 200 : 150,
          dataIndex: 'email',
          key: 'email',
          render: (text) => <a>{text?.toUpperCase()}</a>,
        },
        {
          title: 'Date of Add',
          width : window.innerWidth >= 769 ? 200 : 150,
          dataIndex: 'date',
          key: 'date',
        //   render: (date) => <a>{date?.toLocaleDateString(undefined, options)}</a>,  
        },
        {
            title: 'Action',
            width: window.innerWidth >= 769 ? 200 : 70,
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            render: (_, { action }) => (
              <>    
                  <div className="flex flex-col items-center justify-center md:flex-row">
                     <Button onClick={()=>Remove(action)} className='w-20' type="primary" danger>Remove</Button>
                     <Button onClick={()=>Update(action)} className='bg-sky-800 w-20 mt-5 text-slate-50 md:ml-4 md:mt-0' type="primary">Update</Button>
                  </div>
              </>
            ),
          },
      ];

      for (let i = 0; i < DepartmentData.data.length; i++) {
        var element = DepartmentData.data[i]
        data.push({
          key: element.id,
          name: element.name,
          branch: element.branch,
          phone: element.phone,
          date: element.date,
          email: element.email,
          load: element.load,
          age: `${element.age}%`,
          action: element.id,
        });
      }
  
      const showModal = (id) => { 
        
        for (let i = 0; i < DepartmentData.data.length; i++) {
            var element = DepartmentData.data[i]
            if(element._id === id){
                setinitialValues(element)
                setupdateid(id)
            }
          }

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
        EditFn(values , 'success' , updateid)
      };
      const onFinishFailed = (values) => {
        EditFn(values , 'error')
      };
  
      const [requiredMark, setRequiredMarkType] = useState('optional');
      const onRequiredTypeChange = ({ requiredMarkValue }) => {
          setRequiredMarkType(requiredMarkValue);
      };


    function Remove(id) {
        DeletFn(id)  
    }
    function Update(id) {
        showModal(id)
    }

    const [form] = Form.useForm();
    const TypeValue = Form.useWatch('Type', form);
  

  return (
    <>

        <Modal open={open} title="Update form" onOk={handleOk} onCancel={handleCancel} footer={[  ]} >

            <Form form={form} layout="vertical"  onValuesChange={onRequiredTypeChange} initialValues={{
            requiredMarkValue: requiredMark, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">


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

            { 
            
            TypeValue === "User" ? 
                
                    <>

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

            </Form>

        </Modal>


            <div className="flex items-center justify-center">
                <h1 className='Historyt'>Departments</h1>
            </div>
            <div className="pt-10 md:p-10 ">
                <Table columns={columns} dataSource={data} scroll={{ x: 1300, }}/>
            </div>
            
    </>
  )
}

export default Departments
