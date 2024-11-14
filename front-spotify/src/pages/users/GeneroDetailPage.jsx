import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { getGeneroById } from '../../services/genero.service';
import UserHeader from '../../components/users/UserHeader';
import UserFooter from '../../components/users/UserFooter';

const GeneroDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genero, setGenero] = useState(null);

    useEffect(() => {
        fetchGeneroDetails();
    }, [id]);

    const fetchGeneroDetails = async () => {
        try {
            const data = await getGeneroById(id);
            setGenero(data);
        } catch (error) {
            console.error('Error fetching genre details:', error);
        }
    };

    const handleArtistaClick = (artistaId) => {
        navigate(`/artista/${artistaId}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <UserHeader />
            <Container className="my-4 flex-grow-1">
                {genero ? (
                    <>
                        <h1 className="text-center mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                            <Badge bg="primary">{genero.nombre}</Badge>
                        </h1>
                        <Row className="align-items-center mb-5">
                            <Col md={5} className="text-center">
                                <Card className="shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:3002${genero.imagen}`}
                                        alt={genero.nombre}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                </Card>
                            </Col>
                            <Col md={7}>
                                <p className="text-muted fs-5">
                                    Explora las canciones y artistas más destacados del género {genero.nombre}.
                                </p>
                            </Col>
                        </Row>

                        <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Artistas Relacionados</h2>
                        <Row className="gy-4">
                            {genero.artistas.length > 0 ? (
                                genero.artistas.map((artista) => (
                                    <Col key={artista.id} md={4} lg={3}>
                                        <Card
                                            className="h-100 shadow-sm border-0"
                                            style={{ borderRadius: '15px', cursor: 'pointer' }}
                                            onClick={() => handleArtistaClick(artista.id)}
                                        >
                                            <div
                                                className="card-img-container"
                                                style={{
                                                    overflow: 'hidden',
                                                    borderTopLeftRadius: '15px',
                                                    borderTopRightRadius: '15px',
                                                }}
                                            >
                                                <Card.Img
                                                    variant="top"
                                                    src={`http://localhost:3002${artista.imagen}`}
                                                    alt={artista.nombre}
                                                    style={{ height: '250px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <Card.Body className="text-center">
                                                <Card.Title
                                                    className="mb-1"
                                                    style={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                                                >
                                                    {artista.nombre}
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col>
                                    <p className="text-center text-muted">No hay artistas disponibles para este género.</p>
                                </Col>
                            )}
                        </Row>
                    </>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <p className="text-muted">Cargando detalles del género...</p>
                    </div>
                )}
            </Container>
            <UserFooter />
        </div>
    );
};

export default GeneroDetailPage;
