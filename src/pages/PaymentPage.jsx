import React, { useState } from 'react';
import styles from './PaymentPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/CartContext';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const { orderData } = location.state || {};

  // State for card details inputs
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!orderData) {
        alert('Sipariş bilgileri bulunamadı. Lütfen sepetten tekrar başlayın.');
        navigate('/cart');
        return;
    }

    // Combine order data with card details (backend does not process cards yet)
    const finalOrderData = {
        ...orderData,
        cardDetails: {
            cardName,
            cardNumber,
            cardExpiry,
            cardCVV,
        },
    };

    console.log('Submitting final order data:', finalOrderData);

    try {
        const res = await fetch('http://localhost:3002/submit-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization token if needed
            // 'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify(finalOrderData),
        });

        const result = await res.json();

        if (res.ok) {
          alert('Ödeme ve sipariş başarıyla tamamlandı!');
          clearCart();
          navigate('/');
        } else {
          alert(result.message || 'Ödeme veya sipariş sırasında hata oluştu.');
        }
      } catch (error) {
        console.error('Error submitting payment and order:', error);
        alert('Sunucuya bağlanırken hata oluştu.');
      }
  };

  return (
    <div className={styles.paymentPageContainer}>
      <h1>Kart ile Ödeme</h1>
      <form onSubmit={handleSubmitPayment} className={styles.paymentForm}>
        {/* Card details form will go here */}
         <div className={styles.cardDetailsSection}>
            {/* <h4>Kart Bilgileri</h4> */}
            <div className={styles.cardInputGroup}>
                <label htmlFor="cardName">Kart Üzerindeki İsim</label>
                <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                />
            </div>
             <div className={styles.cardInputGroup}>
                <label htmlFor="cardNumber">Kart Numarası</label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                     placeholder="0000 0000 0000 0000"
                />
            </div>
            <div className={styles.cardInputRow}>
                 <div className={styles.cardInputGroup}>
                    <label htmlFor="cardExpiry">Son Kullanma Tarihi</label>
                    <input
                        type="text"
                        id="cardExpiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                        placeholder="MM/YY"
                    />
                </div>
                 <div className={styles.cardInputGroup}>
                    <label htmlFor="cardCVV">CVV</label>
                    <input
                        type="text"
                        id="cardCVV"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                        required
                         placeholder="***"
                    />
                </div>
            </div>
        </div>
         <button type="submit" className={styles.paymentButton}>
                Ödeme Yap
        </button>
      </form>
    </div>
  );
}

export default PaymentPage; 