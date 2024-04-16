import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoanApplicationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?._id; 
  const user = useSelector((state) => state.user.userDetails);
  const userId = user?.user?._id;

  // State for bank data
  const [bankData, setBankData] = useState(null);
  // State for loan amount
  const [loanAmount, setLoanAmount] = useState('');

  // Fetch bank data when the component mounts
  useEffect(() => {
    if (id) {
      // Fetch the bank data from the server using the ID
      axios.get(`http://localhost:8080/api/bank/${id}`)
        .then(response => {
          console.log(response.data);
          setBankData(response.data.bank_data);
        })
        .catch(error => {
          console.error('Error fetching bank data:', error);
          // Handle error here, e.g., show an error message
        });
    }
  }, [id]);

  // Handle the change in loan amount input
  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Loan amount:', loanAmount);
    try {
      const response=await axios.post(`http://localhost:8080/api/bank/take_loan/${userId}/${id}`,{
        amount:loanAmount
      })
       if(response.data.message==="Loan taken successfully"){
        toast.success('Loan added successfully!', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        navigate('/');
      }
    } catch (error) {
      navigate('/notifications',{state:{message:"Having old loan first pay that"}});
      console.log(error); 
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {bankData && (
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-600 mb-6">Loan Application for {bankData.name}</h1>
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 p-8 rounded-lg shadow-lg w-full max-w-6xl">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <img
                src={bankData.image}
                alt={bankData.name}
                className="w-full md:w-1/2 h-60 object-cover rounded-lg mb-4 md:mb-0 md:mr-8 shadow-md"
              />
              <div className="w-full md:w-1/2 text-lg text-gray-700">
                <p><strong>Address:</strong> {bankData.address}</p>
                <p><strong>City:</strong> {bankData.city}</p>
                <p><strong>Country:</strong> {bankData.country}</p>
                <p><strong>Phone:</strong> {bankData.phone}</p>
                <p><strong>Email:</strong> {bankData.email}</p>
                <p><strong>Assets:</strong> ${bankData.assets.toLocaleString()}</p>
                <p><strong>Interest Rate:</strong> {bankData.interest_rate}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-1/2">
              <label htmlFor="loanAmount" className="block text-gray-700 font-semibold mb-2 text-center">Loan Amount</label>
              <input
                type="number"
                id="loanAmount"
                className="shadow border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                placeholder="Enter loan amount"
                required
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-yellow-500 to-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationPage;
  