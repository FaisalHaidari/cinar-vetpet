import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import styles from './NavigationBar.module.css';

function NavigationBar() {
  const location = useLocation();
  // Example: You can get cart count from context or props if needed
  const cartCount = 0;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src="/src/images/logo.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>Ana Sayfa</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/store" className={styles.navLink}>Mağaza</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/clinic/introduction" className={styles.navLink}>Klinik Tanıtım</Link>
        </li>
      </ul>
      <div className={styles.rightSection}>
        <Link to="/store" className={styles.cartButton} title="Sepetim">
          <FaShoppingCart />
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
        <Link to="/auth" className={styles.avatarButton} title="Giriş/Kaydol">
          <FaUserCircle />
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar;