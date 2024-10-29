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
    <div className="bg-black min-h-screen text-white p-8">
      <div className="flex items-start space-x-8 mb-8">
        <div className="w-64 h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <div>
          <div className="text-xs text-teal-400 mb-2">PLAYLIST</div>
          <h1 className="text-5xl font-bold mb-4">Favorites</h1>
          <div className="text-gray-400 mb-4">User's name</div>
          <div className="text-gray-400">Total number of songs</div>
          <button onClick={handlePlayAll} className="mt-4 bg-teal-400 text-black px-8 py-2 rounded-full font-medium">
            Play
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {favourites.map((song, index) => (
          <div key={song._id} className="flex items-center justify-between hover:bg-gray-800 p-2 rounded">
            <div className="flex items-center space-x-4">
              <span className="w-6 text-center text-gray-400">{index + 1}</span>
              <div>
                <div className="text-white">{song.title}</div>
                <div className="text-gray-400 text-sm">{song.artist.map(artist => artist.name).join(', ')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => handleToggleFavourite(song._id)}>
                <i className="fa-solid fa-circle-check h-6 w-6 text-teal-400"></i>
              </button>
              <button>
                <i className="fa-solid fa-ellipsis h-6 w-6 text-teal-400"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      {currentTrack && <MusicPlayer currentTrack={currentTrack} trackList={favourites} />}
    </div>
  );
};

export default Favourites;
