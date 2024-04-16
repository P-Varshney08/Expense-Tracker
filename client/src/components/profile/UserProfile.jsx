import React, { useState, useEffect } from 'react';
import Portfoliosec from '../portfolio/portfoliosec';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import axios for making HTTP requests

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // State to hold user data
  const user = useSelector((state) => state.user.userDetails);
  const userId = user?.user?._id;
  useEffect(() => {
  
    const fetchUserData = async () => {
      try {
        // Make a GET request to fetch user data from the backend API
        const response = await axios.get(`http://localhost:8080/api/user/user_by_id/${userId}`); // Change the URL to match your backend route
        console.log(response.data)
        setUserData(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    console.log(userData)
    // Call the fetchUserData function when the component mounts
    fetchUserData();
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleClick = () => {
    console.log('navigating');
    navigate('/edit-limit');
  };

  return (
    <div className="container mx-auto py-8 px-5 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8 text-center">User Profile</h1>
      {userData && ( // Render user data if available
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Information Card */}
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Personal Information</h2>
              <p className="text-gray-100"><span className="font-semibold">Name:</span> {userData.user.username}</p>
              <p className="text-gray-100"><span className="font-semibold">Email:</span> {userData.user.email}</p>
              <p className="text-gray-100"><span className="font-semibold">Current Balance: $</span> {userData.user.current_balance}</p>
            </div>
          </div>

          {/* Loan Information Card */}
          <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Loan Information</h2>
              <p className="text-gray-100"><span className="font-semibold">Total Amount of Loans:</span> {userData.user.loans.reduce((acc, loan) => acc + loan.loan_amount, 0)}</p>
              <p className="text-gray-100"><span className="font-semibold">Number of Banks:</span> {(userData.user.loans.length)}</p>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Your Set Limits</h2>
              <p className="text-gray-100"><span className="font-semibold">Food Expense Limit:$</span> {userData.user.limit_food}</p>
              <p className="text-gray-100"><span className="font-semibold">Education Expense Limit:$</span> {userData.user.limit_Education}</p>
              <p className="text-gray-100"><span className="font-semibold">Housing Expense Limit:$</span> {userData.user.limit_Housing}</p>
            </div>
          </div>
        </div>
      )}

      <Portfoliosec />
      {/* Button for adding expense limit */}
      <div className="text-center">
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md shadow-md" onClick={handleClick}>
          Add Expense Limit
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
