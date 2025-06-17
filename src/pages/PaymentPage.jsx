import React, { useState, useContext } from 'react';
import styles from './PaymentPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/CartContext';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useContext(AuthContext);

  // Destructure all expected state values from location.state
  const { 
    cartItems = [], 
    totalPrice = 0, 
    phoneNumber = '', 
    street = '', 
    buildingNo = '', 
    floor = '', 
    apartmentNo = '', 
    city = '', 
    state = '', 
    postalCode = '', 
    country = '' 
  } = location.state || {};

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

    if (!cartItems || cartItems.length === 0) {
        setError('Sipariş bilgileri bulunamadı. Lütfen sepetten tekrar başlayın.');
        navigate('/cart');
        return;
    }

    // Construct the full address object
    const fullAddress = {
      phoneNumber,
      street,
      buildingNo,
      floor,
      apartmentNo,
      city,
      state,
      postalCode,
      country,
    };

    const submitPayload = {
      userId: user.id,
      address: fullAddress,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentInfo: {
          cardName,
          cardNumber,
          expiry: cardExpiry,
          cvv: cardCVV,
      },
      totalAmount: totalPrice, // Ensure totalAmount is sent
    };

    console.log('Submitting final order data:', submitPayload);
    setIsPaying(true);

    try {
        const response = await axios.post('/api/submit-order', submitPayload);

        if (response.status === 201) {
          clearCart(); // Clear cart on successful order
          navigate('/order-success', { state: { cartItems: cartItems, totalPrice: totalPrice } });
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