import React from 'react';

// Function to generate a random background color
const getRandomColor = () => {
    const colors = [
        '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6', '#FCD34D',
        '#F65D57', '#FACC15', '#6EE7B7', '#7DD3FC', '#BFDBFE', '#FBBF24', '#818CF8'
      ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Card component for each stock
const StockCard = ({ stock }) => {
    console.log(stock)
  const { name, price } = stock;
  const backgroundColor = getRandomColor();

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={{ backgroundColor }}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>
      <div className="mb-2">
        <span className="text-gray-600">Current Value:</span> ${price.toFixed(2)}
      </div>
      {/* <div className="mb-2">
        <span className="text-gray-600">Number of Stocks:</span> {quantity}
      </div> */}
      {/* <div className="mb-2">
        <span className="text-gray-600">Value Invested:</span> ${valueInvested.toFixed(2)}
      </div> */}
    </div>
  );
};

export default StockCard;
