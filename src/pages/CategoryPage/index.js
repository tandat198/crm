import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

class HomePage extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <Button variant='primary mr-2'>Thêm danh mục</Button>
                    <Button variant='danger'>Xóa danh mục</Button>
                    <hr />
                    <Table className='table mt-1' striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th>Danh mục cha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Điện thoại</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                {/* Modal Create */}
                <Modal show={false} onHide>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm danh mục</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Alert variant='success'>Đã thêm thành công</Alert>
                        <Form.Group>
                            <Form.Control className='mb-1' type='text' placeholder='Tên danh mục' />
                            <span className='text-danger ml-3'>Vui lòng nhập tên danh mục</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Danh mục cha'>
                                <option>Danh mục cha</option>
                                <option>Điện thoại</option>
                                <option>Tablet</option>
                            </Form.Control>
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
                        <Modal.Title>Danh sách danh mục</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            <ListGroup.Item className='d-flex justify-content-between'>
                                <span className='d-flex align-items-center'>Điện thoại</span>
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

export default HomePage;
