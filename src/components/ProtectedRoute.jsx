import React from 'react';
// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authenticatedUserId, children }) => {
 if (!authenticatedUserId) {
		return <Navigate to='/' replace />;
 }
 return children;
};

export default ProtectedRoute;
