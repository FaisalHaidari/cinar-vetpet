import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function PrivateRoute() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  // اگر کاربر وارد نشده باشد، او را به صفحه ورود هدایت کنید
  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // اگر کاربر وارد شده باشد، اجازه دسترسی به مسیر را بدهید
  return <Outlet />;
}

export default PrivateRoute;