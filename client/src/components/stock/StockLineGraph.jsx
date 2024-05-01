import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const StockLineGraph = ({ stock }) => {
  const navigate=useNavigate();
  const user = useSelector((state)=>state.user.userDetails);
  const userId = user.user._id;
  const strData = JSON.stringify(stock);
  const { name, history, symbol } = JSON.parse(strData);

  const [quantity, setQuantity] = useState('');


  const handleBuyStock = async() => {
    if (!quantity || isNaN(quantity)) {
      alert('Please enter a valid quantity.');
      return;
    }
    

    await axios.post(`http://localhost:8080/api/stock/buy-stock/${userId}`, {
      symbol,
      quantity: parseInt(quantity)
    })
    .then(response => {
      alert('Stock bought successfully!');
      console.log(response.data);
      window.location.reload();
    })
    .catch(error => {
  
      toast.warning('Dont have limit to buy stocks', {
        autoClose: 4000,
        progressStyle: {
            backgroundColor: '#FFB700'
        },
        theme: 'dark'
    }); 
    navigate('/notifications',{state:{
      message:"dont  have limit"
    }})

      console.error('Error buying stock:', error);
      alert('Error buying stock. Please try again later.');
    });
  };

  const chartData = {
    options: {
      chart: {
        id: 'basic-line',
        width: '100%'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false 
        }
      },
      yaxis: {
        title: {
          text: 'Price'
        }
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy' 
        }
      }
    },
    series: [{
      name: 'Price',
      data: history.map(item => ({
        x: new Date(item.timestamp).getTime(), 
        y: item.price
      }))
    }]
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">{name}</h2>
      <Chart options={chartData.options} series={chartData.series} type="line" height={300} />
      <div className="mt-6 flex items-center">
        <input 
          className="border border-gray-300 rounded px-3 py-2 mr-4 focus:outline-none focus:border-purple-500" 
          type="number" 
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)} 
        />
        <button 
          onClick={handleBuyStock} 
          className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300 ease-in-out focus:outline-none"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default StockLineGraph;
