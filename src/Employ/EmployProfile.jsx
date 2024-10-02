import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie"
const EmployProfile = () => {
  const [profileData, setProfileData] = useState([]);
  const employId = Cookies.get('employId')
  useEffect(() => {
    getEmploy();
  }, []);

  async function getEmploy() {
    try {
      const response = await fetch('/v1/employ/getemploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employId }),
      });

      const result = await response.json();
      console.log('Getting data: ', result);
      if (result && result.data) {
        setProfileData(result.data);
      }
    } catch (error) {
      console.log('Error on getting employee data', error.message);
    }
  }

  return (
    <div className="p-8 bg-gradient-to-r  from-blue-50 via-white to-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Employee Professional Details Portal</h2>
      {profileData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center  ">
          {profileData.map((employee) => (
            <div
              key={employee._id}
              className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-blue-500 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 lg:w-[50vw]"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{employee.name}</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-bold">Employee ID:</span> {employee.emplId}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Department:</span> {employee.department}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Email:</span> {employee.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Account No:</span> {employee.accountNo}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">IFSC Code:</span> {employee.ifscCode}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Joining Date:</span>{' '}
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Reporting Manager:</span> {employee.reportingManager}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading employee details...</p>
      )}
    </div>
  );
};

export default EmployProfile;
