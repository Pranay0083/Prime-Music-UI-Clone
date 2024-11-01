import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import CategorySection from '../../components/features/CategorySection';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { categories } from '../../components/constants/categories';

const Music = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        let allSongs = [];

        for (let category of categories) {
          const response = await api.fetchSongsByCategory(token, category.key, category.value, 15);
          allSongs.push({ category: category.name, songs: response.data });
        }

        setSongs(allSongs);
        setError(null);
      } catch (err) {
        setError('Failed to fetch songs. Please try again later.');
        console.error('Error fetching songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
      <div className="max-w-full mx-20 mt-20">
        <section className="rounded-xl backdrop-blur-sm bg-white/5 p-6 transition-all duration-300 hover:bg-white/10">
        {songs.map((categoryData) => (
          <CategorySection
            key={categoryData.category}
            title={categoryData.category}
            songs={categoryData.songs}
          />
        ))}
        </section>
      </div>
  );
};

export default Music;