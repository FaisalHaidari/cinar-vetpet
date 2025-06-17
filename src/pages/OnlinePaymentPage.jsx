// src/pages/CheckoutPage.jsx
import React, { useState, useContext } from 'react';
import styles from '../styles/OnlinePaymentPage.module.css'; // Bu sayfa için CSS dosyası
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios'u içe aktar
import { AuthContext } from '../context/AuthContext'; // AuthContext'i içe aktar

function OnlinePaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // AuthContext'ten kullanıcıyı al
  const { cartItems = [], totalPrice = 0, phoneNumber, street, buildingNo, floor, apartmentNo, addressNote } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv || !cardName) {
      setError('Lütfen tüm kart bilgilerini doldurun.');
      return;
    }
    setError('');
    setIsPaying(true);

    try {
      const response = await axios.post('http://localhost:3002/api/submit-order', {
        userId: user.id,
        address: {
          phoneNumber,
          street,
          buildingNo,
          floor,
          apartmentNo,
          addressNote,
          city: 'N/A',
          state: 'N/A',
          zipCode: 'N/A',
          country: 'Turkey',
        },
        items: cartItems.map(item => ({
          urunId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentInfo: {
          cardNumber,
          expiry,
          cvv,
          cardName,
        },
      });

      if (response.status === 201) {
        navigate('/order-success', { state: { cartItems, totalPrice } });
      } else {
        setError('Ödeme sırasında bir hata oluştu.');
        setIsPaying(false);
      }
    } catch (error) {
      setError('Ödeme sırasında bir hata oluştu.');
      setIsPaying(false);
    }
  };

  return (
    <div className={styles.paymentPage}>
      <div className={styles.paymentContainer}>
        <div className={styles.orderSummary}>
          <h3>Sipariş Özeti</h3>
          <ul className={styles.cartList}>
            {cartItems.map(item => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} className={styles.cartItemImage} />
                <div>
                  <div className={styles.cartItemName}>{item.name}</div>
                  <div className={styles.cartItemDetails}>
                    <span>{item.quantity} x {item.price.toLocaleString()} TL</span>
                    {item.discount && <span className={styles.discount}>%{item.discount} indirim</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cartTotal}>
            <span>Toplam:</span>
            <span>{totalPrice.toLocaleString()} TL</span>
          </div>
          <div className={styles.shippingInfo}>
            <h4>Teslimat Bilgileri</h4>
            <div><b>Telefon:</b> {phoneNumber}</div>
            <div><b>Mahalle/Cadde/Sokak:</b> {street}</div>
            <div><b>Bina No:</b> {buildingNo} <b>Kat:</b> {floor} <b>Daire No:</b> {apartmentNo}</div>
            {addressNote && <div><b>Adres Tarifi:</b> {addressNote}</div>}
          </div>
        </div>
        <form className={styles.paymentForm} onSubmit={handlePay} autoComplete="off">
          <h2>Ödeme Bilgileri</h2>
          <div className={styles.formGroup}>
            <label>Kart Üzerindeki İsim</label>
            <input
              type="text"
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              placeholder="Ad Soyad"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Kart Numarası</label>
            <input
              type="text"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 16))}
              placeholder="•••• •••• •••• ••••"
              maxLength={16}
              required
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Son Kullanma</label>
              <input
                type="text"
                value={expiry}
                onChange={e => setExpiry(e.target.value.replace(/[^0-9/]/g, '').slice(0, 5))}
                placeholder="AA/YY"
                maxLength={5}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                placeholder="•••"
                maxLength={4}
                required
              />
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.payButton} disabled={isPaying}>
            {isPaying ? 'Ödeme Yapılıyor...' : 'Şimdi Öde'}
          </button>
          <div className={styles.trustBadges}>
            <img src="/images/secure-payment.png" alt="Güvenli Ödeme" />
            <span>256-bit SSL ile korunmaktadır</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OnlinePaymentPage;