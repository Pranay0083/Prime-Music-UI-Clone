import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaCheck, FaEllipsisV, FaPlay } from "react-icons/fa";

const SongCard = ({ song, isLiked }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const menuRef = useRef(null);
  const playlistMenuRef = useRef(null);

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
      onClick={onClick}
    >
      {text}
    </div>
  );

  const MenuDivider = () => <div className="h-px bg-neutral-700" />;

  const MainMenu = () => (
    <div
      ref={menuRef}
      className="absolute bg-neutral-800 rounded-md shadow-lg border border-neutral-700 min-w-[150px] left-40 top-16 z-10"
    >
      <MenuItem
        text="Add to Playlist"
        onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
      />
      <MenuDivider />
      <MenuItem text="View Album" onClick={() => console.log('View Album clicked')} />
      <MenuDivider />
      <MenuItem text="View Artist" onClick={() => console.log('View Artist clicked')} />
    </div>
  );

  const PlaylistMenu = () => (
    <div
      ref={playlistMenuRef}
      className="absolute bg-neutral-800 rounded-md shadow-lg border border-neutral-700 min-w-[150px] left-72 top-16 z-10"
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
    e.stopPropagation(); // Prevent event bubbling
    setShowMainMenu(!showMainMenu);
    setShowPlaylistMenu(false);
  };

  return (
    <div
      className="flex-shrink-0 cursor-pointer transition-transform mr-4 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[175px]">
        <div className="relative flex">
          <img
            src={song.thumbnail}
            alt={`${song.title} thumbnail`}
            className="h-[175px] w-[175px] rounded-md object-cover mb-2 group-hover:brightness-50 transition-all duration-300"
          />
          <div
            className={`absolute right-0 top-0 p-2 flex justify-between items-center rounded-md
              transition-all duration-300 h-[175px] w-[175px] bg-black bg-opacity-50
              ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-row justify-center items-center w-full h-full space-x-5">
              {isLiked ? (
                <FaCheck 
                  className="text-green-500 w-4 h-4 cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                  }} 
                />
              ) : (
                <FaPlus 
                  className="text-white w-4 h-4 cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                  }} 
                />
              )}
              <div className="bg-black/20 rounded-full transition-all backdrop-blur-md w-16 h-16 flex justify-center items-center">
                <FaPlay 
                  className="w-6 h-6 text-white cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                  }} 
                />
              </div>
              <div onClick={handleEllipsisClick}>
                <FaEllipsisV className="w-4 h-4 text-white cursor-pointer" />
              </div>
            </div>
          </div>
          {showMainMenu && <MainMenu />}
          {showPlaylistMenu && <PlaylistMenu />}
        </div>
        <div className="px-1">
          <h2 className="text-white font-medium text-sm mb-1 truncate">
            {song.title}
          </h2>
          <div className="text-gray-500 text-xs">
            {song.artist.map((artist, index) => (
              <span key={artist._id}>
                {artist.name}
                {index < song.artist.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;