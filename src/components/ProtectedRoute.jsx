import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const user = useSelector((state) => state.user); // Get  user from Redux state

  return (
    <Route {...rest} element={user ? <Element /> : <Navigate to='/login' />} />
  );
};

export default ProtectedRoute;
