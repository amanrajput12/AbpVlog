import React, { useEffect, useState } from 'react';

const AdminWallet = () => {
  const [walletData, setWalletData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for confirmation
  const [successMessage, setSuccessMessage] = useState(''); // Success message after sending money

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/v1/wallet/adminwallet", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resp = await response.json();
        setWalletData(resp.data); // Set the fetched data in state
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle Send Money button click
  const handleSendMoneyClick = (user) => {
    setSelectedUser(user); // Set the selected user for the confirmation modal
  };

  // Handle Confirming the Send Money Action
  const handleConfirmSendMoney = async () => {
    try {
      const response = await fetch("/v1/wallet/change", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: selectedUser.email }),
      });

      if (response.ok) {
        setSuccessMessage(`Money sent to ${selectedUser.email} successfully!`);
        setSelectedUser(null); // Close the modal
      } else {
        setSuccessMessage('Failed to send money.');
      }
    } catch (error) {
      console.error('Error sending money:', error);
      setSuccessMessage('Error sending money.');
    }
  };

  return (
    <div className="p-5 max-w-full">
      <h1 className="text-xl font-bold mb-4">Admin Wallet</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
          {successMessage}
        </div>
      )}

      {/* Responsive table container */}
      <div className="overflow-x-auto ">
        <table className="min-w-full table-auto border-collapse ">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 max-w-2 xl:px-4 xl:py-2 text-left">Email</th>
              <th className="border border-gray-300 xl:px-4 xl:py-2 text-left">Total Balance</th>
              <th className="border border-gray-300 xl:px-4 xl:py-2 text-left">Date of Withdrawal Request</th>
              <th className="border border-gray-300 xl:px-4 xl:py-2 text-left">Send Money</th>
            </tr>
          </thead>
          <tbody>
            {walletData.length > 0 ? (
              walletData.map((item) => (
                <tr key={item._id} className="bg-white">
                  <td className="border  border-gray-300  xl:px-4 xl:py-2">{item.email}</td>
                  <td className="border border-gray-300 xl:px-4 xl:py-2">{item.TotalBalance}</td>
                  <td className="border border-gray-300 xl:px-4 xl:py-2">{new Date(item.withdrwalreq).toLocaleString()}</td>
                  <td className="border border-gray-300 xl:px-4 xl:py-2">
                    <button
                      onClick={() => handleSendMoneyClick(item)}
                      className="bg-blue-700 p-1 xl:p-2 text-white rounded-md hover:bg-blue-500"
                    >
                      Send Money
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
            <p>Do you want to send money to <strong>{selectedUser.email}</strong>?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSendMoney}
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWallet;
