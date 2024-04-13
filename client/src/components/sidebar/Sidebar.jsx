import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');

    return (
        <>
            <div className={`fixed h-screen top-4 bottom-0 md:left-5  ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-[#ffffff] w-64 z-10 py-4 px-6 transition-all duration-300 max-w-full`} >
                <div className=" flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <Link to="/" className="mt-2 text-center w-full inline-block" >
                        <h1 className= "text-[#191919] text-2xl text-bold font-serif">Expense Tracker</h1>
                    </Link>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />
                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-2 text-gray-700">
                                <Link
                                    to="/"
                                    className="flex items-center gap-4 text-md text-gray-700 font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <Link
                                    to="/history"
                                    className="flex items-center gap-4 text-md text-gray-700 font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg">
                                    History
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <Link
                                    to="/expenses"
                                    className="flex items-center gap-4 text-md text-gray-700 font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg">
                                    Expenses
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <Link
                                    to="/savings"
                                    className="flex items-center gap-4 text-md text-gray-700 font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg">
                                    Savings
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link
                                    to="/setting"
                                    className="flex items-center gap-4 text-md text-gray-700 font-bold px-4 py-3 rounded-lg transition duration-300 hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-400 hover:to-purple-500 hover:text-black hover:shadow-lg">
                                    Setting
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
