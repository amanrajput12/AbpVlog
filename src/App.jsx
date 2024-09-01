import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import LoginSection from './Singup/Singup.jsx';

const App = () => {
  return (
    <div className="bg-black min-h-screen   max-w-[100vw] text-white flex flex-col">
      <Header />
      {/* <main className="flex-grow flex justify-center items-center p-6"> */}
 
        <Outlet />
      {/* </main> */}
      <Footer />
    </div>
  );
};

export default App;
