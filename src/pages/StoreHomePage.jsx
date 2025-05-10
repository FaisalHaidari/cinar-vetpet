import React, { useState, useEffect } from 'react';
import ProductCard from '../components/store/ProductCard';
import styles from '../styles/StoreHomePage.module.css';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const products = [
  { id: 1, name: 'Mera Insect Sensitive Larva Proteinli Tahılsız Yetişkin Kedi Maması', price: 3000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 20, freeShipping: true },
  { id: 2, name: 'Kemik Şeklinde Köpek Oyuncağı', price: 3500, imageUrl: 'src/images/image_1296.webp' },
  { id: 3, name: 'Deri Köpek Boyun Tasması', price: 2500, imageUrl: '/src/images/image_1296.webp', discount: 10 },
  { id: 4, name: 'Köpekler İçin Özel Şampuan', price: 4500, imageUrl: 'src/images/image_1296.webp', freeShipping: true },
  { id: 5, name: 'Kedi Taşıma Kutusu', price: 2200, imageUrl: 'src/images/image_1296.webp' },
  { id: 6, name: 'Tavuk Aromalı Köpek Ödül Maması', price: 1000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 5 },
  { id: 7, name: 'Tavuk Aromalı Köpek Ödül Maması', price: 1000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 5 },
  { id: 8, name: 'Tavuk Aromalı Köpek Ödül Maması', price: 1000, imageUrl: '/src/images/da228978-8c95-47b8-afe5-8b08d08287e9.webp', discount: 5 },

];

function StoreHomePage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const increaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <div className={styles.storeHomePage}>
      <h2>Evcil Hayvan Mağazası</h2>
      <div className={styles.productsContainer}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <h3 className={styles.cartTitle}>Sepet</h3>
      <div className={styles.cartGrid}>
        {cart.map(item => (
          <div key={item.id} className={styles.cartGridItem}>
            <div className={styles.cartItemDetails}>
              <span>{item.name}</span>
              <div className={styles.quantityControl}>
                <button onClick={() => decreaseQuantity(item.id)} className={styles.quantityButton}>-</button>
                <input type="number" value={item.quantity} readOnly className={styles.quantityInput} />
                <button onClick={() => increaseQuantity(item.id)} className={styles.quantityButton}>+</button>
              </div>
              <span>قیمت واحد: {item.price.toLocaleString()} TL</span>
              <span>قیمت کل: {(item.price * item.quantity).toLocaleString()} TL</span>
            </div>
            <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
              <FaTimes />
            </button>
          </div>
        ))}
      </div>

      <h3 className={styles.totalPrice}>Toplam Sepet Tutarı: {totalPrice.toLocaleString()} TL</h3>
      {cart.length > 0 && (
        <div className={styles.goToCartContainer}>
          <Link to="/shipping-info" state={{ cartItems: cart, totalPrice: totalPrice }} className={styles.goToCartButton}>
            برو به سبد خرید
          </Link>
        </div>
      )}
      {cart.length === 0 && (
        <p className={styles.emptyCart}>Sepetiniz boş.</p>
      )}
    </div>
  );
}

export default StoreHomePage;
