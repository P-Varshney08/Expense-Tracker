import React, { useState, useEffect } from 'react';
import BankCard from './BankCard'; // Adjust the path based on your project structure
import axios from 'axios';

const BankDashboard = () => {
  // Dummy data for banks (replace this with actual data from your backend)
  const [allBanks, setAllBanks] = useState([]);

  useEffect(() => {
    fetchAllBanks();
  }, []);

  const fetchAllBanks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/bank/AllBanks');
      setAllBanks(res.data);
    //   console.log('banks are: ', res.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Bank Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allBanks.map((bank) => (
          <BankCard key={bank.id} bank={bank} />
        ))}
      </div>
    </div>
  );
};

export default BankDashboard;