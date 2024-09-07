import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie"
import LoginSection from './Singup/Singup';

const OutletComp = () => {
 const userRole = Cookies.get('userRole')
 const userId = Cookies.get('myid');
 const accessToken = Cookies.get('accessToken');


    if (!(userId && accessToken && userId!=="undefined" && accessToken!=="undefined" )) {
        return <div>
            <LoginSection/>
        <Navigate to="/" />;  
        </div>
    }
    return <div className=''>
   
 
 
    <Outlet />;  
    </div> 
    
};  

export default OutletComp;
