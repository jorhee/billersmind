import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddProvider() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [fax, setFax] = useState('');
    const [npi, setNpi] = useState('');
    const [ptan, setPtan] = useState('');
    const [taxId, setTaxId] = useState('');
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    // Enable button only when required fields are filled
    useEffect(() => {
        if (name && npi && ptan && taxId) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [name, npi, ptan, taxId]);

    function registerProvider(e) {
        e.preventDefault();
        fetch('http://localhost:4000/providers/add-provider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.toUpperCase(),
                address: {
                    Address: address.toUpperCase(),
                    City: city.toUpperCase(),
                    State: state.toUpperCase(),
                    Zip: zip,
                },
                phone: phone,
                fax: fax,
                npi: npi.toUpperCase(),
                ptan: ptan.toUpperCase(),
                taxId: taxId.toUpperCase(),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Provider registered successfully') {
                    alert('Provider successfully added');
                    // Navigate back to the Provider List (profile or another page)
                    navigate('/me');
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
                onClick={() => navigate('/me')}
            >
                Back to Profile
            </Button>
        <Form onSubmit={registerProvider}>
            <h1 className="my-5 text-center">Register New Provider</h1>
            <Form.Group>
                <Form.Label>Provider Name:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Provider Name"
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
                <Form.Label>NPI:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter NPI (10 digits)"
                    required
                    value={npi}
                    onChange={(e) => setNpi(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>PTAN:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter PTAN"
                    required
                    value={ptan}
                    onChange={(e) => setPtan(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tax ID:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Tax ID"
                    required
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
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
