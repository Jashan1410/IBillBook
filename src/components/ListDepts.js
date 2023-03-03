import React , { useState , useEffect } from 'react'
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import {Avatar, Card, Skeleton , Col } from 'antd';

function Departments(props) {

    const Data  = props.Data
    const { Meta } = Card;
    const [description, setdescription] = useState(null);
    useEffect(() => {
        var DepAmount =  Data.Load / 100 * props.Amount
        setdescription("Your payable amount is Rs " + DepAmount)
    }, [ Data.Load , props.Amount ]);


  return (
    <>
        <Col>
            <Card style={{ width: 300 }} actions={[ <DeleteOutlined />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
            ]}
            >
            <Skeleton loading={false} avatar active>
                <Meta avatar={<Avatar src="https://joesch.moe/api/v1/random?key=2" />}
                title={Data.name}
                description={description}
                />
            </Skeleton>
            </Card>
        </Col>
    </>
  )
}

export default Departments
