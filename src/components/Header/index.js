import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Navbar bg='primary' variant='dark'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>
                    CRM
                </Link>
                <Nav className='mr-auto'>
                    <Link className='nav-link' to='/'>
                        Khách hàng
                    </Link>
                    <Link className='nav-link' to='/products'>
                        Sản phẩm
                    </Link>
                    <Link className='nav-link' to='/categories'>
                        Danh mục sản phẩm
                    </Link>
                    <Link className='nav-link' to='/orders'>
                        Đơn đặt hàng
                    </Link>
                </Nav>
            </div>
        </Navbar>
    );
};

export default Header;
