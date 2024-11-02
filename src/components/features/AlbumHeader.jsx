import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { useMusicPlayer } from "../../contexts/musicContext";

const AlbumHeader = ({ album }) => {
  const navigate = useNavigate();
  const { playTrack } = useMusicPlayer();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const playAllSongs = () => {
    if (album.songs && album.songs.length > 0) {
      const firstSong = album.songs[0];
      setCurrentSongIndex(0);
      
      playTrack(firstSong.audio_url, {
        title: firstSong.title,
        artist: album.artists.map(artist => artist.name).join(", "),
        albumId: album._id,
        onPlayNext: () => handleNextTrack(),
        onPlayPrevious: () => handlePreviousTrack()
      });
    }
  };

  const handleNextTrack = () => {
    if (currentSongIndex < album.songs.length - 1) {
      const nextIndex = currentSongIndex + 1;
      const nextSong = album.songs[nextIndex];
      
      setCurrentSongIndex(nextIndex);
      playTrack(nextSong.audio_url, {
        title: nextSong.title,
        artist: album.artists.map(artist => artist.name).join(", "),
        albumId: album._id,
        onPlayNext: () => handleNextTrack(),
        onPlayPrevious: () => handlePreviousTrack()
      });
    }
  };

  const handlePreviousTrack = () => {
    if (currentSongIndex > 0) {
      const prevIndex = currentSongIndex - 1;
      const prevSong = album.songs[prevIndex];
      
      setCurrentSongIndex(prevIndex);
      playTrack(prevSong.audio_url, {
        title: prevSong.title,
        artist: album.artists.map(artist => artist.name).join(", "),
        albumId: album._id,
        onPlayNext: () => handleNextTrack(),
        onPlayPrevious: () => handlePreviousTrack()
      });
    }
  };

  const goToArtistPage = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
      <div className="relative group w-64 h-64 flex-shrink-0">
        <img 
          src={album.image || "/api/placeholder/256/256"} 
          alt={album.title}
          className="w-full h-full object-cover rounded-lg shadow-xl group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>
      
      <div className="flex flex-col justify-end">
        <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
          ALBUM
        </span>
        <h1 className="text-4xl font-bold mt-2 mb-4">{album.title}</h1>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          {album.artists.map((artist, index) => (
            <React.Fragment key={artist._id}>
              <button
                onClick={() => goToArtistPage(artist._id)}
                className="hover:text-white hover:underline transition-colors"
              >
                {artist.name}
              </button>
              {index < album.artists.length - 1 && <span>•</span>}
            </React.Fragment>
          ))}
          <span>•</span>
          <span>{album.songs.length} songs</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={playAllSongs}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-full transition-colors"
          >
            <Play className="w-5 h-5" />
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;