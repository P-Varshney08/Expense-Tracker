import React, { useState } from 'react';
// import bgImage from '../components/sidebar/assets/bg2.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/user/userSlice';

const Signin = () => {
    const [formData, setFormData] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post('http://localhost:8080/api/user/signin', formData);
          console.log('res:', res);
          if (res.status === 200) {
              dispatch(setUserDetails(res.data));
              toast.success('Logged in successfully!', {
                  position: 'top-right',
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
              });
              navigate('/');
          } else if (res.status === 404) {
              toast.error(res.data.message || 'User not found', { 
                  autoClose: 4000,
                  style: {
                      backgroundColor: "",
                  },
                  progressBarStyle: {
                      background: 'purple'
                  },
              });
          } else if (res.status === 401) {
              toast.error('Invalid credentials', {
                  autoClose: 4000,
                  style: {
                      backgroundColor: "",
                  },
                  progressBarStyle: {
                      background: 'purple'
                  },
              });
          } else {
              toast.error('Something went wrong', {
                  autoClose: 4000,
                  style: {
                      backgroundColor: "",
                  },
                  progressBarStyle: {
                      background: 'purple'
                  },
              });
          }
      } catch (error) {
          console.log('Error Signing In', error.message);
          toast.warning('Wrong credentials', {
              autoClose: 4000,
              progressStyle: {
                  backgroundColor: '#FFB700'
              },
              theme: 'dark'
          });
      }
  }
  
  
   
    return (
      <div className="p-4 flex items-center justify-center bg-[#e0dede]">
        <div className="bg-white p-10 md:p-12 rounded-md shadow-md backdrop-blur-md bg-opacity-60 max-w-md w-full flex-shrink-0">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-purple-700 text-center">Sign In</h2>
          <div className="mb-4 md:mb-8">
            <img
              src="https://img.freepik.com/free-vector/pos-terminal-security-website-template_107791-114.jpg?t=st=1712941188~exp=1712944788~hmac=88f4023ad2f57cb0789bdda2201ab4c8d8700723ec1c3f7b1c250341b2e518fc&w=1060"
              alt="Background"
              className="w-full h-24 md:h-32 object-cover mb-4 rounded-md"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter your Email'
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Enter Password'
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-700">
                Not registered yet? <a href="/signup" className="text-purple-700">Sign up</a>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 md:p-4 rounded-md hover:bg-purple-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
    
};

export default Signin;
