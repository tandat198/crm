import React, { Fragment } from "react";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class HomePage extends React.Component {
    state = {
        name: "",
        gender: "Giới tính",
        email: "",
        tele: "",
        search: "",
        sortTitle: "Sắp xếp theo",
        modelCreateOpening: false,
        modalCustomerListOpening: false,
        isLoading: false,
        errors: {},
        customers: [],
    };
    handleSearch = (e) => {
        this.setState({ search: e.target.value });
    };

    handleName = (e) => {
        this.setState({ name: e.target.value });
    };
    handleGender = (e) => {
        // console.log(e.target.value);
        this.setState({ gender: e.target.value });
    };
    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    };
    HandleTele = (e) => {
        this.setState({ tele: e.target.value });
    };
    createCustomer = async () => {
        const errors = {};
        const { name, gender, email, tele } = this.state;

        if (name.length === 0) {
            errors.name = "name is required";
        }
        if (gender === "Giới tính") {
            errors.gender = "gender is required";
        }
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            let gender;
            switch (this.state.gender) {
                case "Nam":
                    gender = 0;
                    break;
                default:
                    gender = 1;
                    break;
            }
            const newCustomer = {
                name: name,
                gender,
                email: email ? email : undefined,
                phoneNumber: tele ? tele : undefined,
            };

            try {
                const res = await axios({
                    method: "POST",
                    url: "https://crm-dnt.herokuapp.com/api/customers",
                    data: newCustomer,
                });
                console.log(res);
                this.setState({ customers: this.state.customers.concat([res.data]), modelCreateOpening: false });
            } catch (error) {
                const { phoneNumber: phoneNumberError, email: emailError } = error.response.data;
                if (emailError) {
                    errors.email = emailError;
                }
                if (phoneNumberError) {
                    errors.phoneNumber = phoneNumberError;
                }
                this.setState({ errors });
            }
        }
    };
    openFormCreate = () => {
        this.setState({ modelCreateOpening: true });
    };
    closeFormCreate = () => {
        this.setState({ modelCreateOpening: false });
    };
    deleteCustomer = async (customerId) => {
        const res = await axios({
            method: "DELETE",
            url: `https://crm-dnt.herokuapp.com/api/customers/${customerId}`,
        });
        if (res.data.message.includes("successfully")) {
            const fiterCustomers = this.state.customers.filter((customer) => customer.id !== customerId);
            this.setState({ customers: fiterCustomers });
        }
    };
    openCustomerList = () => {
        this.setState({ modalCustomerListOpening: true });
    };
    closeModalCustomerList = () => {
        this.setState({ modalCustomerListOpening: false });
    };
    getCustomers = async () => {
        this.setState({ isLoading: true });
        const res = await axios({
            method: "GET",
            url: "https://crm-dnt.herokuapp.com/api/customers",
        });
        console.log(res);
        this.setState({ customers: res.data, isLoading: false });
    };

    sortCustomer = (sortType) => {
        let sortedCustomers;

        switch (sortType) {
            case "ASC_NAME":
                sortedCustomers = this.state.customers.sort((a, b) => a.name.localeCompare(b.name));
                this.setState({ customers: sortedCustomers, sortTitle: "tên A-Z" });
                break;

            case "DESC_NAME":
                sortedCustomers = this.state.customers.sort((a, b) => b.name.localeCompare(a.name));
                this.setState({ customers: sortedCustomers, sortTitle: "tên Z-A" });
                break;
            default:
                break;
        }
    };
    componentDidMount() {
        this.getCustomers();
    }

    render() {
        return (
            <Fragment>
                <div className='container p-0 mt-3'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <Button className='mr-2' variant='outline-primary' onClick={this.openFormCreate}>
                                Thêm khách hàng
                            </Button>
                            <Button className='mr-2' variant='danger' onClick={this.openCustomerList}>
                                Xóa khách hàng
                            </Button>
                            <DropdownButton variant='secondary' title={this.state.sortTitle}>
                                <Dropdown.Item onClick={() => this.sortCustomer("ASC_NAME")}>Tên A-Z</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortCustomer("DESC_NAME")}>Tên Z-A</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <InputGroup className='w-25'>
                            <FormControl placeholder='Tìm kiếm khách hàng theo tên' onChange={this.handleSearch} />
                        </InputGroup>
                    </div>
                    <hr />
                    {this.state.isLoading ? (
                        <div className='text-center'>Đang tải...</div>
                    ) : (
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
                                {this.state.customers
                                    .filter((customer) =>
                                        customer.name.toLowerCase().includes(this.state.search.toLowerCase())
                                    )
                                    .map((customer, index) => (
                                        <tr key={customer.id}>
                                            <td>{index + 1} </td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phoneNumber}</td>
                                            <td>{customer.gender}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    )}
                </div>

                {/* Modal Create Customer*/}
                <Modal show={this.state.modelCreateOpening} onHide={this.closeFormCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm khách hàng</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                className='mb-1'
                                type='text'
                                placeholder='Họ tên'
                                onChange={this.handleName}
                            />
                            {this.state.errors.name && <span className='text-danger ml-3'>Vui lòng nhập họ tên</span>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Giới tính' onChange={this.handleGender}>
                                <option>Giới tính</option>
                                <option>Nam</option>
                                <option>Nữ</option>
                            </Form.Control>
                            {this.state.errors.gender && (
                                <span className='text-danger ml-3'>Vui lòng chọn giới tính</span>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='email' placeholder='Email' onChange={this.handleEmail} />
                            {this.state.errors.email ? (
                                <span className='text-danger ml-3'>Email không hợp lệ</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='tel' placeholder='Số điện thoại' onChange={this.HandleTele} />
                            {this.state.errors.phoneNumber ? (
                                <span className='text-danger ml-3'>SDT không hợp lệ</span>
                            ) : null}
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.closeFormCreate}>
                            Đóng
                        </Button>
                        <Button variant='primary' onClick={this.createCustomer}>
                            Tạo
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Update Customer*/}
                <Modal>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm khách hàng</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Control className='mb-1' type='text' placeholder='Họ tên' />

                            <span className='text-danger ml-3'>Vui lòng nhập họ tên</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as='select' placeholder='Giới tính' onChange={this.handleGender}>
                                <option>Giới tính</option>
                                <option>Nam</option>
                                <option>Nữ</option>
                            </Form.Control>
                            <span className='text-danger ml-3'>Vui lòng chọn giới tính</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='email' placeholder='Email' onChange={this.handleEmail} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='tel' placeholder='Số điện thoại' onChange={this.HandleTele} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary'>Đóng</Button>
                        <Button variant='primary'>Cập nhật</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Delete Customer */}
                <Modal show={this.state.modalCustomerListOpening} onHide={this.closeModalCustomerList}>
                    <Modal.Header closeButton>
                        <Modal.Title>Danh sách khách hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {this.state.customers.map((customer) => (
                                <ListGroup.Item className='d-flex justify-content-between' key={customer.id}>
                                    <span className='d-flex align-items-center'>{customer.name}</span>
                                    <Button variant='outline-danger' onClick={() => this.deleteCustomer(customer.id)}>
                                        Xóa
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.closeModalCustomerList}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default HomePage;
