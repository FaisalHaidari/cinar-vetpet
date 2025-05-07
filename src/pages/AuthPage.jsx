import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AuthPage.module.css';
import { AuthContext } from '../context/AuthContext'; // اگر از Context API استفاده می‌کنید

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // فقط اگر از Context API استفاده می‌کنید
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setError(''); // پاک کردن خطا هنگام تغییر حالت
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    // در اینجا باید منطق ارسال اطلاعات ورود به بک‌اند قرار بگیرد
    // پس از دریافت پاسخ موفقیت‌آمیز:
    console.log('ورود با ایمیل:', signInEmail);
    // اگر از Context API استفاده می‌کنید:
    login({ email: signInEmail });
    navigate('/');
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    if (signUpPassword !== confirmPassword) {
      setError('رمز عبور و تایید آن مطابقت ندارند.');
      return;
    }
    // در اینجا باید منطق ارسال اطلاعات ثبت‌نام به بک‌اند قرار بگیرد
    // پس از دریافت پاسخ موفقیت‌آمیز:
    console.log('ثبت‌نام با ایمیل:', signUpEmail);
    // اگر از Context API استفاده می‌کنید:
    login({ email: signUpEmail });
    navigate('/');
  };

  return (
    <div className={styles.authPage}>
      <h2>{isSignIn ? 'ورود' : 'ثبت‌نام'}</h2>
      {isSignIn ? (
        <form onSubmit={handleSignInSubmit} className={styles.form}>
          <div>
            <label htmlFor="signInEmail">ایمیل:</label>
            <input
              type="email"
              id="signInEmail"
              name="signInEmail"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="signInPassword">رمز عبور:</label>
            <input
              type="password"
              id="signInPassword"
              name="signInPassword"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
          </div>
          <button type="submit">ورود</button>
        </form>
      ) : (
        <form onSubmit={handleSignUpSubmit} className={styles.form}>
          <div>
            <label htmlFor="signUpEmail">ایمیل:</label>
            <input
              type="email"
              id="signUpEmail"
              name="signUpEmail"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="signUpPassword">رمز عبور:</label>
            <input
              type="password"
              id="signUpPassword"
              name="signUpPassword"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">تایید رمز عبور:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
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