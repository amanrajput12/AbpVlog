import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterSucess } from '../Singup/RegisterSlice.js';
import ReactLoading from 'react-loading';

const Register = () => {
  const [userEmail, setUserEmail] = useState('');
  const [refEmail, setRefEmail] = useState('');
  const [userId, setUserId] = useState(null);  // This should be a text input
  const [userPhoto, setUserPhoto] = useState(null);
  const [paymentPhoto, setPaymentPhoto] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
       
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("flex");

    // Create FormData object
    const formData = new FormData();
    formData.append('useremail', userEmail);
    formData.append('refrenceemail', refEmail);
    formData.append('userId', userId); // Append userId as text, not as file
    if (userPhoto) {
      formData.append('userPhoto', userPhoto);
    }
    if (paymentPhoto) {
      formData.append('paymentPhoto', paymentPhoto);
    } 
    console.log(formData);
        
    try {
      const response = await axios.post('http://localhost:4000/v1/refrence/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        toast.success('Registration successful');
        setLoading(null);
        setTimeout(() => {
          dispatch(RegisterSucess());
          navigate("/");
        }, 2000);
      } else if (response.data.message === 'Provided Email is not valid') {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(null);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-[90vw] xl:w-[50vw] text-black bg-white p-8 rounded-lg shadow-md">
        <ReactLoading className={`mx-auto ${loading}`} hidden type="balls" color={"#00000"} height={100} width={100} />
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userEmail" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">User Email</label>
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
            <label htmlFor="refEmail" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">Reference Email</label>
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
            <label htmlFor="userId" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">User ID</label>
            <input
              type="file"  // Corrected to text input
              id="userId"
              name="userId"
              onChange={(e) =>setUserId(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="userPhoto" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">User Photo</label>
            <input
              type="file"
              id="userPhoto"
              name="userPhoto"
              onChange={(e) => setUserPhoto(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="paymentPhoto" className="block text-sm xl:text-2xl font-medium xl:font-bold text-gray-700">Payment Photo</label>
            <input
              type="file"
              id="paymentPhoto"
              name="paymentPhoto"
              onChange={(e) => setPaymentPhoto(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
