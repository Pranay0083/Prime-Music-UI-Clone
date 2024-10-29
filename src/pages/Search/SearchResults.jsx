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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <i class="fa-solid fa-loader w-8 h-8 text-blue-500 animate-spin"></i>
        <p className="text-gray-400 animate-pulse">Searching for tracks...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-red-900/30 border border-red-500/20 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg max-w-md">
        <p className="text-red-200 flex items-center gap-2">
          <span className="text-red-500 text-2xl">⚠</span>
          {error}
        </p>
      </div>
    </div>
  );

  const query = new URLSearchParams(location.search).get('q');

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Search Results
            {query && (
              <span className="text-gray-400 text-xl ml-2">
                for "{query}"
              </span>
            )}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-400 rounded-full" />
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((result) => (
              <div
                key={result._id}
                className="group relative bg-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-800/70 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm"
              >
                <div className="aspect-w-16 aspect-h-16 relative overflow-hidden">
                  {result.thumbnail ? (
                    <img
                      src={result.thumbnail}
                      alt={result.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <i className="fa-solid fa-music w-12 h-12 text-gray-500"></i>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">
                    {result.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {result.artist.map(artist => artist.name).join(', ')}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500/20 to-green-400/20 rounded-full overflow-hidden">
                      <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-green-400 rounded-full group-hover:w-full transition-all duration-700" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <i className="fa-solid fa-music w-16 h-16 text-gray-700 mb-4"></i>
            <p className="text-gray-400 text-lg text-center mb-2">No results found</p>
            <p className="text-gray-600 text-center">
              Try adjusting your search term or try a different keyword
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;