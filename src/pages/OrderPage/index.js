import React, { Fragment } from "react";
import moment from "moment";
import Table from "react-bootstrap/Table";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

class HomePage extends React.Component {
    state = {
        orders: [],
    };
    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <div className='d-flex justify-content-end'>
                        <InputGroup className='w-25'>
                            <FormControl placeholder='Tìm kiếm danh mục theo tên' />
                        </InputGroup>
                    </div>
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
