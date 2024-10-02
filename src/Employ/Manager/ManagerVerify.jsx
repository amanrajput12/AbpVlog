import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { UseVerifyUser } from "./UseVerifyUser.js";

const ManagerVerify = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.Manager.UserData); // Get user data from Redux state
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [showImage, setShowImage] = useState(false); // State to manage image modal
  const [selectedImage, setSelectedImage] = useState(""); // State for selected image URL

  const employId = Cookies.get('employId');

  useEffect(() => {
    if (employId) {
      const location = "HARIDWAR";
      dispatch(UseVerifyUser({ employId, location })); // Dispatch the action to verify the user
    }
  }, [dispatch, employId]); // Added dependency for employId

  // Filter users based on search query (by username or email)
  const filteredUsers = user?.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the clicked image URL
    setShowImage(true); // Show the modal
  };

  // Function to close the modal
  const closeImageModal = () => {
    setShowImage(false); // Hide the modal
    setSelectedImage(""); // Clear the selected image
  };

  return (
    <div className="container mx-auto p-1">
      <Toaster />
      
      <h2 className="text-2xl font-bold mb-4">Verify Users</h2>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          className="border p-2 rounded-md"
        />
      </div>

      {/* Wrapper with scroll functionality on small screens */}
      <div className="overflow-x-auto">
        {/* Table for displaying users */}
        <table className="bg-white border border-gray-300 w-full min-w-[600px]"> {/* Add min-width for responsiveness */}
          <thead>
            <tr className="bg-gray-200 text-gray-900 text-sm uppercase leading-normal">
              <th className="p-2 text-left">S.NO</th>
              <th className="p-2 text-left">UserName</th>
              <th className="p-2 text-left">Email</th>
              <th className=" p-2 text-left">Is Verified</th>
              <th className=" p-2 text-left">Payment</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-light">
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user, i) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="p-2 text-left">{i + 1}</td>
                  <td className="p-2 text-left">{user.username}</td>
                  <td className="p-2 text-left">{user.email}</td>
                  <td className=" p-2 text-left">{user.isVerified ? "Yes" : "No"}</td>
                  <td className=" p-2 text-left">
                    <img
                      className="w-10 hover:cursor-pointer"
                      src={user.paymentPhoto}
                      alt="paymentPhoto"
                      onClick={() => handleImageClick(user.paymentPhoto)} // Handle image click
                    />
                  </td>
                  <td className="p-2 text-left">{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-2">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {showImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected Payment"
              className="max-w-full max-h-full"
            />
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerVerify;
