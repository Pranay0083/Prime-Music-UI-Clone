import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const ThreeDotMenu = ({ song }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
    const navigate = useNavigate();

    const handleToggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const fetchPlaylists = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.fetchPlaylists(token);
            setPlaylists(response.data);
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    const handleAddToPlaylist = () => {
        fetchPlaylists();
        setShowPlaylistModal(true);
    };

    const handleCreateNewPlaylist = async () => {
        const token = localStorage.getItem('token');
        try {
            await api.createPlaylist(token, { title: newPlaylistTitle, description: 'New playlist' });
            setShowPlaylistModal(false);
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    const handleAddSongToPlaylist = async (playlistId) => {
        const token = localStorage.getItem('token');
        try {
            await api.addSongToPlaylist(token, playlistId, song._id);
            setShowPlaylistModal(false);
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    const handleViewAlbum = () => {
        navigate(`/album/${song.album}`);
    };

    const handleViewArtist = () => {
        navigate(`/artist/${song.artist[0]._id}`);
    };

    return (
        <div className="three-dot-menu" style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={handleToggleDropdown}>⋮</button>
            {dropdownOpen && (
                <div className="dropdown-menu" style={{ position: 'absolute', right: 0 }}>
                    <button onClick={handleAddToPlaylist}>Add to Playlist</button>
                    <button onClick={handleViewAlbum}>View Album</button>
                    <button onClick={handleViewArtist}>View Artist</button>
                </div>
            )}
            {showPlaylistModal && (
                <div className="modal">
                    <h2>Add to Playlist</h2>
                    <input
                        type="text"
                        value={newPlaylistTitle}
                        onChange={(e) => setNewPlaylistTitle(e.target.value)}
                        placeholder="New Playlist Title"
                    />
                    <button onClick={handleCreateNewPlaylist}>Create New Playlist</button>
                    <h3>Existing Playlists</h3>
                    <ul>
                        {playlists.map((playlist) => (
                            <li key={playlist._id}>
                                {playlist.title}
                                <button onClick={() => handleAddSongToPlaylist(playlist._id)}>+</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setShowPlaylistModal(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default ThreeDotMenu;
