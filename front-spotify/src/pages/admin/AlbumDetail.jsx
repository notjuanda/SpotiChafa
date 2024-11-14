import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Image } from 'react-bootstrap';
import { getAlbumById, createAlbum, updateAlbumPatch } from '../../services/album.service';
import { getAllArtistas } from '../../services/artista.service';
import AdminHeader from '../../components/admin/adminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

const AlbumDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [album, setAlbum] = useState({
        titulo: '',
        imagen: null,
        imagenPreview: '',
        fechaLanzamiento: '',
        artistaId: '',
        canciones: [],
    });

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        if (isEditing) fetchAlbum();
        fetchArtists();
    }, [id]);

    const fetchAlbum = async () => {
        try {
            const data = await getAlbumById(id);
            setAlbum({
                titulo: data.titulo,
                imagen: null,
                imagenPreview: `http://localhost:3002${data.imagen}`,
                fechaLanzamiento: data.fechaLanzamiento,
                artistaId: data.artista.id,
                canciones: data.canciones,
            });
        } catch (error) {
            console.error('Error fetching album:', error);
        }
    };

    const fetchArtists = async () => {
        try {
            const data = await getAllArtistas();
            setArtists(data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAlbum((prevAlbum) => ({
            ...prevAlbum,
            [name]: name === 'artistaId' ? parseInt(value) : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAlbum((prevAlbum) => ({
            ...prevAlbum,
            imagen: file,
            imagenPreview: URL.createObjectURL(file),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = album.fechaLanzamiento.replace(/-/g, '/');
        const artistaIdNumber = Number(album.artistaId);

        if (album.imagen) {
            const formData = new FormData();
            formData.append('titulo', album.titulo);
            formData.append('fechaLanzamiento', formattedDate);
            formData.append('artistaId', artistaIdNumber);
            formData.append('imagen', album.imagen);

            try {
                if (isEditing) {
                    await updateAlbumPatch(id, formData);
                } else {
                    await createAlbum(formData);
                }
                navigate('/admin/albums');
            } catch (error) {
                console.error(isEditing ? 'Error updating album:' : 'Error creating album:', error);
            }
        } else {
            const albumData = {
                titulo: album.titulo,
                fechaLanzamiento: formattedDate,
                artistaId: artistaIdNumber,
            };

            try {
                if (isEditing) {
                    await updateAlbumPatch(id, albumData);
                }
                navigate('/admin/albums');
            } catch (error) {
                console.error('Error updating album:', error);
            }
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminHeader />
            <Container className="my-4 flex-grow-1">
                <h1>{isEditing ? 'Editar Álbum' : 'Agregar Álbum'}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="titulo" className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="titulo"
                            value={album.titulo}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="fechaLanzamiento" className="mb-3">
                        <Form.Label>Fecha de Lanzamiento</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaLanzamiento"
                            value={album.fechaLanzamiento}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="artistaId" className="mb-3">
                        <Form.Label>Artista</Form.Label>
                        <Form.Control
                            as="select"
                            name="artistaId"
                            value={album.artistaId}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccionar Artista</option>
                            {artists.map((artist) => (
                                <option key={artist.id} value={artist.id}>
                                    {artist.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="imagen" className="mb-3">
                        <Form.Label>Imagen del Álbum</Form.Label>
                        {album.imagenPreview && (
                            <div className="mb-3">
                                <Image src={album.imagenPreview} alt="Album Preview" thumbnail width="150" />
                            </div>
                        )}
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {isEditing ? 'Actualizar Álbum' : 'Agregar Álbum'}
                    </Button>
                </Form>
            </Container>
            <AdminFooter className="mt-auto" />
        </div>
    );
};

export default AlbumDetail;
