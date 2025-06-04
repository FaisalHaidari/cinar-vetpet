import React, { createContext, useState, useEffect } from 'react';

// ایجاد یک Context object
export const AuthContext = createContext(null);

// ایجاد یک Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // بازیابی اطلاعات کاربر از localStorage هنگام لود
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // تابع برای ورود کاربر
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // تابع برای خروج کاربر
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  // تابع برای آپدیت اطلاعات کاربر
  const updateUser = (newUser) => {
    setUser(prev => ({ ...prev, ...newUser }));
  };

  // مقدار Context که در اختیار کامپوننت‌های فرزند قرار می‌گیرد
  const authContextValue = {
    isLoggedIn,
    user,
    login,
    logout,
    updateUser,
  };

  // ارائه دادن مقدار Context به کامپوننت‌های فرزند
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};