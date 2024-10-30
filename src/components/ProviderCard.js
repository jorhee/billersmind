import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';

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

    const location = useLocation();

    return (
    <Card className="m-3 mb-3">
        <div className="providerCard">
            <Card.Body className="text-auto">
                <Card.Title>
                <Link to={location.pathname === '/providers/all' ? '/me' : '/providers/all'}>
                  {location.pathname === '/providers/all' ? 'Back to Profile' : 'Provider List'}
                </Link>
                </Card.Title>
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
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Added By</th>
                    </tr>
                </thead>
                <tbody>
                    {providers.length > 0 ? (
                        providers.map((provider, index) => (
                            <tr key={provider._id}>
                                <td>{index + 1}</td>
                                <td>
                                <Link to={`/providers/${provider._id}`}>
                                {provider.name || 'N/A'}
                                </Link>
                                </td>
                                <td>{provider.address?.Address || 'N/A'}</td>
                                <td>{provider.address?.City || 'N/A'}</td>
                                <td>{provider.address?.State || 'N/A'}</td>
                                <td>{provider.address?.Zip || 'N/A'}</td>
                                <td>{provider.phone || 'N/A'}</td>
                                <td>{provider.fax || 'N/A'}</td>
                                <td>{provider.npi || 'N/A'}</td>
                                <td>{provider.ptan || 'N/A'}</td>
                                <td>{provider.taxId || 'N/A'}</td>
                                <td>{new Date(provider.createdAt).toLocaleString() || 'N/A'}</td>
                                <td>{new Date(provider.updatedAt).toLocaleString() || 'N/A'}</td>
                                <td>{provider.addedBy?.email || 'N/A'}</td> {/* Display the user's email */}
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="14" className="text-center"> {/* Adjusted colspan for new column */}
                                No Providers Found
                            </td></tr>
                    )}
                </tbody>
                        </Table>
                    </Card.Body>  
                             
                </div>
            </Card>  
    );
}
