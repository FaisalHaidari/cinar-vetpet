import React from 'react';
import styles from '../styles/Footer.module.css';
import { FaPhone, FaMapMarkerAlt, FaUserMd } from 'react-icons/fa';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <p>BARIŞ, Adalet, Karadeniz Cd. NO:59/13 SİTESİ B BLOK, 55060 İlkadım/Samsun</p>
          </div>
          <div className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            <p>0 505 705 82 38</p>
          </div>
          <div className={styles.contactItem}>
            <FaUserMd className={styles.icon} />
            <p>Dilara Bayır Çınar - Ahmet Arda Çınar</p>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© 2022 Çınar Pet Veteriner Kliniği. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 