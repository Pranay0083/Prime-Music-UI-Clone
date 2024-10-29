import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import SongList from "../../components/features/SongList";
import AlbumHeader from "../../components/features/AlbumHeader";

const AlbumSingle = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await api.fetchSingleAlbum(token, id);
        setAlbum(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch album. Please try again later.');
        console.error('Error fetching album:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 bg-red-100 p-4 rounded-lg">
        Error: {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 py-32">
      <AlbumHeader album={album} />
      <SongList songs={album.songs} />
    </div>
  );
};

export default AlbumSingle;
