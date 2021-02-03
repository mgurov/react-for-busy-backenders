import React from 'react'

import Fetcher from './Fetcher'
import Json from './Json'

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
    return <Json value={order} />
}

export default Order; 