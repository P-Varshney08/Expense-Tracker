import React, { useEffect, useState } from 'react';
import Portfolio from './NewPortfolio'; // Adjust the path based on your project structure
import { useSelector } from 'react-redux';
import axios from 'axios';

function Portfoliosec() {
    const [userPortfolio, setUserPortfolio] = useState(null); // Initialize userPortfolio state with null
    const user = useSelector((state)=>state.user.userDetails);
    const userId = user.user._id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/stock/portfolio/${userId}`);
                setUserPortfolio(res.data);
                console.log('User portfolio:', res.data);
            } catch (error) {
                console.error('Error fetching user portfolio:', error);
            }
        };

        fetchData(); 
    }, [userId]); 

    return (
        <div className="container mx-auto p-6">
            {userPortfolio && ( // Check if userPortfolio is not null before rendering Portfolio component
                <Portfolio
                    portfolio={userPortfolio.portfolio}
                    totalInvestment={userPortfolio.totalInvestment}
                    totalCurrentValue={userPortfolio.totalCurrentValue}
                    earningsOrLosses={userPortfolio.earningsOrLosses}
                />
            )}
        </div>
    );
}

export default Portfoliosec;



// import React, { useEffect, useState } from 'react';
// import Portfolio from './portfolio'; // Adjust the path based on your project structure
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// // const userPortfolio = {
// //     portfolio: [
// //         {
// //             symbol: 'AAPL',
// //             name: 'Apple Inc.',
// //             quantity: 4,
// //             currentPrice: 163.84,
// //             currentValue: 655.36,
// //             originalInvestment: 655.36,
// //         },
// //         {
// //             symbol: 'AAPL',
// //             name: 'Apple Inc.',
// //             quantity: 4,
// //             currentPrice: 163.84,
// //             currentValue: 655.36,
// //             originalInvestment: 655.36,
// //         },
// //     ],
// //     totalInvestment: 655.36,
// //     totalCurrentValue: 655.36,
// //     earningsOrLosses: 0,
// // };

// function Portfoliosec() {
//     const [userPortfolio, setUserPortfolio] = useState([]);
//     const user = useSelector((state)=>state.user.userDetails);
//     const userId = user.user._id;


//     useEffect(async() => {
//      const res=  await axios.get(`http://localhost:8080/api/stock/portfolio/${userId}`);
//      setUserPortfolio(res.data);
//      console.log('b',userPortfolio)
//     }, [userPortfolio]);

//     return (
//         <div className="container mx-auto p-6">
//             <Portfolio
//                 portfolio={userPortfolio.portfolio}
//                 // totalInvestment={userPortfolio.portfolio.originalInvestment}
//                 totalCurrentValue={userPortfolio.portfolio.currentValue}
//                 earningsOrLosses={userPortfolio.earningsOrLosses}
//             />
//             {/* dknk */}
//         </div>
//     );
// }

// export default Portfoliosec;
