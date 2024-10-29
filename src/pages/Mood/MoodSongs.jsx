import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import SongCard from '../../components/features/SongCard';

const MoodSongs = () => {
  const [moodType, setMoodType] = useState('Mood Type');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await api.fetchSongsByMood(token, 'sad');
        console.log(response)
        setSongs(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch songs. Please try again later.');
        console.error('Error fetching songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [moodType]);

  const handlePlayAll = () => {
    console.log('Playing all songs in the mood:', moodType);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(songs)
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">{moodType}</h1>
        <button
          className="bg-[#4CAF50] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#45a049] transition-colors"
          onClick={handlePlayAll}
        >
          <i className="fa-solid fa-play"></i>
          Play
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6"> 
        {songs.map((song) => (
              <SongCard song={song} />
        ))}
      </div>
    </div>
  );
};

export default MoodSongs;
