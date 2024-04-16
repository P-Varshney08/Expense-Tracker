import React from 'react';

// Function to generate a random background gradient color
const getRandomColor = () => {
  const colors = [
    'from-teal-300 to-yellow-500',
    'from-red-300 to-pink-600',
    'from-purple-600 to-indigo-400',
    'from-pink-400 to-blue-500',
    'from-cyan-300 to-blue-600',
    'from-fuchsia-600 to-pink-500',
    'from-green-400 to-blue-500',
    'from-green-400 to-yellow-500',
    'from-yellow-400 to-lime-500',
    'from-pink-400 to-rose-500',
    'from-pink-400 to-purple-500',
    'from-orange-400 to-yellow-300',

    // 'from-indigo-400 to-purple-500',
    // 'from-blue-400 to-cyan-500',
    // 'from-green-400 to-emerald-500',
    // 'from-purple-400 to-fuchsia-500',
    // 'from-indigo-400 to-blue-500',
    // 'from-blue-400 to-green-500',
    // 'from-red-400 to-red-500',
    // 'from-purple-400 to-purple-500',
    // 'from-emerald-400 to-green-500',
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

// Card component for each stock
const StockCard = ({ stock }) => {
  const { name, price, symbol } = stock;
  const gradientColor = getRandomColor();

  return (
    <div className={`rounded-lg shadow-md p-4 overflow-hidden bg-gradient-to-br ${gradientColor}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>
      <div className="mb-2">
        <span className="text-gray-600">Current Value:</span> ${price.toFixed(2)}
      </div>
      <div className="mb-2">
        <span className="text-gray-600">Symbol:</span> ${symbol}
      </div>
    </div>
  );
};

export default StockCard;
