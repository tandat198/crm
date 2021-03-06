import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class ProductPage extends React.Component {
    state = {
        modalCreateProductOpening: false,
        modalDeleteProductOpening: false,
        sortTitle: "Sắp xếp theo",
        productName: "",
        category: "Danh mục",
        isLoading: false,
        thumbnail: "",
        fullPic: "",
        number: "",
        price: "",
        errors: {},
        search: "",
        products: [],
        categories: [],
    };
    toggleModelCreate = () => {
        this.setState({ modalCreateProductOpening: !this.state.modalCreateProductOpening });
    };
    toggleModalDelete = () => {
        this.setState({ modalDeleteProductOpening: !this.state.modalDeleteProductOpening });
    };

    handleSearch = (e) => {
        this.setState({ search: e.target.value });
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
    handleThumbnail = (e) => {
        this.setState({ thumbnail: e.target.value });
    };
    handleFullPic = (e) => {
        this.setState({ fullPic: e.target.value });
    };
    createProduct = async () => {
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
                remainingQuantity: parseInt(this.state.number),
                price: parseInt(this.state.price),
                thumbnailUrl: this.state.thumbnail,
                imageUrl: this.state.fullPic,
            };
            const res = await axios({
                method: "POST",
                url: `https://crm-dnt.herokuapp.com/api/products`,
                data: newProduct,
            });
            this.setState({ products: this.state.products.concat([res.data]), modalCreateProductOpening: false });
        }
    };
    getProduct = async () => {
        this.setState({ isLoading: true });
        const res = await axios({
            method: "GET",
            url: `https://crm-dnt.herokuapp.com/api/products`,
        });
        this.setState({ isLoading: false });
        this.setState({ products: res.data });
    };
    getCategory = async () => {
        const res = await axios({
            method: "GET",
            url: `https://crm-dnt.herokuapp.com/api/categories`,
        });
        this.setState({ categories: res.data });
    };

    deleteProduct = async (id) => {
        const res = await axios({
            method: "DELETE",
            url: `https://crm-dnt.herokuapp.com/api/products/${id}`,
        });
        if (res.data.message.includes("successfully")) {
            this.setState({ products: this.state.products.filter((product) => product.id !== id) });
        } else {
            this.setState({
                errors: {
                    deleteIsError: true,
                },
            });
        }
    };
    sortProduct = (sortType) => {
        switch (sortType) {
            case "ASC_PRICE":
                const sortAscPrice = this.state.products.sort((a, b) => a.price - b.price);
                this.setState({ products: sortAscPrice, sortTitle: "Giá tăng dần" });
                break;
            case "DESC_PRICE":
                const sortDescPrice = this.state.products.sort((a, b) => b.price - a.price);
                this.setState({ products: sortDescPrice, sortTitle: "Giá giảm dần" });
                break;
            case "ASC_NAME":
                const sortedAscName = this.state.products.sort((a, b) => a.name.localeCompare(b.name));
                console.log(sortedAscName);
                this.setState({ products: sortedAscName });
                break;
            case "DESC_NAME":
                const sortedDescName = this.state.products.sort((a, b) => b.name.localeCompare(a.name));
                this.setState({ products: sortedDescName });
                break;
            case "ASC_STORE":
                const sortedAscStore = this.state.products.sort((a, b) => a.remainingQuantity - b.remainingQuantity);
                this.setState({ products: sortedAscStore });
                break;

            default:
                break;
        }
    };
    resetText = () => {
        this.setState({ productName: "", category: "Danh mục" });
    };
    componentDidMount() {
        this.getProduct();
        this.getCategory();
    }

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
                            <DropdownButton variant='secondary' title={this.state.sortTitle}>
                                <Dropdown.Item onClick={() => this.sortProduct("ASC_PRICE")}>
                                    Giá tăng dần
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortProduct("DESC_PRICE")}>
                                    Giá giảm dần
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortProduct("ASC_STORE")}>
                                    Số lượng tồn kho tăng dần
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortProduct("DESC_STORE")}>
                                    Số lượng tồn kho giảm dần
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortProduct("ASC_NAME")}>Tên A-Z</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortProduct("DESC_NAME")}>Tên Z-A</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortProduct("ASC_ITEM")}>Danh mục A-Z</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortProduct("DESC_ITEM")}>
                                    Danh mục Z-A
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <InputGroup className='w-25'>
                            <FormControl placeholder='Tìm kiếm sản phẩm theo tên' onChange={this.handleSearch} />
                        </InputGroup>
                    </div>
                    <hr />
                    {this.state.isLoading ? (
                        <div className='text-center'>Đang tải...</div>
                    ) : (
                        <Table className='table mt-1' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Danh mục</th>
                                    <th>Số lượng tồn kho</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products
                                    .filter((product) => product.name.includes(this.state.search))
                                    .map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.category?.name}</td>
                                            <td>{product.remainingQuantity}</td>
                                            <td>{product.price.toLocaleString()}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    )}
                </div>

                {/* Modal Create */}
                <Modal show={this.state.modalCreateProductOpening} onHide={this.toggleModelCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm sản phẩm</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                className='mb-1'
                                type='text'
                                placeholder='Tên sản phẩm'
                                value={this.state.productName}
                                onChange={this.handleProductName}
                            />
                            {this.state.errors.name ? (
                                <span className='text-danger ml-3'>Vui lòng nhập tên sản phẩm</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as='select'
                                placeholder='Danh mục'
                                value={this.state.category}
                                onChange={this.handleCategory}
                            >
                                <option>Danh mục</option>
                                {this.state.categories.map((category) => (
                                    <option value={category.id} key={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
                            {this.state.errors.category ? (
                                <span className='text-danger ml-3'>Vui lòng chọn danh mục</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Giá sản phẩm' onChange={this.handlePrice} />
                            <span className='text-danger ml-3'>Vui lòng nhập giá sản phẩm</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Số lượng tồn kho' onChange={this.handleNumber} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='URL hình thumbnail'
                                onChange={this.handleThumbnail}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='URL hình full' onChange={this.handleFullPic} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='RAM' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Bộ nhớ' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Kích thước màn hình' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Hệ điều hành' />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='danger' onClick={this.resetText}>
                            Reset
                        </Button>
                        <Button variant='secondary' onClick={this.toggleModelCreate}>
                            Đóng
                        </Button>
                        <Button variant='primary' onClick={this.createProduct}>
                            Tạo
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Update Product */}
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
                            <Form.Control as='select' placeholder='Danh mục'>
                                <option>Danh mục</option>
                            </Form.Control>
                            <span className='text-danger ml-3'>Vui lòng chọn danh mục</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Giá sản phẩm' />
                            <span className='text-danger ml-3'>Vui lòng nhập giá sảm phẩm</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Số lượng tồn kho' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='URL hình thumbnail' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='URL hình full' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='RAM' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Bộ nhớ' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Kích thước màn hình' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Hệ điều hành' />
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
                        {this.state.errors.deleteIsError ? <Alert variant='danger'>xóa thất bại</Alert> : null}
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
