import React from "react";
import { useMusicPlayer } from "../../contexts/musicContext";
import LikeButton from "./LikeButton";
import ThreeDotsMenu from "./ThreeDotsMenu";
import PlaylistCreationModal from './PlaylistCreationModal';
import { useState } from "react";

const SongList = ({ songs }) => {
  const { playTrack } = useMusicPlayer();
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);

  const handlePlaySong = (song, index) => {
    playTrack(song.audio_url, {
      title: song.title,
      // artist: artistNames,
      // albumId: albumId,
      onPlayNext: () => console.log("next"),
      onPlayPrevious: () => console.log("prev")
    });
  };

  return (
    <div className="mt-8">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800">
            <th className="pb-4 text-left font-medium w-16">#</th>
            <th className="pb-4 text-left font-medium">Title</th>
            <th className="pb-4 text-left font-medium w-16"></th>
            <th className="pb-4 text-left font-medium w-16"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr 
              key={song._id}
              className="group hover:bg-white/5 transition-colors"
              onClick={() => handlePlaySong(song, index)}
            >
              <td className="py-4 text-gray-400">{index + 1}</td>
              <td className="py-4">
                <div className="flex flex-col">
                  <span className="font-medium group-hover:text-white transition-colors">
                    {song.title}
                  </span>
                </div>
              </td>
              <td className="py-4">
                <LikeButton song={song} />
              </td>
              <td className="py-4">
              <ThreeDotsMenu 
                song={song}
                onPlaylistCreate={() => setIsCreatePlaylistModalOpen(true)}
              />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PlaylistCreationModal
        isCreatePlaylistModalOpen={isCreatePlaylistModalOpen}
        setIsCreatePlaylistModalOpen={setIsCreatePlaylistModalOpen}
      />
    </div>
  );
};

export default SongList;
