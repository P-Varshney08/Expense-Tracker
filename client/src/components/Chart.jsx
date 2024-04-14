import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const TransactionGraph = () => {
  const user = useSelector((state) => {
    return state.user.userDetails;
  });

  const transactions = user?.user?.Expense_details || []; // Assuming transactions are stored in Expense_details
  const [dateRange, setDateRange] = useState('all'); // Initialize with 'all' as default

  // Function to filter transactions based on date range
  const filterTransactions = () => {
    const currentDate = new Date();
    switch (dateRange) {
      case 'week':
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return transactions.filter(transaction => new Date(transaction.Date) >= oneWeekAgo);
      case 'month':
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return transactions.filter(transaction => new Date(transaction.Date) >= firstDayOfMonth);
      default:
        return transactions;
    }
  };

  // Prepare data for the graph
  const filteredTransactions = filterTransactions();
  const data = filteredTransactions.map(transaction => ({
    x: new Date(transaction.Date),
    y: parseFloat(transaction.Amount)
  }));

  // Options for the graph
  const options = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: true,
        type: 'x'
      }
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date'
      }
    },
    yaxis: {
      title: {
        text: 'Amount'
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: val => `$${Math.abs(val)}`
      }
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-100">
      <h2 className="text-lg font-bold text-center mb-4">Transaction Graph</h2>
      <div className=" w-full h-80">
        <Chart options={options} series={[{ data }]} type="line" height={350} />
      </div>
      <div className="mt-4 flex justify-center">
          <button
            className={`mx-2 px-4 py-2 rounded-md ${dateRange === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setDateRange('all')}
          >
            All
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-md ${dateRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setDateRange('week')}
          >
            Week
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-md ${dateRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setDateRange('month')}
          >
            Month
          </button>
      </div>
    </div>
  );
};

export default TransactionGraph;
