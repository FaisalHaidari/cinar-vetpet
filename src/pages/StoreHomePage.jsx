import React, { useState, useEffect } from 'react';
import ProductCard from '../components/store/ProductCard';
import CartItem from '../components/cart/CartItem'; // ایمپورت CartItem

const products = [
  { id: 1, name: 'غذای خشک گربه', price: 55000, imageUrl: 'https://via.placeholder.com/150/FFC0CB/000000?Text=CatFood' },
  { id: 2, name: 'اسباب بازی سگ', price: 35000, imageUrl: 'https://via.placeholder.com/150/ADD8E6/000000?Text=DogToy' },
  { id: 3, name: 'قلاده گردنی', price: 25000, imageUrl: 'https://via.placeholder.com/150/90EE90/000000?Text=Collar' },
];

function StoreHomePage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
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
    <div>
      <h2>فروشگاه حیوانات خانگی</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>

      <h3>سبد خرید</h3>
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

      <h3>قیمت کل سبد خرید: {totalPrice} تومان</h3>
    </div>
  );
}

export default StoreHomePage;