import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { MenuItem, MenuDivider } from "./MenuComponents";

const ThreeDotsMenu = ({ song, onPlaylistCreate }) => {
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const playlistMenuRef = useRef(null);
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.fetchPlaylists(token);
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToPlaylist = async (playlistId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.addSongToPlaylist(token, playlistId, song._id);
      if (response.status === "success") {
        setShowPlaylistMenu(false);
        setShowMainMenu(false);
      }
    } catch (error) {
      console.error("Error adding to playlist:", error);
    }
  };

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

  const MainMenu = () => (
    <div
      ref={menuRef}
      className="absolute bg-neutral-800 rounded-md shadow-lg border border-neutral-700 min-w-[150px] right-0 top-8 z-10"
    >
      <MenuItem
        text="Add to Playlist"
        onClick={() => {
          setShowPlaylistMenu(!showPlaylistMenu);
          fetchPlaylists();
        }}
      />
      <MenuDivider />
      <MenuItem
        text="View Album"
        onClick={() => navigate(`/album/${song.album}`)}
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
      className="absolute bg-neutral-800 rounded-md shadow-lg border border-neutral-700 min-w-[150px] right-[-160px] top-0 z-20 max-h-60 overflow-y-auto"
    >
      <MenuItem
        text="New Playlist"
        onClick={onPlaylistCreate}
      />
      {playlists.map((playlist, index) => (
        <React.Fragment key={playlist._id || index}>
          <MenuDivider />
          <MenuItem
            text={playlist.title}
            onClick={() => addToPlaylist(playlist._id)}
          />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="relative">
      <FaEllipsisV
        className="w-4 h-4 text-white cursor-pointer hover:scale-110 transition-transform"
        onClick={(e) => {
          e.stopPropagation();
          setShowMainMenu(!showMainMenu);
          setShowPlaylistMenu(false);
        }}
      />
      {showMainMenu && <MainMenu />}
      {showPlaylistMenu && <PlaylistMenu />}
    </div>
  );
};

export default ThreeDotsMenu;