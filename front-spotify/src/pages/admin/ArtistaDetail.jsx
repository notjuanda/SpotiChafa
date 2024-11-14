import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { getArtistaById, createArtista, updateArtista } from '../../services/artista.service';
import { getAllGeneros } from '../../services/genero.service';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const ArtistaDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [artista, setArtista] = useState({
        nombre: '',
        imagen: null,
        imagenPreview: '',
        generoId: '',
    });

    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        if (isEditing) fetchArtista();
        fetchGeneros();
    }, [id]);

    const fetchArtista = async () => {
        try {
            const data = await getArtistaById(id);
            setArtista({
                nombre: data.nombre,
                imagen: null,
                imagenPreview: data.imagen ? `http://localhost:3002${data.imagen}` : '',
                generoId: data.genero ? data.genero.id : '',
            });
        } catch (error) {
            console.error('Error fetching artist:', error);
        }
    };

    const fetchGeneros = async () => {
        try {
            const data = await getAllGeneros();
            setGeneros(data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtista((prevArtista) => ({
            ...prevArtista,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArtista((prevArtista) => ({
            ...prevArtista,
            imagen: file,
            imagenPreview: file ? URL.createObjectURL(file) : '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', artista.nombre);
        formData.append('generoId', artista.generoId);
        if (artista.imagen) {
            formData.append('imagen', artista.imagen);
        }

        try {
            if (isEditing) {
                await updateArtista(id, formData);
            } else {
                await createArtista(formData);
            }
            navigate('/admin/artistas');
        } catch (error) {
            console.error(isEditing ? 'Error updating artist:' : 'Error creating artist:', error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <h1>{isEditing ? 'Editar Artista' : 'Agregar Artista'}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombre" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={artista.nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="generoId" className="mb-3">
                        <Form.Label>Género</Form.Label>
                        <Form.Control
                            as="select"
                            name="generoId"
                            value={artista.generoId}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccionar Género</option>
                            {generos.map((genero) => (
                                <option key={genero.id} value={genero.id}>
                                    {genero.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="imagen" className="mb-3">
                        <Form.Label>Imagen del Artista</Form.Label>
                        {artista.imagenPreview && (
                            <div className="mb-3">
                                <img
                                    src={artista.imagenPreview}
                                    alt="Preview"
                                    width="100"
                                    height="100"
                                />
                            </div>
                        )}
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {isEditing ? 'Actualizar Artista' : 'Agregar Artista'}
                    </Button>
                </Form>
            </Container>
            <AdminFooter className="mt-auto" />
        </div>
    );
};

export default ArtistaDetail;
