// src/pages/ShippingInfoPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/ShippingInfoPage.module.css';

function ShippingInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  // ... سایر فیلدهای مورد نیاز

  const handleSubmit = (event) => {
    event.preventDefault();
    // در اینجا می‌توانید اطلاعات وارد شده را ذخیره کنید
    console.log('اطلاعات ارسال ثبت شد:', { address, postalCode, phoneNumber, city, province });
    // سپس کاربر را به صفحه پرداخت آنلاین هدایت کنید
    navigate('/payment/online', {
      state: {
        address,
        postalCode,
        phoneNumber,
        city,
        province,
        cartItems,
        totalPrice
      }
    });
  };

  const handleGoBack = () => {
    navigate(-1); // با -1 به صفحه قبلی در تاریخچه مرورگر برمی‌گردد
  };

  return (
    <div className={styles.shippingInfoPage}>
      <div className={styles.shippingContainer}>
        <form onSubmit={handleSubmit} className={styles.shippingForm} autoComplete="off">
          <h2 className={styles.formTitle}>Teslimat Bilgileri</h2>
          <div className={styles.formGroup}>
            <label htmlFor="address">Adres</label>
            <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Açık adresinizi girin..." />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">Şehir</label>
              <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Şehir" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="province">İl/İlçe</label>
              <input type="text" id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)} required placeholder="İl/İlçe" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="postalCode">Posta Kodu</label>
              <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required placeholder="Posta Kodu" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Telefon</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="Telefon Numarası" />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>Devam Et ve Ödeme</button>
          <button type="button" onClick={handleGoBack} className={styles.goBackButton}>Geri Dön</button>
        </form>
        <div className={styles.cartSummary}>
          <h3 className={styles.summaryTitle}>Sepet Özeti</h3>
          {cartItems.length === 0 ? (
            <p>Sepetiniz boş.</p>
          ) : (
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
          )}
          <div className={styles.cartTotal}>
            <span>Toplam:</span>
            <span>{totalPrice.toLocaleString()} TL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfoPage;