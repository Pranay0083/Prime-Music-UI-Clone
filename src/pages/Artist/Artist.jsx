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
    <div className="bg-black min-h-screen text-white p-8">
      <div className="flex items-start space-x-8 mb-12">
        <div className="w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center">
          <img src={artist.image} alt={artist.name} className="rounded-full w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-5xl font-bold mb-4">{artist.name}</h1>
          <p className="text-gray-400 max-w-2xl">
            {artist.description}
          </p>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Songs</h2>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto">
            {artist.songs && artist.songs.map((song, index) => (
              <div key={index} className="flex-none w-48">
                <div className="w-48 h-48 bg-gray-800 mb-2">
                  <img src={song.thumbnail} alt={song.title} className="object-cover w-full h-full" />
                </div>
                <div className="text-white">{song.title}</div>
                <div className="text-gray-400 text-sm">{song.artist.map(artist => artist.name).join(', ')}</div>
              </div>
            ))}
          </div>
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
            <i className="fa-solid fa-chevron-left h-6 w-6"></i>
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
            <i className="fa-solid fa-chevron-right  h-6 w-6"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artist;
