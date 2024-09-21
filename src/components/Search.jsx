import axios from 'axios';
import debounce from "lodash/debounce";
import { toast } from "react-hot-toast";
import { Search as SearchIcon, Loader, X } from 'lucide-react';
import React, { useCallback, useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (username) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3333/api/v1/search/user?query=${username}`);
      if (response.status === 200) {
        const users = response.data.user;

        if (users.length === 0) {
          toast.info('No users found matching your search.');
        }

        setSearchResults(users);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchSearchResults, 800), []);

  useEffect(() => {
    if (query.trim()) {
      debouncedFetch(query);
    } else {
      setSearchResults([]); // Clear results if the query is empty
    }
  }, [query, debouncedFetch]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (query.trim()) {
        debouncedFetch(query);
      }
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
  };

  return (
    <div className="bg-black flex flex-col items-center justify-start lg:mt-10 mt-6 text-white w-full min-h-screen px-4">
      <div className="relative w-full max-w-lg mb-8">
        <SearchIcon className="absolute left-5 top-3 text-white" />
        <input
          type="text"
          placeholder="Search users"
          className="py-3 pl-14 pr-20 w-full placeholder:text-white bg-black border border-white rounded-full focus:outline-none transition"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          autoComplete='off'
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-5 top-3 text-white p-1 rounded-full  hover:bg-[#27272A]"
            style={{ width: '28px', height: '28px' }} 
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="w-full max-w-lg space-y-4">
        {loading && (
          <div className="flex justify-center">
            <Loader className="animate-spin" />
          </div>
        )}

        {!loading && query === '' && (
          <div className="text-center text-gray-400">Start typing to search users</div>
        )}

        {!loading && query !== '' && searchResults.length === 0 && (
          <div className="text-center text-gray-400">No results found</div>
        )}

        {!loading && searchResults.length > 0 && searchResults.map(user => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-75 transition"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{user.name}</span>
              <span className="text-sm text-gray-400">{user.username}</span>
            </div>
            <button className="text-sm text-blue-400 hover:underline">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
