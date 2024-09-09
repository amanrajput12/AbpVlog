import React, { useEffect, useState } from "react";
import Aboutus from "../../public/Aboutus.png";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "../Footer/Footer";
import { GetAdd } from "./useGetAdds.js";

const LoginMain = () => {
  const user = useSelector((store) => store.user);
  const Register = useSelector((store) => store.Register);
  const [actualMember, setActualMember] = useState(null);
  const [displayMember, setDisplayMember] = useState(0);
  
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  const Adds = useSelector((store)=>store.Adds);
  console.log("in login adds",Adds.addsImage);
  
  const dispatch = useDispatch();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image
  const images = Adds.addsImage || []; // Ensure images array is always an array
  
  // Fetch the Adds and Member data on component mount
  useEffect(() => {
    dispatch(GetAdd());
    async function getMember() {
      try {
        const response = await fetch("/v1/member/get", {
          method: "GET",
          credentials: 'include',
        });
        const data = await response.json();
        const memberCount = data.Member[0].Member;
        setActualMember(memberCount);
      } catch (error) {
        console.log("error on Getting member");
      }
    }

    getMember();
  }, [dispatch]);

  // Animate member count incrementally
  useEffect(() => {
    if (actualMember !== null) {
      const duration = 2000;
      const increment = actualMember / (duration / 100);
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

  // Slider logic for image change every 10 seconds
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); 
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <div className="about-us-container text-white h-screen">
      {/* Header Section */}
      <header className="bg-black text-center py-12">
        <ReactLoading
          className={`mx-auto ${user.loading ? "flex" : "null"} sticky top-12 z-30`}
          hidden
          type="balls"
          color={"#ffff"}
          height={100}
          width={100}
        />
        <ReactLoading
          className={`mx-auto ${Register.loading ? "flex" : "null"} sticky top-12 z-30`}
          hidden
          type="balls"
          color={"#ffff"}
          height={100}
          width={100}
        />
        <h1 className="text-4xl font-bold text-white mb-4">
          Advertisement That Connects the World
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          We create advertisements that reach billions across the globe every
          day, helping businesses grow and customers find exactly what they
          need.
        </p>
      </header>
      
      {/* Add Section with Slider */}
      <div className="bg-black">
        {images.length > 0 ? (
          <img
            className="h-48 aspect-auto w-96  mx-auto transition-transform duration-1000 ease-in-out" // Smooth transition
            src={images[currentImageIndex]} // Dynamically change image based on index
            alt="Advertisement"
          />
        ) : (
          <p className="text-white text-center">No ads available</p>
        )}
      </div>

      {/* Main Content Section */}
      <main className="bg-gradient-to-b from-black to-purple-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Your Gateway to Powerful Advertising
          </h2>
          <p className="text-lg mb-6">
            Our platform is designed to elevate your business by connecting you
            with millions of potential customers daily.
          </p>

          <div className="flex justify-center">
            {isHomeRoute && (
              <div>
                <img
                  src={Aboutus}
                  alt="Advertising Illustration"
                  className="mx-auto mb-8"
                />
                <div className="p-4 z-20 top-1 right-[5vw] animate-bounce xl:animate-none">
                  <h2 className="text-xl xl:text-3xl font-extrabold text-gray-300">
                    Current Member
                  </h2>
                  <h4 className="text-xl xl:text-4xl text-center font-semibold">
                    {Math.round(displayMember)}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
      <Toaster />
    </div>
  );
};

export default LoginMain;
