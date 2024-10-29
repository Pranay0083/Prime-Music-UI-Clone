import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await api.fetchAlbums(token);
        setAlbums(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch albums. Please try again later.');
        console.error('Error fetching albums:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album._id} onClick={() => navigate(`/album/${album._id}`)} style={{ cursor: 'pointer' }}>
            <h2>{album.title}</h2>
            <p>{album.artists.map(artist => artist.name).join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Album;
