import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from './Singup/SingupSlice.js';

const App = () => {
  const navigate = useNavigate();
  const userRole = Cookies.get('userRole');
  const accessToken = Cookies.get('accessToken');
  const userId = Cookies.get('myid');
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('User Role:', userRole); // Debugging: Check the value of userRole
  }, [userRole]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("myid");
    Cookies.remove("userRole");
     
    // After removing the cookies, navigate to the login or home page
    navigate("/");
    dispatch(logout())
  };

  return (
    <div className="bg-black min-h-screen w-screen text-white flex flex-col justify-center items-center p-6">
      {userRole === 'admin' && (
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors mb-6"
        >
          Dashboard Admin
        </button>
      )}
      {accessToken && userId && (
        <button
          onClick={handleLogout}
          className="p-2 rounded-md bg-blue-700"
        >
          Logout
        </button>
      )}
      <div className="w-full max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
