import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BackButton from './BackButton';
import LogoutButton from './LogoutButton';
import { AuthContext } from '../context/AuthContext';

/*export default function CustomNavbar() {

  const [user, setUser] = useState(localStorage.getItem("token"));
  console.log(user);

  return (
    <Navbar className="header">
      <Container>
        <div className="logo-container">
          <img src="./images/bmfav.png" alt="bm favicon" id="logofav"/>
        </div>
        <Navbar.Brand className="logo">Billers <span>Mind BPO</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user !== null ? (
              <>
              <BackButton />
              <LogoutButton />
              </>
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
*/

/*
export default function CustomNavbar() {
  const [user, setUser] = useState(null);

  // Asynchronous function to check for user token
  const checkUserToken = async () => {
    // Simulating an asynchronous operation
    return new Promise((resolve) => {
      const token = localStorage.getItem('token');
      resolve(token);
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await checkUserToken();
      setUser(token);
    };

    fetchUser();
  }, []);

  //const user = localStorage.getItem("token"); // Assuming you use token for user session
  const location = useLocation();

  return (
    <Navbar className="header" expand="lg">
      <Container>

        <div className="logo-container">
          <img src="images/bmfav.png" alt="Billers Mind favicon" id="logofav" />
        </div>

        <Navbar.Brand className="logo">
          Billers <span>Mind BPO</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        {user ? (
          <>
            <BackButton />
            <LogoutButton />
          </>
        ) : (
          
          (location.pathname === '/' || location.pathname === '/about' || location.pathname === '/services' || location.pathname === '/contact' || location.pathname === '/login' ) && (
            <>
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/services">Services</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            </>
          )
        )}
      </Nav>
    </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}*/

//authContext version

export default function CustomNavbar() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Navbar className="header" expand="lg">
            <Container>

                <div className="logo-container">

                  <img src="images/bmfav.png" alt="Billers Mind favicon" id="logofav" />
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
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
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