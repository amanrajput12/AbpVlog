import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="h-[100vh] text-white flex flex-col justify-between">
      {/* Main Content Section */}
      <main className="bg-gradient-to-b from-gray-900 to-blue-600 py-16 flex-grow flex items-center">
        <div className="max-w-5xl mx-auto text-center">
          <header>
            <h1 className="text-5xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Please read our terms carefully as they outline the subscription plans, earnings, withdrawals, and other policies for our platform.
            </p>
          </header>

          <h2 className="text-4xl font-bold mb-6 mt-5">Subscription Plans and Earnings</h2>
          <p className="text-lg mb-6">
            Our platform offers three subscription plans designed to reward users for completing tasks and referring others.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan 1 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Grade Pay 1600</h3>
              <p className="text-sm mb-4">
                On each task completion, earn ₹15. Referral bonus: 1% of earnings. Withdrawals are processed on a weekly basis.
              </p>
            </div>

            {/* Plan 2 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Grade Pay 3100</h3>
              <p className="text-sm mb-4">
                On each task completion, earn ₹30. Referral bonus: 1.25% of earnings. Minimum withdrawal amount applies, processed weekly.
              </p>
            </div>

            {/* Plan 3 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Grade Pay 5100</h3>
              <p className="text-sm mb-4">
                On each task completion, earn ₹50. Referral bonus: 1.5% of earnings. Withdrawals take time to process, as per company policy.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 mt-10">Withdrawals and Processing Time</h2>
          <p className="text-lg mb-6">
            Users can request withdrawals on a weekly basis. The minimum withdrawal amount is determined by the selected plan. Processing time for withdrawal requests may vary depending on system load.
          </p>

          <h2 className="text-3xl font-bold mb-6 mt-10">Plan Modifications and Updates</h2>
          <p className="text-lg mb-6">
            Our subscription plans are designed and modified by the organization to suit evolving market trends and business requirements. All policies are subject to change at the company's discretion.
          </p>
        </div>
      </main>

      {/* Latest News Section */}
      <section className="bg-blue-700 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">New Features Coming Soon</h3>
              <p className="text-sm mb-4">
                Stay tuned for exciting updates to our subscription plans and reward structure, aimed at enhancing your earning potential.
              </p>
              <a className="text-blue-700 font-semibold">Learn More &rarr;</a>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Policy Changes</h3>
              <p className="text-sm mb-4">
                Our withdrawal and bonus structures are being refined to better align with user needs and organizational goals.
              </p>
              <a className="text-blue-700 font-semibold">Learn More &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
