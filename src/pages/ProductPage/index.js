import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class ProductPage extends React.Component {
    state = {
        modalCreateProductOpening: false,
        modalDeleteProductOpening: false,
        productName: "",
        category: "Danh mục",
        number: "",
        price: "",
        errors: {},
        products: [],
    };
    toggleModelCreate = () => {
        this.setState({ modalCreateProductOpening: !this.state.modalCreateProductOpening });
    };
    toggleModalDelete = () => {
        this.setState({ modalDeleteProductOpening: !this.state.modalDeleteProductOpening });
    };

    handleProductName = (e) => {
        this.setState({ productName: e.target.value });
    };
    handleCategory = (e) => {
        this.setState({ category: e.target.value });
    };
    handleNumber = (e) => {
        this.setState({ number: e.target.value });
    };
    handlePrice = (e) => {
        this.setState({ price: e.target.value });
    };
    createProduct = () => {
        const errors = {};
        if (this.state.productName.length === 0) {
            errors.productName = "product name is required";
        }
        if (this.state.category === "Danh mục") {
            errors.category = "category is required";
        }
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            const newProduct = {
                name: this.state.productName,
                category: this.state.category,
                remainingQuantity: this.state.number,
                price: this.state.price,
            };
            this.setState({ products: this.state.products.concat([newProduct]), modalCreateProductOpening: false });
        }
    };

    deleteProduct = (id) => {
        this.setState({ products: this.state.products.filter((product) => product.id !== id) });
    };

    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <Button className='mr-2' variant='outline-primary' onClick={this.toggleModelCreate}>
                                Thêm sản phẩm
                            </Button>
                            <Button className='mr-2' variant='danger' onClick={this.toggleModalDelete}>
                                Xóa sản phẩm
                            </Button>
                            <DropdownButton variant='secondary' title='Sắp xếp theo'>
                                <Dropdown.Item>Giá tăng dần</Dropdown.Item>
                                <Dropdown.Item>Giá giảm dần</Dropdown.Item>
                                <Dropdown.Item>Số lượng tồn kho tăng dần</Dropdown.Item>
                                <Dropdown.Item>Số lượng tồn kho giảm dần</Dropdown.Item>
                                <Dropdown.Item>Tên A-Z</Dropdown.Item>
                                <Dropdown.Item>Tên Z-A</Dropdown.Item>
                                <Dropdown.Item>Danh mục A-Z</Dropdown.Item>
                                <Dropdown.Item>Danh mục Z-A</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <InputGroup className='w-25'>
                            <FormControl placeholder='Tìm kiếm sản phẩm theo tên' />
                        </InputGroup>
                    </div>
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
                            {this.state.products.map((product, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.remainingQuantity}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Modal Create */}
                <Modal show={this.state.modalCreateProductOpening} onHide={this.toggleModelCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm sản phẩm</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Control className='mb-1' type='text' placeholder='Tên sản phẩm' onChange={this.handleProductName} />
                            {this.state.errors.name ? <span className='text-danger ml-3'>Vui lòng nhập tên sản phẩm</span> : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Danh mục' onChange={this.handleCategory}>
                                <option>Danh mục</option>
                            </Form.Control>
                            {this.state.errors.category ? <span className='text-danger ml-3'>Vui lòng chọn danh mục</span> : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Giá sản phẩm' onChange={this.handlePrice} />
                            <span className='text-danger ml-3'>Vui lòng nhập giá sản phẩm</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Số lượng tồn kho' onChange={this.handleNumber} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.toggleModelCreate}>
                            Đóng
                        </Button>
                        <Button variant='primary' onClick={this.createProduct}>
                            Tạo
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Update */}
                <Modal>
                    <Modal.Header closeButton>
                        <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant='success'>Đã cập nhật thành công</Alert>
                        <Form.Group>
                            <Form.Control className='mb-1' type='text' placeholder='Tên sản phẩm' />
                            <span className='text-danger ml-3'>Vui lòng nhập tên sản phẩm</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Danh mục' onChange={this.handleCategory}>
                                <option>Danh mục</option>
                            </Form.Control>
                            <span className='text-danger ml-3'>Vui lòng chọn danh mục</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Giá sản phẩm' onChange={this.handlePrice} />
                            <span className='text-danger ml-3'>Vui lòng nhập giá sảm phẩm</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Số lượng tồn kho' onChange={this.handleNumber} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary'>Đóng</Button>
                        <Button variant='primary'>Cập nhật</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Delete */}
                <Modal show={this.state.modalDeleteProductOpening} onHide={this.toggleModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Danh sách sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {this.state.products.map((product) => (
                                <ListGroup.Item className='d-flex justify-content-between' key={product.id}>
                                    <span className='d-flex align-items-center'>{product.name}</span>
                                    <Button variant='outline-danger' onClick={() => this.deleteProduct(product.id)}>
                                        Xóa
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.toggleModalDelete}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default ProductPage;
