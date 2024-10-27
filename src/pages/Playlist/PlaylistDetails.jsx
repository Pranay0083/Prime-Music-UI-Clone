import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

const PlaylistDetails = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');  // Get token from local storage
        const response = await api.fetchPlaylistDetails(token, id);
        setPlaylist(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch playlist details. Please try again later.');
        console.error('Error fetching playlist details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  const handleAddSong = async (songId) => {
    try {
      const token = localStorage.getItem('token');
      await api.updatePlaylist(token, id, songId);
      setPlaylist({ ...playlist, songs: [...playlist.songs, songId] });
    } catch (err) {
      console.error('Error adding song to playlist:', err);
    }
  };

  const handleRemoveSong = async (songId) => {
    try {
      const token = localStorage.getItem('token');
      await api.updatePlaylist(token, id, songId);
      setPlaylist({ ...playlist, songs: playlist.songs.filter(song => song !== songId) });
    } catch (err) {
      console.error('Error removing song from playlist:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{playlist.title}</h1>
      <p>{playlist.description}</p>
      <ul>
        {playlist.songs.map((song) => (
          <li key={song._id}>
            <p>{song.title}</p>
            <button onClick={() => handleRemoveSong(song._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddSong('some-song-id')}>Add Song</button>
    </div>
  );
};

export default PlaylistDetails;