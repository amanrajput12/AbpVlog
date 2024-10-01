import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../Singup/SingupSlice';
import logo from '../../public/logo.jpeg';
import { BiAbacus } from "react-icons/bi";
import Loginbtn from '../Buttons/Loginbtn';
import Signupbtn from '../Buttons/Signupbtn';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = Cookies.get('userRole');
  const accessToken = Cookies.get('accessToken');
  const userId = Cookies.get('myid');
  const [btntoogle, setBtnToogle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown

  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('myid');
    Cookies.remove('userRole');
    navigate('/');
    dispatch(logout());
  };

  const handleContactScroll = () => {
    document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header
      className={`sticky top-0 z-10 transition-all duration-300 ${
        isHomeRoute ? 'bg-gray-950' : 'bg-gray-800'
      } shadow-lg p-3 ${isHomeRoute ? 'text-white' : 'text-black'}`}
    >
      <div className='flex h-20 items-center justify-around'>
        
        {/* Logo Section */ }
        <div className="ml-4 text-2xl font-bold cursor-pointer">
          <img
            onClick={() => { isHomeRoute ? "" : navigate("/video") }}
            className='w-12 rounded-md'
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Admin and Wallet/Logout Section */}
        <div className="flex items-center space-x-4">
          {userRole === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Admin Dashboard
            </button>
          )}
          {userRole==='employ' && (
            <button    onClick={() => navigate('/Employ/login')} className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors'>
              Employ Dashboard
            </button>
          )}
          
          {accessToken !== "undefined" && userId !== "undefined" && accessToken && userId && (
            <div>
              <BiAbacus
                onClick={() => setBtnToogle(!btntoogle)}
                className='w-[100px] text-slate-200 h-[30px] hover:cursor-pointer'
              />
              {btntoogle && (
                <div className='bg-black mt-1 p-2 flex flex-col rounded-lg w-24 absolute'>
                  <button
                    onClick={() => {
                      navigate('/wallet');
                      setBtnToogle(false);
                    }}
                    className='p-2 m-2 rounded-md bg-blue-700 hover:bg-blue-400'
                  >
                    Wallet
                  </button>

                  <button
                    onClick={() => {
                      navigate('team');
                      setBtnToogle(false);
                    }}
                    className="p-2 m-2 rounded-md bg-blue-700 hover:bg-blue-400 "
                  >
                    Team
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setBtnToogle(false);
                    }}
                    className="p-2 m-2 rounded-md bg-blue-700 hover:bg-blue-400"
                  >
                    Logout
                  </button>

                 
                </div>
              )}
            </div>
          )}
        </div>

        {/* Buttons visible only on Home Route */}
        {isHomeRoute && (
          <div className='flex gap-8'>
            {/* Visible on larger screens */}
            <button
              onClick={() => navigate('/about')}
              className="hidden md:flex bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/careers')}
              className="hidden md:flex bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Careers
            </button>
            <button
              onClick={handleContactScroll}
              className="hidden md:flex bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Contact Us
            </button>
            <Loginbtn />
            <Signupbtn />

            {/* Dropdown for smaller screens */}
            <button
              className='md:hidden'
              onClick={toggleDropdown}
            >
              {dropdownOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className='absolute top-16 right-2 bg-gray-900 p-4 rounded-md shadow-md'>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => {
                        navigate('/about');
                        toggleDropdown(); // Close dropdown
                      }}
                      className="text-white"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/careers');
                        toggleDropdown();
                      }}
                      className="text-white"
                    >
                      Careers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleContactScroll();
                        toggleDropdown();
                      }}
                      className="text-white"
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
