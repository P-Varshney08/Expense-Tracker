import React, { useState, useEffect } from 'react';
import PieChart from './transactions/PieChart';
import ExpenseIncomeGraph from './ExpenseIncomeGraph';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const FinancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);

  const user = useSelector((state)=>state.user.userDetails);
  const userId = user.user._id;
  const currBalance = user.user.current_balance;

  const years = ['2022', '2023', '2024'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  const fetchData = async () => {
    if (selectedMonth && selectedYear) {
      const monthNumber = months.indexOf(selectedMonth) + 1;
      const res = await axios.post('http://localhost:3000/graphql', {
        query: `
          mutation {
            processMonthlyReport(date: "${selectedYear}-${monthNumber}-01", userId: ${JSON.stringify(userId)}) {
              totalExpenses
              totalExpensesPerItem {
                food
                Education
                Housing
              }
              remainingSavings {
                food
                Education
                Housing
              }
              filteredTransactions {
                _id
                transaction_type
                name
                Amount
                Date
                tag
                saving_food
                saving_Education
                saving_Housing
                setting_limit_food
                setting_limit_Education
                setting_limit_Housing
                createdAt
                updatedAt
              }
              arr
            }
          }
        `
      });
      const data = res.data.data.processMonthlyReport;
      toast.success('Data fetched!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      const expenses = [];
      const income = [];
      if (data && data.filteredTransactions) {
        data.filteredTransactions.forEach(transaction => {
          if (transaction.transaction_type === 'Expense') {
            expenses.push(transaction.Amount);
          } else if (transaction.transaction_type === 'Income') {
            income.push(transaction.Amount);
          }
        });
      }
      setExpenseData(expenses);
      setIncomeData(income);
      setMonthLabels(['Food', 'Education', 'Housing']);
    }
  };

  const getHeading = () => {
    if (!selectedMonth || !selectedYear) {
      return 'Finance Tracker';
    } else if (expenseData.length === 0 && incomeData.length === 0) {
      return 'No Transactions Saved for This Month';
    } else {
      return 'Finance Tracker';
    }
  };

  const getDistributionHeading = (type) => {
    if (!selectedMonth || !selectedYear || (type === 'expense' && expenseData.length === 0) || (type === 'income' && incomeData.length === 0)) {
      return '';
    } else {
      return `${type.charAt(0).toUpperCase() + type.slice(1)} Distribution`;
    }
  };

  return (
    <div className="justify-center p-8 bg-gray-100 mb-4">
      <div className="flex items-center justify-center mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange} className="border border-gray-300 rounded-md p-2 mr-4">
          <option value="">Select Month</option>
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <label htmlFor="year" className="mr-2">Select Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange} className="border border-gray-300 rounded-md p-2">
          <option value="">Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
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
