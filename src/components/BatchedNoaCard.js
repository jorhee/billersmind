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
                            {location.pathname === `/batchedNoa/${providerId}/all` ? 'Back to Provider Page' : 'Batched NOA List'}
                        </Link>
                    </Card.Title>
                    <Card.Text>All Batched NOAs for Provider: {providerName}</Card.Text>

                    <Table striped bordered hover responsive="md" className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Member ID</th>
                                <th>Place of Service</th>
                                <th>Admit Date</th>
                                <th>Type of Bill</th>
                                <th>Primary Diagnosis</th>
                                <th>Attending MD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batchedNoas.length > 0 ? (
                                batchedNoas.map((noa, index) => (
                                    <tr key={noa._id}>
                                        <td>{index + 1}</td>
                                        <td>{noa.memberId || 'N/A'}</td>
                                        <td>{noa.placeOfService || 'N/A'}</td>
                                        <td>{noa.admitDate || 'N/A'}</td>
                                        <td>{noa.typeOfBill || 'N/A'}</td>
                                        <td>{noa.primaryDiagnosis || 'N/A'}</td>
                                        <td>{noa.AttMd ? `${noa.AttMd.firstName} ${noa.AttMd.lastName}` : 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
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
}


//v2
/*
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';

export default function BatchedNoaCard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { providerId } = useParams(); // Get providerId from URL parameters
    const [notices, setNotices] = useState([]);
    const [providerName, setProviderName] = useState('');

    // Fetch notices and provider name from the database by providerId
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage

                // Fetch NOAs for the provider
                const noticesResponse = await fetch(`http://localhost:4000/batchNoe/${providerId}/all`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Include token in headers
                    }
                });

                if (noticesResponse.status === 401) {
                    alert("Unauthorized: Please log in.");
                    navigate('/login');
                    return;
                }

                if (!noticesResponse.ok) {
                    throw new Error(`HTTP error! Status: ${noticesResponse.status}`);
                }

                const noticesData = await noticesResponse.json();
                console.log('Fetched Notices:', noticesData); // Debugging log
                setNotices(noticesData); // Update state with fetched notices data

                // Fetch provider name
                const providerResponse = await fetch(`http://localhost:4000/providers/${providerId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Include token in headers
                    }
                });

                if (!providerResponse.ok) {
                    throw new Error(`HTTP error! Status: ${providerResponse.status}`);
                }

                const providerData = await providerResponse.json();
                console.log('Fetched Provider:', providerData); // Debugging log
                setProviderName(`${providerData.name}`); // Set provider name

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [providerId, navigate]); // Add providerId as a dependency

    return (
        <Card className="m-3 mb-3">
            <div className="batchedNoaCard">
                <Card.Body className="text-auto">
                    <Card.Title>
                        <Link to={location.pathname === `/batchNoe/${providerId}/all` ? `/providers/${providerId}` : `/batchNoe/${providerId}/all`}>
                            {location.pathname === `/batchNoe/${providerId}/all` ? 'Back to Provider Page' : 'Batched NOA List'}
                        </Link>
                    </Card.Title>
                    <Card.Text>All Batched NOAs for Provider: {providerName}</Card.Text>

                    <Table striped bordered hover responsive="md" className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient First Name</th>
                                <th>Patient Last Name</th>
                                <th>Place of Service</th>
                                <th>Admit Date</th>
                                <th>Benefit Period Number</th>
                                <th>Benefit Start Date</th>
                                <th>Benefit Term Date</th>
                                <th>Created At</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.length > 0 ? (
                                notices.map((noa, index) => (
                                    <tr key={noa._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/batchNoe/${noa._id}`}>
                                                {noa.patientId.firstName || 'N/A'}
                                            </Link>
                                        </td>
                                        <td>{noa.patientId.lastName || 'N/A'}</td>
                                        <td>{noa.placeOfService || 'N/A'}</td>
                                        <td>{new Date(noa.admitDate).toLocaleDateString() || 'N/A'}</td>
                                        <td>{noa.benefitPeriod[0]?.benefitNum || 'N/A'}</td>
                                        <td>{noa.benefitPeriod[0]?.BeneStartDate || 'N/A'}</td>
                                        <td>{noa.benefitPeriod[0]?.BeneTermDate || 'N/A'}</td>
                                        <td>{new Date(noa.createdAt).toLocaleDateString() || 'N/A'}</td>
                                        <td>
                                            <Link to={`/batchNoe/${noa._id}`}>
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">
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
}
*/