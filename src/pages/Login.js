import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';


export default function Login() {

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);


    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
        fetch('http://localhost:4000/profiles/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
                password: password

            })
        })
        .then(res => res.json())
        .then(data => {

            if(data.token){

                console.log(data.token);
                localStorage.setItem('token', data.token)

                // Clear input fields after submission
                setEmail('');
                setPassword('');

                alert(`You are now logged in`);
            
            } else {
                alert(data.message);
            }

        })

    }

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      {localStorage.getItem("token") !== null ? (
        <Navigate to="/me" />
      ) : (
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
                    <i class='bx bxs-envelope bx-md' style={{ color: '#e415ff' }}></i>
                    <h2 className="p-2">Email</h2>
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
                    <i class='bx bx-key bx-md' style={{ color: '#e415ff' }}></i>
                    <h2 className="p-2">Password</h2>
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
                <i class='bx bxs-log-in-circle bx-lg' style={{ color: '#e415ff' }}></i>
                
              </Button>
              
            </div>
          </Form>
        </div>
      )}
    </Container>
  );
};
