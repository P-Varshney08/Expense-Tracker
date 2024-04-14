import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoutes.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex overflow-auto justify-between bg-[#e6e6e6] p-4 space-x-5 min-h-screen">
        <Sidebar />
        <div className='w-4/5'>
          <Navbar />
          <div className='mt-4'>
            <ToastContainer />
            <Routes>
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
               
                <Route element={<ProtectedRoute/>}>
                  <Route path='/' element={<Home />} />
                  <Route path='/notifications' element={<NotificationsPage />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/savings' element={<SavingsHistory />} />
                  <Route path='/expense-tracker' element={<ExpenseTracker />} />

                </Route>
              </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App