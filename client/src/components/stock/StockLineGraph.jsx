import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { useSelector } from 'react-redux';

const StockLineGraph = ({ stock }) => {
  const user = useSelector((state)=>state.user.userDetails);
  const userId = user.user._id;
  const strData = JSON.stringify(stock);
  const { name, history, symbol } = JSON.parse(strData);

  const [quantity, setQuantity] = useState('');

  // Handle buy button click
  const handleBuyStock = async() => {
    if (!quantity || isNaN(quantity)) {
      alert('Please enter a valid quantity.');
      return;
    }
    
    // Make API call to buy stock with quantity
    await axios.post(`http://localhost:8080/api/stock/buy-stock/${userId}`, {
      symbol,
      quantity: parseInt(quantity)
    })
    .then(response => {
      alert('Stock bought successfully!');
      console.log(response.data);
      window.location.reload();
      // Optionally, you can handle the response or perform additional actions
    })
    .catch(error => {
      console.error('Error buying stock:', error);
      alert('Error buying stock. Please try again later.');
    });
  };


  // Prepare data for the chart
  const chartData = {
    options: {
      chart: {
        id: 'basic-line',
        width: '100%'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false // Adjust as needed based on your data
        }
      },
      yaxis: {
        title: {
          text: 'Price'
        }
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy' // Adjust date format in tooltip as needed
        }
      }
    },
    series: [{
      name: 'Price',
      data: history.map(item => ({
        x: new Date(item.timestamp).getTime(), // Convert timestamp to milliseconds
        y: item.price
      }))
    }]
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">{name}</h2>
      <Chart options={chartData.options} series={chartData.series} type="line" height={300} />
      <div className="mt-4 flex items-center">
        <input 
          className="border border-gray-300 rounded px-3 py-1 mr-2" 
          type="number" 
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)} 
        />
        <button 
          onClick={handleBuyStock} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default StockLineGraph;