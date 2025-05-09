import React, { useState, useEffect } from 'react';
import ProductCard from '../components/store/ProductCard';
import CartItem from '../components/cart/CartItem'; // Sepet Öğesi İmport Edildi
import styles from './StoreHomePage.module.css';

const products = [
  { id: 1, name: 'Proplan Somonlu Yetişkin Kedi Maması', price: 128800, imageUrl: '/images/proplan_cat_food.jpg', oldPrice: 160999, discount: 20, freeShipping: true },
  { id: 2, name: 'Kemik Şeklinde Köpek Oyuncağı', price: 35000, imageUrl: '/images/dog_toy.jpg' },
  { id: 3, name: 'Deri Köpek Boyun Tasması', price: 25000, imageUrl: '/images/leather_collar.jpg', discount: 10 },
  { id: 4, name: 'Köpekler İçin Özel Şampuan', price: 45000, imageUrl: '/images/dog_shampoo.jpg', freeShipping: true },
  { id: 5, name: 'Kedi Taşıma Kutusu', price: 220000, imageUrl: '/images/cat_carrier.jpg' },
  { id: 6, name: 'Tavuk Aromalı Köpek Ödül Maması', price: 18000, imageUrl: '/images/dog_treats.jpg', discount: 5 },
  // ... Daha fazla ürün ekleyebilirsiniz
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

  return (
    <div className={styles.storeHomePage}> {/* CSS Module still used */}
      <h2>Evcil Hayvan Mağazası</h2>
      <div className={styles.productsContainer}> {/* CSS Module still used */}
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <h3>Sepet</h3>
      <ul>
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        ))}
      </ul>

      <h3>Toplam Sepet Tutarı: {totalPrice.toLocaleString()} TL</h3>
    </div>
  );
}

export default StoreHomePage;