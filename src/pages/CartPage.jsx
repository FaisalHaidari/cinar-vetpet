import React, { useState, useContext } from 'react';
import { useCart } from '../hooks/CartContext';
import { AuthContext } from "../context/AuthContext";
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import styles from './CartPage.module.css';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useContext(AuthContext);

  // State for payment form inputs - Initialized as empty strings
  const [telefon, setTelefon] = useState(''); // Empty string
  const [adres, setAdres] = useState(''); // Empty string
  const [binaNo, setBinaNo] = useState(''); // Empty string
  const [kat, setKat] = useState(''); // Empty string
  const [daireNo, setDaireNo] = useState(''); // Empty string
  const [adresTarifi, setAdresTarifi] = useState(''); // Empty string

  const navigate = useNavigate(); // Initialize useNavigate

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Ödeme işlemi için önce giriş yapmalısınız.');
      return;
    }

    // Directly pass the necessary data to the payment page
    navigate('/payment', {
      state: {
        cartItems: cart.map(item => ({
          productId: item.id, // Changed urunId to productId
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: cartTotal,
        phoneNumber: telefon,
        street: adres,
        buildingNo: binaNo,
        floor: kat,
        apartmentNo: daireNo,
        addressNote: adresTarifi,
        // These fields are not collected in CartPage, passing as empty strings to avoid undefined errors in PaymentPage
        city: '',
        state: '',
        postalCode: '',
        country: '',
      }
    });
  };

  return (
    <div className={styles.cartPageContainer}>
      <h1 className={styles.pageTitle}>
        Sepet
      </h1>

      {cart.length === 0 ? (
        <p className={styles.emptyCartMessage}>Sepetiniz boş.</p>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItemsColumn}>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                {item.image && (
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                )}
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemDescription}>{item.description || ''}</div>
                </div>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <span className={styles.itemQuantity}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                  <span className={styles.itemPrice}>{item.price * item.quantity} TL</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeItemButton}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5V19a2 2 0 002 2h8a2 2 0 002-2V7.5M4 7.5h16M10 11v6M14 11v6M9 7.5V5a2 2 0 012-2h2a2 2 0 012 2v2.5" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.cartTotal}>
              <span>Toplam: {cartTotal} TL</span>
            </div>
          </div>

          <div className={styles.paymentColumn}>
            <h2 className={styles.paymentTitle}>Teslimat Adresi</h2>
            <form onSubmit={handlePaymentSubmit} className={styles.formGroup}>
              <div className={styles.formGroup}>
                <label htmlFor="telefon" className={styles.formLabel}>Telefon</label>
                <input
                  type="text"
                  id="telefon"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="adres" className={styles.formLabel}>Mahalle / Cadde / Sokak</label>
                <input
                  type="text"
                  id="adres"
                  value={adres}
                  onChange={(e) => setAdres(e.target.value)}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.addressRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="binaNo" className={styles.formLabel}>Bina No</label>
                  <input
                    type="text"
                    id="binaNo"
                    value={binaNo}
                    onChange={(e) => setBinaNo(e.target.value)}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="kat" className={styles.formLabel}>Kat</label>
                  <input
                    type="text"
                    id="kat"
                    value={kat}
                    onChange={(e) => setKat(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="daireNo" className={styles.formLabel}>Daire No</label>
                  <input
                    type="text"
                    id="daireNo"
                    value={daireNo}
                    onChange={(e) => setDaireNo(e.target.value)}
                    className={styles.formInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="adresTarifi" className={styles.formLabel}>Adres Tarifi (örn: Taksi durağının karşısı)</label>
                <textarea
                  id="adresTarifi"
                  value={adresTarifi}
                  onChange={(e) => setAdresTarifi(e.target.value)}
                  className={styles.formTextarea}
                />
              </div>

              <button type="submit" className={styles.paymentButton}>
                Öde {cartTotal} TL
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage; 