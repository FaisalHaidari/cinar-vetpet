// src/pages/ShippingInfoPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/ShippingInfoPage.module.css';

function ShippingInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNo, setBuildingNo] = useState('');
  const [floor, setFloor] = useState('');
  const [apartmentNo, setApartmentNo] = useState('');
  const [addressNote, setAddressNote] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kargo bilgileri kaydedildi
    console.log('Kargo bilgileri kaydedildi:', { phoneNumber, street, buildingNo, floor, apartmentNo, addressNote, city, state, postalCode, country });
    navigate('/payment/online', {
      state: {
        phoneNumber,
        street,
        buildingNo,
        floor,
        apartmentNo,
        city,
        state,
        postalCode,
        country,
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
            <label htmlFor="phoneNumber">Telefon</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="Telefon Numarası" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="street">Mahalle / Cadde / Sokak</label>
            <input type="text" id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)} required placeholder="Mahalle / Cadde / Sokak" />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="buildingNo">Bina No</label>
              <input type="text" id="buildingNo" name="buildingNo" value={buildingNo} onChange={(e) => setBuildingNo(e.target.value)} required placeholder="Bina No" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="floor">Kat</label>
              <input type="text" id="floor" name="floor" value={floor} onChange={(e) => setFloor(e.target.value)} required placeholder="Kat" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="apartmentNo">Daire No</label>
              <input type="text" id="apartmentNo" name="apartmentNo" value={apartmentNo} onChange={(e) => setApartmentNo(e.target.value)} required placeholder="Daire No" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">Şehir</label>
              <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Şehir" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="state">İlçe</label>
              <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} required placeholder="İlçe" />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="postalCode">Posta Kodu</label>
              <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required placeholder="Posta Kodu" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="country">Ülke</label>
              <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required placeholder="Ülke" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="addressNote">Adres Tarifi (örn: Taksi durağının karşısı)</label>
            <input type="text" id="addressNote" name="addressNote" value={addressNote} onChange={(e) => setAddressNote(e.target.value)} placeholder="Adres Tarifi" />
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