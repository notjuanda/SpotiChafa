import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { search } from '../../services/search.service';

const UserHeader = () => {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (term.trim()) {
            try {
                const results = await search(term);
                console.log('Search results:', results);
                navigate(`/search?term=${term}`, { state: { results } });
            } catch (error) {
                console.error('Error during search:', error);
            }
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Navbar.Brand as={Link} to="/">SpotiJuanda</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/canciones">Canciones</Nav.Link>
                    <Nav.Link as={Link} to="/albums">Álbumes</Nav.Link>
                    <Nav.Link as={Link} to="/artistas">Artistas</Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={handleSearch}>
                    <FormControl
                        type="search"
                        placeholder="Buscar..."
                        className="me-2"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <Button variant="outline-success" type="submit">Buscar</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default UserHeader;
