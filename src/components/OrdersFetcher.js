import React from 'react';
import Json from './Json';
import { Table } from 'react-bootstrap'
import {
    Link,
  } from "react-router-dom";
  

class OrderFetcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }

    componentDidMount() {
        fetch("/api/orders/?limit=2")
            .then(res => res.json())
            //TODO: status should be 200
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <OrdersList linkUrl={this.props.linkUrl} orders={data} />
            );
        }
    }
}

function OrdersList({ linkUrl, orders }) {
  
    return <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>json</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(order => {
              return <tr key={order.id}>
                <td><Link to={`${linkUrl}/id/${order.id}`}>{order.id}</Link></td>
                <td>{order.first_name}</td>
                <td><Json value={order} /></td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </>
  }
  

export default OrderFetcher;