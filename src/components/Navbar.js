import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import BackButton from './BackButton';
import LogoutButton from './LogoutButton';
import { AuthContext } from '../context/AuthContext';
import ProfileButton from './ProfileButton';
import bmfav from './images/bmfav.png';



//authContext version

export default function CustomNavbar() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Navbar className="header" expand="lg">
            <Container>
                <div className="logo-container">
                  <img src={bmfav} alt="Billers Mind favicon" id="logofav" />
                </div>
                <Navbar.Brand className="logo">
                  <Link to="/" className="navbar-brand">
                  Billers <span>Mind BPO</span>
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav"
                    style={{
                    borderColor: "transparent",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='white' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")`,
                        }} />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <BackButton />
                                <ProfileButton />
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/hospiceCalculator">Hospice Calculator</Nav.Link>
                                <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                                <Nav.Link as={NavLink} to="/services">Services</Nav.Link>
                                <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}