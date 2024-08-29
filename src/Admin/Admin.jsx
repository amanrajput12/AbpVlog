import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie"
const AdminRoute = () => {
 const userRole = Cookies.get('userRole')

    if (userRole !== "admin") {
        return <Navigate to="/" />;  
    }

    return <Outlet />;  
};

export default AdminRoute;
