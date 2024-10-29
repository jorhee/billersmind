import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';

export default function BatchedNoaCard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { providerId } = useParams(); // Get providerId from URL parameters
    const [batchedNoas, setBatchedNoas] = useState([]);
    const [providerName, setProviderName] = useState('');

    // Fetch Batched NOAs and provider name by providerId
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage

                // Fetch Batched NOAs
                const batchedNoasResponse = await fetch(`http://localhost:4000/batchedNoa/${providerId}/all`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (batchedNoasResponse.status === 401) {
                    alert("Unauthorized: Please log in.");
                    navigate('/login');
                    return;
                }

                if (!batchedNoasResponse.ok) {
                    throw new Error(`HTTP error! Status: ${batchedNoasResponse.status}`);
                }

                const batchedNoasData = await batchedNoasResponse.json();
                console.log('Fetched Batched NOAs:', batchedNoasData); // Debugging log
                setBatchedNoas(batchedNoasData); // Update state with Batched NOA data

                // Fetch provider name
                const providerResponse = await fetch(`http://localhost:4000/providers/${providerId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!providerResponse.ok) {
                    throw new Error(`HTTP error! Status: ${providerResponse.status}`);
                }

                const providerData = await providerResponse.json();
                console.log('Fetched Provider:', providerData); // Debugging log
                setProviderName(providerData.name);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [providerId, navigate]);

  

return (
        <Card className="m-3 mb-3">
            <div className="batchedNoaCard">
                <Card.Body className="text-auto">
                    <Card.Title>
                        <Link to={location.pathname === `/batchedNoa/${providerId}/all` ? `/providers/${providerId}` : `/batchedNoa/${providerId}/all`}>
                            {location.pathname === `/batchedNoa/${providerId}/all` ? 'Back to Provider Page' : 'Submitted NOA List'}
                        </Link>
                    </Card.Title>
                    <Card.Text>All Submitted NOAs for Provider: {providerName}</Card.Text>

                    <Table striped bordered hover responsive="md" className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient Full Name</th>
                                <th>Member ID</th>
                                <th>Place of Service</th>
                                <th>Admit Date</th>
                                <th>Type of Bill</th>
                                <th>Benefit Period#</th>
                                <th>Bene Start Date</th>
                                <th>Bene Term Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batchedNoas.length > 0 ? (
                                batchedNoas.map((noa, index) => (
                                    <tr 
                                        key={noa._id} 
                                        onClick={() => navigate(`/batchedNoa/${noa._id}`)} 
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{`${noa.AttMd.lastName || 'N/A'}, ${noa.AttMd.firstName || 'N/A'}`}</td>
                                        <td>{noa.memberId || 'N/A'}</td>
                                        <td>{noa.placeOfService || 'N/A'}</td>
                                        <td>{noa.admitDate || 'N/A'}</td>
                                        <td>{noa.typeOfBill || 'N/A'}</td>
                                        <td>
                                            {noa.benefitPeriod.length > 0 
                                                ? noa.benefitPeriod.map(benefit => benefit.benefitNum).join(', ') 
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {noa.benefitPeriod.length > 0 
                                                ? noa.benefitPeriod.map(benefit => benefit.BeneStartDate).join(', ') 
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {noa.benefitPeriod.length > 0 
                                                ? noa.benefitPeriod.map(benefit => benefit.BeneTermDate).join(', ') 
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        No Batched NOAs Found for This Provider
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </div>
        </Card>
    );
};

