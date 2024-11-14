import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getAllCanciones } from '../../services/cancion.service';
import UserHeader from '../../components/users/UserHeader';
import UserFooter from '../../components/users/UserFooter';

const CancionesPage = () => {
    const [canciones, setCanciones] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        fetchCanciones();
    }, []);

    const fetchCanciones = async () => {
        try {
            const data = await getAllCanciones();
            setCanciones(data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const handlePlayTrack = (track) => {
        setCurrentTrack(track);
    };

    const handleCloseTrack = () => {
        setCurrentTrack(null);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <UserHeader />
            <Container className="my-4 flex-grow-1">
                <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Todas las Canciones</h1>
                <Row className="gy-4">
                    {canciones.map((cancion) => (
                        <Col key={cancion.id} md={4} lg={3}>
                            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className="mb-2" style={{ fontWeight: 'bold' }}>{cancion.titulo}</Card.Title>
                                    <Button variant="primary" onClick={() => handlePlayTrack(cancion)}>
                                        Reproducir
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {currentTrack && (
                <div
                    className="bg-dark text-white text-center py-3 fixed-bottom"
                    style={{ boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.3)', zIndex: 1040 }}
                >
                    <p className="mb-1 d-flex justify-content-between align-items-center px-3">
                        <span>Reproduciendo: {currentTrack.titulo}</span>
                        <Button variant="outline-light" size="sm" onClick={handleCloseTrack}>
                            Cerrar
                        </Button>
                    </p>
                    <audio controls autoPlay src={`http://localhost:3002${currentTrack.archivo}`} style={{ width: '100%' }} />
                </div>
            )}
            <UserFooter />
        </div>
    );
};

export default CancionesPage;
