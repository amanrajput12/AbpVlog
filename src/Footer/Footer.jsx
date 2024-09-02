import React from 'react';

const Footer = () => {
  return (
    <footer className=" w-full py-6 text-center text-white text-sm shadow-inner">
      <div>
        Locations: 2nd Floor, 113, 2nd Cross Rd, East of NGEF Layout, Kasturi Nagar, Bangalore, Karnataka 560043
      </div>
      <div className="mt-2">
        <a className="text-blue-400 hover:underline">Terms & Conditions</a> | 
        <a  className="text-blue-400 hover:underline ml-2">Privacy Policy</a>
      </div>
      <div className="mt-2">
        &copy; 2024 BHOMI
        ADVERTISEMENT  ENTERPRISE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
