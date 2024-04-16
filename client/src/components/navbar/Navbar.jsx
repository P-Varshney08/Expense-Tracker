import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserDetails } from '../../redux/user/userSlice';
import { toast } from 'react-toastify';

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

  const isAuthenticated = useSelector((state)=> state.user.userDetails);
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log('Logging out');
    dispatch(setUserDetails(null));
    localStorage.removeItem('root');
    toast.success('Logged Out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  }

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
            
          </div>

          {isAuthenticated ? (
            // If the user is authenticated, show the main options
            <div className="flex items-center space-x-8">
              <Link
                to="/profile"
                className="text-gray-800 hover:text-gray-600 transition-all duration-300"
              >
                <img src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=" alt="profile" height={30} width={30} />
                {/* Profile */}
              </Link>

              <button
                className="text-gray-800 hover:text-gray-600 transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-10">
              <Link to="/support" className="text-black">
                Support
              </Link>

              <Link to="/signin" className="text-black">
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
