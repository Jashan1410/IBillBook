import React , { useContext , useEffect , useState } from 'react';
import BillContext from '../Context/Data/BillContext'
import { useNavigate } from "react-router-dom";
import { DatePicker , Button , Modal , Form , Row , Col } from 'antd';
import axios from 'axios';
import './User.css';

function UserDashboard() {

  let navigate = useNavigate();
  const Contextdata = useContext(BillContext);
  const { FetchUserFn , UserData , Gethistory } = Contextdata ;
  const [lasthistory, setlasthistory] = useState({"amount":"","due":"","generate":""});
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

        useEffect(() => {
            RefLast()   
        }, [ navigate ]);

      const showModal = () => {
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

      
    function dis(text , ) {
      var amo = UserData.age/100*text
      var rtext = "Rs. ".concat(amo);
      return rtext
    }

    async function RefLast() {
    if(localStorage.getItem('token')){
        FetchUserFn() 
        const customConfig = {
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token'),
        }
        };      
            const respose = await axios.get(`http://localhost:5000/api/History/LastHistory`, customConfig);
            if(respose.data.error === "false"){
            setlasthistory(respose.data.data)
            }
        }
    };

    const onFinish = async (values) => {
            BillContext.gethistory = values ;
            Gethistory(BillContext.gethistory.from.$d.toLocaleDateString(undefined, options) , BillContext.gethistory.to.$d.toLocaleDateString(undefined, options))
            navigate('/User/History')
    };
    const onFinishFailed = (values) => {
        alert("Selet Date")
    };

    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };



  return (
    <>

      <Modal open={open} width={400} title="Select period" onOk={handleOk} onCancel={handleCancel} footer={[  ]} >

          <Form name="basic" layout="vertical" onValuesChange={onRequiredTypeChange} initialValues={{
             requiredMarkValue: requiredMark, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">

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
                  <Button htmlType='submit' key="submit" className="bg-sky-800 h-8 text-slate-50 w-24" type="primary" loading={loading} > Submit </Button>
                  <Button key="back" className="h-8 w-24 ml-6" onClick={handleCancel}> Return </Button>
          </Form.Item>

          </Form>

      </Modal>


     <div className='flex flex-col items-center justify-center '>

        <div className="Userdetail p-12 grid gap-12 grid-cols-1 ">
          <div className='flex items-center justify-between' >
            <div className='Item'><strong>Branch</strong>   <strong>{UserData.branch?.toUpperCase()}</strong></div>
            <div className='Item'><strong>Email</strong>   <strong>{UserData.email?.toUpperCase()}</strong></div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='Item'><strong>Phone</strong>   <strong>{UserData.phone}</strong></div>
            <div className='Item'><strong>Load</strong>   <strong>{UserData.load}</strong></div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='Item'><strong>Age</strong>   <strong>{UserData.age}%</strong></div>
            <div className='Item'><strong>Lead</strong>   <strong>{UserData.name?.toUpperCase()}</strong></div>
          </div>
        </div>


          <div className='Billdata'>
                <div className='flex w-full h-full items-center justify-evenly' >
                    <div className='Item'><strong>Last Due</strong>   <strong className=' text-red-600'>{dis(lasthistory.amount)}</strong></div>
                    <div className='Item'><strong>Due on :</strong>   <strong>{new Date(lasthistory.due)?.toLocaleDateString(undefined, options)}</strong></div>
                    <div className='Item'><strong>Generate :</strong>   <strong>{new Date(lasthistory.generate)?.toLocaleDateString(undefined, options)}</strong></div>
                    <div className='Item'><Button onClick={showModal} type="primary" className="bg-sky-800 h-8 text-slate-50 w-28">History</Button></div>
                </div>
          </div>
        </div>
    </>
  )
}

export default UserDashboard
