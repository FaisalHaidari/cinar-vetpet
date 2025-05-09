import React from 'react';
import styles from './CartItem.module.css';

function CartItem({ item, increaseQuantity, decreaseQuantity }) {
  return (
    <li className={styles.cartItem}>
      <span className={styles.itemName}>{item.name}</span>
      <div className={styles.quantityControl}>
        <button className={styles.quantityButton} onClick={() => decreaseQuantity(item.id)}>-</button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button className={styles.quantityButton} onClick={() => increaseQuantity(item.id)}>+</button>
      </div>
      <span className={styles.itemPrice}>Birim Fiyat: {item.price} TL</span>
      <span className={styles.itemTotalPrice}>Toplam Fiyat: {item.price * item.quantity} TL</span>
    </li>
  );
}

export default CartItem;