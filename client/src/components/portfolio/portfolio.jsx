import React from 'react';


function Portfolio({ portfolio, totalCurrentValue, earningsOrLosses }) {
// function Portfolio({ portfolio, totalInvestment, totalCurrentValue, earningsOrLosses }) {
    return (
        <div className="container mx-auto p-6">
            {/* Main Portfolio Container */}
            <div className="max-w-3/4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-xl rounded-2xl p-8 mb-10 mx-auto">
                <h1 className="text-4xl font-bold text-white mb-6">My Portfolio</h1>

                {/* Holding Cards */}
                {portfolio.map((holding, index) => (
                    <div
                        key={index}
                        className="relative bg-white rounded-2xl p-6 mb-6 shadow-lg transform transition duration-500 ease-out hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:bg-gradient-to-br from-gray-50 via-white to-gray-100"
                    >
                        {/* Card Header */}
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-gray-700">{holding.symbol} ({holding.name})</span>
                                <span className="text-sm text-gray-500">Quantity: {holding.quantity}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-gray-800">${holding.currentValue.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="mt-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Current Price:</span>
                                <span className="text-gray-800">${holding.currentPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-gray-600">Original Investment:</span>
                                <span className="text-gray-800">${holding.originalInvestment.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Portfolio Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-lg transform transition duration-300 ease-out hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:bg-gradient-to-br from-gray-50 via-white to-gray-100">
                    <h2 className="text-2xl font-bold text-gray-700 mb-3">Portfolio Summary</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Total Investment:</span>
                        {/* <span className="text-gray-800">${totalInvestment.toFixed(2)}</span> */}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Total Current Value:</span>
                        <span className="text-gray-800">${totalCurrentValue.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between items-center mt-3 font-semibold ${earningsOrLosses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span>Earnings/Losses:</span>
                        <span>${earningsOrLosses.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
