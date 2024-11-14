import axios from 'axios';

const API_URL = 'http://localhost:3002/search';

export const search = async (term) => {
    const response = await axios.get(API_URL, {
        params: { term }
    });
    return response.data;
};
