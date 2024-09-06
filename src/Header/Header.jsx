import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../Singup/SingupSlice';
import logo from '../../public/logo.jpeg'
import { LuBoxSelect } from "react-icons/lu";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = Cookies.get('userRole');
  const accessToken = Cookies.get('accessToken');
  const userId = Cookies.get('myid');
  const [btntoogle,setBtnToogle] = useState(false)

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('myid');
    Cookies.remove('userRole');
    navigate('/');
    dispatch(logout());
  };

  return (
    <header className=" sticky top-0  z-10 bg-gray-800 shadow-lg p-3">
        <div className='flex h-20 items-center justify-between  '>




          
      <div className=" ml-4 text-white text-2xl font-bold cursor-pointer" >
           <img onClick={()=>navigate("/video")} className='w-12 rounded-md' src={logo} alt="" />
          
      </div>
 

     
      

      <div className="flex items-center space-x-4">
        {userRole == 'admin' && <div>

          <button
            onClick={() => navigate('/admin')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Admin Dashboard
          </button>
          </div>
        }
        
         {accessToken!=="undefined" && userId!=="undefined" &&  accessToken && userId && <div>
<LuBoxSelect onClick={()=>setBtnToogle(!btntoogle)}  className='w-[100px] h-[30px] hover:cursor-pointer  ' />

{btntoogle &&
         <div className=' bg-black mt-1 p-2 rounded-lg    w-24 justify-end absolute '>
        <button onClick={()=>{
          navigate('/wallet')
          setBtnToogle(false)
          }} className='p-2 m-2 rounded-md bg-blue-700 hover:bg-blue-400' >Wallet</button>
        <button
          onClick= {()=>{
            handleLogout()
            setBtnToogle(false)
          }}
          className="p-2  m-2 rounded-md bg-blue-700 hover:bg-blue-400"
        >
          Logout
        </button>
      </div>
      }
       
        </div>

      }
      </div>
      </div>
    </header>
  );
};

export default Header;
