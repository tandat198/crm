import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class CategoryPage extends React.Component {
    state = {
        modalDeleteCategoryOpening: false,
        modalCreateCategoryOpening: false,
        categoryName: "",
        isLoading: false,
        searchName: "",
        parentCategory: "Danh mục cha",
        errors: {},
        categories: [],
    };

    handleSearchName = (e) => {
        this.setState({ searchName: e.target.value });
    };

    toggleDeleteCategory = () => {
        this.setState({ modalDeleteCategoryOpening: !this.state.modalDeleteCategoryOpening });
    };
    deleteCategory = async (id) => {
        const res = await axios({
            method: "DELETE",
            url: `https://crm-dnt.herokuapp.com/api/categories/${id}`,
        });
        if (res.data.message.includes("successfully")) {
            this.setState({ categories: this.state.categories.filter((category) => category.id !== id) });
        }
    };
    toggleCreateCategory = () => {
        this.setState({ modalCreateCategoryOpening: !this.state.modalCreateCategoryOpening });
    };
    handleCategoryName = (e) => {
        this.setState({ categoryName: e.target.value });
    };
    handleParentCategory = (e) => {
        this.setState({ parentCategory: e.target.value });
    };
    addCategory = async () => {
        const errors = {};
        if (this.state.categoryName === "") {
            errors.categoryName = "category name is required";
        }
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            let parentCategory;
            if (this.state.parentCategory !== "Danh mục cha") {
                parentCategory = this.state.parentCategory;
            }

            const newCategory = {
                name: this.state.categoryName,
                parentCategory,
            };
            const res = await axios({
                method: "POST",
                url: "https://crm-dnt.herokuapp.com/api/categories",
                data: newCategory,
            });
            this.setState({
                categories: this.state.categories.concat([res.data]),
            });
            this.toggleCreateCategory();
        }
    };
    getCategories = async () => {
        this.setState({ isLoading: true });
        const res = await axios({
            method: "GET",
            url: "https://crm-dnt.herokuapp.com/api/categories",
        });
        console.log(res.data);
        this.setState({ isLoading: false });
        this.setState({ categories: res.data });
    };
    sortCategory = (sortType) => {
        let sortedCategories;
        switch (sortType) {
            case "ASC_NAME":
                sortedCategories = this.state.categories.sort((a, b) => a.name.localeCompare(b.name));
                this.setState({ categories: sortedCategories });
                break;
            case "DESC_NAME":
                sortedCategories = this.state.categories.sort((a, b) => b.name.localeCompare(a.name));
                this.setState({ categories: sortedCategories });
                break;
            case "ASC_MOTHER_ITEM":
                sortedCategories = this.state.categories.sort((a, b) => a.id.localeCompare(b.id));
                this.setState({ categories: sortedCategories });
                break;
            case "DESC_MOTHER_ITEM":
                sortedCategories = this.state.categories.sort((a, b) => b.id.localeCompare(a.id));
                this.setState({ categories: sortedCategories });
                break;
            default:
                break;
        }
    };
    componentDidMount() {
        this.getCategories();
    }
    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <Button className='mr-2' variant='outline-primary' onClick={this.toggleCreateCategory}>
                                Thêm danh mục
                            </Button>
                            <Button className='mr-2' variant='danger' onClick={this.toggleDeleteCategory}>
                                Xóa danh mục
                            </Button>
                            <DropdownButton variant='secondary' title='Sắp xếp theo'>
                                <Dropdown.Item onClick={() => this.sortCategory("ASC_NAME")}>Tên A-Z</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortCategory("DESC_NAME")}>Tên Z-A</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortCategory("ASC_MOTHER_ITEM")}>
                                    Tên danh mục cha A-Z
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortCategory("DESC_MOTHER_ITEM")}>
                                    Tên danh mục cha Z-A
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <InputGroup className='w-25'>
                            <FormControl placeholder='Tìm kiếm danh mục theo tên' onChange={this.handleSearchName} />
                        </InputGroup>
                    </div>
                    <hr />
                    {this.state.isLoading ? (
                        <div className='text-center'>Đang tải...</div>
                    ) : (
                        <Table className='table mt-1' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tên danh mục</th>
                                    <th>Danh mục cha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.categories
                                    .filter((category) =>
                                        category.name.toLowerCase().includes(this.state.searchName.toLowerCase())
                                    )
                                    .map((category) => (
                                        <tr key={category.id}>
                                            <td>{category.name}</td>
                                            <td>{category?.parentCategory?.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    )}
                </div>

                {/* Modal Create */}
                <Modal show={this.state.modalCreateCategoryOpening} onHide={this.toggleCreateCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm danh mục</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                className='mb-1'
                                type='text'
                                placeholder='Tên danh mục'
                                onChange={this.handleCategoryName}
                            />
                            {this.state.errors.categoryName ? (
                                <span className='text-danger ml-3'>Vui lòng nhập tên danh mục</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Danh mục cha' onChange={this.handleParentCategory}>
                                <option>Danh mục cha</option>
                                {this.state.categories.map((cate) => (
                                    <option key={cate.id} value={cate.id}>
                                        {cate.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.toggleCreateCategory}>
                            Đóng
                        </Button>
                        <Button variant='primary' onClick={this.addCategory}>
                            Tạo
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Update */}
                <Modal>
                    <Modal.Header closeButton>
                        <Modal.Title>Cập nhật danh mục</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Alert variant='success'>Đã cập nhật thành công</Alert>
                        <Form.Group>
                            <Form.Control
                                className='mb-1'
                                type='text'
                                placeholder='Tên danh mục'
                                onChange={this.handleCategoryName}
                            />
                            {this.state.errors.categoryName ? (
                                <span className='text-danger ml-3'>Vui lòng nhập tên danh mục</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Danh mục cha' onChange={this.handleParentCategory}>
                                <option>Danh mục cha</option>
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary'>Đóng</Button>
                        <Button variant='primary'>Cập nhật</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Delete */}
                <Modal show={this.state.modalDeleteCategoryOpening} onHide={this.toggleDeleteCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title>Danh sách danh mục</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {this.state.categories.map((category) => (
                                <ListGroup.Item className='d-flex justify-content-between' key={category.id}>
                                    <span className='d-flex align-items-center'>{category.name}</span>
                                    <Button variant='outline-danger' onClick={() => this.deleteCategory(category.id)}>
                                        Xóa
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.toggleDeleteCategory}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default CategoryPage;
