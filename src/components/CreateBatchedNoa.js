import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/CreateBatchedNoa.css'
import { FaUser, FaHospital, FaClipboardList, FaCalendar, FaIdCard, FaCalendarAlt, FaStethoscope  } from 'react-icons/fa'; // Importing icons
import { Form, Button, Container, Row, Col } from 'react-bootstrap';



export default function CreateBatchedNoa() {

    const { providerId } = useParams(); 
    const navigate = useNavigate(); 

    const [patientId, setPatientId] = useState('');
    const [placeOfService, setPlaceOfService] = useState('');
    const [payerId, setPayerId] = useState('');
    const [memberId, setMemberId] = useState('');
    const [admitDate, setAdmitDate] = useState('');
    const [typeOfBill, setTypeOfBill] = useState('');
    const [primaryDiagnosis, setPrimaryDiagnosis] = useState('');
    const [AttMd, setAttMd] = useState({
        lastName: '',
        firstName: '',
        npi: ''
    });
    const [benefitPeriod, setBenefitPeriod] = useState([{ benefitNum: 0, BeneStartDate: '' }]);

    async function registerBatchedNoa(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:4000/batchedNoa/${providerId}/batch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    patientId,
                    placeOfService,
                    payerId,
                    memberId: memberId.toUpperCase(),
                    admitDate,
                    typeOfBill,
                    primaryDiagnosis: primaryDiagnosis.toUpperCase(),
                    AttMd: {
                        lastName: AttMd.lastName.toUpperCase(),
                        firstName: AttMd.firstName.toUpperCase(),
                        npi: AttMd.npi
                    },
                    benefitPeriod: benefitPeriod.map(b => ({
                        benefitNum: b.benefitNum,
                        BeneStartDate: b.BeneStartDate
                    }))
                }),
            });

            const data = await response.json();

            if (response.ok) {
            	console.log('Response:', response);
                alert('Batched NOA successfully created');
                navigate(`/providers/${providerId}`);
            } else {
                alert(data.message || 'Error creating Batched NOA');
                console.log('Data:', data);
            }
            console.log({ patientId, placeOfService, payerId, memberId, admitDate, typeOfBill, benefitPeriod, primaryDiagnosis, AttMd });
        } catch (error) {
            console.error('Error registering Batched NOA:', error);
            alert('An error occurred. Please try again.');
        }
    }

return (
        <div>
        <Container>
            <h2>Create Batched NOA</h2>
            <form onSubmit={registerBatchedNoa}>
                <label>Patient ID:</label>
                <input type="text" value={patientId} onChange={e => setPatientId(e.target.value)} required />

                <label>Place of Service:</label>
                <input type="text" value={placeOfService} onChange={e => setPlaceOfService(e.target.value)} required />

                <label>Payer ID:</label>
                <input type="text" value={payerId} onChange={e => setPayerId(e.target.value)} required />

                <label>Member ID:</label>
                <input type="text" value={memberId} onChange={e => setMemberId(e.target.value)} required />

                <label>Admit Date:</label>
                <input type="text" value={admitDate} onChange={e => setAdmitDate(e.target.value)} required />

                <label>Type of Bill:</label>
                <input type="text" value={typeOfBill} onChange={e => setTypeOfBill(e.target.value)} required />

                <label>Primary Diagnosis:</label>
                <input type="text" value={primaryDiagnosis} onChange={e => setPrimaryDiagnosis(e.target.value)} required />

                <fieldset>
                    <legend>Attending MD:</legend>
                    <label>Last Name:</label>
                    <input type="text" value={AttMd.lastName} onChange={e => setAttMd({ ...AttMd, lastName: e.target.value })} required />
                    
                    <label>First Name:</label>
                    <input type="text" value={AttMd.firstName} onChange={e => setAttMd({ ...AttMd, firstName: e.target.value })} required />
                    
                    <label>NPI:</label>
                    <input type="text" value={AttMd.npi} onChange={e => setAttMd({ ...AttMd, npi: e.target.value })} required />
                </fieldset>

                <fieldset>
                    <legend>Benefit Period</legend>
                    {benefitPeriod.map((period, index) => (
                        <div key={index}>
                            <label>Benefit Number:</label>
                            <input
                                type="number"
                                value={period.benefitNum}
                                onChange={e => {
                                    const newBenefitPeriod = [...benefitPeriod];
                                    newBenefitPeriod[index].benefitNum = Number(e.target.value);
                                    setBenefitPeriod(newBenefitPeriod);
                                }}
                                required
                            />
                            <label>Bene Start Date:</label>
                            <input
                                type="text"
                                value={period.BeneStartDate}
                                onChange={e => {
                                    const newBenefitPeriod = [...benefitPeriod];
                                    newBenefitPeriod[index].BeneStartDate = e.target.value;
                                    setBenefitPeriod(newBenefitPeriod);
                                }}
                                required
                                
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => setBenefitPeriod([...benefitPeriod, { benefitNum: '', BeneStartDate: '' }])}>
                        Add Benefit Period
                    </button>
                </fieldset>

                <button type="submit">Create Batched NOA</button>
            </form>
            </Container>
        </div>
    );
}

