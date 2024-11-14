import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { getGeneroById, createGenero, updateGenero } from '../../services/genero.service';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const GeneroDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [genero, setGenero] = useState({
        nombre: '',
        imagen: null,
        imagenPreview: '',
    });

    useEffect(() => {
        if (isEditing) {
            fetchGenero();
        }
    }, [id]);

    const fetchGenero = async () => {
        try {
            const data = await getGeneroById(id);
            setGenero({
                nombre: data.nombre,
                imagen: null,
                imagenPreview: data.imagen ? `http://localhost:3002${data.imagen}` : '',
            });
        } catch (error) {
            console.error('Error fetching genre:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGenero((prevGenero) => ({
            ...prevGenero,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setGenero((prevGenero) => ({
            ...prevGenero,
            imagen: file,
            imagenPreview: file ? URL.createObjectURL(file) : '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', genero.nombre);
        if (genero.imagen) {
            formData.append('imagen', genero.imagen);
        }

        try {
            if (isEditing) {
                await updateGenero(id, formData);
            } else {
                await createGenero(formData);
            }
            navigate('/admin/generos');
        } catch (error) {
            console.error(isEditing ? 'Error updating genre:' : 'Error creating genre:', error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <h1>{isEditing ? 'Editar Género' : 'Agregar Género'}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombre" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={genero.nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="imagen" className="mb-3">
                        <Form.Label>Imagen</Form.Label>
                        {genero.imagenPreview && (
                            <div className="mb-3">
                                <img src={genero.imagenPreview} alt="Preview" style={{ maxWidth: '200px' }} />
                            </div>
                        )}
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {isEditing ? 'Actualizar Género' : 'Agregar Género'}
                    </Button>
                </Form>
            </Container>
            <AdminFooter className="mt-auto" />
        </div>
    );
};

export default GeneroDetail;
