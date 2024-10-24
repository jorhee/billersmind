import { Card, Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';


export default function ProviderCard() {
    const navigate = useNavigate();

    return (
        <Card className="m-3 mb-3">
            <Card.Body className="text-auto">
                <Card.Title>Provider List</Card.Title>
                <Card.Text>Billers Mind BPO Clients</Card.Text>
                {/* Navigate to AddProvider page */}
                <Button variant="primary" className="text-center" onClick={() => navigate('/add-provider')}>
                    Add Provider
                </Button>
            </Card.Body>
        </Card>
    );
}