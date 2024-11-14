import { Container, Row, Col } from 'react-bootstrap';

const UserFooter = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-auto">
            <Container>
                <Row>
                    <Col md={6} className="text-center text-md-left">
                        <p>&copy; 2024 MiSpotify. Todos los derechos reservados.</p>
                    </Col>
                    <Col md={6} className="text-center text-md-right">
                        <p>
                            <a href="/privacy" className="text-light">Política de Privacidad</a> |
                            <a href="/terms" className="text-light"> Términos de Servicio</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default UserFooter;
