// import { Navigate, useLocation, Outlet } from "react-router-dom";
// import { useState } from "react";
// import { getAuth } from "../context/AuthContext";

// const ProtectedRoute = ({allowedRoles, userRole}) => {
//   const location = useLocation();
//   const user = getAuth();
//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <Outlet/>;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
// console.log(user);
  // If you implement roles later:
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If children exists (wrapped version), render children, else render Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
