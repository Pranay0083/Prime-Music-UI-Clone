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
        const token = localStorage.getItem('token');  // Get token from local storage
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
    <div>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search for songs, artists, albums, or moods"
        onClick={() => navigate('/search/results')}
      />
      <h2>Mood Types</h2>
      <div className="moods">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => navigate(`/mood/${mood}`)}
            style={{ margin: '10px', padding: '10px', cursor: 'pointer' }}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchView;
