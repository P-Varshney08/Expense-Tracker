import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuyLoanButton = () => {
    const navigate = useNavigate();
  const handleBuyLoan = () => {
    console.log('Buying a loan...');
    navigate('/bank-home');
  };

  return (
    <button onClick={handleBuyLoan} className="fixed bottom-24 right-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Buy Loan
    </button>
  );
};

export default BuyLoanButton;
