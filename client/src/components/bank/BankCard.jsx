import React, { useState } from 'react';
import BankDetailsModal from './BankDetailsModal';
import {useNavigate} from 'react-router-dom';

const BankCard = ({ bank }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleProceedLoan = async() => {
    // Logic to proceed with the loan application
    console.log('Proceeding with loan application for:', bank.name);
    console.log(`selecting banks details are: ${JSON.stringify(bank)}`);
    navigate('/loan-application',  { state: bank });
    // const res = await axios.get(http://localhost:8080/api/bank)
    // closeModal();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transform hover:scale-105 hover:shadow-lg hover:rotate-1 transition-transform duration-300">
        <img src={bank.image} alt={bank.name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{bank.name}</h3>
          <p className="text-gray-600 mb-4">Current Interest Rate: {bank.interest_rate}%</p>
          <button onClick={openModal} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Request Loan Services
          </button>
        </div>
      </div>
      {showModal && (
        <BankDetailsModal
          bank={bank}
          onClose={closeModal}
          onProceed={handleProceedLoan}
        />
      )}
    </>
  );
};

export default BankCard;