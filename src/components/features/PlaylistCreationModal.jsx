import React, { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const PlaylistCreationModal = ({ isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const navigate = useNavigate();

  const createNewPlaylist = async () => {
    const token = localStorage.getItem('token');
    const response = await api.createPlaylist(token, {
        "title": playlistName,
        "descripion": playlistDescription,
    });
    console.log(response)
    if (response.status === "success") {
      navigate(`/playlist/${response.data._id}`);
    }
  };

  if (!isCreatePlaylistModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-neutral-800 border-neutral-700 rounded-md w-96 p-4">
        <div className="text-white text-xl mb-4">Create New Playlist</div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="playlistName" className="text-right text-white">
              Name
            </label>
            <input
              id="playlistName"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="col-span-3 bg-neutral-700 border-neutral-600 text-white p-2 rounded-md"
              placeholder="Enter playlist name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="playlistDescription" className="text-right text-white">
              Description
            </label>
            <input
              id="playlistDescription"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              className="col-span-3 bg-neutral-700 border-neutral-600 text-white p-2 rounded-md"
              placeholder="Optional description"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setIsCreatePlaylistModalOpen(false)}
            className="mr-2 bg-neutral-700 text-white hover:bg-neutral-600 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={createNewPlaylist}
            disabled={!playlistName.trim()}
            className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md"
          >
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCreationModal;
