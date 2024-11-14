import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAllAlbums, deleteAlbum } from '../../services/album.service';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await deleteAlbum(id);
            setAlbums(albums.filter(album => album.id !== id));
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/admin/album/editar/${id}`;
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-center">Lista de Álbumes</h1>
                    <Button variant="primary" onClick={() => window.location.href = '/admin/album/agregar'}>
                        <FaPlus className="me-2" /> Agregar Álbum
                    </Button>
                </div>
                <Row>
                    {albums.map((album) => (
                        <Col key={album.id} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3002${album.imagen}`}
                                    alt={album.titulo}
                                />
                                <Card.Body>
                                    <Card.Title>{album.titulo}</Card.Title>
                                    <Card.Text>
                                        <strong>Artista:</strong> {album.artista.nombre}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Fecha de Lanzamiento:</strong> {album.fechaLanzamiento}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Button variant="warning" className="me-2" onClick={() => handleEdit(album.id)}>
                                            <FaEdit /> Editar
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(album.id)}>
                                            <FaTrash /> Eliminar
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <AdminFooter className="mt-auto" />
        </div>
    );
};

export default AlbumList;
