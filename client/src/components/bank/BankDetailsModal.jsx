import React from 'react';

const BankDetailsModal = ({ bank, onClose, onProceed }) => {
  const {
    name,
    address,
    city,
    country,
    phone,
    email,
    interest_rate,
    assets,
    additionalInfo,
  } = bank;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          Close
        </button>
        <h2 className="text-2xl font-semibold mb-4">{name}</h2>
        <p className="text-gray-700 mb-2">Address: {address}, {city}, {country}</p>
        <p className="text-gray-700 mb-2">Phone: {phone}</p>
        <p className="text-gray-700 mb-2">Email: {email}</p>
        <p className="text-gray-700 mb-2">Interest Rate: {interest_rate}%</p>
        <p className="text-gray-700 mb-2">Assets: ${assets.toLocaleString()}</p>
        {additionalInfo && (
          <p className="text-gray-700 mb-4">{additionalInfo}</p>
        )}
        <div className="flex justify-end">
          <button onClick={onProceed} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mr-2">
            Proceed for Loan
          </button>
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsModal;