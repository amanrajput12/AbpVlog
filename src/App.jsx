import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import LoginSection from './Singup/Singup.jsx';
import Cookies from "js-cookie"

const App = () => {
  const [actualMember, setActualMember] = useState(null);
  const [displayMember, setDisplayMember] = useState(0);
  const [userId, setUserId] = useState(Cookies.get('myid'));
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

     const location = useLocation() 
     const isHomeRoute = location.pathname === '/';
       
   
   
     
  useEffect(() => {
    async function getMember() {
      try {
        const response = await fetch("https://abpvlog.onrender.com/v1/member/get", {
          method: "GET",
        });
        const data = await response.json();
        const memberCount = data.Member[0].Member;
        setActualMember(memberCount);
      } catch (error) {
        console.log("error on Getting member");
      }
    }

    getMember();
  }, []);

  useEffect(() => {
    if (actualMember !== null) {
      const duration = 2000; // Duration of the animation in milliseconds
      const increment = actualMember / (duration / 100); // Increment value for each interval

      const interval = setInterval(() => {
        setDisplayMember((prev) => {
          const next = Math.min(prev + increment, actualMember);
          if (next === actualMember) {
            clearInterval(interval);
          }
          return next;
        });
      }, 100);
    }
  }, [actualMember]);

  return (
    <div className=" bg-black min-h-screen max-w-[100vw] text-white flex flex-col">
    
      <Header />
      <div className="flex items-center flex-col">
        <Outlet />
        {isHomeRoute && 
        <div className=" xl:absolute p-4  z-20 top-1 right-[5vw] animate-bounce xl:animate-none">
          <h2 className="text-xl xl:text-3xl  font-extrabold text-gray-300">Current Member</h2>
          <h4 className="text-xl xl:text-4xl text-center font-semibold ">{Math.round(displayMember)}</h4>
        </div>
        }
      </div>
      <Footer />
    </div>
  );
};

export default App;
