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
    },
    fetchSingleAlbum: async (token, albumId) => {
        const response = await fetchWithRetry(`${BASE_URL}/album/${albumId}`, {
            headers: getHeaders(token),
            method: 'GET'
        });
        return response;
    },
    fetchFavourites: async (token) => {
        const response = await fetchWithRetry(`${BASE_URL}/favorites/like`, {
            headers: getHeaders(token),
            method: 'GET'
        });
        return response;
    },
    toggleFavourite: async (token, songId) => {
        const response = await fetchWithRetry(`${BASE_URL}/favorites/like`, {
            headers: getHeaders(token),
            method: 'PATCH',
            data: JSON.stringify({ songId })
        });
        return response;
    },
    fetchArtistDetails: async (token, artistId) => {
        const response = await fetchWithRetry(`${BASE_URL}/artist/${artistId}`, {
            headers: getHeaders(token),
            method: 'GET'
        });
        return response;
    },
    fetchMoodTypes: async (token) => {
        const response = await axios.get(`${BASE_URL}/categories`, {
            headers: getHeaders(token)
        });
        return response.data;
    },
    search: async (token, query) => {
        const response = await axios.get(`${BASE_URL}/song?search=${encodeURIComponent(JSON.stringify({ title: query }))}`, {
            headers: getHeaders(token)
        });
        return response.data;
    },
    fetchUserData: async (token) => {
        const response = await fetchWithRetry(`${BASE_URL}/me`, {
            headers: getHeaders(token),
            method: 'GET'
        });
        return response;
    },
    updateUserData: async (token, userData) => {
        const response = await fetchWithRetry(`${BASE_URL}/updateme`, {
            headers: getHeaders(token),
            method: 'PATCH',
            data: userData
        });
        return response;
    },
    updateProfileImage: async (token, imageFile) => {
        const formData = new FormData();
        formData.append('profileImage', imageFile);
        const response = await fetchWithRetry(`${BASE_URL}/updateProfileImage`, {
            headers: {
                'projectId': PROJECT_ID,
                'Authorization': `Bearer ${token}`,
            },
            method: 'PATCH',
            data: formData
        });
        return response;
    },
    updatePassword: async (token, passwords) => {
        const response = await fetchWithRetry(`${BASE_URL}/updateMyPassword`, {
            headers: getHeaders(token),
            method: 'PATCH',
            data: passwords
        });
        return response;
    },
    createPlaylist: async (token, playlistData) => {
        const response = await fetchWithRetry(`${BASE_URL}/playlist`, {
            headers: getHeaders(token),
            method: 'POST',
            data: JSON.stringify(playlistData)
        });
        return response;
    },
    addSongToPlaylist: async (token, playlistId, songId) => {
        const response = await fetchWithRetry(`${BASE_URL}/playlist/${playlistId}`, {
            headers: getHeaders(token),
            method: 'PATCH',
            data: JSON.stringify({ playlistId ,songId })
        });
        return response;
    },
    deletePlaylist: async (token, playlistId) => {
        const response = await fetchWithRetry(`${BASE_URL}/playlist/${playlistId}`, {
            headers: getHeaders(token),
            method: 'DELETE'
        });
        return response;
    },
    fetchPlaylists: async (token) => {
        const response = await fetchWithRetry(`${BASE_URL}/playlist`, {
            headers: getHeaders(token),
            method: 'GET'
        });
        return response;
    },
    fetchPlaylistDetails: async (token, playlistId) => {
        const response = await fetchWithRetry(`${BASE_URL}/playlist/${playlistId}`, {
            headers: getHeaders(token),
            method: 'GET'
        });
        return response;
    },
    fetchSongsByCategory: async (token, key, value, limit) => {
        const response = await axios.get(`${BASE_URL}/song?limit=${limit}&${key}=${encodeURIComponent(value)}`, {
            headers: getHeaders(token)
        });
        return response.data;
    },
    fetchSongsByMood: async (token, mood) => {
        const response = await axios.get(`${BASE_URL}/song?mood=${mood}`, {
            headers: getHeaders(token)
        });
        return response.data;
    },
    fetchSongDetails: async (token, songId) => {
        const response = await axios.get(`${BASE_URL}/song/${songId}`, {
            headers: getHeaders(token)
        })
        return response.data;
    }
};
