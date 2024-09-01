import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterSucess } from '../Singup/RegisterSlice.js';

const Register = () => {
  const [userEmail, setUserEmail] = useState('');
  const [refEmail, setRefEmail] = useState('');
  const [validId, setValidId] = useState(null);
  const [logout,setLogout] = useState(false)
  const navigate = useNavigate();
    const dispatch = useDispatch()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append('useremail', userEmail);
    formData.append('refrenceemail', refEmail);
    if (validId) {
      formData.append('files', validId); // Use 'files' to match your backend multer setup
    }

    try {
      const response = await axios.post('https://abpvlog.onrender.com/v1/refrence/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        toast.success('Registration successful');
        // Use a timeout to ensure the toast is visible before redirecting
        setTimeout(() => {
               dispatch(RegisterSucess())
            navigate("/")
        }, 2000); 
      } else if (response.data.message === 'Provided Email is not valid') {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-black bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">User Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="refEmail" className="block text-sm font-medium text-gray-700">Reference Email</label>
            <input
              type="email"
              id="refEmail"
              name="refEmail"
              value={refEmail}
              onChange={(e) => setRefEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="validId" className="block text-sm font-medium text-gray-700">Valid ID</label>
            <input
              type="file"
              id="validId"
              name="validId"
              onChange={(e) => setValidId(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Register
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
