import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const SearchView = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await api.fetchMoodTypes(token);
        setMoods(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch mood types. Please try again later.');
        console.error('Error fetching mood types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex items-center space-x-2 text-blue-400">
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-red-900/50 text-red-200 px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm border border-red-800/50">
        <p className="flex items-center">
          <span className="text-red-500 text-xl mr-2">⚠</span>
          {error}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Mood
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select a mood to discover perfectly curated music that matches your current vibe
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => navigate(`/mood/${mood}`)}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-400/80 to-blue-500/80 p-px shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="relative rounded-xl bg-gray-900/50 backdrop-blur-sm p-4 h-full transition-all duration-300 group-hover:bg-gray-900/40">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative block text-lg font-semibold text-white text-center py-3">
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </span>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchView;