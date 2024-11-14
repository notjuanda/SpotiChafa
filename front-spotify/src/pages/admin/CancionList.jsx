import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAllCanciones, deleteCancion } from '../../services/cancion.service';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const CancionList = () => {
    const [canciones, setCanciones] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await deleteCancion(id);
            setCanciones(canciones.filter(cancion => cancion.id !== id));
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/admin/cancion/editar/${id}`;
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-center">Lista de Canciones</h1>
                    <Button variant="primary" onClick={() => window.location.href = '/admin/cancion/agregar'}>
                        <FaPlus className="me-2" /> Agregar Canción
                    </Button>
                </div>
                <Row>
                    {canciones.map((cancion) => (
                        <Col key={cancion.id} md={6} lg={4} className="mb-4">
                            <Card>
                                {cancion.album && (
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:3002${cancion.album.imagen}`}
                                        alt={cancion.album.titulo}
                                        className="mb-3"
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{cancion.titulo}</Card.Title>
                                    {cancion.album && (
                                        <Card.Text>
                                            <strong>Álbum:</strong> {cancion.album.titulo}
                                        </Card.Text>
                                    )}
                                    <Card.Text>
                                        <strong>Archivo:</strong> {cancion.archivo ? "Disponible" : "No disponible"}
                                    </Card.Text>
                                    {cancion.archivo && (
                                        <div className="mb-3">
                                            <audio controls src={`http://localhost:3002${cancion.archivo}`} />
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-between mt-3">
                                        <Button variant="warning" className="me-2" onClick={() => handleEdit(cancion.id)}>
                                            <FaEdit /> Editar
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(cancion.id)}>
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

export default CancionList;
