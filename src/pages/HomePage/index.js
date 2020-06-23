import React, { Fragment } from "react";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

class HomePage extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <Button variant='primary mr-2'>Thêm khách hàng</Button>
                    <Button variant='danger'>Xóa khách hàng</Button>
                    <hr />
                    <Table className='table mt-1' striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Giới tính</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Đặng Ngọc Hà</td>
                                <td>hadn@gmail.com</td>
                                <td>0912345678</td>
                                <td>Nữ</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <Modal show={false} onHide>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm khách hàng</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Alert variant='success'>Đã thêm thành công</Alert>
                        <Form.Group>
                            <Form.Control className='mb-1' type='text' placeholder='Họ tên' />
                            <span className='text-danger ml-3'>Vui lòng nhập họ tên</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Giới tính'>
                                <option>Giới tính</option>
                                <option>Nam</option>
                                <option>Nữ</option>
                            </Form.Control>
                            <span className='text-danger ml-3'>Vui lòng chọn giới tính</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='email' placeholder='Email' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='tel' placeholder='Số điện thoại' />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary'>Đóng</Button>
                        <Button variant='primary'>Tạo</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default HomePage;
