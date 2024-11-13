import React from 'react';

import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddPayer() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [payerId, setPayerId] = useState('');
    const [phone, setPhone] = useState('');
    const [fax, setFax] = useState('');
    const [isActive, setIsActive] = useState(false);
    
    const navigate = useNavigate();

    // Enable button only when required fields are filled
    useEffect(() => {
        setIsActive(name && payerId)     
    }, [name, payerId]);

    async function registerPayer(e) {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        try {
        const response = await fetch('http://localhost:4000/payers/add-payer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token to the Authorization header
            },
            body: JSON.stringify({
                name: name.toUpperCase(),
                address: {
                    Address: address.toUpperCase(),
                    City: city.toUpperCase(),
                    State: state.toUpperCase(),
                    Zip: zip,
                },
                payerId: payerId.toUpperCase(),
                phone: phone,
                fax: fax,
            }),
        });
        
        const data = await response.json();

        if (response.ok) {
            alert('Payer successfully added');
            navigate('/payers/all');
        }   else {
                alert(data.message || 'Error adding payer');
            }
        } catch (error) {
          console.error('Error registering payer:', error);
          alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="text-auto">
            <Button
                variant="secondary"
                className="mt-3"
                onClick={() => navigate('/payers/all')}
            >
                Back to Payer List
            </Button>
            <Form onSubmit={registerPayer}>
                <h1 className="my-5 text-center">Register New Payer</h1>
                <Form.Group>
                    <Form.Label>Payer Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Payer Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>State:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zip Code:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Zip Code"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fax:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Fax Number"
                        value={fax}
                        onChange={(e) => setFax(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Payer ID:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Payer ID"
                        required
                        value={payerId}
                        onChange={(e) => setPayerId(e.target.value)}
                    />
                </Form.Group>
                <div className="text-center mt-4">
                  <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive}>
                    Register
                  </Button>
                </div>
            </Form>
        </div>
    );
}
