import React from 'react';
import { useSelector } from 'react-redux';

const TeamWallet = () => {
  const wallet = useSelector((store) => store.Team); // Get Team data from Redux
  console.log("redux wallet data ", wallet);

  return (
    <div className="flex items-center justify-center min-h-[88vh]">
      <div className="wallet-container w-full xl:w-[50vw] p-8 bg-gradient-to-b from-neutral-300 to-zinc-950 shadow-orange rounded-lg flex flex-col justify-center items-center xl:h-[60vh]">

        <h2 className="text-3xl font-bold text-blue-600 mb-6">Team Wallet</h2>
        
        {/* Check if wallet data is available */}
        {wallet && wallet.data ? (
          <div className="text-center space-y-4 w-full mb-6">
            <div className="text-lg font-semibold text-gray-700">
              <p><strong>Email:</strong> {wallet.data.email}</p>
              <p><strong>Total Balance:</strong> ₹{wallet.data.TotalBalance}</p>
            </div>

            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mt-4 hover:animate-slideIn">
              {/* Placeholder for wallet icon */}
              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.5 4A2.5 2.5 0 000 6.5v7A2.5 2.5 0 002.5 16H14a1 1 0 001-1v-9a1 1 0 00-1-1H2.5zM16 7a2 2 0 112 2v2a2 2 0 11-2-2V7z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No wallet data available</p>
        )}

        {/* Wallet Card Animation */}
        <div className="wallet relative w-40 h-24 bg-gray-800 rounded-lg overflow-hidden mt-8">
          <div className="card card1 absolute w-32 h-20 bg-gradient-to-tr from-teal-800 to-neutral-950 rounded-lg transform transition-transform duration-200 ease-in-out animate-slideOut"></div>
          <div className="card card2 absolute w-32 h-20 bg-gradient-to-br from-red-300 to-yellow-950 rounded-lg transform transition-transform duration-200 ease-in-out animate-slideIn"></div>
          <div className="card card3 absolute w-32 h-20 bg-gradient-to-bl from-green-300 to-teal-950 rounded-lg transform transition-transform duration-700 ease-in-out animate-move"></div>
        </div>
      </div>
    </div>
  );
};

export default TeamWallet;
