import React, { Fragment } from "react";
import moment from "moment";
import Table from "react-bootstrap/Table";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

class HomePage extends React.Component {
    state = {
        orders: [],
    };
    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <div className='d-flex justify-content-between'>
                        <DropdownButton variant='secondary' title='Sắp xếp theo'>
                            <Dropdown.Item>Giá tổng tăng dần</Dropdown.Item>
                            <Dropdown.Item>Giá tổng giảm dần</Dropdown.Item>
                            <Dropdown.Item>Số lượng sản phẩm tăng dần</Dropdown.Item>
                            <Dropdown.Item>Số lượng sản phẩm giảm dần</Dropdown.Item>
                        </DropdownButton>
                        <InputGroup className='w-25'>
                            <FormControl placeholder='Tìm kiếm danh mục theo tên' />
                        </InputGroup>
                    </div>
                    <hr />
                    <Table className='table mt-1' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Số sản phẩm</th>
                                <th>Thời gian đặt hàng</th>
                                <th>Thời gian giao hàng dự kiến</th>
                                <th>Tổng giá</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map((order) => (
                                <tr key={order.id}>
                                    <td></td>
                                    <td>{moment(parseInt(order.orderTime)).format("DD-MM-YY")}</td>
                                    <td>{moment(parseInt(order.shippingTime)).format("DD-MM-YY")}</td>
                                    <td></td>
                                    <th>
                                        <Button variant='primary'>Xem chi tiết</Button>
                                    </th>
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
