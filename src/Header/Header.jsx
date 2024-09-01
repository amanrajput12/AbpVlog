import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../Singup/SingupSlice';
import logo from '../../public/logo.jpeg'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = Cookies.get('userRole');
  const accessToken = Cookies.get('accessToken');
  const userId = Cookies.get('myid');

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('myid');
    Cookies.remove('userRole');
    navigate('/');
    dispatch(logout());
  };

  return (
    <header className=" sticky top-0  z-10 bg-gray-800 shadow-lg    w-screen">
        <div className='flex h-20 items-center justify-between '>
      <div className=" ml-4 text-white text-2xl font-bold cursor-pointer" >
           <img className='w-12 rounded-md' src={logo} alt="" />
          
      </div>
 
      <div className="flex items-center space-x-4">
        {userRole == 'admin' && (
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Admin Dashboard
          </button>
        )}
         {accessToken!=="undefined" && userId!=="undefined" &&  accessToken && userId && (
        <button
          onClick={handleLogout}
          className="p-2 rounded-md bg-blue-700"
        >
          Logout
        </button>
      )}
      </div>
      </div>
    </header>
  );
};

export default Header;
