import React from 'react'

import Fetcher from './Fetcher'
import Json from './Json'
import {Card} from 'react-bootstrap'

import {
    useParams,
} from "react-router-dom";
  

function Order() {
    let { orderId } = useParams();
    return <Fetcher 
        url={`/api/orders/id/${orderId}`} 
        onData={order => <RenderOrder order={order} />} 
    />
}

function RenderOrder({order}) {
    return <>


        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>Id</Card.Title>
            <Card.Text>
            {order.id}
            </Card.Text>
        </Card.Body>
        </Card>

        <Json value={order} open={true} />
        <Fetcher 
        url={`/api/customers/id/${order.customerId}`} 
        onData={customer => <Json value={customer} />} 
        />
    </>
}

export default Order; 