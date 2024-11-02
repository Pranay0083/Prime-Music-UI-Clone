import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import SongList from '../../components/features/SongList';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await api.fetchFavourites(token);
        setFavourites(response.data.songs);
        console.log(response)
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
    console.log("playing all the songs")
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
        <SongList songs={favourites} />
      </div>
    </div>
  );
};

export default Favourites;