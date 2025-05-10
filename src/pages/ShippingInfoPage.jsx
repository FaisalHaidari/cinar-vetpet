// src/pages/ShippingInfoPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ShippingInfoPage.module.css';

function ShippingInfoPage() {
  const navigate = useNavigate();
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
    navigate('/payment/online');
  };

  const handleGoBack = () => {
    navigate(-1); // با -1 به صفحه قبلی در تاریخچه مرورگر برمی‌گردد
  };

  return (
    <div className={styles.shippingInfoPage}>
      <h2>اطلاعات ارسال</h2>
      <form onSubmit={handleSubmit} className={styles.shippingForm}>
        <div>
          <label htmlFor="address">آدرس:</label>
          <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="postalCode">کد پستی:</label>
          <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="phoneNumber">شماره تلفن:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="city">شهر:</label>
          <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="province">استان:</label>
          <input type="text" id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)} required />
        </div>
        {/* ... سایر فیلدهای مورد نیاز */}
        <button type="submit">ادامه به پرداخت</button>
      </form>
      <button type="button" onClick={handleGoBack} className={styles.goBackButton}>
        بازگشت
      </button>
    </div>
  );
}

export default ShippingInfoPage;