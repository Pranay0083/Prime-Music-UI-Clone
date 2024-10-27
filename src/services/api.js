import axios from 'axios';

const BASE_URL = 'https://academics.newtonschool.co/api/v1/musicx';
const PROJECT_ID = 'treoo5dhf86s';

const getHeaders = (token) => ({
    'projectId': PROJECT_ID,
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
});

const fetchWithRetry = async (url, options, retries = 3, backoff = 3000) => {
    try {
        const response = await axios(url, options);
        return response.data;
    } catch (error) {
        if (retries > 0 && error.response.status !== 404) {
            await new Promise((resolve) => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw error;
    }
};

export const api = {
    fetchSongs: async (token) => {
        const response = await fetchWithRetry(`${BASE_URL}/song`, {
            headers: getHeaders(token),
            method: 'GET'
        });
        return response;
    },
    fetchAlbums: async (token) => {
        const response = await fetchWithRetry(`${BASE_URL}/album`, {
          headers: getHeaders(token),
          method: 'GET'
        });
        return response;
      }
    
};
