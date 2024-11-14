import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
    return (
        <footer className="bg-dark text-white py-3 mt-auto">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Admin Dashboard - Todos los derechos reservados</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p>
                            <Link to="/privacy-policy" className="text-white">Política de Privacidad</Link> |{' '}
                            <Link to="/terms-of-service" className="text-white">Términos de Servicio</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default AdminFooter;
