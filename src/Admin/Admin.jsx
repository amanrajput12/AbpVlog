import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie"
import AdminHeader from './AdminHeader.jsx';
const AdminRoute = () => {
 const userRole = Cookies.get('userRole')

    if (userRole !== "admin") {
        return <Navigate to="/" />;  
    }
    return <div className=''>
   
   <AdminHeader/>
 
    <Outlet />;  
    </div> 
    
};  

export default AdminRoute;
