import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import MusicPlayer from '../../components/layout/MusicPlayer';

const Artist = () => {
  const { id } = useParams();  // Use this to get artist ID from the URL
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');  // Get token from local storage
        const response = await api.fetchArtistDetails(token, id);
        setArtist(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch artist details. Please try again later.');
        console.error('Error fetching artist details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [id]);

  const handlePlayAll = () => {
    setCurrentTrack(artist.songs[0]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Artist Details</h1>
      {artist ? (
        <div>
          <img src={artist.image} alt={artist.name} />
          <h2>{artist.name}</h2>
          <p>{artist.description}</p>
          <button onClick={handlePlayAll}>Play All</button>
          <h3>Songs</h3>
          <div className="songs-grid">
            {artist.songs.map((song) => (
              <div key={song._id} className="song-card">
                <img src={song.thumbnail} alt={song.title} />
                <p>{song.title} by {artist.name}</p>
              </div>
            ))}
          </div>
          <h3>Albums</h3>
          <div className="albums-grid">
            {artist.albums?.map((album) => (
              <div key={album._id} className="album-card">
                <img src={album.thumbnail} alt={album.title} />
                <p>{album.title}</p>
              </div>
            ))}
          </div>
          <MusicPlayer currentTrack={currentTrack} trackList={artist.songs} />
        </div>
      ) : (
        <p>No artist details found.</p>
      )}
    </div>
  );
};

export default Artist;
