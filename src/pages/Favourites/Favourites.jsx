import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import MusicPlayer from '../../components/layout/MusicPlayer';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');  // Get token from local storage
        const response = await api.fetchFavourites(token);
        setFavourites(response.data.songs);
        setError(null);
      } catch (err) {
        setError('Failed to fetch favourites. Please try again later.');
        console.error('Error fetching favourites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const handlePlayAll = () => {
    setCurrentTrack(favourites[0]);
  };

  const handleToggleFavourite = async (songId) => {
    try {
      const token = localStorage.getItem('token');  // Get token from local storage
      await api.toggleFavourite(token, songId);
      setFavourites(favourites.filter(song => song._id !== songId));
    } catch (err) {
      console.error('Error toggling favourite:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Favourite Songs</h1>
      <button onClick={handlePlayAll}>Play All</button>
      <ul>
        {favourites.map((song) => (
          <li key={song._id}>
            <img src={song.thumbnail} alt={song.title} />
            <p>{song.title} by {song.artist.map(artist => artist.name).join(', ')}</p>
            <button onClick={() => handleToggleFavourite(song._id)}>
              {favourites.some(favSong => favSong._id === song._id) ? '✓' : '+'}
            </button>
            <button>⋮</button>
          </li>
        ))}
      </ul>
      <MusicPlayer currentTrack={currentTrack} trackList={favourites} />
    </div>
  );
};

export default Favourites;
