import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/admin">Admin Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
                        <NavDropdown title="Gestión" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/admin/albums">Álbumes</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/artistas">Artistas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/generos">Géneros</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/canciones">Canciones</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminHeader;
