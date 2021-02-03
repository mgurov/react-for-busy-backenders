import React from 'react'

import Fetcher from './Fetcher'
import Json from './Json'
import { Card } from 'react-bootstrap'

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

function RenderOrder({ order }) {
    return <>


        <Card>
            <Card.Body>
                <Card.Title>Id</Card.Title>
                <Card.Text>
                    {order.id}
                </Card.Text>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
                <Card.Title>Customer</Card.Title>
                <Card.Text>
                    {order.customerId} <Fetcher
                        url={`/api/customers/id/${order.customerId}`}
                        onData={customer => <Json value={customer} />}
                    />
                </Card.Text>
            </Card.Body>
        </Card>

        <Json value={order} open={true} />

    </>
}

export default Order; 