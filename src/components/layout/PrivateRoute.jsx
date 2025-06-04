import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function PrivateRoute() {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  // اگر کاربر وارد نشده باشد، او را به صفحه ورود هدایت کنید
  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if the route requires admin access
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // اگر کاربر وارد شده باشد، اجازه دسترسی به مسیر را بدهید
  return <Outlet />;
}

export default PrivateRoute;