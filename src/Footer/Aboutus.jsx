import React from 'react';
import About from "../../public/Aboutus.png"
const Aboutus = () => {
  return (
    <div className=" h-[100vh] text-white  flex flex-col justify-between">
    

      {/* Main Content Section */}
      <main className="bg-gradient-to-b from-blue-900 to-green-600 py-16 flex-grow flex items-center">
        <div className="max-w-5xl mx-auto text-center">
           <header>

           <h1 className="text-5xl font-bold  mb-4">
          Empowering Brands with Global Reach
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Our advertising solutions drive businesses forward by connecting them to a vast global audience, transforming customer engagement.
        </p>
           </header>
          
          <h2 className="text-4xl font-bold mb-6 mt-5">
            Unlock Your Business Potential with Us
          </h2>
          <p className="text-lg mb-6">
            We offer a platform built to take your business to the next level by delivering precise, high-impact advertising that reaches millions.
          </p>

          <div className="flex justify-center">
            <img
              src={About}
              alt="Global Advertising"
              className="mx-auto mb-8"
            />
          </div>

          <p className="text-lg">
            From visually stunning video ads to targeted banner campaigns, we provide everything you need to capture your audience's attention and drive meaningful results.
          </p>
        </div>
      </main>

      {/* Recent News Section */}
      <section className="bg-green-700  py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">
                Boosting Ad Revenue for Over 1000 Brands
              </h3>
              <p className="text-sm mb-4">
                Discover how our strategies increased sales and revenue by 30% through personalized campaigns.
              </p>
              <a  className="text-green-700 font-semibold">
                Read More &rarr;
              </a>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">
                Future Trends in Digital Advertising
              </h3>
              <p className="text-sm mb-4">
                Learn how our platform is evolving to meet the dynamic needs of tomorrow's advertising landscape.
              </p>
              <a  className="text-green-700 font-semibold">
                Read More &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default Aboutus;
