import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn, isAdmin = false, adminOnly = false }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
