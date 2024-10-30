import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import CategorySection from '../../components/features/CategorySection';
import TrendingSongs from '../../components/features/threebyfive';
import Album from '../../components/features/Album';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { categories } from '../../components/constants/categories';

const LoggedInHome = () => {
  const [data, setData] = useState({
    categorizedSongs: [],
    trendingSongs: [],
    albums: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const [categorizedSongsData, trendingSongsData, albumsData] = await Promise.all([
          Promise.all(
            categories.map(async (category) => {
              const response = await api.fetchSongsByCategory(
                token, 
                category.key, 
                category.value, 
                15
              );
              return { 
                category: category.name, 
                songs: response.data 
              };
            })
          ),
          api.fetchSongsByCategory(token, "featured", "Trending songs", 15).then(res => res.data),
          api.fetchAlbums(token).then(res => res.data)
        ]);

        setData({
          categorizedSongs: categorizedSongsData,
          trendingSongs: trendingSongsData,
          albums: albumsData,
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch content. Please try again later.');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const { categorizedSongs, trendingSongs, albums } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black">
      <main className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 space-y-8">
        <div className="fade-in animate-fadeIn">
          {/* Trending Songs Section */}
          <section className="rounded-xl backdrop-blur-sm bg-white/5 p-6 transition-all duration-300 hover:bg-white/10">
            <TrendingSongs 
              songs={trendingSongs} 
              loading={loading} 
            />
          </section>

          {/* Albums Section */}
          <section className="mt-12 rounded-xl backdrop-blur-sm bg-white/5 p-6 transition-all duration-300 hover:bg-white/10">
            <Album 
              albums={albums}
              loading={loading}
            />
          </section>

          {/* Categorized Songs Sections */}
          {categorizedSongs.map((categoryData) => (
            <section 
              key={categoryData.category}
              className="mt-12 rounded-xl backdrop-blur-sm bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
            >
              <CategorySection
                title={categoryData.category}
                songs={categoryData.songs}
              />
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LoggedInHome;