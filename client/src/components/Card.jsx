import React from 'react';

const PurpleButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-purple-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-white hover:text-black focus:border-purple-500 hover:border-purple-900 transition-colors duration-300"
  >
    {children}
  </button>
);

const Card = ({ title, value, onClickButton, buttonText }) => (
  <div className="flex items-center justify-center text-black p-8 rounded-md shadow-md flex-col" style={{ width: '350px', height: '200px' }}>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <p className="text-3xl font-bold mb-4">{value}</p>
    <PurpleButton onClick={onClickButton}>{buttonText}</PurpleButton>
  </div>
);

export default Card;
