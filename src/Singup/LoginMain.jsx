import React, { useEffect, useState } from "react";
import Aboutus from "../../public/Aboutus.png";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "../Footer/Footer";
const LoginMain = () => {
  const user = useSelector((store) => store.user);
  const Register = useSelector((store) => store.Register);
  const [actualMember, setActualMember] = useState(null);
  const [displayMember, setDisplayMember] = useState(0);

  const location = useLocation() 
     const isHomeRoute = location.pathname === '/';
   
   
     
  useEffect(() => {
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
    <div className="about-us-container text-white  h-screen">
      {/* Header Section */}
      <header className="bg-black text-center py-12 ">
        <ReactLoading
          className={`mx-auto ${
            user.loading ? "flex" : "null"
          } sticky top-12 z-30 `}
          hidden
          type="balls"
          color={"#ffff"}
          height={100}
          width={100}
        />
         <ReactLoading
          className={`mx-auto ${
            Register.loading ? "flex" : "null"
          } sticky top-12 z-30 `}
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

      {/* Main Content Section */}
      <main className="bg-gradient-to-b from-black to-purple-800 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Your Gateway to Powerful Advertising
          </h2>
          <p className="text-lg mb-6">
            Our platform is designed to elevate your business by connecting you
            with millions of potential customers daily. We leverage advanced
            targeting to ensure your message reaches the right audience at the
            right time, all while maximizing engagement and conversions.
          </p>

          <div className="flex  justify-center">
            {isHomeRoute && (
              <div>
                <img
                  src={Aboutus}
                  alt="Advertising Illustration"
                  className="mx-auto mb-8"
                />
                <div className="  p-4  z-20 top-1 right-[5vw] animate-bounce xl:animate-none">
                  <h2 className="text-xl xl:text-3xl  font-extrabold text-gray-300">
                    Current Member
                  </h2>
                  <h4 className="text-xl xl:text-4xl text-center font-semibold ">
                    {Math.round(displayMember)}
                  </h4>
                </div>
              </div>
            )}
          </div>

          <p className="text-lg">
            Whether it's through banner ads, video advertisements, or
            interactive content, we provide the tools you need to captivate your
            audience. Join the ranks of businesses thriving through the power of
            advertising.
          </p>
        </div>
      </main>

      {/* Recent News Section */}
      <section className="bg-purple-700 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Recent News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">
                How Our Platform Boosted Ad Revenue for 1000+ Brands
              </h3>
              <p className="text-sm mb-4">
                Learn how our targeted advertising strategies helped businesses
                increase their sales and revenue by up to 30% through
                personalized ad campaigns.
              </p>
              <a href="#" className="text-purple-700 font-semibold">
                Keep Reading &rarr;
              </a>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">
                The Future of Digital Advertising
              </h3>
              <p className="text-sm mb-4">
                Explore the latest trends in digital advertising and how our
                platform is evolving to meet the needs of a rapidly changing
                landscape.
              </p>
              <a href="#" className="text-purple-700 font-semibold">
                Keep Reading &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
     <Footer/>
      <Toaster/>
    </div>
  );
};

export default LoginMain;
