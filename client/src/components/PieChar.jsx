import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ data, labels }) => {
  // Check if data is empty
  if (!data || data.length === 0) {
    return null; // Don't render anything if data is empty
  }

  const chartData = {
    series: data,
    options: {
      chart: {
        type: 'pie',
        width: 300,
        height: 300,
      },
      labels: labels,
    },
  };

  return (
    <div className="p-1 border border-gray-200 rounded-md bg-gray-100">
      <h2 className="text-lg font-bold text-center mb-4">Total Expenses</h2>
      <div className="h-100">
        <Chart options={chartData.options} series={chartData.series} type="pie" />
      </div>
    </div>
  );
};

export default PieChart;
