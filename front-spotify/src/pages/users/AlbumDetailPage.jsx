import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getAlbumById } from '../../services/album.service';
import UserHeader from '../../components/users/UserHeader';
import UserFooter from '../../components/users/UserFooter';

const AlbumDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        fetchAlbumDetails();
    }, [id]);

    const fetchAlbumDetails = async () => {
        try {
            const data = await getAlbumById(id);
            setAlbum(data);
        } catch (error) {
            console.error('Error fetching album details:', error);
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
                {album ? (
                    <>
                        <Row className="align-items-center mb-5">
                            <Col md={4} className="text-center">
                                <Card className="border-0 shadow-lg">
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:3002${album.imagen}`}
                                        alt={album.titulo}
                                        style={{ height: '350px', objectFit: 'cover', borderRadius: '15px' }}
                                    />
                                </Card>
                            </Col>
                            <Col md={8}>
                                <h1 className="display-4" style={{ fontWeight: 'bold' }}>{album.titulo}</h1>
                                <p className="text-muted fs-5 mb-1">
                                    <strong>Artista:</strong> {album.artista.nombre}
                                </p>
                                <p className="text-muted fs-5">
                                    <strong>Fecha de lanzamiento:</strong> {album.fechaLanzamiento}
                                </p>
                                <Button variant="outline-secondary" onClick={() => navigate(`/artista/${album.artista.id}`)}>
                                    Ver Artista
                                </Button>
                            </Col>
                        </Row>

                        <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Canciones</h2>
                        <ul className="list-unstyled">
                            {album.canciones.map((cancion) => (
                                <li key={cancion.id} className="d-flex justify-content-between align-items-center mb-3">
                                    <span>{cancion.titulo}</span>
                                    <Button variant="primary" onClick={() => handlePlayTrack(cancion)}>
                                        Reproducir
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <p className="text-muted">Cargando detalles del álbum...</p>
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

export default AlbumDetailPage;
