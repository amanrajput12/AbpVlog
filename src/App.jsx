import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const App = () => {
  const navigate = useNavigate();
  const userRole = Cookies.get('userRole');

  useEffect(() => {
    console.log('User Role:', userRole); // Debugging: Check the value of userRole
  }, [userRole]);

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
      <div className="w-full max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
