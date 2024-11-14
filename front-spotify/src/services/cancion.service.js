import axios from 'axios';

const API_URL = 'http://localhost:3002/cancion';

export const getAllCanciones = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getCancionById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createCancion = async (cancionData) => {
    const response = await axios.post(API_URL, cancionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateCancion = async (id, cancionData) => {
    const response = await axios.put(`${API_URL}/${id}`, cancionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const patchCancion = async (id, updateCancionData) => {
    const response = await axios.patch(`${API_URL}/${id}`, updateCancionData);
    return response.data;
};

export const deleteCancion = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
