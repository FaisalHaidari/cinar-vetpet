import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/OrderSuccessPage.module.css';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.successBox}>
        <div className={styles.checkmark}>✓</div>
        <h1 className={styles.title}>Siparişiniz Başarıyla Alındı!</h1>
        <p className={styles.message}>
          Siparişiniz için teşekkür ederiz. Siparişiniz en kısa sürede hazırlanıp kargoya verilecektir.
        </p>
        <button 
          className={styles.button}
          onClick={() => navigate('/')}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage; 