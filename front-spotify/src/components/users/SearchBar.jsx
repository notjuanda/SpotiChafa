import { useState } from 'react';
import { Form, Button, InputGroup, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { search } from '../../services/search.service';

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState({
        artistas: [],
        canciones: [],
        albums: [],
        generos: []
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await search(term);
            setResults(data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <Container className="my-3">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Form onSubmit={handleSearch}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Buscar artistas, canciones, álbumes o géneros..."
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            <Button type="submit" variant="primary">Buscar</Button>
                        </InputGroup>
                    </Form>
                    {term && (
                        <div className="mt-4">
                            <h5>Resultados de búsqueda para &quot;{term}&quot;:</h5>
                            <ListGroup>
                                {results.artistas.length > 0 && (
                                    <>
                                        <h6>Artistas</h6>
                                        {results.artistas.map((artista) => (
                                            <ListGroup.Item key={artista.id}>
                                                <strong>{artista.nombre}</strong>
                                            </ListGroup.Item>
                                        ))}
                                    </>
                                )}
                                {results.canciones.length > 0 && (
                                    <>
                                        <h6>Canciones</h6>
                                        {results.canciones.map((cancion) => (
                                            <ListGroup.Item key={cancion.id}>
                                                <strong>{cancion.titulo}</strong>
                                            </ListGroup.Item>
                                        ))}
                                    </>
                                )}
                                {results.albums.length > 0 && (
                                    <>
                                        <h6>Álbumes</h6>
                                        {results.albums.map((album) => (
                                            <ListGroup.Item key={album.id}>
                                                <strong>{album.titulo}</strong>
                                            </ListGroup.Item>
                                        ))}
                                    </>
                                )}
                                {results.generos.length > 0 && (
                                    <>
                                        <h6>Géneros</h6>
                                        {results.generos.map((genero) => (
                                            <ListGroup.Item key={genero.id}>
                                                <strong>{genero.nombre}</strong>
                                            </ListGroup.Item>
                                        ))}
                                    </>
                                )}
                            </ListGroup>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default SearchBar;
