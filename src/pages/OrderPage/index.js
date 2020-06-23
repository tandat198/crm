import React, { Fragment } from "react";
import moment from "moment";
import Table from "react-bootstrap/Table";

class HomePage extends React.Component {
    state = {
        orders: [{ id: 1, product: "Samsung Galaxy S20", quantity: "1", orderTime: "1592857636946", shippingTime: "1592957636946" }],
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
                            <tr>
                                <td>1</td>
                                <td>Samsung Galaxy S20</td>
                                <td>1</td>
                                <td>{moment(parseInt(this.state.orders[0].orderTime)).format("DD-MM-YY")}</td>
                                <td>{moment(parseInt(this.state.orders[0].shippingTime)).format("DD-MM-YY")}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
