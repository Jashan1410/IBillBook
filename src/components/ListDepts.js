import React , {useContext} from 'react'
import { Avatar, Card, Skeleton , Col } from 'antd';
import BillContext from '../Context/Data/BillContext'

function Departments(props) {

  const Contextdata = useContext(BillContext);
  const { Amount } = Contextdata ;

    const { Data } = props ;
    const { Meta } = Card;

    function dis(text) {
        var amo = text/100*Amount.RS
        var rtext = "Amount Payable is ".concat(amo);
        return rtext
    }

  return (
    <>

        {(Data.msg === "" &&  Data.data.map((Data) =>

                    <Col key={Data.id}>
                    <Card className=' border-2 border-black' style={{ width: 300 }}  >
                    <Skeleton loading={false} avatar active>
                        <Meta avatar={<Avatar src="https://joesch.moe/api/v1/random?key=2" />}
                        title={Data.name.toUpperCase()}
                        description={dis(Data.age) }
                        />
                    </Skeleton>
                    </Card>
                    </Col>
            ))
             ||
            (
                    <div className="container my-5">
                    <h2>{Data.msg}</h2>
                    </div> 
            ) 
        }
    </>
  )
}

export default Departments
