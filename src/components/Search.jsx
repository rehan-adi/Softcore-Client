import axios from 'axios';
import debounce from "lodash/debounce";
import { toast } from "react-hot-toast";
import { Search as SearchIcon, X } from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = useCallback(async (username) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3333/api/v1/search/user?query=${username}`);

      if (response.status === 200) {
        const users = response.data.user;

        if (users.length === 0) {
          toast.info('No users found.');
        }

        setSearchResults(users);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      const errorMessage = error.response?.data?.message || 'Error fetching search results';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(debounce(fetchSearchResults, 800), [fetchSearchResults]);

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
          <div className="w-full max-w-3xl space-y-4 px-3">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 bg-[#27272A] animate-pulse rounded-lg"
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                  <div className="flex flex-col">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
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
            className="flex items-center justify-between px-4 py-3 bg-[#F9FAFB0D] rounded-lg cursor-pointer"
            // bg-gray-900 change color for 
          >
            {/* Profile Picture */}
            <div className="flex items-center">
              <img
                src={user.profilePicture}
                alt={`${user.username}'s profile picture`}
                className="w-8 h-8 rounded-full object-cover mr-4"
              />

              {/* User Info: Name, Username */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.fullname}</span>
                <span className="text-xs text-gray-300">@{user.username}</span>
              </div>
            </div>

            {/* Follow Button */}
            <button
              disabled={loading}
              className="text-sm text-blue-400 hover:underline"
            >
              Follow
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Search;
