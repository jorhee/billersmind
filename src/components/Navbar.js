import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function CustomNavbar() {

  const [user, setUser] = useState(localStorage.getItem("token"));
  console.log(user);

  return (
    <Navbar className="header">
      <Container>
        <div className="logo-container">
          <img src="./images/bmfav.png" alt="bm favicon" id="logofav"/>
        </div>
        <Navbar.Brand href="#home" className="logo">Billers <span>Mind BPO</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user !== null ? (
              <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
            ) : (
            <>
              <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about" exact="true">About</Nav.Link>
              <Nav.Link as={NavLink} to="/services" exact="true">Services</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" exact="true">Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
            </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
