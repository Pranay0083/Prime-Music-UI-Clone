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
        const token = localStorage.getItem('token');
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
      const token = localStorage.getItem('token');
      await api.toggleFavourite(token, songId);
      setFavourites(favourites.filter(song => song._id !== songId));
    } catch (err) {
      console.error('Error toggling favourite:', err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-red-500 bg-red-100/10 p-4 rounded-lg">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-32">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <div className="w-64 h-64 bg-gradient-to-br from-teal-400/20 to-gray-800 rounded-2xl shadow-xl flex items-center justify-center group transition-transform duration-300 hover:scale-105">
            <div className="w-32 h-32 border-4 border-teal-400/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/30">
              <i className="fa-regular fa-heart w-16 h-16 text-teal-400"></i>
            </div>
          </div>
          
          <div className="flex flex-col justify-end">
            <span className="text-sm font-medium tracking-wider text-teal-400">PLAYLIST</span>
            <h1 className="text-6xl font-bold mt-2 mb-4 tracking-tight">Favorites</h1>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="font-medium">User's name</span>
              <span>•</span>
              <span>{favourites.length} songs</span>
            </div>
            
            <button 
              onClick={handlePlayAll}
              className="flex items-center gap-2 mt-6 bg-teal-400 hover:bg-teal-300 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <i class="fa-solid fa-play"></i>
              Play
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {favourites.map((song, index) => (
            <div 
              key={song._id} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="w-6 text-center text-gray-400 group-hover:text-teal-400">
                  {index + 1}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                    <i class="fa-solid fa-music w-5 h-5 text-gray-400"></i>
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-teal-400 transition-colors">
                      {song.title}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {song.artist.map(artist => artist.name).join(', ')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleToggleFavourite(song._id)}
                  className="p-2 hover:bg-teal-400/10 rounded-full transition-colors"
                >
                  <i className="fa-regular fa-heart w-16 h-16 text-teal-400"></i>
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <i class="fa-solid fa-arrows-left-right w-5 h-5 text-gray-400"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {currentTrack && <MusicPlayer currentTrack={currentTrack} trackList={favourites} />}
    </div>
  );
};

export default Favourites;