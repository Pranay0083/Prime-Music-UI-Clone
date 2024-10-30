import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaCheck, FaEllipsisV, FaPlay } from "react-icons/fa";

const SongCard = ({ song, onPlay, isLiked, onLike }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenInside, setIsMenuOpenInside] = useState(false);
  const menuRef = useRef(null);
  const menuRef2 = useRef(null);

  const handleMenuToggleInside = () => {
    console.log(isMenuOpenInside)
    setIsMenuOpenInside((prev) => !prev);
    console.log(isMenuOpenInside)
  }

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex-shrink-0 cursor-pointer transition-transform mr-4 group"
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
                <FaCheck className="text-green-500 w-4 h-4 cursor-pointer" onClick={onLike} />
              ) : (
                <FaPlus className="text-white w-4 h-4 cursor-pointer" onClick={onLike} />
              )}
              <div className="bg-black/20 rounded-full transition-all backdrop-blur-md w-16 h-16 flex justify-center items-center">
                <FaPlay className="w-6 h-6 text-white cursor-pointer" onClick={onPlay} />
              </div>
              <FaEllipsisV className="w-4 h-4 text-white cursor-pointer" onClick={handleMenuToggle} />
            </div>
          </div>
          {isMenuOpen && (
            <div ref={menuRef} className="absolute right-0 top-12 bg-white text-black rounded-md shadow-lg z-10">
              <div className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleMenuToggleInside}>Add to Playlist</div>
              <div className="p-2 hover:bg-gray-200 cursor-pointer">View Album</div>
              <div className="p-2 hover:bg-gray-200 cursor-pointer">View Artist</div>
            </div>
          )}
          {isMenuOpenInside && (
            <div ref={menuRef2} className="absolute right-0 top-24 bg-white text-black rounded-md shadow-lg z-10">
              <div className="p-2 hover:bg-gray-200 cursor-pointer">New Playlist</div>
              <div className="p-2 hover:bg-gray-200 cursor-pointer">Other playlists</div>
            </div>
          )}
        </div>
        <div className="px-1">
          <h2 className="text-white font-medium text-sm mb-1 truncate">{song.title}</h2>
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