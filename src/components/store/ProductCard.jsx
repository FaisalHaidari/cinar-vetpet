import React, { useState } from 'react';
import styles from './ProductCard.module.css'; // ایجاد این فایل در کنار کامپوننت

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity); // ارسال محصول و تعداد به تابع
  };

  return (
    <div className={styles.productCard}>
      <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
      <h3 className={styles.productName}>{product.name}</h3>
      <div className={styles.priceContainer}>
        {product.oldPrice && (
          <span className={styles.oldPrice}>{product.oldPrice.toLocaleString()} TL</span>
        )}
        <span className={styles.currentPrice}>{product.price.toLocaleString()} TL</span>
      </div>
      <div className={styles.quantityControl}>
        <button onClick={handleDecrement} className={styles.quantityButton}>-</button>
        <input type="number" value={quantity} readOnly className={styles.quantityInput} />
        <button onClick={handleIncrement} className={styles.quantityButton}>+</button>
      </div>
      <button onClick={handleAddToCartClick} className={styles.addToCartButton}>
        افزودن به سبد خرید {product.discount ? `(${Math.round(product.discount)}% تخفیف)` : ''}
      </button>
    </div>
  );
}

export default ProductCard;