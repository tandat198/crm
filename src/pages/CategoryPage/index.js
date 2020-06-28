import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

class CategoryPage extends React.Component {
    state = {
        modalDeleteCategoryOpening: false,
        modalCreateCategoryOpening: false,
        categoryName: "",
        parentCategory: "Danh mục cha",
        errors: {},
        categories: [],
    };

    toggleDeleteCategory = () => {
        this.setState({ modalDeleteCategoryOpening: !this.state.modalDeleteCategoryOpening });
    };
    deleteCategory = async (id) => {
        const res = await axios({
            method: "DELETE",
            url: `https://crm-dnt.herokuapp.com/api/categories/${id}`,
        });
        this.setState({ categories: this.state.categories.filter((category) => category.id !== id) });
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
        const res = await axios({
            method: "GET",
            url: "https://crm-dnt.herokuapp.com/api/categories",
        });
        console.log(res.data);
        this.setState({ categories: res.data });
    };
    componentDidMount() {
        this.getCategories();
    }
    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <Button variant='primary mr-2' onClick={this.toggleCreateCategory}>
                        Thêm danh mục
                    </Button>
                    <Button variant='danger' onClick={this.toggleDeleteCategory}>
                        Xóa danh mục
                    </Button>
                    <hr />
                    <Table className='table mt-1' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tên danh mục</th>
                                <th>Danh mục cha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category?.parentCategory?.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
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
