import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
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
    console.log("all songs are playing")
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-900/50">
        <i className="fa-solid fa-loader w-8 h-8 text-green-500 animate-spin"></i>
        <div className="text-white text-lg font-medium">Loading artist profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="p-6 rounded-lg bg-red-500/10 backdrop-blur-sm">
          <div className="text-red-400 text-lg font-medium">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black p-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Artist Header Section */}
        <div className="relative z-10 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Artist Image */}
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl">
              <img
                src={artist.image || "/api/placeholder/192/192"}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Artist Info */}
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {artist.name}
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                {artist.description}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayAll}
                  className="group inline-flex items-center justify-center px-8 py-3 rounded-full 
                           bg-green-600 hover:bg-green-500 active:bg-green-700
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                           focus:ring-offset-gray-900 transition-all duration-200 ease-in-out 
                           text-white font-medium shadow-lg shadow-green-900/20 
                           hover:shadow-xl hover:shadow-green-900/30 
                           transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <i className="fa-solid fa-play w-5 h-5 mr-2 transition-transform duration-200 group-hover:scale-110"></i>
                  <span>Play All</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Songs Section */}
        <div className="relative z-10 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <i className="fa-solid fa-music w-6 h-6"></i>
            Songs
          </h2>
          <div className="bg-gray-800/30 rounded-xl backdrop-blur-sm overflow-hidden">
            {artist.songs && artist.songs.map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center gap-4 p-4 hover:bg-gray-700/30 transition-colors duration-200 border-b border-gray-700/50 last:border-0"
              >
                <div className="w-12 text-gray-400 text-center">{index + 1}</div>
                <div className="flex-1">
                  <h3 className="text-white font-medium group-hover:text-green-500 transition-colors duration-200">
                    {song.title}
                  </h3>
                </div>
                <i className="fa-solid fa-playw-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;