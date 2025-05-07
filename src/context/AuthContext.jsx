import React, { createContext, useState } from 'react';

// ایجاد یک Context object
export const AuthContext = createContext(null);

// ایجاد یک Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // وضعیت ورود کاربر (پیش‌فرض: وارد نشده)
  const [user, setUser] = useState(null); // اطلاعات کاربر (اختیاری)

  // تابع برای ورود کاربر
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    // در اینجا معمولاً اطلاعات کاربر در localStorage یا sessionStorage ذخیره می‌شود
    console.log('کاربر وارد شد:', userData); // برای تست
  };

  // تابع برای خروج کاربر
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // در اینجا معمولاً اطلاعات کاربر از localStorage یا sessionStorage حذف می‌شود
    console.log('کاربر خارج شد'); // برای تست
  };

  // مقدار Context که در اختیار کامپوننت‌های فرزند قرار می‌گیرد
  const authContextValue = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  // ارائه دادن مقدار Context به کامپوننت‌های فرزند
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};