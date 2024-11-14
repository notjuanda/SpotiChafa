import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaMusic, FaUser, FaListAlt, FaCompactDisc } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const AdminHome = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <h1 className="text-center mb-4">Panel de Administración</h1>
                <Row>
                    <Col md={6} lg={3} className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <Link to="/admin/canciones" className="text-decoration-none text-dark">
                                    <FaMusic size={40} className="mb-3" />
                                    <Card.Title>Canciones</Card.Title>
                                    <Card.Text>Gestiona todas las canciones disponibles en la plataforma.</Card.Text>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <Link to="/admin/artistas" className="text-decoration-none text-dark">
                                    <FaUser size={40} className="mb-3" />
                                    <Card.Title>Artistas</Card.Title>
                                    <Card.Text>Administra los artistas registrados en la base.</Card.Text>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <Link to="/admin/albums" className="text-decoration-none text-dark">
                                    <FaCompactDisc size={40} className="mb-3" />
                                    <Card.Title>Álbumes</Card.Title>
                                    <Card.Text>Gestiona todos los álbumes de la colección.</Card.Text>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={3} className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <Link to="/admin/generos" className="text-decoration-none text-dark">
                                    <FaListAlt size={40} className="mb-3" />
                                    <Card.Title>Géneros</Card.Title>
                                    <Card.Text>Administra los géneros musicales disponibles.</Card.Text>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <AdminFooter className="mt-auto" />
        </div>
    );
};

export default AdminHome;
