import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import BackButton from './BackButton';
import LogoutButton from './LogoutButton';
import { AuthContext } from '../context/AuthContext';
import ProfileButton from './ProfileButton';
import bmfav from './images/bmfav.png';
import HospiceCalculatorPage from '../pages/HospiceCalculatorPage';


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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <BackButton />
                                <ProfileButton />
                                <LogoutButton />
                                <HospiceCalculatorPage />
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