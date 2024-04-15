// import React, { useState } from 'react';
// import BankCard from './BankCard'; // Adjust the path based on your project structure
// import axios from 'axios';

// const BankDashboard = () => {
//   // Dummy data for banks (replace this with actual data from your backend)
//   const banks = [
//     {
//       id: 1,
//       name: 'ABC Bank',
//       image: 'https://img.freepik.com/free-photo/office-skyscrapers-business-district_107420-95733.jpg?t=st=1713195258~exp=1713198858~hmac=177eea7c2c53bfeff1e41297815e2f5c9b928231503165e21d1f750ec85bfa42&w=996',
//       interestRate: '5',
//       additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//       id: 2,
//       name: 'XYZ Bank',
//       image: 'https://img.freepik.com/free-photo/giant-building-with-sun_1127-400.jpg?t=st=1713195392~exp=1713198992~hmac=c85b3a54ddec071c921d450f0dff1d204553442ce81231c2f52425a114c8c97b&w=996',
//       interestRate: '6',
//       additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     // Add more banks as needed
//   ];

//   const [allBanks, setAllBanks] = useState([]);

//   const fetchAllBanks = async() => {
//     const res = await axios.get('http:localhost:8080/api/bank/AllBanks');
//     setAllBanks(res);
//     console.log('banks are: ', res.data);
//   }
// //   fetchAllBanks();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-semibold mb-8">Bank Dashboard</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {banks.map((bank) => (
//           <BankCard key={bank.id} bank={bank} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BankDashboard;



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
