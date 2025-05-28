import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaHome, FaInfoCircle, FaStethoscope, FaPaw } from 'react-icons/fa';
import styles from './NavigationBar.module.css';
import { Link as ScrollLink } from 'react-scroll';

function NavigationBar() {
  const location = useLocation();
  // Example: You can get cart count from context or props if needed
  const cartCount = 0;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src="./src/images/1.png" alt="Logo" className={styles.logo} />
          <span className={styles.clinicName}>Çınar Pet Veteriner Kliniği</span>
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link 
            to="/" 
            className={styles.navLink}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className={styles.navIcon}><FaHome /></span>
            Ana Sayfa
          </Link>
        </li>
        <li className={styles.navItem}>
          <ScrollLink to="hakkimizda" smooth={true} duration={700} offset={-80} className={styles.navLink}>
            <span className={styles.navIcon}><FaInfoCircle /></span>
            Hakkımızda
          </ScrollLink>
        </li>
        <li className={styles.navItem}>
          <ScrollLink to="hizmetler" smooth={true} duration={700} offset={-80} className={styles.navLink}>
            <span className={styles.navIcon}><FaStethoscope /></span>
            Hizmetler
          </ScrollLink>
        </li>
        <li className={styles.navItem}>
          <ScrollLink to="petshop" smooth={true} duration={700} offset={-80} className={styles.navLink}>
            <span className={styles.navIcon}><FaPaw /></span>
            Pet Shop
          </ScrollLink>
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