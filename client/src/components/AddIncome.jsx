import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/user/userSlice';

const AddIncomeForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    transaction_type: "Income",
    name: "",
    Amount: "",
    Date: "",
    tag: "",
  });

  const formRef = useRef(null);
  const user = useSelector((state) => state.user.userDetails);
  const userId = user?.user?._id;
  console.log(userId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Parse the amount value to an integer
    const parsedValue = name === 'Amount' ? parseInt(value, 10) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('data', formData);
      const res = await axios.post(`http://localhost:8080/api/user/Add_expense/${userId}`, formData);
      console.log('Response:', res);
      setFormData({
        name: '',
        Amount: '',
        Date: '',
        tag: '',
        transaction_type: 'Income',
      });
      const user = {
        user: res.data,
      };
      console.log("sd",user);
     dispatch(setUserDetails(user.user));
     window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, maybe show a message to the user
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        console.log('Clicked outside the form');
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="w-full max-w-md mx-auto p-4 relative">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" ref={formRef}>
        <h2 className="text-xl font-semibold mb-4">Add Income</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Amount">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="Amount"
            name="Amount"
            value={formData.Amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Date">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            id="Date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
            Tag <span className="text-red-500">*</span>
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
          >
            <option value="">Select a tag</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Income
        </button>
      </form>
    </div>
  );
};

export default AddIncomeForm;
