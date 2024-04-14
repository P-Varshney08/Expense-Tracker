import React, { useState } from 'react';
import PieChart from './PieChar';
import ExpenseIncomeGraph from './ExpenseIncomeGraph';

const FinancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);

  const monthData = {
    January: {
      expenses: [50, 30, 20],
      income: [40, 30, 30]
    },
    February: {
      expenses: [40, 35, 25],
      income: [45, 25, 30]
    },
    March: {
      expenses: [20, 40, 40],
      income: [15.5, 35.5, 49]
    },
    April: {
      expenses: [],
      income: [],
    }
    // Add more months as needed
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    const { expenses, income } = monthData[selectedMonth];
    setExpenseData(expenses);
    setIncomeData(income);
    setMonthLabels(['Food', 'Education', 'Housing']); // Set default labels for the x-axis
  };

const getHeading = () => {
  if (!selectedMonth) {
    return 'Finance Tracker';
  } else if (expenseData.length === 0 && incomeData.length === 0) {
    return 'No Transactions Saved for This Month';
  } else {
    return 'Finance Tracker';
  }
};

const getDistributionHeading = (type) => {
  if (!selectedMonth || (type === 'expense' && expenseData.length === 0) || (type === 'income' && incomeData.length === 0)) {
    return '';
  } else {
    return `${type.charAt(0).toUpperCase() + type.slice(1)} Distribution`;
  }
};


  return (
    <div className="justify-center p-8 bg-gray-100 mb-4">
      <div className="flex items-center justify-center mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange} className="border border-gray-300 rounded-md p-2">
          <option value="">Select Month</option>
          {Object.keys(monthData).map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">{getHeading()}</h1>
      {selectedMonth && (
        <div className="flex justify-around">
          <div className="w-1/2">
            <h2 className="text-lg font-bold mb-2">{getDistributionHeading('expense')}</h2>
            <PieChart
              data={expenseData}
              labels={monthLabels}
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-bold mb-2">{getDistributionHeading('income')}</h2>
            <PieChart
              data={incomeData}
              labels={monthLabels}
            />
          </div>
        </div>
      )}
      {selectedMonth && (expenseData.length === 0 || incomeData.length === 0) && (
        <div className="mt-8 flex justify-center">
          <img src="https://financely-finance-tracker.netlify.app/static/media/transactions.004d9f02317991455e50b36d9dae2a26.svg" alt="No Data Available" className="w-80 h-80" />
        </div>
      )}
      {selectedMonth && (
        <div className="mt-8">
          <ExpenseIncomeGraph
            expenseData={expenseData}
            incomeData={incomeData}
            labels={monthLabels}
          />
        </div>
      )}
    </div>
  );
};

export default FinancePage;
