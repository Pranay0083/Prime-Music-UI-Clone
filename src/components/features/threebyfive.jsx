import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMusicPlayer } from '../../contexts/musicContext';
import { api } from "../../services/api";

const TrendingSongs = ({ songs: initialSongs = [], loading = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const { playTrack } = useMusicPlayer();

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rowWidth = container.clientWidth;
    const newPosition = direction === "left" 
      ? scrollPosition - rowWidth 
      : scrollPosition + rowWidth;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  const handlePlay = async (song) => {
    try {
      const token = localStorage.getItem('token');
    const response = await api.fetchSongDetails(token, song._id);
    playTrack(response.data.audio_url, {
      title: song.title,
      artist: Array.isArray(song.artist) 
        ? song.artist.map(a => a.name).join(", ")
        : song.artist,
      albumId: song.albumId
    });
      const data = await response.json();
      
      playTrack(data.audio_url, {
        title: song.title,
        artist: Array.isArray(song.artist) 
          ? song.artist.map(a => a.name).join(", ")
          : song.artist?.name || song.artist,
        albumId: song.albumId
      });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  if (!initialSongs.length) {
    return (
      <div className="mt-8 p-4 rounded-lg bg-neutral-800/20">
        <p className="text-neutral-400 text-center">
          No trending songs available
        </p>
      </div>
    );
  }

  const isAtStart = scrollPosition === 0;
  const isAtEnd =
    scrollPosition >=
    scrollContainerRef.current?.scrollWidth -
      scrollContainerRef.current?.clientWidth;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-neutral-300">Trending Songs</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll("left")}
              disabled={isAtStart}
              className={`p-2 rounded-full transition-all duration-200 ${
                isAtStart
                  ? "text-neutral-600 cursor-not-allowed"
                  : "text-neutral-300 hover:bg-neutral-800/50"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={isAtEnd}
              className={`p-2 rounded-full transition-all duration-200 ${
                isAtEnd
                  ? "text-neutral-600 cursor-not-allowed"
                  : "text-neutral-300 hover:bg-neutral-800/50"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="grid grid-cols-3 gap-4 overflow-x-hidden scroll-smooth"
      >
        {initialSongs.map((song) => (
          <div
            key={song._id}
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105 p-4 bg-neutral-800/30 rounded-lg cursor-pointer"
            onClick={() => handlePlay(song)}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={song.thumbnail}
                  alt={`${song.title} Thumbnail`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-medium truncate">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  {song.artist?.name || (Array.isArray(song.artist) 
                    ? song.artist.map(a => a.name).join(", ") 
                    : song.artist)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSongs;