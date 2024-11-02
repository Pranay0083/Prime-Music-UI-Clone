import React, { useState } from "react";
import PlayButton from "./PlayButton";
import LikeButton from "./LikeButton";
import ThreeDotsMenu from "./ThreeDotsMenu";
import PlaylistCreationModal from './PlaylistCreationModal';

const SongCard = ({ song }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);

  return (
    <div
      className="flex-shrink-0 transition-transform mr-4 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              <LikeButton song={song} />
              <PlayButton song={song} />
              <ThreeDotsMenu 
                song={song}
                onPlaylistCreate={() => setIsCreatePlaylistModalOpen(true)}
              />
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
      <PlaylistCreationModal
        isCreatePlaylistModalOpen={isCreatePlaylistModalOpen}
        setIsCreatePlaylistModalOpen={setIsCreatePlaylistModalOpen}
      />
    </div>
  );
};

export default SongCard;