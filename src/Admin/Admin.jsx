import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const userRole = useSelector((store) => store?.user?.data?.data?.role);

    if (userRole !== "admin") {
        return <Navigate to="/" />;  
    }

    return <Outlet />;  
};

export default AdminRoute;
