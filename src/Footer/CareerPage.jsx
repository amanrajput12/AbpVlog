import React from 'react';

const CareerPage = () => {
  return (
    <div className="h-[100vh] text-white flex flex-col justify-between">
      {/* Main Content Section */}
      <main className="bg-gradient-to-b from-purple-700 to-red-500 py-16 flex-grow flex items-center">
        <div className="max-w-5xl mx-auto text-center">
          <header>
            <h1 className="text-5xl font-bold mb-4">Careers at Our Organization</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore the exciting career opportunities we offer. Join our team and be part of a growing organization where your skills and passion can shine.
            </p>
          </header>

          <h2 className="text-4xl font-bold mb-6 mt-5">Current Open Positions</h2>
          <p className="text-lg mb-6">
            Below are the positions currently available in our organization. We are looking for talented individuals to fill these roles and contribute to our success.
          </p>

          <div className="grid grid-cols-1 md:flex md:justify-center gap-6">
            {/* Job 1 */}
            {/* <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Software Engineer</h3>
              <p className="text-sm mb-4">
                We are looking for a Software Engineer with experience in React, Node.js, and cloud technologies. Join us to build cutting-edge solutions.
              </p>
              <p className="text-sm mb-4">Location: Remote</p>
              <a className="text-blue-700 font-semibold">Apply Now &rarr;</a>
            </div> */}

            {/* Job 2 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Marketing Specialist</h3>
              <p className="text-sm mb-4">
                We need a Marketing Specialist to drive our campaigns, manage social media, and handle public relations. Strong experience in digital marketing is required.
              </p>
              <p className="text-sm mb-4">Location: Remote</p>
              <a className="text-blue-700 font-semibold">Apply Now &rarr;</a>
            </div>

            {/* Job 3 */}
            {/* <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Data Analyst</h3>
              <p className="text-sm mb-4">
                Join our team as a Data Analyst to analyze performance metrics and provide actionable insights. Proficiency in Python and SQL is required.
              </p>
              <p className="text-sm mb-4">Location: Remote</p>
              <a className="text-blue-700 font-semibold">Apply Now &rarr;</a>
            </div> */}
          </div>

          <h2 className="text-3xl font-bold mb-6 mt-10">Why Work With Us?</h2>
          <p className="text-lg mb-6">
            At our company, we believe in fostering innovation and creativity. Our team is collaborative, diverse, and dedicated to delivering the best results. We offer competitive salaries, comprehensive benefits, and flexible working conditions.
          </p>
        </div>
      </main>

      {/* Latest News Section */}
      <section className="bg-gradient-to-b from-red-700 to-pink-400 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Career Growth and Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Learning and Development</h3>
              <p className="text-sm mb-4">
                We believe in continuous learning and provide ample opportunities for training, certifications, and career advancement.
              </p>
              <a className="text-blue-700 font-semibold">Learn More &rarr;</a>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Employee Benefits</h3>
              <p className="text-sm mb-4">
                We offer a comprehensive benefits package including health insurance, paid time off, and flexible working hours to ensure work-life balance.
              </p>
              <a className="text-blue-700 font-semibold">Learn More &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
