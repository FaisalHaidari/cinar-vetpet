import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';


function NavigationBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>

      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>صفحه اصلی</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/store" className={styles.navLink}>فروشگاه</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/clinic/introduction" className={styles.navLink}>معرفی کلینیک</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/payment/online" className={styles.navLink}>پرداخت آنلاین</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/auth" className={styles.navLink}>ورود/ثبت‌نام</Link>
        </li>
      </ul>
      <div className={styles.rightSection}>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="جستجو..." className={styles.searchInput} />
          <button className={styles.searchButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        <Link to="/auth" className={styles.authLink}>ورود/ثبت‌نام</Link>
        {/* می‌توانید شماره تلفن را در اینجا اضافه کنید اگر می‌خواهید */}
      </div>
    </nav>
  );
}

export default NavigationBar;