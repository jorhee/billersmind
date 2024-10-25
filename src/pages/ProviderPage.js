import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { FaUserMd, FaMapMarkerAlt, FaPhone, FaFax, FaIdBadge } from 'react-icons/fa';

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

  return (
    <Container fluid className="p-4 bg-light">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">
            <FaUserMd className="me-2" />
            Provider Dashboard
          </h2>
        </Col>
      </Row>

      {provider && (
        <Row>
          <Col md={12}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <FaIdBadge className="me-2" />
                {provider.name}
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
        </Row>
      )}
    </Container>
  );
};


