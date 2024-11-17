import React, { useState, useEffect } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export default function Payer () {
    const navigate = useNavigate();
    const [payers, setPayers] = useState([]);

    // Fetch payers from the database
    useEffect(() => {
        const fetchPayers = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage

                const response = await fetch(`${process.env.REACT_APP_BE_URL}/payers/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the request header
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch payers');
                }

                const data = await response.json();
                setPayers(data); // Update state with fetched payer data
            } catch (error) {
                console.error('Error fetching payers:', error);
            }
        };

        fetchPayers();
    }, []); // Run once when component loads


        const handleProfilePage = () => {
        navigate('/me'); 
        };

    return (
        <Card className="m-3 mb-3">
            <div className="payerCard">
                <div className="ms-auto">
                    <Button
                        variant="secondary"
                        className="mt-3"
                        onClick={handleProfilePage}
                    >
                        Back to Profiles
                    </Button>
                </div>
                <Card.Body className="text-auto">
                    <Card.Title>Payer List</Card.Title>
                    <Card.Text>Insurance Informations</Card.Text>
                    
                    {/* Bootstrap Table for displaying payers */}
                    <Table striped bordered hover responsive="md" className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip</th>
                                <th>Payer ID</th>
                                <th>Phone</th>
                                <th>Fax</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payers.length > 0 ? (
                                payers.map((payer, index) => (
                                    <tr key={payer._id}>
                                        <td>{index + 1}</td>
                                        <td>{payer.name || 'N/A'}</td>
                                        <td>{payer.address?.Address || 'N/A'}</td>
                                        <td>{payer.address?.City || 'N/A'}</td>
                                        <td>{payer.address?.State || 'N/A'}</td>
                                        <td>{payer.address?.Zip || 'N/A'}</td>
                                        <td>{payer.payerId || 'N/A'}</td>
                                        <td>{payer.phone || 'N/A'}</td>
                                        <td>{payer.fax || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        No Payers Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>

                <Button 
                    variant="primary" 
                    className="text-center" 
                    onClick={() => navigate('/add-payer')} // Link to add new payer page
                >
                    Add Payer
                </Button>
            </div>
        </Card>
    );
};