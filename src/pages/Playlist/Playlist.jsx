import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useParams } from 'react-router-dom';

const PlaylistDetails = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await api.fetchPlaylistDetails(token, id);
        setPlaylist(response.data);
        setPlaylistName(response.data.title);
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

  const handleNameChange = (name) => {
    setPlaylistName(name);
    // api call
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex items-start space-x-6 mb-8">
      <div className="w-64 h-64 bg-gray-700 flex items-center justify-center">
        <div className="text-gray-400 text-6xl">♪</div>
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-400 mb-2">PLAYLIST</div>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => handleNameChange(e.target.value)}
          className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full mb-4"
        />
        <div className="text-sm text-gray-400 mb-2">{playlist.userName}</div>
        <div className="text-sm text-gray-400 mb-4">{playlist.songs.length} songs</div>
        <button className="bg-[#00A8E1] text-black px-8 py-2 rounded-full hover:bg-[#0095c8] flex items-center space-x-2">
          <i className="fa-solid fa-play h-5 w-5"></i>
          <span>Play</span>
        </button>
      </div>
    </div>
  );
};

export default PlaylistDetails;
