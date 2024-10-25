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
        if (name && payerId) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [name, payerId]);

    function registerPayer(e) {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        fetch('http://localhost:4000/payers/add-payer', {
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
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === 'Payer registered successfully') {
                alert('Payer successfully added');
                // Navigate back to the Payer List (profile or another page)
                navigate('/payers/all');
            } else {
                alert(data.message);
            }
        });
    }

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
                {isActive ? (
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                ) : (
                    <Button variant="danger" type="submit" disabled>
                        Register
                    </Button>
                )}
            </Form>
        </div>
    );
}
