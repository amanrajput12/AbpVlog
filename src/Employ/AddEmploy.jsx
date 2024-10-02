import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateEmploy } from './UseAddEmploy.js';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
const AddEmploy = () => {
  const EmployData = useSelector((store) => store.Employ);
  const [userId, setUserId] = useState(Cookies.get('myid'));
  const nameRef = useRef(null);
  const emplIdRef = useRef(null);
  const emailRef = useRef(null);
  const managerRef = useRef(null);
  const joiningDateRef = useRef(null);
  const accountNoRef = useRef(null);
  const ifscCodeRef = useRef(null);
  const departmentRef = useRef(null);
  const passwordRef = useRef(null)
  const EmployRole = useRef(null)
  const BranchLocation = useRef(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const intervalRef = useRef(null); // Store the interval ID

  useEffect(() => {
    // Only set the timeout if the form submission is successful (EmployData.CreateEmploy is true)
    if (EmployData.CreateEmploy) {
      intervalRef.current = setTimeout(() => {
        navigate('/Employ/dashboard/detail');
      }, 2000);
    }

    // Cleanup function to clear the timeout when the component unmounts or re-renders
    return () => {
      console.log('Cleanup function running', intervalRef.current);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [EmployData.CreateEmploy, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      emplId: emplIdRef.current.value,
      email: emailRef.current.value,
      reportingManager: managerRef.current.value,
      joiningDate: joiningDateRef.current.value,
      accountNo: accountNoRef.current.value,
      ifscCode: ifscCodeRef.current.value,
      department: departmentRef.current.value,
      password:passwordRef.current.value,
      BranchLocation:BranchLocation.current.value,
      EmployRole:EmployRole.current.value
    };
    console.log('Form Data:', formData);
    dispatch(CreateEmploy({ formData, toast,userId }));
  };

  return (
    <div className="flex items-center w-screen justify-center py-6 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="w-[90vw] xl:w-[50vw] text-black bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-extrabold mb-6">Add Employee</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="Name" className="block text-sm xl:text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="Name"
              ref={nameRef}
              placeholder="Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="EmplId" className="block text-sm xl:text-lg font-medium text-gray-700">
              Empl. Id
            </label>
            <input
              type="text"
              id="EmplId"
              ref={emplIdRef}
              placeholder="Employee ID"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Email" className="block text-sm xl:text-lg font-medium text-gray-700">
              Business Email
            </label>
            <input
              type="email"
              id="Email"
              ref={emailRef}
              placeholder="Business Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ReportingManager" className="block text-sm xl:text-lg font-medium text-gray-700">
              Reporting Manager
            </label>
            <input
              type="text"
              id="ReportingManager"
              ref={managerRef}
              placeholder="Reporting Manager"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="JoiningDate" className="block text-sm xl:text-lg font-medium text-gray-700">
              Joining Date
            </label>
            <input
              type="date"
              id="JoiningDate"
              ref={joiningDateRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="AccountNo" className="block text-sm xl:text-lg font-medium text-gray-700">
              Account No
            </label>
            <input
              type="text"
              id="AccountNo"
              ref={accountNoRef}
              placeholder="Account No"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="IfscCode" className="block text-sm xl:text-lg font-medium text-gray-700">
              IFSC Code
            </label>
            <input
              type="text"
              id="IfscCode"
              ref={ifscCodeRef}
              placeholder="IFSC Code"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Department" className="block text-sm xl:text-lg font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              id="Department"
              ref={departmentRef}
              placeholder="Department"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="BranchLocation" className="block text-sm xl:text-lg font-medium text-gray-700">
            BranchLocation
            </label>
            <input
              type="text"
              id="BranchLocation"
              ref={BranchLocation}
              placeholder="BranchLocation"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>


          <div className="mb-4">
            <label htmlFor="EmployRole" className="block text-sm xl:text-lg font-medium text-gray-700">
            EmployRole
            </label>
            <input
              type="text"
              id="EmployRole"
              ref={EmployRole}
              placeholder="EmployRole"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm xl:text-lg font-medium text-gray-700">
              password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Department"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmploy;
