import React from 'react';
import Chart from 'react-apexcharts';

const ExpenseIncomeGraph = ({ expenseData, incomeData, labels }) => {

  if (!expenseData || !incomeData || expenseData.length === 0 || incomeData.length === 0) {
    return null;
  }
  // Data for the line chart
  const chartData = {
    series: [
      {
        name: 'Expense',
        data: expenseData,
      },
      {
        name: 'Income',
        data: incomeData,
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: labels,
      },
      colors: ['#FF0000', '#0000FF'], // Set colors for Expense and Income lines
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="justify-center p-8 bg-gray-100 mb-4">
      <h2 className="text-lg font-bold mb-2">Expense vs Income</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ExpenseIncomeGraph;
