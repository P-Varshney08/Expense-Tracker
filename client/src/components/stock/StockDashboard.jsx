import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';

const StockDashboard = ({ data }) => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    setStock(data);
  }, [data]);

  console.log("f",stock);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Current Values</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stock && stock.map((stockItem) => (
          <StockCard key={stockItem._id} stock={stockItem} />
        ))}
      </div>
    </div>
  );
};

export default StockDashboard;
