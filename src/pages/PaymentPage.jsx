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

  // location.state'den sadece gerekli alanları al
  const {
    cartItems = [],
    totalPrice = 0,
    userId,
    phoneNumber = '',
    street = '',
    buildingNo = '',
    floor = '',
    apartmentNo = '',
    addressNote = '',
    city = 'İstanbul',
    state: stateVal = 'İstanbul',
    country = 'Turkey',
    zipCode = '',
    postalCode = '',
    isDefault = false
  } = location.state || {};

  // Kart bilgileri için state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Ödeme işlemini başlat
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

    // Sadece backend'in beklediği alanları gönder
    const fullAddress = {
      userId: userId || user.id,
      street,
      buildingNo,
      floor,
      apartmentNo,
      city,
      state: stateVal,
      postalCode,
      zipCode,
      country,
      phoneNumber,
      isDefault
    };

    setIsPaying(true);
    setError('');

    try {
      // 1. Adresi kaydet (yeni adres için)
      const addressRes = await axios.post('/api/addresses', fullAddress);
      const addressId = addressRes.data.id;

      // 2. Sadece addressId ile ödeme isteği gönder
      const paymentPayload = {
        userId: userId || user.id,
        addressId: addressId, // Sadece id gönderiyoruz
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
        totalAmount: totalPrice,
      };

      // Ödeme isteğini gönder
      const response = await axios.post('/api/payment/process', paymentPayload);

      if (response.status === 201 || response.status === 200) {
        clearCart(); // Sepeti temizle
        navigate('/order-success', { state: { cartItems: cartItems, totalPrice: totalPrice } });
      } else {
        setError(response.data.message || 'Ödeme veya sipariş sırasında hata oluştu.');
      }
    } catch (error) {
      console.error('Ödeme sırasında hata:', error);
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