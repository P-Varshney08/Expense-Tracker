import React, { useEffect, useState } from 'react';
import Portfolio from './NewPortfolio'; // Adjust the path based on your project structure
import { useSelector } from 'react-redux';
import axios from 'axios';

function Portfoliosec() {
    const [userPortfolio, setUserPortfolio] = useState(null); // Initialize userPortfolio state with null
    const user = useSelector((state) => state.user.userDetails);
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
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Portfolio</h1>
                {userPortfolio && ( // Check if userPortfolio is not null before rendering Portfolio component
                    <Portfolio
                        portfolio={userPortfolio.portfolio}
                        totalInvestment={userPortfolio.totalInvestment}
                        totalCurrentValue={userPortfolio.totalCurrentValue}
                        earningsOrLosses={userPortfolio.earningsOrLosses}
                    />
                )}
                {!userPortfolio && (
                    <div className="text-center text-gray-600 mt-8">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
}

export default Portfoliosec;
