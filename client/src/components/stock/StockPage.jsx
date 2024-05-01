import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockLineGraph from './StockLineGraph';
import StockDashboard from './StockDashboard';
import Portfoliosec from '../portfolio/portfoliosec';
import { toast } from 'react-toastify';

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/stock/stocks`)
      .then(response => {
        setStockData(response.data); 
        setLoading(false);
        toast.success('Stocks fetched!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        console.log('dara',stockData); // Log the fetched data
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
        toast.error('Error fetching Stocks', {
          autoClose: 4000,
        });
        setLoading(false);
      });
  }, []); 

  return (

    <div>
      <div className="justify-center p-8 bg-gray-100 mb-4">
        <StockDashboard data={stockData}/>
      </div>
      <div className="justify-center p-8 bg-gray-100 mb-4">
        <Portfoliosec/>
      </div>
      <div className="justify-center p-8 bg-gray-100 mb-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">Stock Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stockData && stockData.map((stock) => (
                <StockLineGraph key={stock._id} stock={stock} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPage;
