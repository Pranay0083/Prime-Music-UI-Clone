import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import SongCard from "../../components/features/SongCard";
import { useParams } from "react-router-dom";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";

const MoodSongs = () => {
  const { type } = useParams(); // http://localhost:3000/mood/romantic
  const [moodType, setMoodType] = useState(type);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMoodType(type);
  }, [type]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await api.fetchSongsByMood(token, moodType);
        console.log(response);
        setSongs(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch songs. Please try again later.");
        console.error("Error fetching songs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (moodType) {
      fetchSongs();
    }
  }, [moodType]);

  const handlePlayAll = () => {
    console.log("Playing all songs in the mood:", moodType);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {moodType}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {songs.length} songs in this mood
            </p>
          </div>
          <button
            onClick={handlePlayAll}
            className="group inline-flex items-center justify-center px-6 py-2 rounded-full
                      bg-green-600 hover:bg-green-500 active:bg-green-700
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                      focus:ring-offset-gray-900 transition-all duration-200 ease-in-out
                      text-white font-medium shadow-lg shadow-green-900/20
                      hover:shadow-xl hover:shadow-green-900/30
                      transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <i className="fa-solid fa-play w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110"></i>
            <span>Play</span>
          </button>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-20">
            {songs.map((song) => (
              <div
                key={song.id}
                className="transform transition-transform duration-200 hover:-translate-y-1"
              >
                <SongCard
                  song={song}
                  className="h-full rounded-xl shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSongs;
