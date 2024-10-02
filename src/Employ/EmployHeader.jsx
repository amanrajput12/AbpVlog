import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"

const EmployHeader = () => {
    const navigate = useNavigate();
    const [role,setRole] = useState(Cookies.get("employManager"))


    return (
        <header className=" bg-gray-100 p-4 shadow-md">
            <div className="flex flex-col xl:flex-row container mx-auto justify-between items-center">
                {/* Logo / Branding */}
                <div className="text-2xl font-bold text-gray-800">
                     Dashboard
                </div>

                {/* Navigation Buttons */}
                <nav className="space-x-1 xl:space-x-4 ">
                    {role && <button onClick={()=>navigate("verification")}  className="bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold py-2 px-3 xl:px-6 rounded-md transition duration-300 ease-in-out hover:from-green-500 hover:to-green-300 hover:text-black shadow-lg hover:shadow-md" >Verify</button>}
                    <button
                        onClick={() => navigate('youtuberegister')}
                        className="bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold py-2 px-3 xl:px-6 rounded-md transition duration-300 ease-in-out hover:from-green-500 hover:to-green-300 hover:text-black shadow-lg hover:shadow-md"
                    >
                        YouTube Registration
                    </button>
                    <button
                        onClick={() => navigate('attendence')}
                        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-2 px-3 xl:px-6 rounded-md transition duration-300 ease-in-out hover:from-blue-500 hover:to-blue-300 hover:text-black shadow-lg hover:shadow-md"
                    >
                        Attendance
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default EmployHeader;
