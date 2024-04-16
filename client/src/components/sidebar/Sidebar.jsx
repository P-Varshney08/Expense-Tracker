import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [selectedLink, setSelectedLink] = useState('/');

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    return (
        <>
            <div className={`fixed h-screen top-4 bottom-0 md:left-5 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-[#ffffff] w-64 z-10 py-4 px-6 transition-all duration-300 max-w-full`} >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <Link to="/" className="mt-2 text-center w-full inline-block">
                        <h1 className="text-[#191919] text-2xl text-bold font-serif">Expense Tracker</h1>
                    </Link>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />
                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-2">
                                <Link
                                    to="/"
                                    className={`flex items-center gap-4 text-md font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg ${selectedLink === '/' ? 'bg-purple-300 text-black' : 'text-gray-700'}`}
                                    onClick={() => handleLinkClick('/')}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link
                                    to="/expense-tracker"
                                    className={`flex items-center gap-4 text-md font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg ${selectedLink === '/expense-tracker' ? 'bg-purple-300 text-black' : 'text-gray-700'}`}
                                    onClick={() => handleLinkClick('/expense-tracker')}
                                >
                                    Expense Tracker
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link
                                    to="/notifications"
                                    className={`flex items-center gap-4 text-md font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg ${selectedLink === '/notifications' ? 'bg-purple-300 text-black' : 'text-gray-700'}`}
                                    onClick={() => handleLinkClick('/notifications')}
                                >
                                    Notifications
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link
                                    to="/savings"
                                    className={`flex items-center gap-4 text-md font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg ${selectedLink === '/savings' ? 'bg-purple-300 text-black' : 'text-gray-700'}`}
                                    onClick={() => handleLinkClick('/savings')}
                                >
                                    Savings
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link
                                    to="/stock"
                                    className={`flex items-center gap-4 text-md font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg ${selectedLink === '/stock' ? 'bg-purple-300 text-black' : 'text-gray-700'}`}
                                    onClick={() => handleLinkClick('/stock')}
                                >
                                    Stock Investment
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link
                                    to="/profile"
                                    className={`flex items-center gap-4 text-md font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg ${selectedLink === '/profile' ? 'bg-purple-300 text-black' : 'text-gray-700'}`}
                                    onClick={() => handleLinkClick('/profile')}
                                >
                                    Profile
                                </Link>
                            </li>
                        </ul>

                        <ul className="flex-col min-w-full flex list-none absolute bottom-4">
                            <li className="bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white">
                                <Link to='/' className="flex items-center justify-center gap-4 text-sm font-light py-3">
                                Navigate, Analyze, and Conquer Your Expenses with Ease.
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Adjust the width to occupy the remaining space */}
            <div className={`ml-64 flex-grow overflow-y-auto py-4 px-6 transition-all duration-300`} >
                {/* Your remaining content goes here */}
            </div>
        </>
    );
}
