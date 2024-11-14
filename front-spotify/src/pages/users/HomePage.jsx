import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getAllGeneros } from '../../services/genero.service';
import UserHeader from '../../components/users/UserHeader';
import UserFooter from '../../components/users/UserFooter';

const HomePage = () => {
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

    const handleGeneroClick = (generoId) => {
        navigate(`/genero/${generoId}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <UserHeader />
            <Container className="my-4 flex-grow-1">
                <h1 className="text-center mb-4">Explora los Géneros</h1>
                <Row>
                    {generos.map((genero) => (
                        <Col key={genero.id} md={4} lg={3} className="mb-4">
                            <Card onClick={() => handleGeneroClick(genero.id)} style={{ cursor: 'pointer' }}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3002${genero.imagen}`}
                                    alt={genero.nombre}
                                />
                                <Card.Body>
                                    <Card.Title>{genero.nombre}</Card.Title>
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

export default HomePage;
