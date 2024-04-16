import React, { useState, useRef, useEffect } from 'react';
import Card from '../Card';
import AddIncomeForm from '../AddIncome.jsx';
import AddExpenseForm from '../AddExpense.jsx';
import MyTable from '../transactions/MyTable.jsx';
import PieChart from '../transactions/PieChart.jsx';
import Chart from '../transactions/Chart.jsx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const FinanceTracker = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [pieChartData, setPieChartData] = useState([]); 
  const [pieChartLabels, setPieChartLabels] = useState([]);
  const incomeFormRef = useRef(null);
  const expenseFormRef = useRef(null);

  const user = useSelector((state)=>{
     return state.user.userDetails;
  })

  const addIncome = (amount) => {
    setIncome(prevIncome => prevIncome + parseFloat(amount));
  };

  const addExpense = (amount) => {
    setExpenses(prevExpenses => prevExpenses + parseFloat(amount));
  };

  const resetBalance = () => {
    setIncome(0);
    setExpenses(0);
  };

  const handleOutsideClick = (event) => {
    if (
      (incomeFormRef.current && !incomeFormRef.current.contains(event.target)) &&
      (expenseFormRef.current && !expenseFormRef.current.contains(event.target))
    ) {
      setShowAddIncomeForm(false);
      setShowAddExpenseForm(false);
    }
  };

  useEffect(()=>{
    if(user.user.Expense_details.length > 0) {
      toast.success('Transactions fetched!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      const expenseTransactions = user.user.Expense_details.filter(t=>t.transaction_type === 'Expense');
      const expenseTags = expenseTransactions.map(t=>t.tag);
      const totalExpense = expenseTransactions.reduce((total, transaction) => total + parseFloat(transaction.Amount), 0);
      const tagCounts = {};
      expenseTags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });

      // Convert tagCounts object to arrays for pie chart data
      const data = Object.values(tagCounts);
      const labels = Object.keys(tagCounts);

      setPieChartData(data);
      setPieChartLabels(labels);
    }
  }, [user]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const currentBalance = income - expenses;

  return (
    <div className="relative">
      {showAddIncomeForm && (
        <div ref={incomeFormRef} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md">
            <AddIncomeForm addIncome={addIncome} onClose={() => setShowAddIncomeForm(false)} />
          </div>
        </div>
      )}
      {showAddExpenseForm && (
        <div ref={expenseFormRef} className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md">
            <AddExpenseForm addExpense={addExpense} onClose={() => setShowAddExpenseForm(false)} />
          </div>
        </div>
      )}
      <div className="flex justify-between p-8 bg-gray-100 mb-4">
        <Card title="Current Balance" value={user.user.current_balance} onClickButton={resetBalance} buttonText="Reset Balance" />
        <Card title="Total Income" value={user.user.total_income} onClickButton={() => setShowAddIncomeForm(true)} buttonText="Add Income" />
        <Card title="Total Expenses" value={user.user.total_expenses} onClickButton={() => setShowAddExpenseForm(true)} buttonText="Add Expense" />
      </div>
      {user.user.Expense_details.length > 0 ? (
        <div className="p-8 bg-gray-100 mb-4">
          <MyTable/>
        </div>
      ) : (
        <div className="p-8 bg-gray-100 mb-4 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Make your Transaction now</h2>
          <img 
            src="https://financely-finance-tracker.netlify.app/static/media/transactions.004d9f02317991455e50b36d9dae2a26.svg" 
            alt="No Data Available" 
            className="w-100 h-80" 
          />
        </div>

      )}
      {user.user.Expense_details.length > 0 && (
        <div className="justify-center p-8 bg-gray-100 mb-4">
          <div className='w-full flex justify-around'>
          {pieChartData.length > 0 ? (
          <PieChart data={pieChartData} labels={pieChartLabels} />
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">No Expenses Made</h2>
            <img 
              src="https://financely-finance-tracker.netlify.app/static/media/transactions.004d9f02317991455e50b36d9dae2a26.svg" 
              alt="No Data Available" 
              className="w-100 h-80" 
            />
          </div>
        )}
            <div className='w-1/3 mx-2'>
              <Chart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceTracker;
