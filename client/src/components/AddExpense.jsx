import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddIncomeForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    transaction_type: "Expense",
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
     window.location.reload();
    } catch (error) {

      console.error('Error submitting form:', error);
      toast.error('Not Sufficient Balance', {
        autoClose: 4000,
        style: {
        //   backgroundImage: {bgImage},
            backgroundColor: "",
        },
        progressBarStyle: {
          background: 'purple'
        },
        // theme: 'dark'
      });
      navigate('/notifications', {
        state: {
          message: `Your current balance is ${user.user.current_balance} and you tried to expend ${formData.Amount}`,
          positive: false // Adjust this based on your notification type
        }
      });
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
        <button
          type="button"
          className="absolute top-5 right-5 mr-4 mt-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
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
            <option value="food">Food</option>
            <option value="Education">Education</option>
            <option value="Housing">Housing</option>
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
