import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../services/api';

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const query = new URLSearchParams(location.search).get('q');
      if (!query) return;

      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await api.search(token, query);
        setResults(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result) => (
            <div key={result._id} className="search-result-card bg-gray-800 p-4 rounded-lg">
              <img src={result.thumbnail} alt={result.title} className="mb-2 rounded-lg" />
              <p className="text-lg font-bold">{result.title}</p>
              <p className="text-gray-400">{result.artist.map(artist => artist.name).join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
