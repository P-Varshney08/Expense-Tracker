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
        toolbar: {
          show: false
        }
      },
      labels: labels,
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '14px',
        fontWeight: 400,
        fontFamily: 'inherit',
        offsetY: 10,
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5
        },
      },
      colors: ['#EF4444', '#6366F1', '#10B981', '#6B7280', '#4F46E5', '#F59E0B', '#7C3AED', '#22D3EE', '#DC2626', '#34D399'],
    },
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-white shadow-lg">
      <div className="p-12">
        <h2 className="text-lg font-bold text-center mb-4">Total Expenses</h2>
        <div className="h-62">
          <Chart options={chartData.options} series={chartData.series} type="pie" />
        </div>
      </div>
    </div>
  );
};

export default PieChart;