import React, { createContext, useState, useEffect } from 'react';
import { useCart } from '../hooks/CartContext'; // این ایمپورت را نگه می‌داریم، چون ممکن است در آینده دوباره استفاده شود

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // *** این خط را موقتاً حذف می‌کنیم ***
  // const { clearCart } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Set admin role for faisal@gmail.com on initial load
      if (parsedUser.email === 'faisal@gmail.com') {
        parsedUser.role = 'ADMIN';
      }
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []); // Dependency array is empty, so this runs only once on mount

  const login = (userData) => {
    // Set admin role for faisal@gmail.com during login
    if (userData.email === 'faisal@gmail.com') {
      userData.role = 'ADMIN';
    }
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
    // *** این خط را هم موقتاً حذف می‌کنیم ***
    // clearCart();
  };

  const updateUser = (newUser) => {
     // Ensure admin role is not accidentally removed for faisal@gmail.com
     if (user?.email === 'faisal@gmail.com') {
        newUser.role = 'ADMIN';
     }
    setUser(prev => ({ ...prev, ...newUser }));
    // Update localStorage with the new user data including role
    localStorage.setItem('user', JSON.stringify({ ...user, ...newUser }));
  };


  // Helper function to check if the current user is admin
  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };


  const authContextValue = {
    isLoggedIn,
    user,
    login,
    logout,
    updateUser,
    isAdmin
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};