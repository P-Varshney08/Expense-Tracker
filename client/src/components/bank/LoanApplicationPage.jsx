// LoanApplicationPage.js
import React, { useState } from 'react';

const LoanApplicationPage = () => {
    console.log('location is: ', location);
//   const { bank } = location.state;
  const [loanAmount, setLoanAmount] = useState(0);

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the loan application submission here
    // console.log('Submitting loan application for bank:', bank.name);
    console.log('Loan amount:', loanAmount);
    // Optionally, you can navigate to another page after submission
    // history.push('/thank-you');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-semibold mb-8">Loan Application for {bank.name}</h1> */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-gray-700 font-bold mb-2">Loan Amount</label>
            <input
              type="number"
              id="loanAmount"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={loanAmount}
              onChange={handleLoanAmountChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
              Submit Application
            </button>
            {/* Optionally, add a button to cancel the application */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanApplicationPage;
