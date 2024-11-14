import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getAllArtistas } from '../../services/artista.service';
import UserHeader from '../../components/users/UserHeader';
import UserFooter from '../../components/users/UserFooter';

const ArtistasPage = () => {
    const [artistas, setArtistas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArtistas();
    }, []);

    const fetchArtistas = async () => {
        try {
            const data = await getAllArtistas();
            setArtistas(data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const handleArtistClick = (id) => {
        navigate(`/artista/${id}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <UserHeader />
            <Container className="my-4 flex-grow-1">
                <h1 className="text-center mb-4">Artistas</h1>
                <Row className="gy-4">
                    {artistas.map((artista) => (
                        <Col key={artista.id} md={4} lg={3}>
                            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3002${artista.imagen}`}
                                    alt={artista.nombre}
                                    style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                                />
                                <Card.Body className="text-center">
                                    <Card.Title className="mb-1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{artista.nombre}</Card.Title>
                                    <Button variant="primary" onClick={() => handleArtistClick(artista.id)}>
                                        Ver Detalles
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <UserFooter />
        </div>
    );
};

export default ArtistasPage;
