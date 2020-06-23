import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

class ProductPage extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <Button variant='primary mr-2'>Thêm sản phẩm</Button>
                    <Button variant='danger'>Xóa sản phẩm</Button>
                    <hr />
                    <Table className='table mt-1' striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Danh mục</th>
                                <th>Số lượng tồn kho</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Samsung Galaxy Note 9 Lite</td>
                                <td>Điện thoại</td>
                                <td>120</td>
                                <td>8.990.000</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                {/* Modal Create */}
                <Modal show={false} onHide>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm sản phẩm</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Alert variant='success'>Đã thêm thành công</Alert>
                        <Form.Group>
                            <Form.Control className='mb-1' type='text' placeholder='Tên sản phẩm' />
                            <span className='text-danger ml-3'>Vui lòng nhập tên sản phẩm</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Danh mục'>
                                <option>Danh mục</option>
                                <option>Điện thoại</option>
                                <option>Tablet</option>
                            </Form.Control>
                            <span className='text-danger ml-3'>Vui lòng chọn danh mục</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Số lượng tồn kho' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Giá' />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary'>Đóng</Button>
                        <Button variant='primary'>Tạo</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Delete */}
                <Modal show={false} onHide>
                    <Modal.Header closeButton>
                        <Modal.Title>Danh sách sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            <ListGroup.Item className='d-flex justify-content-between'>
                                <span className='d-flex align-items-center'>Samsung Galaxy Note 9</span>
                                <Button variant='outline-danger'>Xóa</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary'>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default ProductPage;
