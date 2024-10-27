import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export default function ProviderDropdown() {

    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProviders = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token'); 
            // Get token from local storage
            const response = await fetch('http://localhost:4000/providers/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in headers
                }
            });

            

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProviders(data); // Update state with fetched provider data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []); // Fetch providers on component mount

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {loading ? 'Loading...' : 'Select Provider'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {error && <Dropdown.Item>{error}</Dropdown.Item>}
                {providers.length > 0 ? (
                    providers.map(provider => (
                        <Dropdown.Item key={provider._id} href={`/providers/${provider._id}`}>
                            {provider.name || 'N/A'}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item>No Providers Found</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};


