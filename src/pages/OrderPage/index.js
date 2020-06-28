import React, { Fragment } from "react";
import moment from "moment";
import Table from "react-bootstrap/Table";

class HomePage extends React.Component {
    state = {
        orders: [
            {
                id: 1,
                product: "Samsung Galaxy S20",
                quantity: "1",
                orderTime: "1592857636946",
                shippingTime: "1592957636946",
            },
        ],
    };
    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <hr />
                    <Table className='table mt-1' striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Thời gian đặt hàng</th>
                                <th>Thời gian giao hàng dự kiến</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.product}</td>
                                    <td>{order.quantity}</td>
                                    <td>{moment(parseInt(order.orderTime)).format("DD-MM-YY")}</td>
                                    <td>{moment(parseInt(order.shippingTime)).format("DD-MM-YY")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
