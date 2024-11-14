import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaMusic } from 'react-icons/fa';
import { getAllArtistas, deleteArtista } from '../../services/artista.service';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const ArtistaList = () => {
    const [artistas, setArtistas] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await deleteArtista(id);
            setArtistas(artistas.filter(artista => artista.id !== id));
        } catch (error) {
            console.error('Error deleting artist:', error);
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/admin/artista/editar/${id}`;
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-center">Lista de Artistas</h1>
                    <Button variant="primary" onClick={() => window.location.href = '/admin/artista/agregar'}>
                        <FaMusic className="me-2" /> Agregar Artista
                    </Button>
                </div>
                <Row>
                    {artistas.map((artista) => (
                        <Col key={artista.id} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3002${artista.imagen}`}
                                    alt={artista.nombre}
                                />
                                <Card.Body>
                                    <Card.Title>{artista.nombre}</Card.Title>
                                    {artista.genero && (
                                        <Card.Text>
                                            <strong>Género:</strong> {artista.genero.nombre}
                                            <br />
                                            <img
                                                src={`http://localhost:3002${artista.genero.imagen}`}
                                                alt={artista.genero.nombre}
                                                width="50"
                                                className="mt-2"
                                            />
                                        </Card.Text>
                                    )}
                                    <Card.Text>
                                        <strong>Álbumes:</strong>
                                        <ul className="list-unstyled mt-2">
                                            {artista.albumes.map((album) => (
                                                <li key={album.id}>
                                                    <img
                                                        src={`http://localhost:3002${album.imagen}`}
                                                        alt={album.titulo}
                                                        width="30"
                                                        className="me-2"
                                                    />
                                                    {album.titulo} - {album.fechaLanzamiento}
                                                </li>
                                            ))}
                                        </ul>
                                    </Card.Text>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Button variant="warning" className="me-2" onClick={() => handleEdit(artista.id)}>
                                            <FaEdit /> Editar
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(artista.id)}>
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

export default ArtistaList;
