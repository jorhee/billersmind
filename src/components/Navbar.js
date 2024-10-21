import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';


import { useNavigate } from 'react-router-dom';

export default function CustomNavbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if token exists

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to the login page
  };

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
            {token ? ( // Conditional rendering based on token
            <>
              <Nav.Link href="/profile/me">Profile</Nav.Link>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button className="" variant="outline-success" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


