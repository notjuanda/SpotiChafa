import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { search } from '../../services/search.service';
import UserHeader from '../../components/users/UserHeader';
import UserFooter from '../../components/users/UserFooter';

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('term');
    const [results, setResults] = useState({
        artistas: [],
        canciones: [],
        albums: [],
        generos: [],
    });
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const fetchSearchResults = async (term) => {
        try {
            const data = await search(term);
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleRedirect = (type, id) => {
        switch (type) {
            case 'artista':
                navigate(`/artista/${id}`);
                break;
            case 'album':
                navigate(`/album/${id}`);
                break;
            case 'genero':
                navigate(`/genero/${id}`);
                break;
            default:
                break;
        }
    };

    const handlePlayTrack = (track) => {
        setCurrentTrack(track);
    };

    const handleCloseTrack = () => {
        setCurrentTrack(null);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <UserHeader />
            <Container className="my-4 flex-grow-1">
                <h1 className="text-center mb-4">Resultados de búsqueda para: &quot;{query}&quot;</h1>

                {results.artistas.length > 0 && (
                    <>
                        <h3 className="mt-4">Artistas</h3>
                        <Row>
                            {results.artistas.map((artista) => (
                                <Col key={artista.id} md={4} lg={3} className="mb-4">
                                    <Card onClick={() => handleRedirect('artista', artista.id)} className="clickable-card">
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3002${artista.imagen}`}
                                            alt={artista.nombre}
                                        />
                                        <Card.Body>
                                            <Card.Title>{artista.nombre}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}

                {results.canciones.length > 0 && (
                    <>
                        <h3 className="mt-4">Canciones</h3>
                        <Row>
                            {results.canciones.map((cancion) => (
                                <Col key={cancion.id} md={4} lg={3} className="mb-4">
                                    <Card className="clickable-card">
                                        <Card.Body onClick={() => handlePlayTrack(cancion)}>
                                            <Card.Title>{cancion.titulo}</Card.Title>
                                            <p className="text-muted">Haz clic para reproducir</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}

                {results.albums.length > 0 && (
                    <>
                        <h3 className="mt-4">Álbumes</h3>
                        <Row>
                            {results.albums.map((album) => (
                                <Col key={album.id} md={4} lg={3} className="mb-4">
                                    <Card onClick={() => handleRedirect('album', album.id)} className="clickable-card">
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:3002${album.imagen}`}
                                            alt={album.titulo}
                                        />
                                        <Card.Body>
                                            <Card.Title>{album.titulo}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}

                {results.generos.length > 0 && (
                    <>
                        <h3 className="mt-4">Géneros</h3>
                        <Row>
                            {results.generos.map((genero) => (
                                <Col key={genero.id} md={4} lg={3} className="mb-4">
                                    <Card onClick={() => handleRedirect('genero', genero.id)} className="clickable-card">
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
                    </>
                )}
                
                {Object.values(results).every(arr => arr.length === 0) && (
                    <p className="text-center">No se encontraron resultados para &quot;{query}&quot;.</p>
                )}
            </Container>

            {currentTrack && (
                <div
                    className="bg-dark text-white text-center py-3 fixed-bottom"
                    style={{ boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.3)', zIndex: 1040 }}
                >
                    <p className="mb-1 d-flex justify-content-between align-items-center px-3">
                        <span>Reproduciendo: {currentTrack.titulo}</span>
                        <Button variant="outline-light" size="sm" onClick={handleCloseTrack}>
                            Cerrar
                        </Button>
                    </p>
                    <audio controls autoPlay src={`http://localhost:3002${currentTrack.archivo}`} style={{ width: '100%' }} />
                </div>
            )}

            <UserFooter />
        </div>
    );
};

export default SearchResultsPage;
