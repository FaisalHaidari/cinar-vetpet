import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaHome, FaInfoCircle, FaStethoscope, FaPaw } from 'react-icons/fa';
import styles from './NavigationBar.module.css';
import { Link as ScrollLink } from 'react-scroll';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../hooks/CartContext';

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src="/images/1.png" alt="Logo" className={styles.logo} />
          <span className={styles.clinicName} style={{color: '#556B2F'}}>Çınar Pet<br />Veteriner Kliniği</span>
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
          <Link 
            to="/store"
            className={styles.navLink}
          >
            <span className={styles.navIcon}><FaPaw /></span>
            Pet Shop
          </Link>
        </li>
      </ul>
      <div className={styles.rightSection}>
        {user ? (
          <>
            <Link to="/profile" style={{marginRight:8, fontWeight:600, color:'#f7882f', textDecoration:'none'}}>
              {user.name}
            </Link>
            <button onClick={handleLogout} style={{marginLeft:8, background:'var(--apricot)', color:'#fff', border:'none', borderRadius:6, padding:'8px 22px', fontWeight:600, fontSize: '1.1rem', cursor:'pointer'}}>Çıkış Yap</button>
          </>
        ) : (
          <div style={{display:'flex', gap:24, alignItems:'center'}}>
            <button
              onClick={() => navigate('/auth?tab=login')}
              style={{
                background: '#f7882f',
                color: '#fff',
                border: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                borderRadius: 18,
                padding: '6px 18px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >Giriş Yap</button>
          </div>
        )}
        {user && (
          <Link to="/cart" className={styles.cartButton} style={{marginRight: 24}}>
            <FaShoppingCart />
            <span className={styles.cartCount}>{itemCount}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;