import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const TransactionGraph = () => {
  const user = useSelector((state) => state.user.userDetails);
  const transactions = user?.user?.Expense_details || [];

  const filterTransactions = () => {
    return transactions;
  };

  const filteredTransactions = filterTransactions();
  const data = filteredTransactions.map(transaction => ({
    x: new Date(transaction.Date),
    y: parseFloat(transaction.Amount)
  }));

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
        text: 'Date',
        style: {
          fontSize: '14px',
          fontWeight: 600
        }
      }
    },
    yaxis: {
      title: {
        text: 'Amount',
        style: {
          fontSize: '14px',
          fontWeight: 600
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: val => `$${Math.abs(val.toFixed(2))}`,
        style: {
          fontSize: '14px'
        }
      }
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-white shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Transaction Graph</h2>
      <div className="h-82">
        <Chart options={options} series={[{ data }]} type="line" height={350} />
      </div>
    </div>
  );
};

export default TransactionGraph;
