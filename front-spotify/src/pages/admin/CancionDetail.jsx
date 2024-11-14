import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { getCancionById, createCancion, updateCancion } from '../../services/cancion.service';
import { getAllAlbums } from '../../services/album.service';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const CancionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [cancion, setCancion] = useState({
        titulo: '',
        archivo: null,
        archivoPreview: '',
        albumId: '',
    });

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        if (isEditing) fetchCancion();
        fetchAlbums();
    }, [id]);

    const fetchCancion = async () => {
        try {
            const data = await getCancionById(id);
            setCancion({
                titulo: data.titulo,
                archivo: null,
                archivoPreview: data.archivo ? `http://localhost:3002${data.archivo}` : '',
                albumId: data.album ? data.album.id : '',
            });
        } catch (error) {
            console.error('Error fetching song:', error);
        }
    };

    const fetchAlbums = async () => {
        try {
            const data = await getAllAlbums();
            setAlbums(data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCancion((prevCancion) => ({
            ...prevCancion,
            [name]: name === 'albumId' ? parseInt(value, 10) : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCancion((prevCancion) => ({
            ...prevCancion,
            archivo: file,
            archivoPreview: file ? URL.createObjectURL(file) : '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('titulo', cancion.titulo);
        formData.append('albumId', String(cancion.albumId));
        if (cancion.archivo) {
            formData.append('archivo', cancion.archivo);
        }
    
        try {
            if (isEditing) {
                await updateCancion(id, formData);
            } else {
                await createCancion(formData);
            }
            navigate('/admin/canciones');
        } catch (error) {
            console.error(isEditing ? 'Error updating song:' : 'Error creating song:', error.response?.data || error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <h1>{isEditing ? 'Editar Canción' : 'Agregar Canción'}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="titulo" className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="titulo"
                            value={cancion.titulo}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="albumId" className="mb-3">
                        <Form.Label>Álbum</Form.Label>
                        <Form.Control
                            as="select"
                            name="albumId"
                            value={cancion.albumId}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccionar Álbum</option>
                            {albums.map((album) => (
                                <option key={album.id} value={album.id}>
                                    {album.titulo}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="archivo" className="mb-3">
                        <Form.Label>Archivo de la Canción</Form.Label>
                        {cancion.archivoPreview && (
                            <div className="mb-3">
                                <audio controls src={cancion.archivoPreview} />
                            </div>
                        )}
                        <Form.Control type="file" accept="audio/mpeg" onChange={handleFileChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {isEditing ? 'Actualizar Canción' : 'Agregar Canción'}
                    </Button>
                </Form>
            </Container>
            <AdminFooter className="mt-auto" />
        </div>
    );
};

export default CancionDetail;
