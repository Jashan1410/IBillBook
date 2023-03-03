import React from 'react';
import { Button, Result } from 'antd';
import { Link } from "react-router-dom";

const Succes = () => (
  
  <Result
    status="success"
    title="Successfully Purchased Saved at Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Link to={'/'}><Button type="primary" key="console" className="bg-sky-800 border-4 h-10 text-slate-50 w-28 m-4">
        Go Home
      </Button></Link>,
      <Link to={'/'}><Button key="buy" className="border-4 h-10 w-28 m-4">Use Again</Button></Link>,
    ]}
  />
);

export default Succes;