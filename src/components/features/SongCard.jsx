import React, { useState } from "react";
import { FaPlus, FaCheck, FaEllipsisV, FaPlay } from "react-icons/fa";

const SongCard = ({ song, onPlay, isLiked }) => {
  const [isHovered, setIsHovered] = useState(false);

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
                <FaCheck className="text-green-500 w-4 h-4 cursor-pointer" />
              ) : (
                <FaPlus className="text-white w-4 h-4 cursor-pointer" />
              )}
              <div className=" bg-black/20 rounded-full transition-all  backdrop-blur-md w-16 h-16 flex justify-center items-center" >
                <FaPlay className="w-6 h-6 text-white cursor-pointer" />
              </div>
              <FaEllipsisV className="w-4 h-4 text-white cursor-pointer" />
            </div>
          </div>
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
