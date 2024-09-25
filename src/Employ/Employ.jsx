import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import ReactLoading from "react-loading"
import { useNavigate } from 'react-router-dom';
const Employ = () => {
  // State to track attendance status
  const [attendance, setAttendance] = useState('');
  const [checkedOut, setCheckedOut] = useState(false);
  const [loader,setLoader] = useState(null)
  const userId = Cookies.get('employId');
  const navigate = useNavigate()
  const timerRef = useRef(null);

  useEffect(()=>{
     return ()=>{
        console.log("after leave timer ",timerRef);
        clearTimeout(timerRef.current) 
        
     }
  },[])
  // Handle change in select dropdown
  const handleAttendanceChange = (e) => {
    setAttendance(e.target.value);
  };

  // Handle checkout button click
  const handleCheckOut = async () => {
    if (!attendance) {
      toast.error('Please select your attendance status before marking attendance.');
      return;
    }

    try {
        setLoader("flex")
      const response = await fetch('/v1/employ/attendence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          status: attendance,
        }),
      });

      const resp = await response.json();

      if (response.ok) {
        // Success response
        setCheckedOut(true);
        toast.success('Attendance marked successfully!');
        setLoader(null)
        timerRef.current=  setTimeout(() => {
             console.log("in timer",Date.now());
             
            navigate('/')
        },1500);
      } else {
        // Handle errors from server
        toast.error(resp.message || 'Failed to mark attendance, please try again.');
        setLoader(null)
      }
    } catch (error) {
      // Handle network or unexpected errors
      toast.error('An error occurred while marking attendance.');
      setLoader(null)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white">
      {/* Toaster for displaying toast messages */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white text-black shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Employee Attendance</h2>

        {/* Attendance Dropdown */}
        <div className="mb-6">
        <ReactLoading
          className={`mx-auto ${loader? "flex":"null" } sticky top-12 z-30`}
          hidden
          type="balls"
          color={"#000"}
          height={100}
          width={100}
        />
          <label className="block text-lg font-semibold mb-2" htmlFor="attendance">
            Select Attendance Status:
          </label>
          <select
            id="attendance"
            name="attendance"
            value={attendance}
            onChange={handleAttendanceChange}
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="" disabled>
              -- Select Status --
            </option>
            <option value="Present">Present</option>
            <option value="Leave">Leave</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        {/* Check Out Button */}
        <div>
          <button
            className={`w-full py-3 px-6 font-semibold text-lg rounded-lg ${
              checkedOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            onClick={handleCheckOut}
            disabled={checkedOut}
          >
            {checkedOut ? 'Attendance Marked' : 'Mark Attendance'}
          </button>
        </div>

        {/* Success message after checkout */}
        {checkedOut && (
          <div className="mt-4 text-center text-green-500 font-semibold">
            You have successfully marked attendance!
          </div>
        )}
      </div>
    </div>
  );
};

export default Employ;
