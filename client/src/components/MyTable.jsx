import React, { useState, useEffect } from 'react';
import { parse, unparse } from 'papaparse';
import { useSelector } from 'react-redux';

const MyTable = () => {
  const user = useSelector((state) => {
    return state.user.userDetails;
  });
  const allTransactions = user ? user.user.Expense_details : [];
  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // Default sort by date
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    if (allTransactions) {
      try {
        setRows(allTransactions);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [allTransactions]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const sortByDate = () => {
    const sortedRows = [...rows].sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setRows(sortedRows);
  };

  const sortByAmount = () => {
    const sortedRows = [...rows].sort((a, b) => {
      return sortDirection === 'asc' ? a.Amount - b.Amount : b.Amount - a.Amount;
    });
    setRows(sortedRows);
  };

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    toggleSortDirection();
  };

  const exportToCSV = () => {
    const csv = unparse(rows, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFromCSV = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const parsed = parse(result, { header: true });
      setRows(parsed.data);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-full mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">My Transactions</h2>
        <div className="flex items-center">
          <select className="mr-4 py-2 px-4 border border-gray-300 rounded-lg"  value={sortBy} onChange={handleSortChange}>
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-lg mr-4"
            onClick={exportToCSV}
          >
            Export to CSV
          </button>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded-lg"
            onClick={importFromCSV}
          >
            Import from CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 table-cell">Name</th>
              <th className="px-4 py-2 table-cell">Type</th>
              <th className="px-4 py-2 table-cell">Date</th>
              <th className="px-4 py-2 table-cell">Amount</th>
              <th className="px-4 py-2 table-cell">Tag</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="px-4 py-4">{row.name}</td>
                <td className="px-4 py-4 align-center">{row.transaction_type}</td>
                <td className="px-4 py-4 align-center">{formatDate(row.Date)}</td>
                <td className="px-4 py-4 align-center">{row.Amount}</td>
                <td className="px-4 py-4 align-center">{row.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTable;
