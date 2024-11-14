import axios from 'axios';

const API_URL = 'http://localhost:3002/genero';

export const getAllGeneros = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getGeneroById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createGenero = async (generoData) => {
    const response = await axios.post(API_URL, generoData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateGenero = async (id, generoData) => {
    const response = await axios.put(`${API_URL}/${id}`, generoData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateGeneroPatch = async (id, generoUpdateData) => {
    const response = await axios.patch(`${API_URL}/${id}`, generoUpdateData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteGenero = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
