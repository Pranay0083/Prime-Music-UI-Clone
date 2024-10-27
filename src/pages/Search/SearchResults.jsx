import React, { useState } from 'react';
import { api } from '../../services/api';

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');  // Get token from local storage

    try {
      const response = await api.search(token, searchQuery);
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch search results. Please try again later.');
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Search Results</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for songs, artists, albums, or moods"
        />
        <button type="submit">Search</button>
      </form>
      <h2>Results</h2>
      {results.length > 0 ? (
        <div className="search-results">
          {results.map((result) => (
            <div key={result._id} className="search-result-card">
              <img src={result.thumbnail} alt={result.title} />
              <p>{result.title}</p>
              <p>{result.artist.map(artist => artist.name).join(', ')}</p>
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
