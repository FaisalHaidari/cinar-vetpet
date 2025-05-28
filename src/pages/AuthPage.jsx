import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AuthPage.module.css';
import { AuthContext } from '../context/AuthContext';

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState(''); // ✅ New state for name
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setError('');
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    console.log('ورود با ایمیل:', signInEmail);
    login({ email: signInEmail });
    navigate('/');
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    if (signUpPassword !== confirmPassword) {
      setError('رمز عبور و تایید آن مطابقت ندارند.');
      return;
    }

    const userData = {
      name: signUpName,
      email: signUpEmail,
    };

    console.log('ثبت‌نام با اطلاعات:', userData);
    login(userData);
    navigate('/');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h2 className={styles.authTitle}>{isSignIn ? 'Login' : 'Sign Up'}</h2>
        {isSignIn ? (
          <form onSubmit={handleSignInSubmit} className={styles.authForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="signInEmail" className={styles.authLabel}>Email:</label>
              <input
                type="email"
                id="signInEmail"
                name="signInEmail"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.authInput}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="signInPassword" className={styles.authLabel}>Password:</label>
              <input
                type="password"
                id="signInPassword"
                name="signInPassword"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                placeholder="Enter your password"
                className={styles.authInput}
              />
            </div>
            <button type="submit" className={styles.authButton}>Log In</button>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit} className={styles.authForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="signUpName" className={styles.authLabel}>Name:</label>
              <input
                type="text"
                id="signUpName"
                name="signUpName"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder="Enter your name"
                className={styles.authInput}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="signUpEmail" className={styles.authLabel}>Email:</label>
              <input
                type="email"
                id="signUpEmail"
                name="signUpEmail"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.authInput}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="signUpPassword" className={styles.authLabel}>Password:</label>
              <input
                type="password"
                id="signUpPassword"
                name="signUpPassword"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder="Enter your password"
                className={styles.authInput}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.authLabel}>Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={styles.authInput}
              />
            </div>
            {error && <p className={styles.authError}>{error}</p>}
            <button type="submit" className={styles.authButton}>Create Account</button>
          </form>
        )}
        <button className={styles.toggleButton} onClick={toggleAuthMode}>
          {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
