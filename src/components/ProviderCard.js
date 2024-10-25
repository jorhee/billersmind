import React, { useState, useEffect } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ProviderCard() {
    const navigate = useNavigate();
    const [providers, setProviders] = useState([]);

    // Fetch providers from the database
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                const response = await fetch('http://localhost:4000/providers/all', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Include token in headers
                    }
                });
                
                if (response.status === 401) {
                    alert("Unauthorized: Please log in.");
                    navigate('/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Fetched Providers:', data); // Debugging log
                setProviders(data); // Update state with fetched provider data
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };

        fetchProviders();
    }, [navigate]); // Run once when component loads

    return (
        <Card className="m-3 mb-3">
            <div className="providerCard">
                <Card.Body className="text-auto">
                    <Card.Title>Provider List</Card.Title>
                    <Card.Text>Billers Mind BPO Clients</Card.Text>
                    
                    {/* Bootstrap Table for displaying providers */}
                    <Table striped bordered hover responsive="md" className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip</th>
                                <th>Phone</th>
                                <th>Fax</th>
                                <th>NPI</th>
                                <th>PTAN</th>
                                <th>Tax ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.length > 0 ? (
                                providers.map((provider, index) => (
                                    <tr key={provider._id}>
                                        <td>{index + 1}</td>
                                        <td>{provider.name || 'N/A'}</td>
                                        <td>{provider.address?.Address || 'N/A'}</td>
                                        <td>{provider.address?.City || 'N/A'}</td>
                                        <td>{provider.address?.State || 'N/A'}</td>
                                        <td>{provider.address?.Zip || 'N/A'}</td>
                                        <td>{provider.phone || 'N/A'}</td>
                                        <td>{provider.fax || 'N/A'}</td>
                                        <td>{provider.npi || 'N/A'}</td>
                                        <td>{provider.ptan || 'N/A'}</td>
                                        <td>{provider.taxId || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="text-center">
                                        No Providers Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>

                <Button 
                    variant="primary" 
                    className="text-center" 
                    onClick={() => navigate('/add-provider')}
                >
                    Add Provider
                </Button>
            </div>
        </Card>
    );
}
