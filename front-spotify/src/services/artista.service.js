import axios from 'axios';

const API_URL = 'http://localhost:3002/artista';

export const getAllArtistas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getArtistaById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const getArtistaDetalles = async (id) => {
    const response = await axios.get(`${API_URL}/${id}/detalles`);
    return response.data;
};

export const createArtista = async (artistaData) => {
    const response = await axios.post(API_URL, artistaData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateArtista = async (id, artistaData) => {
    const response = await axios.patch(`${API_URL}/${id}`, artistaData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteArtista = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
