import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = () => {
    return (
        <Navbar bg='primary' variant='dark'>
            <div className='container'>
                <a className='navbar-brand' href='#home'>
                    CRM
                </a>
                <Nav className='mr-auto'>
                    <a className='nav-link' href='#home'>
                        Khách hàng
                    </a>
                    <a className='nav-link' href='#features'>
                        Sản phẩm
                    </a>
                    <a className='nav-link' href='#pricing'>
                        Danh mục sản phẩm
                    </a>
                    <a className='nav-link' href='#pricing'>
                        Đơn đặt hàng
                    </a>
                </Nav>
            </div>
        </Navbar>
    );
};

export default Header;
