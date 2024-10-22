import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';



export default function CustomNavbar() {

  return (
    <Navbar  className="header">
      <Container>
        <div class="logo-container">
        <img src="./images/bmfav.png" alt="bm favicon" id="logofav"/>
        </div>
        <Navbar.Brand href="#home" className="logo">Billers <span>Mind BPO</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


