import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

const AlbumSingle = () => {
  const { id } = useParams();  // Use this to get album ID from the URL
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');  // Get token from local storage
        const response = await api.fetchSingleAlbum(token, id);
        setAlbum(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch album. Please try again later.');
        console.error('Error fetching album:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  const playAllSongs = () => {
    console.log('Playing all songs in the album:', album.songs);
  };

  const addToFavorites = () => {
    console.log('Adding album to favorites:', album._id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Album Details</h1>
      {album ? (
        <div>
          <h2>{album.title}</h2>
          <img src={album.image} alt={album.title} />
          <p>{album.description}</p>
          <p>Artists: {album.artists.map(artist => artist.name).join(', ')}</p>
          <button onClick={playAllSongs}>Play All</button>
          <button onClick={addToFavorites}>+ Add to Favorites</button>
          <button>⋮</button>
          <h3>Songs</h3>
          <ul>
            {album.songs.map((song) => (
              <li key={song._id}>
                <p>{song.title} by {song.artist.map(artistId => album.artists.find(artist => artist._id === artistId).name).join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No album details found.</p>
      )}
    </div>
  );
};

export default AlbumSingle;