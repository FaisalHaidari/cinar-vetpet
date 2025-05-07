import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ product, onAddToCart }) {
  const { name, price, imageUrl } = product;

  const handleAddToCartClick = () => {
    onAddToCart(product);
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl || 'https://via.placeholder.com/150'} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>قیمت: {price} تومان</p>
      <button className={styles.addToCart} onClick={handleAddToCartClick}>افزودن به سبد خرید</button>
    </div>
  );
}

export default ProductCard;