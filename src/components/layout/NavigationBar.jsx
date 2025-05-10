import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';


function NavigationBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        {/* لوگو اینجا قرار می‌گیرد */}
      </div>
      <div className={styles.navListContainer}> {/* یک div برای لیست قرار دادیم */}
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
      </div>
      <div className={styles.rightSection}>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Ara..." className={styles.searchInput} />
          <button className={styles.searchButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        <Link to="/auth" className={styles.authLink}>Giriş/Kaydol</Link>
        {/* İstenirse telefon numarası buraya eklenebilir */}
      </div>
    </nav>
  );
}

export default NavigationBar;