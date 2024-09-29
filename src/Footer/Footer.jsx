import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-gray-950 text-white text-sm shadow-inner">
      <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Links Section */}
        <div className="text-center md:text-left">
          <div className="mb-4">
            <a href="/terms" className="text-blue-400 hover:underline mx-2">Terms & Conditions</a> | 
            <a href="/about" className="text-blue-400 hover:underline mx-2">About Us</a> | 
            <a href="/careers" className="text-blue-400 hover:underline mx-2">Careers</a>
          </div>
          <div className="mt-2">&copy; 2024 BHOMI ADVERTISEMENT ENTERPRISE. All rights reserved.</div>
        </div>

        {/* Social Media Section */}
        <div className="text-center md:text-right mt-4 md:mt-0">
          <div className="flex items-center justify-center md:justify-end space-x-4">
            <span className="mr-2">Follow us on:</span>
            <a href="https://twitter.com" className="text-blue-400 hover:text-white transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" className="text-blue-400 hover:text-white transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" className="text-blue-400 hover:text-white transition-colors">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className=" py-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>Reach us: <a href="mailto:bhomi.ade@bae.org.in" className="text-blue-400 hover:underline">bhomi.ade@bae.org.in</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
