import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');  // Get token from local storage
        const response = await api.fetchPlaylists(token);
        setPlaylists(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch playlists. Please try again later.');
        console.error('Error fetching playlists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id} onClick={() => navigate(`/playlist/${playlist._id}`)} style={{ cursor: 'pointer' }}>
            <p>{playlist.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
