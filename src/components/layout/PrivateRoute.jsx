import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function PrivateRoute() {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Yolun yönetici erişimi gerektirip gerektirmediğini kontrol et
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Kullanıcı giriş yapmışsa, yola erişime izin ver
  return <Outlet />;
}

export default PrivateRoute;