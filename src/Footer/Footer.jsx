import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className=" w-full bg-black  text-center text-white text-sm shadow-inner">
      
      <div className="">
        <a  href='/terms' className="text-blue-400 hover:underline">Terms & Conditions</a> | 
    
        <a  href='/about'  className="text-blue-400 hover:underline ml-2">About Us</a>

      </div>
      <div className="mt-2">
        &copy; 2024 BHOMI
        ADVERTISEMENT  ENTERPRISE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
