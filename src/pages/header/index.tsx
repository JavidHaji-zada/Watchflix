import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

interface HeaderProps {

}

function Header(props: HeaderProps): JSX.Element {
    return (
        <Navbar className='justify-content-between' bg="light" expand='md'>
            <Navbar.Brand href="./">
                <h1>
                    Watchflix
                </h1>
            </Navbar.Brand>
            <div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#reports">Reports</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default Header;