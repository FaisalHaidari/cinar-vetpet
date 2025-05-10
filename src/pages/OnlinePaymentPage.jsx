// src/pages/CheckoutPage.jsx
import React from 'react';
import styles from '../styles/OnlinePaymentPage.module.css'; // فایل CSS برای این صفحه
import { useLocation, useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const handleGoBack = () => {
    navigate(-1); // با -1 به صفحه قبلی در تاریخچه مرورگر برمی‌گردد
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // در اینجا منطق پرداخت نهایی را پیاده‌سازی کنید
    console.log('اطلاعات پرداخت ثبت شد:', {
      cardNumber: event.target.cardNumber.value,
      expiryDate: event.target.expiryDate.value,
      cvv: event.target.cvv.value,
      address: event.target.address.value,
      cartItems,
      totalPrice,
    });
    // پس از پرداخت موفقیت‌آمیز، می‌توانید کاربر را به صفحه تشکر یا صفحه پیگیری سفارش هدایت کنید
    // navigate('/order-successful');
  };

  return (
    <div className={styles.checkoutPage}>
      <h2>صفحه پرداخت</h2>

      {cartItems.length > 0 && (
        <div className={styles.cartSummary}>
          <h3>خلاصه سبد خرید:</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className={styles.cartItem}>
                <span>{item.name}</span>
                <span>تعداد: {item.quantity}</span>
                <span>قیمت واحد: {item.price.toLocaleString()} TL</span>
                <span>قیمت کل: {(item.price * item.quantity).toLocaleString()} TL</span>
              </li>
            ))}
          </ul>
          <div className={styles.totalPrice}>
            <span>جمع کل:</span>
            <span>{totalPrice.toLocaleString()} TL</span>
          </div>
        </div>
      )}

      {cartItems.length === 0 && (
        <p>سبد خرید شما خالی است.</p>
      )}

      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <h3>اطلاعات پرداخت:</h3>
        <div>
          <label htmlFor="cardNumber">شماره کارت:</label>
          <input type="text" id="cardNumber" name="cardNumber" />
        </div>
        <div>
          <label htmlFor="expiryDate">تاریخ انقضا:</label>
          <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" />
        </div>
        <div>
          <label htmlFor="address">آدرس:</label>
          <textarea id="address" name="address"></textarea>
        </div>
        {/* ... فیلدهای دیگر پرداخت */}
        <button type="submit">پرداخت</button>
      </form>

      <button type="button" onClick={handleGoBack} className={styles.goBackButton}>
        بازگشت
      </button>
    </div>
  );
}

export default CheckoutPage;