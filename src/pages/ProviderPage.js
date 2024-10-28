import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FaUserMd, FaMapMarkerAlt, FaPhone, FaFax, FaIdBadge } from 'react-icons/fa';
import PatientsCard from '../components/PatientsCard';
import BatchedNoaCard from '../components/BatchedNoaCard';

import ProviderDropdown from '../components/ProviderDropdown';


export default function ProviderPage () {

  const { providerId } = useParams(); // Get providerId from URL params
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        const response = await fetch(`http://localhost:4000/providers/${providerId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the request header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch provider details');
        }

        const data = await response.json();
        setProvider(data); // Update state with fetched provider data
      } catch (error) {
        console.error('Error fetching provider details:', error);
      }
    };

    if (providerId) {
      fetchProviderDetails();
    }
  }, [providerId]);

  const navigate = useNavigate();
  

//v2 with sidebar:

  return (
    <>
    <Container fluid className="p-4 bg-light">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">
            <FaUserMd className="me-2" />
            Provider Dashboard
          </h2>
          <ProviderDropdown />
        </Col>
      </Row>

      {provider && (
        <Row>
          {/* Provider Table */}
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h2><FaIdBadge className="me-2" />
                {provider.name}</h2>
              </Card.Header>
              <Card.Body>
                <Table bordered>
                  <tbody>
                    <tr>
                      <td><strong>Address</strong></td>
                      <td>
                        <FaMapMarkerAlt className="me-2" />
                        {`${provider.address.Address}, ${provider.address.City}, ${provider.address.State} ${provider.address.Zip}`}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Phone</strong></td>
                      <td><FaPhone className="me-2" />{provider.phone}</td>
                    </tr>
                    <tr>
                      <td><strong>Fax</strong></td>
                      <td><FaFax className="me-2" />{provider.fax}</td>
                    </tr>
                    <tr>
                      <td><strong>NPI</strong></td>
                      <td>{provider.npi}</td>
                    </tr>
                    <tr>
                      <td><strong>PTAN</strong></td>
                      <td>{provider.ptan}</td>
                    </tr>
                    <tr>
                      <td><strong>Tax ID</strong></td>
                      <td>{provider.taxId}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Header className="bg-secondary text-white text-center">Actions</Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  <li className="my-2">
                    <Button
                      variant="link"
                      onClick={() => navigate(`/patients/${providerId}/add-patient`)}
                      className="text-decoration-none text-primary"
                    >
                      Add Patient
                    </Button>
                  </li>
                  <li className="my-2">
                    <Button
                      variant="link"
                      onClick={() => navigate(`/batchedNoa/${providerId}/batch`)}
                      className="text-decoration-none text-primary"
                    >
                      Batch NOA
                    </Button>
                  </li>
                  <li className="my-2">
                    <Button
                      variant="link"
                      onClick={() => navigate('/batchednoa/:providerId/batch')}
                      className="text-decoration-none text-primary"
                    >
                      Add NOTR
                    </Button>
                  </li>
                  <li className="my-2">
                    <Button
                      variant="link"
                      onClick={() => navigate('/add-claims')}
                      className="text-decoration-none text-primary"
                    >
                      Add Claims
                    </Button>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
    <PatientsCard />
    <BatchedNoaCard />
    
    
  </>
  );

};


