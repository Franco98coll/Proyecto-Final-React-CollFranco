import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import CartWidget from './CartWidget';
import '../../css/navbar.css';

function BasicExample() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to="/">
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="https://i.postimg.cc/d3mMrNv9/The-Crew-Black-01.png"
                            className="logo"
                        />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="NEGRO OSCURO" className='items'>
                            <NavDropdown.Item as={Link} to="/category/remeras">Remeras</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/camperas">Camperas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/gorros">Gorros</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/ropa-interior">Ropa Interior</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="MUSTAQE" className='items'>
                            <NavDropdown.Item as={Link} to="/category/buzos-mustaqe">Buzos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/remeras-mustaqe">Remeras</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/medias-mustaqe">Medias</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="DREW" className='items'>
                            <NavDropdown.Item as={Link} to="/category/buzos-drew">Buzos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/remeras-drew">Remeras</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/gorros-drew">Gorros</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <CartWidget />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
