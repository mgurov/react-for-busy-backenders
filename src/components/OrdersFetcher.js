import React from 'react';
import Json from './Json';
import { Table } from 'react-bootstrap'
import {
    Link,
  } from "react-router-dom";
import Fetcher from './Fetcher'
import _ from 'lodash'

function OrderFun({linkUrl}) {
    return <Fetcher url="/api/orders/?limit=1000" onData={data => <OrdersList linkUrl={linkUrl} data={data} />} />
} 

function OrdersList({ linkUrl, data:orders }) {
  
    return <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Lines</th>
            <th>json</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(order => {
              return <tr key={order.id}>
                <td><Link to={`${linkUrl}/id/${order.id}`}>{order.id}</Link></td>
                <td>{_.size(order.lines)} ( {_.sumBy(order.lines, 'price')} )</td>
                <td><Json value={order} /></td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </>
  }
  

export default OrderFun;