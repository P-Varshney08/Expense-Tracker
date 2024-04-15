import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((state) => state.user.userDetails);
  const username = user.user.username;
  const [limitStock, setlimitStock] = useState(parseInt(user.user.limit_stock) || ''); // Corrected here
  const [limitFood, setLimitFood] = useState(user.user.limit_food || '');
  const [limitHousing, setLimitHousing] = useState(user.user.limit_Housing || '');
  const [limitEducation, setLimitEducation] = useState(user.user.limit_Education || '');
  const [savingsLimit, setSavingsLimit] = useState(user.user.savings_limit || '');
  const [editMode, setEditMode] = useState(false);
  const [savingStatus, setSavingStatus] = useState('');

  const handleSave = async () => {
    try {
      if (!limitStock || !limitFood || !limitHousing || !limitEducation || !savingsLimit) {
        setSavingStatus('Please enter all limits.');
        return;
      }

      const response = await axios.post(`http://localhost:8080/api/user/fix_expense/${user.user._id}`, {
        limit_stock: limitStock,
        limit_food: limitFood,
        limit_Housing: limitHousing,
        limit_Education: limitEducation,
        savings_limit: savingsLimit
      });

      console.log('gg',response.data);
      toast.success('Limit added successfully!', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      
      setSavingStatus('Limits saved successfully.');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating limits:', error);
      setSavingStatus('Failed to save limits. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="bg-white rounded-md shadow-md p-6 mb-8">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <img
              src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
              alt="User Logo"
              className="h-24 w-24 mb-2"
            />
            <h2 className="text-xl font-semibold">{username}</h2>
          </div>
          {(limitStock === 0 || limitFood === 0 || limitHousing === 0 || limitEducation === 0 || savingsLimit === 0 || isNaN(limitStock) || isNaN(limitFood) || isNaN(limitHousing) || isNaN(limitEducation) || isNaN(savingsLimit)) ? (
            <div className="text-center">
              <p>You have not set expense limits.</p>
              <button onClick={() => setEditMode(true)} className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 mt-4">
                Set Limits
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-500">Stock Investing Limit</p>
                  <p className="text-xl font-semibold">${limitStock}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-500">Food Expenses Limit</p>
                  <p className="text-xl font-semibold">${limitFood}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-500">Housing Expenses Limit</p>
                  <p className="text-xl font-semibold">${limitHousing}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-500">Education Expenses Limit</p>
                  <p className="text-xl font-semibold">${limitEducation}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-500">Savings Limit</p>
                  <p className="text-xl font-semibold">${savingsLimit}</p>
                </div>
              </div>
              <div className="mt-4">
                <button onClick={() => setEditMode(true)} className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">
                  Edit Limits
                </button>
              </div>
            </>
          )}
          {editMode && (
            <div className="mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="foodExpense" className="block text-sm font-semibold text-gray-700 mb-1">
                    Set Stock Investing Limit
                  </label>
                  <input
                    type="number"
                    id="stockLimit"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
                    value={limitStock}
                    onChange={(e) => setlimitStock(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="foodExpense" className="block text-sm font-semibold text-gray-700 mb-1">
                    Set Food Expenses Limit
                  </label>
                  <input
                    type="number"
                    id="foodExpense"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
                    value={limitFood}
                    onChange={(e) => setLimitFood(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="housingExpense" className="block text-sm font-semibold text-gray-700 mb-1">
                    Set Housing Expenses Limit
                  </label>
                  <input
                    type="number"
                    id="housingExpense"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
                    value={limitHousing}
                    onChange={(e) => setLimitHousing(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="educationExpense" className="block text-sm font-semibold text-gray-700 mb-1">
                    Set Education Expenses Limit
                  </label>
                  <input
                    type="number"
                    id="educationExpense"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
                    value={limitEducation}
                    onChange={(e) => setLimitEducation(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="savingsLimit" className="block text-sm font-semibold text-gray-700 mb-1">
                    Set Savings Limit
                  </label>
                  <input
                    type="number"
                    id="savingsLimit"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
                    value={savingsLimit}
                    onChange={(e) => setSavingsLimit(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <button onClick={handleSave} className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">
                  Save
                </button>
                <p className="text-red-500 mt-2">{savingStatus}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
