import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaCheck, FaEllipsisV, FaPlay } from "react-icons/fa";
import { useMusicPlayer } from '../../contexts/musicContext';
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const SongCard = ({ song, isLiked, onLikeToggle }) => {
  const { playTrack } = useMusicPlayer();
  const [isHovered, setIsHovered] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const menuRef = useRef(null);
  const playlistMenuRef = useRef(null);
  const navigate = useNavigate();

  const handlePlay = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    const response = await api.fetchSongDetails(token, song._id);
    playTrack(response.data.audio_url, {
      title: song.title,
      artist: Array.isArray(song.artist) 
        ? song.artist.map(a => a.name).join(", ")
        : song.artist,
      albumId: song.albumId
    });
  };

  // Handle clicking outside to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          playlistMenuRef.current && !playlistMenuRef.current.contains(event.target)) {
        setShowMainMenu(false);
        setShowPlaylistMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const MenuItem = ({ text, onClick }) => (
    <div
      className="p-2 text-sm text-gray-300 hover:bg-neutral-700 cursor-pointer transition-colors duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {text}
    </div>
  );

  const MenuDivider = () => <div className="h-px bg-neutral-700" />;

  const MainMenu = () => (
    <div
      ref={menuRef}
      className="absolute bg-neutral-800 rounded-md shadow-lg border border-neutral-700 min-w-[150px] right-0 top-8 z-10"
    >
      <MenuItem
        text="Add to Playlist"
        onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
      />
      <MenuDivider />
      <MenuItem 
        text="View Album" 
        onClick={() => navigate(`/album/${song.albumId}`)}
      />
      <MenuDivider />
      <MenuItem 
        text="View Artist" 
        onClick={() => navigate(`/artist/${song.artist[0]?._id}`)}
      />
    </div>
  );

  const PlaylistMenu = () => (
    <div
      ref={playlistMenuRef}
      className="absolute bg-neutral-800 rounded-md shadow-lg border border-neutral-700 min-w-[150px] right-[-160px] top-0 z-20"
    >
      <MenuItem 
        text="New Playlist" 
        onClick={() => console.log('New Playlist clicked')} 
      />
      <MenuDivider />
      <MenuItem 
        text="Other playlists" 
        onClick={() => console.log('Other playlists clicked')} 
      />
    </div>
  );

  const handleEllipsisClick = (e) => {
    e.stopPropagation();
    setShowMainMenu(!showMainMenu);
    setShowPlaylistMenu(false);
  };

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    if (onLikeToggle) {
      onLikeToggle(song._id);
    }
  };

  return (
    <div
      className="flex-shrink-0 transition-transform mr-4 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!showMainMenu && !showPlaylistMenu) {
          setShowMainMenu(false);
          setShowPlaylistMenu(false);
        }
      }}
    >
      <div className="w-[175px]">
        <div className="relative">
          <img
            src={song.thumbnail}
            alt={`${song.title} thumbnail`}
            className="h-[175px] w-[175px] rounded-md object-cover mb-2 group-hover:brightness-50 transition-all duration-300"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-md
              transition-opacity duration-300 bg-black bg-opacity-50
              ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-row justify-between items-center w-full px-4">
              {isLiked ? (
                <FaCheck 
                  className="text-green-500 w-4 h-4 cursor-pointer hover:scale-110 transition-transform" 
                  onClick={handleLikeToggle}
                />
              ) : (
                <FaPlus 
                  className="text-white w-4 h-4 cursor-pointer hover:scale-110 transition-transform" 
                  onClick={handleLikeToggle}
                />
              )}
              <div 
                className="bg-black/20 rounded-full transition-all backdrop-blur-md w-16 h-16 flex justify-center items-center hover:scale-105 cursor-pointer"
                onClick={handlePlay}
              >
                <FaPlay className="w-6 h-6 text-white ml-1" />
              </div>
              <div className="relative">
                <FaEllipsisV 
                  className="w-4 h-4 text-white cursor-pointer hover:scale-110 transition-transform" 
                  onClick={handleEllipsisClick}
                />
                {showMainMenu && <MainMenu />}
                {showPlaylistMenu && <PlaylistMenu />}
              </div>
            </div>
          </div>
        </div>
        <div className="px-1">
          <h2 className="text-white font-medium text-sm mb-1 truncate">
            {song.title}
          </h2>
          <div className="text-gray-500 text-xs truncate">
            {Array.isArray(song.artist) ? (
              song.artist.map((artist, index) => (
                <span key={artist._id || index}>
                  {artist.name}
                  {index < song.artist.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              <span>{song.artist}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;