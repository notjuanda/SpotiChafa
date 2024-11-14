import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getAllAlbums } from '../../services/album.service';
import UserHeader from '../../components/users/UserHeader';
import UserFooter from '../../components/users/UserFooter';

const AlbumsPage = () => {
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const data = await getAllAlbums();
            setAlbums(data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    const handleAlbumClick = (albumId) => {
        navigate(`/album/${albumId}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <UserHeader />
            <Container className="my-4 flex-grow-1">
                <h1 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Todos los Álbumes</h1>
                <Row className="gy-4">
                    {albums.map((album) => (
                        <Col key={album.id} md={4} lg={3}>
                            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3002${album.imagen}`}
                                    alt={album.titulo}
                                    style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                                    onClick={() => handleAlbumClick(album.id)}
                                />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className="mb-2 text-center" style={{ fontWeight: 'bold' }}>{album.titulo}</Card.Title>
                                    <Button variant="outline-primary" onClick={() => handleAlbumClick(album.id)}>
                                        Ver Detalle
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

export default AlbumsPage;
