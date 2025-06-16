import React, { useState, useContext } from 'react';
import styles from './PaymentPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/CartContext';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// Added a comment to force a re-write

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useContext(AuthContext);

  const { orderData } = location.state || {};

  // State for card details inputs
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Ödeme işlemi için önce giriş yapmalısınız.');
      return;
    }

    if (!orderData) {
        setError('Sipariş bilgileri bulunamadı. Lütfen sepetten tekrar başlayın.');
        navigate('/cart');
        return;
    }

    // Ensure orderData has necessary address fields that backend expects
    const fullAddress = {
      ...orderData.address,
      city: orderData.address.city || 'N/A',
      state: orderData.address.state || 'N/A',
      zipCode: orderData.address.zipCode || 'N/A',
      country: orderData.address.country || 'Turkey',
    };

    const submitPayload = {
      userId: user.id,
      address: fullAddress,
      items: orderData.items.map(item => ({
        urunId: item.urunId,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentInfo: {
          cardName,
          cardNumber,
          expiry: cardExpiry,
          cvv: cardCVV,
      },
    };

    console.log('Submitting final order data:', submitPayload);
    setIsPaying(true);

    try {
        const response = await axios.post('http://localhost:3002/api/submit-order', submitPayload);

        if (response.status === 201) {
          clearCart();
          navigate('/order-success', { state: { cartItems: orderData.items, totalPrice: orderData.totalAmount } });
        } else {
          setError(response.data.message || 'Ödeme veya sipariş sırasında hata oluştu.');
        }
      } catch (error) {
        console.error('Error submitting payment and order:', error);
        setError(error.response?.data?.message || 'Sunucuya bağlanırken hata oluştu.');
      } finally {
        setIsPaying(false);
      }
  };

  return (
    <div className={styles.paymentPageContainer}>
      <h1>Kart ile Ödeme</h1>
      <form onSubmit={handleSubmitPayment} className={styles.paymentForm}>
        {error && <div className={styles.error}>{error}</div>}
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
                    onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 16))}
                    required
                     placeholder="0000 0000 0000 0000"
                     maxLength={16}
                />
            </div>
            <div className={styles.cardInputRow}>
                 <div className={styles.cardInputGroup}>
                    <label htmlFor="cardExpiry">Son Kullanma Tarihi</label>
                    <input
                        type="text"
                        id="cardExpiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.replace(/[^0-9/]/g, '').slice(0, 5))}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                    />
                </div>
                 <div className={styles.cardInputGroup}>
                    <label htmlFor="cardCVV">CVV</label>
                    <input
                        type="text"
                        id="cardCVV"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                        required
                         placeholder="***"
                         maxLength={4}
                    />
                </div>
            </div>
        </div>
         <button type="submit" className={styles.paymentButton} disabled={isPaying}>
                {isPaying ? 'Ödeme Yapılıyor...' : 'Ödeme Yap'}
        </button>
      </form>
    </div>
  );
}

export default PaymentPage; 