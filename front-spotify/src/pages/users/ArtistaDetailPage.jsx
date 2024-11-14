import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getArtistaDetalles } from '../../services/artista.service';
import UserHeader from '../../components/users/UserHeader';
import UserFooter from '../../components/users/UserFooter';

const ArtistaDetailPage = () => {
    const { id } = useParams();
    const [artista, setArtista] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        fetchArtistaDetails();
    }, [id]);

    const fetchArtistaDetails = async () => {
        try {
            const data = await getArtistaDetalles(id);
            setArtista(data);
        } catch (error) {
            console.error('Error fetching artist details:', error);
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
                {artista ? (
                    <>
                        <Row className="align-items-center mb-5">
                            <Col md={4} className="text-center">
                                <Card className="border-0 shadow-lg">
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:3002${artista.imagen}`}
                                        alt={artista.nombre}
                                        style={{ height: '350px', objectFit: 'cover', borderRadius: '15px' }}
                                    />
                                </Card>
                            </Col>
                            <Col md={8}>
                                <h1 className="display-4" style={{ fontWeight: 'bold' }}>{artista.nombre}</h1>
                                <p className="text-muted fs-5">
                                    Descubre todos los álbumes y canciones de {artista.nombre}.
                                </p>
                            </Col>
                        </Row>

                        <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Álbumes</h2>
                        <Row className="gy-4">
                            {artista.albumes.map((album) => (
                                <Col key={album.id} md={6} lg={4}>
                                    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3002${album.imagen}`}
                                            alt={album.titulo}
                                            style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{album.titulo}</Card.Title>
                                            <Card.Text><small className="text-muted">Fecha de lanzamiento: {album.fechaLanzamiento}</small></Card.Text>
                                            <h5 className="mt-4 mb-3" style={{ fontSize: '1.25rem' }}>Canciones</h5>
                                            <ul className="list-unstyled">
                                                {album.canciones.map((cancion) => (
                                                    <li key={cancion.id} className="d-flex justify-content-between align-items-center mb-2">
                                                        <span>{cancion.titulo}</span>
                                                        <Button variant="outline-primary" size="sm" onClick={() => handlePlayTrack(cancion)}>
                                                            Reproducir
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <p className="text-muted">Cargando detalles del artista...</p>
                    </div>
                )}
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

export default ArtistaDetailPage;
