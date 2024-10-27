import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

const Music = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');  // Get token from local storage
        const response = await api.fetchSongs(token);
        setSongs(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch songs. Please try again later.');
        console.error('Error fetching songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Music Page</h1>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            <p>{song.title} by {song.artist.map(artist => artist.name).join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Music;
