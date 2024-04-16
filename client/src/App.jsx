import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import NotificationsPage from './components/notifications/Notification.jsx';
import Profile from './components/profile/Profile.jsx';
import ExpenseTracker from './components/expenseTracker/ExpenseTracker.jsx';
import SavingsHistory from './components/SavingsHistory.jsx';
import { useSelector } from 'react-redux';
import StockPage from './components/stock/StockPage.jsx';
import BankDashboard from './components/bank/BankDashboard.jsx';
import LoanApplicationPage from './components/bank/LoanApplicationPage.jsx';
import BuyLoanButton from './components/BuyLoanButton'; // Import the BuyLoanButton component
import UserProfile from './components/profile/UserProfile.jsx';
import Chatbot from './components/chatbot/ChatBot.jsx';

const App = () => {
  const user = useSelector((state)=>{
    return state.user.userDetails;
  })
  const isLoggedIn = !!user;

  return (
    <>
    <BrowserRouter>
      <div className="flex overflow-auto bg-[#e6e6e6] min-h-screen">
        {isLoggedIn && <Sidebar />}
        <div className='w-full mt-4'>
          <Navbar />
          <div className='flex justify-center'>
            <div className='w-full lg:w-full mt-4'>
              <ToastContainer />
              <Routes>
                {isLoggedIn ? (
                  <>
                    <Route path='/' element={<Home />} />
                    <Route path='/notifications' element={<NotificationsPage />} />
                    <Route path='/profile' element={<UserProfile />} />
                    <Route path='/edit-limit' element={<Profile />} />
                    <Route path='/savings' element={<SavingsHistory />} />
                    <Route path='/expense-tracker' element={<ExpenseTracker />} />
                    <Route path='/bank-home' element={<BankDashboard />} />
                    <Route path='/stock' element={<StockPage />} />
                    <Route path='/loan-application' element={<LoanApplicationPage />} />
                    <Route path='/signin' element={<Navigate to='/' />} />
                    <Route path='/signup' element={<Navigate to='/' />} />
                  </>
                ) : (
                  <>
                    <Route path='*' element={<Navigate to="/signin" />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <BuyLoanButton /> 
      <Chatbot/>
    </BrowserRouter>
    </>
  )
}

export default App;
