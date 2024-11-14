import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAllGeneros, deleteGenero } from '../../services/genero.service';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';
import { useNavigate } from 'react-router-dom';

const GeneroList = () => {
    const [generos, setGeneros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGeneros();
    }, []);

    const fetchGeneros = async () => {
        try {
            const data = await getAllGeneros();
            setGeneros(data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteGenero(id);
            setGeneros(generos.filter(genero => genero.id !== id));
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/genero/editar/${id}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-center">Lista de Géneros</h1>
                    <Button variant="primary" onClick={() => navigate('/admin/genero/agregar')}>
                        <FaPlus className="me-2" /> Agregar Género
                    </Button>
                </div>
                <Row>
                    {generos.map((genero) => (
                        <Col key={genero.id} md={6} lg={4} className="mb-4">
                            <Card>
                                {genero.imagen && (
                                    <Card.Img
                                        variant="top"
                                        src={`http://localhost:3002${genero.imagen}`}
                                        alt={genero.nombre}
                                        className="mb-3"
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{genero.nombre}</Card.Title>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Button variant="warning" className="me-2" onClick={() => handleEdit(genero.id)}>
                                            <FaEdit /> Editar
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(genero.id)}>
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

export default GeneroList;
