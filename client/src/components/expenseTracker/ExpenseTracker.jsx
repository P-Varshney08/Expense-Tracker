import React, { useState } from 'react';
import Graph from './Graph';
import Form from './Form';
import List from './List';

const ExpenseTracker = () => {
    // Initialize the data array state
    const [data, setData] = useState([
        // { type: 'income', amount: 0, color: '#6B4CAF' },
        // { type: 'expense', amount: 0, color: '#F44336' },
        // { type: 'income', amount: 0, color: '#4CAF50' },
        // { type: 'expense', amount: 0, color: '#F44336' }
    ]);

    // Function to add new transaction to the data array
    const addTransaction = (newTransaction) => {
        setData((prevData) => [...prevData, newTransaction]);
    };

    // Function to delete a transaction from the data array
    const deleteTransaction = (index) => {
        setData((prevData) => prevData.filter((_, i) => i !== index));
    };

    return (
        <div className="justify-center p-8 bg-white mb-4">
            <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
                <h1 className="text-4xl py-4 mb-10 bg-slate-800 text-white rounded">Expense Tracker</h1>
                <div className="grid md:grid-cols-2 gap-4">
                    <Graph data={data} />
                    <Form addTransaction={addTransaction} />
                </div>
                <List data={data} deleteTransaction={deleteTransaction} />
            </div>
        </div>
    );
};

export default ExpenseTracker;






