import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useMusicPlayer } from '../../contexts/musicContext';
import { api } from "../../services/api";

const PlayButton = ({ song, size = "medium" }) => {
  const { playTrack, currentTrack, currentTrackInfo } = useMusicPlayer();

  const isCurrentSong = currentTrackInfo.title === song.title && 
    currentTrackInfo.artist === (Array.isArray(song.artist)
      ? song.artist.map(a => a.name).join(", ")
      : song.artist);

  const handlePlay = async (e) => {
    e.stopPropagation();
    
    // If it's the same song, let MusicPlayer handle play/pause
    if (isCurrentSong) {
      // Find the audio element and toggle play/pause
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        if (audioElement.paused) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
      return;
    }

    // If it's a different song, load and play it
    const token = localStorage.getItem('token');
    try {
      const response = await api.fetchSongDetails(token, song._id);
      playTrack(response.data.audio_url, {
        title: song.title,
        artist: Array.isArray(song.artist)
          ? song.artist.map(a => a.name).join(", ")
          : song.artist,
        albumId: song.albumId
      });
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-20 h-20"
  };

  const iconSizes = {
    small: "w-3 h-3",
    medium: "w-6 h-6",
    large: "w-8 h-8"
  };

  // Check if audio is currently playing
  const isPlaying = React.useMemo(() => {
    if (!isCurrentSong) return false;
    const audioElement = document.querySelector('audio');
    return audioElement ? !audioElement.paused : false;
  }, [isCurrentSong, currentTrack]);

  return (
    <div
      className={`bg-black/20 rounded-full transition-all backdrop-blur-md ${sizeClasses[size]} flex justify-center items-center hover:scale-105 cursor-pointer`}
      onClick={handlePlay}
    >
      {isCurrentSong && isPlaying ? (
        <FaPause className={`${iconSizes[size]} text-white`} />
      ) : (
        <FaPlay className={`${iconSizes[size]} text-white ml-1`} />
      )}
    </div>
  );
};

export default PlayButton;