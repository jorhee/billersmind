import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PatientsCard() {
    const navigate = useNavigate();
    const { providerId } = useParams(); // Get providerId from URL parameters
    const [patients, setPatients] = useState([]);
    const [providerName, setProviderName] = useState('');

    // Fetch patients and provider name from the database by providerId
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage

                // Fetch patients
                const patientsResponse = await fetch(`http://localhost:4000/patients/${providerId}/all`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Include token in headers
                    }
                });

                if (patientsResponse.status === 401) {
                    alert("Unauthorized: Please log in.");
                    navigate('/login');
                    return;
                }

                if (!patientsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${patientsResponse.status}`);
                }

                const patientsData = await patientsResponse.json();
                console.log('Fetched Patients:', patientsData); // Debugging log
                setPatients(patientsData); // Update state with fetched patient data

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
        <div>
            <h2 className="text-center bg-secondary">All Patients for Provider: {providerName}</h2>
            {patients.length > 0 ? (
                <ul className="list-group">
                    {patients.map((patient) => (
                        <li key={patient._id} className="list-group-item">
                            <strong>{patient.firstName} {patient.lastName}</strong><br />
                            Date of Birth: {patient.dateOfBirth}<br />
                            Gender: {patient.gender}<br />
                            Address: {patient.address.Address}, {patient.address.City}, {patient.address.State}, {patient.address.Zip}<br />
                            Member ID: {patient.memberId}<br />
                            Status: {patient.isActive ? "Active" : "Inactive"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No patients found for this provider.</p>
            )}
        </div>
    );
}