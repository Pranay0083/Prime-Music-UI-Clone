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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <AlbumHeader album={album} />
      <SongList songs={album.songs} />
    </main>
  );
};

export default AlbumSingle;
