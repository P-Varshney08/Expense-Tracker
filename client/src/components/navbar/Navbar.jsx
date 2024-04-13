import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [allSuggestions, setAllSuggestions] = useState([]);

  useEffect(() => {
    // Assuming allSuggestions data is fetched from somewhere
    const symptomNames = ['Fever', 'Cold', 'Headache', 'Digestion', 'Stress', 'Blood in Stool'];
    setAllSuggestions(symptomNames);
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    const filteredSuggestions = allSuggestions.filter((term) =>
      term.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    setSelectedSuggestion(suggestion);
    console.log('Selected Suggestion: ', suggestion);
  };

  return (
    <div className=''>
      <nav className="navbar bg-white shadow-md px-14 py-3 z-50 ">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="text-gray-800 text-lg font-bold">Dashboard</span>
          </div>
          <div className="max-w-lg mx-4 flex-1">
            <input
              type="text"
              placeholder="Search here ..."
              onChange={handleInputChange}
              value={query}
              className="w-full px-4 py-2 rounded bg-gray-300 focus:outline-none focus:shadow-outline transition-all duration-400 hover:bg-gray-300"
            />
            {suggestions.length > 0 && (
              <ul className="border border-gray-300 bg-white absolute z-10 mt-1 w-[32rem]">
                {query &&
                  suggestions.map((term, index) => (
                    <li
                      key={index}
                      className={`p-2 hover:bg-gray-200 cursor-pointer w-[32rem] ${
                        selectedSuggestion === term ? 'bg-gray-300' : ''
                      }`}
                      onClick={() => handleSuggestionClick(term)}
                    >
                      {term}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="flex items-center space-x-10">
            <Link to="/support" className="text-black">
              Support
            </Link>

            <Link to="/signin" className="text-black">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
