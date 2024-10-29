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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold text-white mb-4 pt-16">Mood Types</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => navigate(`/mood/${mood}`)}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchView;
