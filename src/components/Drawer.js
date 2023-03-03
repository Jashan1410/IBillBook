import { PlusOutlined , InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Divider , Avatar , List , Button, Col, Drawer, Checkbox , Row, Select, Space } from 'antd';
import React , { useState , useEffect , useContext } from 'react';
import { Link , useNavigate } from "react-router-dom";
import BillContext from '../Context/Data/BillContext'
const { Option } = Select;


const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
    );

 function Drawercomponent(props) {

    let navigate = useNavigate();
    const Contextdata = useContext(BillContext);
    const { LoginFn , RegisterFn } = Contextdata ;

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
    };

    function Logout() {
        localStorage.clear();
        navigate("/")
    }

    const onLoginFinish = (values) => {
        LoginFn(values , "success")
    };
    const onLoginFinishFailed = (values) => {
        console.log("object")
        LoginFn(values , "error")
    };

    const onRegisterFinish = (values) => {
        RegisterFn(values , "success")
    };
    const onRegisterFinishFailed = (values) => {
        RegisterFn(values , "error")
    };


    const [open, setOpen] = useState(false);
    const [LoginDrawer, setLoginDrawer] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const showLoginDrawer = () => {
        setLoginDrawer(true);
    };
    const oncloseLoginDrawer = () => {
        setLoginDrawer(false);
    };
    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };

    const [ProfileDrawer, setProfileDrawer] = useState(false);
    const showProfileDrawer = () => {
    setProfileDrawer(true);
    };
    const onCloseProfileDrawer = () => {
    setProfileDrawer(false);
    };

    useEffect(() => {
        if(props.ToggleDrawer){
            showDrawer()
        } 
    }, [ props.ToggleDrawer ]);


  return (
    <>

        {/* <Button type="primary" className="bg-sky-800 h-8 text-slate-50" onClick={showDrawer}>
            Open drawer
        </Button> */}


        <Drawer title="Multi-level drawer" width={520} closable={false} onClose={onClose} open={open}>


        {

            !localStorage.getItem('token')

            ?

            <>

            <div className='w-full h-32 flex justify-between items-center '>
                <Button type="primary" className="bg-sky-800 border-4 h-12 text-slate-50 w-28 ml-14" onClick={showLoginDrawer} icon={<PlusOutlined />} >
                    Login
                </Button>
                <Button type="primary" className="bg-sky-800 border-4 h-12 text-slate-50 w-44 mr-14" onClick={showChildrenDrawer} icon={<PlusOutlined />} >
                    New account
                </Button>
            </div>

            </>

            :

            <>


                <List dataSource={[ { id: 1, name: 'Lily' , }, ]} bordered renderItem={(item)=> (
                <List.Item key={item.id} actions={[ <Link onClick={showProfileDrawer} key={`a-${item.id}`}>
                    View Profile
                    </Link>,
                    ]}
                    >
                    <List.Item.Meta avatar={ <Avatar
                        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                    }
                    title={<Link to={"https://ant.design/index-cn"}>{item.name}</Link>}
                    description="Progresser XTech"
                    />
                </List.Item>
                )}
                /> 


                <div className='w-full h-32 flex justify-center items-center '>

                <Button type="primary" onClick={Logout} className="bg-sky-800 h-8 text-slate-50" icon={<PlusOutlined />} >
                    Logout
                </Button>

                </div>

            </>

        }

            {/* sign up  Drawer --------------------  */}


            <Drawer title="Create a new account" width={720} closable={false} onClose={onChildrenDrawerClose} open={childrenDrawer}  bodyStyle={{ paddingBottom: 80, }}
                extra={ <Space>
                    <Button className="bg-sky-800 h-8 text-slate-50" onClick={onChildrenDrawerClose} type="primary" >Cancel</Button>
                    <Button className="bg-sky-800 h-8 text-slate-50" onClick={onChildrenDrawerClose} type="primary">
                        Submit
                    </Button>
                    </Space>
                    }
              >

            <Form form={form} layout="vertical" initialValues={{ requiredMarkValue: requiredMark , remember: true , }}
                    onValuesChange={onRequiredTypeChange}  requiredMark={requiredMark}  onFinish={onRegisterFinish} onFinishFailed={onRegisterFinishFailed} autoComplete="off" >


                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item name="name" label="Name" rules={[ { required: true, message: 'Please enter user name' , },
                        ]}>
                        <Input placeholder="Please enter user name" />
                    </Form.Item>
                    </Col>


                    <Col span={12}>
                    <Form.Item name="url" label="Url" rules={[ { required: true, message: 'Please enter url' , }, ]}>
                        <Input style={{ width: '100%' , }} addonBefore="http://" addonAfter=".com"
                            placeholder="Please enter url" />
                    </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item name="approver" label="Approver" rules={[ { required: true,
                        message: 'Please choose the approver' , }, ]}>
                        <Select placeholder="Please choose the approver">
                            <Option value="jack">Sahil</Option>
                            <Option value="tom">Jashan</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item name="type" label="Type" rules={[ { required: true, message: 'Please choose the type' , },
                        ]}>
                        <Select placeholder="Please choose the type">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item label="Password" name="Password" required tooltip={{ title: 'Secure password' , icon: <InfoCircleOutlined />,}}  rules={[ { required: true, message: 'Please select your Password!' , }, ]}>
                        <Input.Password style={{ width: '100%' , }} placeholder="input Your Password" />
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item label="Confirm password" name="Confirm-password" required rules={[ { required: true, message: 'Please select your Password!' , }, ]}>
                        <Input.Password style={{ width: '100%' , }} placeholder="input Your Password" />
                    </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                    <Form.Item name="description" label="Description" >
                        <Input.TextArea rows={4} placeholder="please enter url description" />
                    </Form.Item>
                    </Col>
                </Row>


                    <Form.Item name="remember" valuePropName="checked" >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='bg-sky-800 h-8 text-slate-50' onClick={onChildrenDrawerClose} >Register</Button>
                    </Form.Item>

            </Form>

            </Drawer>


                {/* profile   Drawer --------------------  */}



            <Drawer width={736} placement="right" closable={false} onClose={onCloseProfileDrawer} open={ProfileDrawer}>
                <p className="site-description-item-profile-p" style={{ marginBottom: 24, }}>
                    User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
                <Row>
                    <Col span={12}>
                    <DescriptionItem title="Full Name" content="Lily" />
                    </Col>
                    <Col span={12}>
                    <DescriptionItem title="Account" content="AntDesign@example.com" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <DescriptionItem title="City" content="HangZhou" />
                    </Col>
                    <Col span={12}>
                    <DescriptionItem title="Country" content="China🇨🇳" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <DescriptionItem title="Birthday" content="February 2,1900" />
                    </Col>
                    <Col span={12}>
                    <DescriptionItem title="Website" content="-" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <DescriptionItem title="Message" content="Make things as simple as possible but no simpler." />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Company</p>
                <Row>
                    <Col span={12}>
                    <DescriptionItem title="Position" content="Programmer" />
                    </Col>
                    <Col span={12}>
                    <DescriptionItem title="Responsibilities" content="Coding" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <DescriptionItem title="Department" content="XTech" />
                    </Col>
                    <Col span={12}>
                    <DescriptionItem title="Supervisor" content={<Link>Lin</Link>} />
                        </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <DescriptionItem title="Skills"
                        content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc." />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Contacts</p>
                <Row>
                    <Col span={12}>
                    <DescriptionItem title="Email" content="AntDesign@example.com" />
                    </Col>
                    <Col span={12}>
                    <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <DescriptionItem title="Github" content={ <Link to={"http://github.com/ant-design/ant-design/"}>
                        github.com/ant-design/ant-design/
                        </Link>
                        }
                        />
                        </Col>
                </Row>
            </Drawer>

            <Drawer title="Login page" placement="right" width={520} closable={false} onClose={oncloseLoginDrawer} open={LoginDrawer}>

                <Form form={form} layout="vertical" initialValues={{ requiredMarkValue: requiredMark , remember: true , }}
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
                        <Button type="primary" htmlType="submit" className='bg-sky-800 h-8 text-slate-50' onClick={oncloseLoginDrawer} >Login</Button>
                    </Form.Item>

                </Form>

            </Drawer>


        </Drawer>
    </>
  );
};
export default Drawercomponent;