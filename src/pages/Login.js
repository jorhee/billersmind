import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export default function Login() {

    const { login } = useContext(AuthContext); //new delete if not working
    // State hooks to store the values of the input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        setIsActive(email !== '' && password !== '')
    }, [email, password]);

        const authenticate = async (e) => { //new delete if not working
        // Prevents page redirection via form submission
        e.preventDefault();

        try {

        const response = await fetch(`${process.env.REACT_APP_BE_URL}/profiles/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        console.log('Backend URL:', process.env.REACT_APP_BE_URL);

        const data = await response.json(); 

        if (!response.ok) {
                throw new Error(data.message);
            }

        if (data.token) {
                
                login(data.token);  // Call login function with token
                navigate(`/me`);
                
            } else {
                alert(data.message || 'Login unsuccessful');
            }
        } catch (error) {
            //console.error('Error during login:', error);
            alert(error.message);
        }
    };

    return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      

      <div className="bg-secondary rounded p-4 shadow" style={{ width: '400px', height: '50vh' }}> {/* Adjust the width as necessary */}
          <Form onSubmit={authenticate} className="h-100"> {/* Ensure form fills the container height */}
            <h1 className="text-center mb-4">
              <box-icon name='lock-alt' size="lg" color="#e415ff"></box-icon>
              Login
            </h1>

            <Form.Group className="mb-3">
              <Row className="align-items-center">
                <Col xs={4}>
                  <Form.Label className="d-flex align-items-center">
                    <i className='bx bxs-envelope bx-md' style={{ color: '#e415ff' }}></i>
                    <h3 className="p-2">Email</h3>
                  </Form.Label>
                </Col>
                <Col xs={8}>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-100" // Make input full width of the parent
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-4">
              <Row className="align-items-center">
                <Col xs={4}>
                  <Form.Label className="d-flex align-items-center">
                    <i className='bx bx-key bx-md' style={{ color: '#e415ff' }}></i>
                    <h3 className="p-2">Password</h3>
                  </Form.Label>
                </Col>
                <Col xs={8}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-100" // Make input full width of the parent
                  />
                </Col>
              </Row>
            </Form.Group>

            <div className="text-center">
              <Button variant={isActive ? "primary" : "dark"} className="w-50" type="submit" id="loginBtn" disabled={!isActive}>
                <i className='bx bxs-log-in-circle bx-lg' style={{ color: '#e415ff' }}></i>
                
              </Button>
              
            </div>
          </Form>
        </div>
      
    </Container>
  );

};

