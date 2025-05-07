import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css'; // فایل CSS Module برای استایل‌دهی

function NavigationBar() {
  return (
    <nav className={styles.nav}>
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
        {/* می‌توانید لینک‌های دیگری به صفحات مورد نظر اضافه کنید */}
      </ul>
    </nav>
  );
}

export default NavigationBar;