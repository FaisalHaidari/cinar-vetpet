import React, { useState } from 'react';
import styles from '../styles/AuthPage.module.css';
function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <h2>{isSignIn ? 'ورود' : 'ثبت‌نام'}</h2>
      {isSignIn ? (
        <form>
          <div>
            <label htmlFor="signInEmail">ایمیل:</label>
            <input type="email" id="signInEmail" name="signInEmail" />
          </div>
          <div>
            <label htmlFor="signInPassword">رمز عبور:</label>
            <input type="password" id="signInPassword" name="signInPassword" />
          </div>
          <button type="submit">ورود</button>
        </form>
      ) : (
        <form>
          <div>
            <label htmlFor="signUpEmail">ایمیل:</label>
            <input type="email" id="signUpEmail" name="signUpEmail" />
          </div>
          <div>
            <label htmlFor="signUpPassword">رمز عبور:</label>
            <input type="password" id="signUpPassword" name="signUpPassword" />
          </div>
          <div>
            <label htmlFor="confirmPassword">تایید رمز عبور:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
          </div>
          <button type="submit">ثبت‌نام</button>
        </form>
      )}
      <button onClick={toggleAuthMode}>
        {isSignIn ? 'هنوز حساب ندارید؟ ثبت‌نام کنید' : 'حساب دارید؟ ورود'}
      </button>
    </div>
  );
}

export default AuthPage;