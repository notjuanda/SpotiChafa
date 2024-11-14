import axios from 'axios';

const API_URL = 'http://localhost:3002/album';

export const getAllAlbums = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getAlbumById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createAlbum = async (albumData) => {
    const response = await axios.post(API_URL, albumData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateAlbumPatch = async (id, albumData) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, albumData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error("Error in updateAlbumPatch:", error.response?.data || error);
        throw error;
    }
};

export const deleteAlbum = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
